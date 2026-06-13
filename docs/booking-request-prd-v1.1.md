# INBRIT Freight Management Platform

## Product Requirements Document

### Shipping Booking Request Feature

### Two-Part Structure: Internal Request + Carrier Booking

| | |
|---|---|
| **Status** | Updated — v1.1 (Two-Part Architecture) |
| **Supersedes** | Booking Request PRD v1.0 (May 2026) |
| **Date** | May 2026 |
| **Feature lives in** | Shipments Module > FCL Shipment > Booking Tab |
| **Author** | Product Team — INBRIT |
| **Audience** | Claude Design Project (UI/UX) |

---

## 1. Executive Summary

This document specifies the Shipping Booking Request feature — the mechanism by which INBRIT places container booking requests with ocean carriers on behalf of its customers. It supersedes v1.0 with a two-part structure that reflects how bookings actually originate inside a freight forwarding business.

In v1.0, the feature was specified as a single 7-step DCSA wizard for the operations executive. This update introduces a preceding Part 1 — an Internal Booking Request — completed by the sales executive when the customer brings a shipment requirement. Part 2 (the carrier-facing DCSA API booking) remains unchanged in its technical specification but is now positioned as a downstream action triggered by Part 1.

### What changed from v1.0

1. New Part 1 — Internal Booking Request form for the sales executive.
2. Sequential actor flow: Sales Executive (Part 1) → Ops Executive (Part 2) → Carrier (DCSA API).
3. Data handoff specification: which Part 1 fields pre-populate the Part 2 wizard.
4. Updated Booking Tab layout spec — showing both parts as a sequential file.
5. Updated design handoff checklist with Part 1 screens added.

### What did NOT change from v1.0

- The 7-step DCSA wizard specification (Steps 1–7 of Part 2) is unchanged.
- All MSC-specific rules, constraints, and error patterns remain as specified.
- The DCSA status lifecycle (RECEIVED → CONFIRMED → CANCELLED etc.) is unchanged.
- The carrier notification model (Azure Service Bus for MSC) is unchanged.

---

## 2. Feature Context

The Shipping Booking Request feature lives inside the Shipments module (specified in the companion Shipment Management PRD v1.0). Specifically, it occupies the Booking Tab within each FCL shipment's file-folder detail view.

| Location | Detail |
|---|---|
| Module | Shipments |
| Service Mode | FCL (v1) |
| Shipment Detail Tab | Tab 3 — Booking |
| Parent Record | FCL Shipment (one shipment can have multiple BLs — each BL can have its own carrier booking) |
| Entry Point — Part 1 | Sales executive creates a new shipment, which auto-opens the Internal Booking Request form. |
| Entry Point — Part 2 | Ops executive clicks 'Place Carrier Booking →' from the Tasks tab or Booking tab. |

---

## 3. Actors & Responsibilities

### Sales Executive

Captures the customer's shipment requirement. Fills Part 1. Does not touch carrier APIs.

| Responsibility | Detail |
|---|---|
| Create Internal Booking Request (Part 1) | Fills in the customer requirement: origin, destination, commodity, containers, preferred carrier, ETD window, special requirements. |
| Submit for Ops Review | Submits Part 1. This creates the shipment record and triggers the task 'Place Carrier Booking Request' for the assigned ops executive. |
| Update on customer changes | Can return to edit Part 1 if customer changes requirements before ops confirms. |
| View-only on Part 2 | Can see the carrier booking status but cannot edit Part 2 fields or interact with the DCSA API. |

### Freight Operations Executive

Reviews Part 1, enriches the DCSA payload, and sends the booking to the carrier via the API.

| Responsibility | Detail |
|---|---|
| Review and confirm Part 1 | Reviews the sales executive's intake. Can push back with comments if information is incomplete. |
| Complete Part 2 wizard | Adds DCSA-specific fields not present in Part 1: contract reference, parties, routing detail, DG data, booking channel reference. |
| Submit to carrier | Sends the POST request to the carrier's DCSA API. Monitors async status via the Booking tab. |
| Manage amendments & cancellations | Uses PUT/PATCH endpoints when carrier requests changes or customer cancels. |

### Carrier (MSC / Maersk / etc.)

Receives the DCSA booking. Returns status updates via async notifications (ASB or webhook).

| Responsibility | Detail |
|---|---|
| Validate and store booking | Returns 202 Accepted immediately. Async processing begins. |
| Send status notifications | RECEIVED → CONFIRMED (or REJECTED). Notifications via Azure Service Bus (MSC) or webhook. |
| Return cut-off dates | CY, SI, VGM cutoffs included in CONFIRMED notification. Displayed in Shipment Overview tab. |
| Send carrier feedback | Unsupported fields, changed values, or general information returned in feedbacks[]. |

---

## 4. Two-Part Flow Overview

The booking request process is split into two clearly bounded parts, executed by two different actors. The platform enforces the sequence: Part 2 cannot be initiated until Part 1 is confirmed.

| Part | Name | Actor | Trigger / Output |
|---|---|---|---|
| 1 | Internal Booking Request | Sales Executive | Customer brings a requirement. Output: Shipment record created, Part 1 data stored, Task generated for ops. |
| 2 | Carrier Booking Request | Ops Executive | Part 1 confirmed. Output: DCSA booking sent to carrier, DCSA status tracked, cut-off dates returned. |

### 4.1 Sequence Diagram

| Step | Actor | Action |
|---|---|---|
| 1 | Customer | Sends shipment enquiry to INBRIT sales executive (email, call, or customer portal in future). |
| 2 | Sales Executive | Opens Shipments > New Shipment. Platform auto-opens Part 1 — Internal Booking Request form. |
| 3 | Sales Executive | Fills and submits Part 1. Shipment record (ONH-YYYY-NNNNN) is created. |
| 4 | System | Auto-generates task: 'Confirm Internal Booking Request' for the assigned ops executive. |
| 5 | Ops Executive | Reviews Part 1 in the Booking tab. Confirms it (or sends back for revision). |
| 6 | System | Part 2 is unlocked. Auto-generates task: 'Place Carrier Booking Request' for the ops executive. |
| 7 | Ops Executive | Clicks 'Place Carrier Booking →'. Part 2 wizard opens, pre-populated from Part 1. |
| 8 | Ops Executive | Completes the 7-step DCSA wizard. Submits. |
| 9 | System | POST sent to carrier DCSA API. 202 Accepted returned. Booking channel reference stored. |
| 10 | Carrier | Async: bookingStatus → RECEIVED (via ASB/webhook). Booking tab updates. |
| 11 | Carrier | Async: bookingStatus → CONFIRMED. carrierBookingReference issued. Cut-off dates returned. |
| 12 | System | Cut-off dates written to Shipment Overview tab. Tasks generated: Submit SI, Submit VGM, etc. |
| 13 | Ops Executive | Monitors status and tasks in the Booking tab and Tasks tab. |

> **UI Design Note — Flow Gate**
>
> The gate between Part 1 and Part 2 is the most critical UX moment in this feature. If Part 1 is not yet confirmed, Part 2 must be visually locked — not just disabled.
>
> - Locked state: grey out Part 2, show a message: 'Complete and confirm the Internal Booking Request above to unlock carrier booking.'
> - Confirmed state: Part 1 collapses to a read-only summary card. Part 2 expands with a prominent 'Place Carrier Booking →' CTA.
> - Do NOT use a modal or separate page for this transition — everything happens within the Booking tab.

---

## 5. Part 1 — Internal Booking Request

Part 1 is the sales executive's intake form. It is deliberately simple — no DCSA field names, no carrier-specific constraints, no technical freight codes. It captures only what the sales executive knows from the customer conversation.

> **Design Principle for Part 1**
>
> Part 1 should feel like a fast CRM form, not a freight form. Use plain language everywhere. Avoid acronyms. A sales executive should be able to complete it in under 3 minutes without any freight operations knowledge.

### 5.1 Form Layout

Part 1 is a single-page form (not a wizard). Organised into four collapsible sections. All fields visible on one screen — no steps, no Next button. A 'Submit to Ops' button at the bottom.

#### Section A — Customer & Reference

| Field | Input Type | Notes / Validation |
|---|---|---|
| Customer / Client | Dropdown (searchable) | Linked to CRM customer list. Required. |
| Customer Reference / PO No. | Text input | Customer's own job number or purchase order. Optional. |
| Assigned Ops Executive | User dropdown | Which ops executive will handle this shipment. Defaults to the logged-in user's ops counterpart. |
| Internal Notes to Ops | Text area | Free-text instructions from sales to ops. e.g. 'Customer wants MSC only, premium service'. |

#### Section B — Route

| Field | Input Type | Notes / Validation |
|---|---|---|
| Movement Type | Card selector (4 options) | Port-to-Port, Door-to-Door, Door-to-Port, Port-to-Door. Plain language labels with simple diagrams. Required. |
| Origin — Collection Address | Location text input | For door movements (D2D, D2P). Plain address. Optional for P2P. |
| Origin — Loading Port | Port search (name or UNLOCODE) | Required. e.g. 'Felixstowe' or 'GBFXT'. |
| Destination — Discharge Port | Port search (name or UNLOCODE) | Required. |
| Destination — Delivery Address | Location text input | For door movements (D2D, P2D). |
| Preferred Departure (ETD) Window | Date range picker | Customer's preferred departure. Not binding. e.g. 'Between 1 Jun – 15 Jun 2026'. |
| Preferred Arrival (ETA) By | Date picker | Customer's latest acceptable arrival. Optional. |

#### Section C — Cargo

| Field | Input Type | Notes / Validation |
|---|---|---|
| Commodity | Text input | Plain description. e.g. 'Metal Scrap', 'Recycled Paper'. Required. |
| HS Codes | Tag input (multi) | Optional. Customer may or may not provide. |
| Estimated Gross Weight | Number + Unit dropdown (MT / kg / lbs) | Optional at Part 1. Required by carrier in Part 2. |
| Number of Packages | Number input | Optional. |
| Dangerous Goods? | Toggle (Yes / No) | If Yes: show a sub-field asking for UN Number or IMO class (best available — detail filled in Part 2). |
| Special Requirements | Multi-select chips | Options: OOG (Out of Gauge), Reefer, Fumigation Required, Certificate of Origin Required, Other. 'Other' opens a text field. |

#### Section D — Equipment

Repeat rows — one row per container type. 'Add Container Type' button adds a new row.

| Field | Input Type | Notes / Validation |
|---|---|---|
| Container Size & Type | Dropdown (plain language) | 20ft Standard, 40ft Standard, 40ft High Cube, 45ft High Cube. Maps to ISO codes in Part 2. |
| Quantity | Number input | Min: 1. |
| Shipper-Owned Container (SOC)? | Toggle | If Yes: note for ops that tare weight will be needed in Part 2. |

#### Section E — Carrier Preferences

| Field | Input Type | Notes / Validation |
|---|---|---|
| Preferred Shipping Line(s) | Multi-select (carrier list) | MSC, Maersk, Hapag-Lloyd, CMA CGM, etc. Not binding — guidance only. Required: at least one. |
| Contract / Rate Reference | Text input | Service contract reference or spot quote reference that the customer was quoted from. |
| Priority Level | Radio: Standard / Urgent | Urgent triggers a notification to the ops executive immediately on submission. |

### 5.2 Part 1 Statuses

| Status | Meaning |
|---|---|
| DRAFT | Sales executive started the form but has not yet submitted. Only visible to the sales exec. |
| SUBMITTED | Submitted to ops. Ops executive receives a task notification. |
| REVISION REQUESTED | Ops executive has flagged an issue and returned the form to sales for correction. Reason visible in form. |
| CONFIRMED BY OPS | Ops executive has reviewed and confirmed Part 1. Part 2 is now unlocked. |
| SUPERSEDED | Part 1 was updated after ops confirmation. Ops must re-confirm before Part 2 can proceed. |

### 5.3 Part 1 Actions

| Action | When Available / Who |
|---|---|
| Submit to Ops | Sales exec. Available when DRAFT. Moves status to SUBMITTED. |
| Save as Draft | Sales exec. Available always before submission. |
| Edit | Sales exec. Available in DRAFT, REVISION REQUESTED, or CONFIRMED BY OPS (moves to SUPERSEDED). |
| Request Revision | Ops exec. Available in SUBMITTED. Opens a modal to add a reason/comment. Moves to REVISION REQUESTED. |
| Confirm | Ops exec. Available in SUBMITTED or SUPERSEDED. Moves to CONFIRMED BY OPS. Unlocks Part 2. |

> **UI Design Note — Part 1 Display States**
>
> - **DRAFT**: Full editable form. Bottom CTA: 'Save Draft' + 'Submit to Ops'.
> - **SUBMITTED**: Form is read-only for sales exec. Ops exec sees it with 'Confirm' and 'Request Revision' buttons at the top.
> - **REVISION REQUESTED**: Sales exec sees the form re-opened for editing with a red banner showing the ops exec's comment. Ops sees it as awaiting re-submission.
> - **CONFIRMED BY OPS**: Form collapses to a read-only summary card. A small 'Edit' link allows sales to re-open (moves to SUPERSEDED). Part 2 CTA appears below.
> - **SUPERSEDED**: Same as SUBMITTED — ops must re-confirm before Part 2 is available again.

---

## 6. Part 1 → Part 2 Data Handoff

When the ops executive opens the Part 2 wizard, these Part 1 fields are pre-populated. The ops executive can override any pre-populated value. Fields marked 'Locked' cannot be changed in Part 2 without returning to Part 1.

| Part 1 Field | Pre-populates Part 2 Field | Behaviour |
|---|---|---|
| Loading Port (name) | shipmentLocations[POL] | Pre-filled. Editable in Part 2 Step 3. |
| Discharge Port (name) | shipmentLocations[POD] | Pre-filled. Editable in Part 2 Step 3. |
| Collection Address | shipmentLocations[PRE] | Pre-filled (if door movement). Editable. |
| Delivery Address | shipmentLocations[PDE] | Pre-filled (if door movement). Editable. |
| Movement Type | receiptTypeAtOrigin + deliveryTypeAtDestination + Scenario selector | Pre-selects the scenario card (P2P, D2D, D2P, P2D). Locked — change requires editing Part 1. |
| Container Type (mapped to ISO) | requestedEquipments[].ISOEquipmentCode | 20ft Std → 22GP, 40ft Std → 42GP, 40ft HC → 45G1, 45ft HC → 45G0. Pre-filled. |
| Container Quantity | requestedEquipments[].units | Pre-filled. Editable. |
| SOC Toggle | requestedEquipments[].isShipperOwned | Pre-filled. Editable. |
| Commodity | commodities[].commodityType | Pre-filled. Editable. |
| HS Codes | commodities[].HSCodes[] | Pre-filled if provided. Editable. |
| Estimated Gross Weight | commodities[].cargoGrossWeight | Pre-filled if provided. Editable. Required in Part 2. |
| Preferred ETD Window | expectedDepartureDate (start of window) | Pre-filled as a suggested date. Editable. |
| Dangerous Goods (Yes/No) | Shows DG Step 6 in Part 2 | If Yes in Part 1: Step 6 (DG) is automatically shown. UN/IMO from Part 1 pre-fill Step 6. |
| Preferred Carrier (first selected) | Carrier selector in Part 2 Step 1 | Pre-selects carrier dropdown. Editable. If multiple preferred carriers in Part 1, ops chooses one. |
| Contract / Rate Reference | serviceContractReference or contractQuotationReference | Pre-filled in Step 1. Editable. Ops must verify and select correct contract type. |
| Customer / Client | documentParties.bookingAgent (entity context) | Client context is inherited. Determines which INBRIT entity code is used as booking agent. |

### Fields NOT pre-populated from Part 1 (Ops must complete these in Part 2)

- Booking Channel Reference (bookingChannelReference) — must be unique, carrier-prefixed, ops-generated.
- Vessel / Voyage / Service Code — routing detail the ops executive selects based on schedule.
- All Parties detail (Shipper name/address, Consignee, Notify Parties) — ops completes Step 7.
- DG full detail (Emergency contact, all IMDG boolean flags, EMS, segregation groups) — Step 6.
- Equipment Substitution toggle — ops decision.
- Cargo cutoff constraints — not known at Part 1 stage.

---

## 7. Part 2 — Carrier Booking Request (DCSA API)

Part 2 is the 7-step wizard that sends the booking to the shipping line via the DCSA Bookings API v2.0.3. It is initiated by the operations executive after Part 1 is confirmed. The technical specification of the wizard steps is unchanged from v1.0 — this section provides the updated context and entry point behaviour.

> **Cross-reference**: The field-level specification for all 7 wizard steps (carrier & contract, movement type, routing & dates, equipment, commodity, DG, parties, review & submit) is fully specified in Sections 7.1 through 7.8 of the Booking Request PRD v1.0. That field-level detail is not repeated here to avoid duplication. Read this document and v1.0 together.

### 7.1 Entry Point & Pre-population

- Accessed by clicking 'Place Carrier Booking →' CTA in the Booking tab (visible only when Part 1 is CONFIRMED BY OPS).
- Also accessible from the Tasks tab via the inline action button on the 'Place Carrier Booking Request' task.
- The wizard opens with Part 1 fields pre-populated per Section 6 of this document.
- A yellow banner at the top of the wizard reads: 'Pre-filled from Internal Booking Request. Review all fields before submitting to the carrier.'
- Pre-populated fields are visually distinguished (light blue background) but fully editable.

### 7.2 The 7-Step Wizard

| # | Step | Pre-populated from Part 1 | Ops must add |
|---|---|---|---|
| 1 | Carrier & Contract | Preferred carrier pre-selected. Contract ref pre-filled. | Booking Channel Reference (unique, carrier-prefixed). Confirm contract type. |
| 2 | Movement Type & Scenario | Scenario pre-selected. Receipt/delivery types derived. | Equipment substitution toggle. Verify FCL. |
| 3 | Routing & Dates | POL, POD, PRE, PDE pre-filled. ETD suggested. | Vessel, voyage, service code. Exact departure date. Arrival dates. |
| 4 | Equipment (Containers) | Container types and quantities pre-filled. SOC pre-set. | Tare weight if SOC. Verify ISO codes. |
| 5 | Commodity & Cargo | Commodity description, HS codes, weight pre-filled. | Volume. Package count. Packaging type. |
| 6 | Dangerous Goods (if DG) | DG flag pre-set. UN/IMO class pre-filled if provided. | All IMDG detail: emergency contact, boolean flags, EMS, packing group, flash point, segregation. |
| 7 | Parties | Carrier pre-selected. Entity/booking agent auto-set. | Shipper, consignee, notify parties, other parties (DDR, DDS, COW, COX, N1, N2). |
| R | Review & Submit | All pre-populated fields shown. | Final review. Submit triggers POST to carrier. |

### 7.3 Carrier-Specific Rules (MSC — v1 Carrier)

| Rule | UI Enforcement |
|---|---|
| bookingChannelReference must start with INB | Step 1: auto-prefix field with 'INB'. Field shows prefix as a locked label, user types the suffix only. |
| No dashes allowed in bookingChannelReference | Step 1: real-time validation. Red inline error if dash typed. |
| Max 20 chars total (including INB prefix) | Step 1: character counter (e.g. '14/17 characters remaining'). |
| Exactly one of serviceContractReference or contractQuotationReference required | Step 1: enforced by radio selector. Cannot proceed without selecting one and filling it. |
| expectedDepartureFromPlaceOfReceiptDate required when any dates provided | Step 3: auto-derived for P2P (set equal to ETD). Shown as a prompted field for door movements. |
| documentParties.other[].partyFunction must be partyFunction (not partyFunctionCode) | Platform-enforced at payload construction — not user-visible. Note for engineering. |
| documentParties.other[].party must be nested inside party: {} object | Platform-enforced at payload construction — not user-visible. Note for engineering. |

### 7.4 Booking Scenarios Quick Reference

| Scenario | Receipt at Origin | Delivery at Dest. | Locations Required |
|---|---|---|---|
| Port-to-Port (P2P) | CFS or CY | CFS or CY | POL + POD only |
| Door-to-Door (D2D) | SD | SD | PRE + POL + POD + PDE |
| Door-to-Port (D2P) | SD | CFS or CY | PRE + POL + POD |
| Port-to-Door (P2D) | CFS or CY | SD | POL + POD + PDE |

---

## 8. Booking Tab — Combined Layout

### 8.1 Tab Layout — State Machine

| State | Layout |
|---|---|
| Part 1 — DRAFT | Full Part 1 form open and editable. Part 2 section is hidden (not shown at all). |
| Part 1 — SUBMITTED | Part 1 form read-only (for sales exec). Ops exec sees Part 1 form with 'Confirm' and 'Request Revision' buttons. Part 2 section shows as locked with message. |
| Part 1 — REVISION REQUESTED | Part 1 form re-opened for sales exec with ops exec's comment in an amber banner. Part 2 remains locked. |
| Part 1 — CONFIRMED BY OPS | Part 1 collapses to a summary card (key fields only). Part 2 section expands with prominent 'Place Carrier Booking →' CTA. |
| Part 2 — Submitted (awaiting carrier) | Part 1: collapsed summary card. Part 2: DCSA status card showing 'Submitted — Awaiting Carrier Response' with spinner. |
| Part 2 — RECEIVED | Part 2 status card updates: 'Received by carrier. Processing...' with carrierBookingRequestReference. |
| Part 2 — CONFIRMED | Part 2 status card: green CONFIRMED badge. carrierBookingReference shown. Cut-off dates shown inline. Actions: Amend / Cancel. |
| Part 2 — PENDING_UPDATE | Part 2 status card: amber PENDING_UPDATE badge. Carrier feedback panel visible. Action: 'Amend Booking'. |
| Part 2 — REJECTED | Part 2 status card: red REJECTED badge. Carrier feedback shown. No further actions. Part 1 remains to allow creating a new carrier booking. |
| Part 2 — Amendment in progress | Part 2 shows CONFIRMED + secondary badge: 'Amendment Under Review'. Cancel Amendment action visible. |

### 8.2 Part 1 Collapsed Summary Card (Fields Shown)

Once Part 1 is confirmed, it collapses to show only the key fields a user needs at a glance. An 'Edit' link re-opens the full form.

- Customer / Client
- Route: Origin Port → Destination Port (+ PRE/PDE if applicable)
- Preferred ETD window
- Containers: count + type summary
- Commodity
- Special requirements (as chips: DG / Reefer / OOG / etc.)
- Submitted by (sales exec name) + timestamp
- Confirmed by (ops exec name) + timestamp

### 8.3 Part 2 DCSA Status Card

After Part 2 is submitted, a status card replaces the 'Place Carrier Booking' CTA. It persists and updates as carrier notifications arrive.

| Card Element | Detail |
|---|---|
| Carrier logo + name | e.g. MSC logo + 'Mediterranean Shipping Company' |
| Booking Channel Reference | The INBRIT-generated reference (e.g. INB20260501A) |
| Carrier Booking Request Ref | Returned on 202 Accepted. e.g. MSCUUK-REQ-004821 |
| Carrier Booking Ref | Returned on CONFIRMED. e.g. MSCUUK987654. Shown prominently. |
| Current Status | Large status badge with colour (see Section 9 for status colours). |
| Last Updated | Timestamp of most recent status change from carrier. |
| Cut-Off Dates (post-CONFIRMED) | CY / SI / VGM cutoffs in a compact panel. Colour-coded by urgency. |
| Carrier Feedback Panel | Shown when feedbacks[] present. Lists carrier's change requests. |
| Action Buttons | Context-aware: Amend / Cancel / Cancel Amendment. Only available when status allows. |

---

## 9. DCSA Status Lifecycle (Unchanged from v1.0)

All status flows are driven by carrier notifications. The platform must never show a 'confirmed' state until the carrier notification is received — only 'submitted' and 'awaiting'.

### 9.1 bookingStatus Values

| Status | UI Behaviour |
|---|---|
| (Submitted — no status) | Show spinner + 'Submitted to carrier. Awaiting acknowledgement.' No GET available yet. |
| RECEIVED | Update status badge. Show carrierBookingRequestReference. Show timestamp. |
| PENDING_UPDATE | Amber alert banner: 'Carrier has requested changes. Please amend this booking.' Enable Amend action. |
| CONFIRMED | Green badge. Show carrierBookingReference. Show cut-off dates. Enable Amend and Cancel actions. |
| REJECTED | Red badge. Show carrier feedback. 'This booking was rejected by the carrier.' Disable all actions. Part 1 remains to create a new attempt. |
| DECLINED | Red badge. Booking was accepted but later declined by carrier after confirmation. |
| CANCELLED | Grey badge. Booking cancelled by ops executive. |
| COMPLETED | Blue badge. Transport document surrendered/released. |

### 9.2 amendedBookingStatus Values

| Status | UI Behaviour |
|---|---|
| AMENDMENT_RECEIVED | Secondary amber badge alongside CONFIRMED: 'Amendment Under Review'. Cancel Amendment action visible. |
| AMENDMENT_CONFIRMED | Toast: 'Amendment confirmed by carrier.' Secondary badge cleared. Booking fields updated. |
| AMENDMENT_DECLINED | Alert: 'Carrier declined the amendment. Booking remains as originally confirmed.' |
| AMENDMENT_CANCELLED | Secondary badge cleared. Booking returns to CONFIRMED state. |

### 9.3 Cancellation Flows

| Precondition | PATCH Body Sent | Expected Outcome |
|---|---|---|
| bookingStatus: RECEIVED / PENDING_UPDATE / UPDATE_RECEIVED | bookingStatus: CANCELLED | Booking cancelled immediately. Terminal. Part 1 remains for reference. |
| bookingStatus: CONFIRMED or PENDING_AMENDMENT | bookingCancellationStatus: CANCELLATION_RECEIVED | Carrier reviews. May confirm or decline. |
| amendedBookingStatus: AMENDMENT_RECEIVED | amendedBookingStatus: AMENDMENT_CANCELLED | Only the amendment is cancelled. Booking stays CONFIRMED. |

---

## 10. Amendment Flow

An amendment is a full re-submission of the booking payload via PUT. It is available when bookingStatus = CONFIRMED or PENDING_AMENDMENT.

- Entry point: 'Amend Booking' button on the Part 2 status card.
- The amendment form is the same 7-step wizard, pre-populated with the currently confirmed booking data.
- An amber banner at the top reads: 'You are amending a confirmed booking. Changes will be sent to the carrier for review.'
- The Review step shows a diff summary: fields that have changed are highlighted with original vs. new values.
- Submission sends a PUT request to the carrier DCSA API.
- Part 1 is not re-opened for amendments — they are operational changes to an already-confirmed booking.

> **UI Design Note — Amendment vs. New Booking**
>
> The amendment wizard must be visually distinct from the original booking wizard. The amber banner and the diff review step are the key differentiators.
>
> At no point should the user be able to confuse 'I am amending booking MSCUUK987654' with 'I am creating a new booking'.
>
> The Part 2 status card should clearly show 'Amendment Under Review' as a secondary badge during amendment processing — never replace the primary CONFIRMED badge.

---

## 11. Error Handling

### 11.1 Part 1 Errors

| Error | UI Response |
|---|---|
| Required field missing (e.g. no carrier selected) | Inline field-level error on Submit. Form does not submit. |
| Customer not found in CRM | Typeahead shows 'No results. Contact admin to add this customer.' |
| Container type not supported by selected carrier | Warning chip on the container row: 'This container type may not be available on [carrier]. Ops will confirm.' |

### 11.2 Part 2 Errors (DCSA API)

| HTTP Code | Cause | UI Response |
|---|---|---|
| 400 | Schema validation failure | Stay on Review step. Show field-level error messages mapped from API errors[] array. Scroll to first error. |
| 400 (MSC: bookingChannelRef) | Dash or missing INB prefix | Caught by pre-submission validation in Step 1. Red inline error before API call is made. |
| 400 (MSC: no contract ref) | Neither serviceContractReference nor contractQuotationReference provided | Caught in Step 1 — field enforced as required. |
| 403 | mTLS certificate error | System banner: 'Authentication error. Contact your administrator.' Log and alert ops team. |
| 409 | Carrier already processing previous request | Show retry prompt with 30-second countdown. Auto-retry once. If still 409: show 'Contact carrier support.' |
| 429 | Rate limit | Show throttle message with countdown timer. |
| 500 | Carrier internal error | Show: 'Carrier experienced an internal error. Try again or contact carrier support.' Log providerCorrelationReference. |
| ASB: REJECTED | Business rejection by carrier agency | Status card updates to REJECTED. Carrier feedback panel populated. Alert the ops executive. |
| No ASB after 15 min | Carrier processing delay | Show 'Awaiting carrier response...' with spinner. Do not resend. Show a 'Contact carrier' link after 60 min. |

---

## 12. Multi-Carrier Support

The carrier is selected in Part 2 Step 1. The platform applies carrier-specific rules, prefixes, and validations silently. From the designer's perspective, the only carrier-specific UI elements that change are:

- Booking Channel Reference prefix (auto-applied, shown as a locked prefix in the input field).
- Fields hidden or locked that the selected carrier does not support.
- Carrier logo shown on the Part 2 status card and throughout the wizard header.

| Carrier | v1 Status | DCSA Version | Booking Ref Prefix |
|---|---|---|---|
| MSC | Live — v1 | v2.0.3 | INB (max 20 chars, no dashes) |
| Maersk | Planned — v2 | v2.0.3 | TBC |
| Hapag-Lloyd | Planned — v2 | v2.0.3 | TBC |
| CMA CGM | Planned — v2 | v2.0.3 | TBC |
| ONE | Planned — v3 | TBC | TBC |

---

## 13. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Part 1 form must load in < 1s. Part 2 wizard must load pre-populated in < 2s. API submission must return 202 in < 5s. |
| Status Refresh | Booking tab status card must update within 60s of ASB/webhook notification receipt without manual refresh. |
| Audit | Every Part 1 save, submission, confirmation, and revision is logged in the shipment's Event Log with actor and timestamp. |
| Security | Only the assigned ops executive (or manager) can submit Part 2. Sales executives have read-only access to Part 2. |
| Idempotency | The platform must prevent double-submission of the same bookingChannelReference. Enforce uniqueness at the platform level before sending to carrier. |
| Data Validation | Part 1 → Part 2 field mapping is validated at wizard load. If a Part 1 value is incompatible with the carrier's constraints (e.g. wrong container type), a warning is shown immediately on wizard open. |
| Offline Resilience | If the carrier API is unreachable, the platform queues the submission and retries automatically. The user is informed: 'Submission queued. Will send when carrier API is available.' |

---

## 14. Open Questions

| # | Question | Owner |
|---|---|---|
| 1 | If a booking is REJECTED by the carrier, should the ops executive be able to create a new Part 2 attempt against the same Part 1, or must a new shipment be created? | Product + Ops |
| 2 | If the customer changes requirements after Part 1 is CONFIRMED BY OPS but before Part 2 is submitted, who can edit Part 1 — sales only, or also ops? | Product |
| 3 | When Part 1 is re-opened (SUPERSEDED), should Part 2 be locked again even if the changes to Part 1 are minor (e.g. updating a note)? | Product |
| 4 | For multi-BL shipments: does each BL get its own separate Part 1, or does one Part 1 cover the whole shipment and each BL gets its own Part 2? | Product + Engineering |
| 5 | Duplicate Booking (from overflow): when duplicating a confirmed booking, does it create a new Part 1 from the original's data, or jump straight to a pre-filled Part 2? | Product |
| 6 | When the preferred carrier in Part 1 is not available on the ops executive's selected sailing, does the platform warn the ops exec, or is the carrier preference advisory only? | Product + Engineering |

---

## 15. Design Handoff Checklist for Claude Design Project

### Screens Required — Part 1

- [ ] Part 1 form — DRAFT state. All four sections visible, empty.
- [ ] Part 1 form — DRAFT state, partially filled. Movement type card selected, ports filled, containers added.
- [ ] Part 1 form — SUBMITTED state (read-only, sales exec view). With 'Waiting for ops confirmation' indicator.
- [ ] Part 1 form — SUBMITTED state (ops exec view). With 'Confirm' and 'Request Revision' buttons.
- [ ] Part 1 form — REVISION REQUESTED state. Amber banner with ops exec's comment. Sales exec editing.
- [ ] Part 1 form — CONFIRMED BY OPS state. Collapsed summary card. Part 2 CTA visible below.

### Screens Required — Part 2 Wizard

- [ ] Wizard header with pre-population banner ('Pre-filled from Internal Booking Request').
- [ ] Step 1 — Carrier & Contract. MSC selected. INB prefix locked in booking ref field. Contract ref filled.
- [ ] Step 2 — Movement Type. Port-to-Port card selected (pre-set from Part 1).
- [ ] Step 3 — Routing & Dates. POL and POD pre-filled. ETD date picker open.
- [ ] Step 4 — Equipment. 3 × 40GP pre-filled from Part 1.
- [ ] Step 5 — Commodity. Description and weight pre-filled.
- [ ] Step 6 — Dangerous Goods (conditional — DG shipment scenario only).
- [ ] Step 7 — Parties. Booking agent pre-filled. Other party fields empty.
- [ ] Review step — diff view showing pre-populated vs. ops-added fields.
- [ ] Submission loading state.

### Screens Required — Booking Tab States

- [ ] Booking tab: Part 1 DRAFT (full form), Part 2 hidden.
- [ ] Booking tab: Part 1 CONFIRMED, Part 2 CTA unlocked. (The most important state.)
- [ ] Booking tab: Part 2 submitted — 'Awaiting carrier' spinner state.
- [ ] Booking tab: Part 2 RECEIVED.
- [ ] Booking tab: Part 2 CONFIRMED — full status card with carrier booking ref and cut-off dates.
- [ ] Booking tab: Part 2 PENDING_UPDATE — carrier feedback panel visible, amber state.
- [ ] Booking tab: Part 2 REJECTED — red state, carrier feedback, no actions.
- [ ] Booking tab: Amendment in progress — CONFIRMED + secondary 'Amendment Under Review' badge.

### Components Required

- [ ] Part 1 form sections (Section A–E) with all input types.
- [ ] Movement type card selector (4 cards with diagrams — reused from v1.0).
- [ ] Part 1 status indicator (DRAFT / SUBMITTED / REVISION REQUESTED / CONFIRMED / SUPERSEDED).
- [ ] Part 1 collapsed summary card.
- [ ] Ops confirm / request revision action bar.
- [ ] Flow gate component (locked Part 2 with explanatory message).
- [ ] Part 2 DCSA status card (all states).
- [ ] Carrier feedback panel.
- [ ] Pre-populated field visual treatment (light blue background, 'from intake' label).
- [ ] Amendment diff view (original vs. new value per field).
- [ ] Cancellation confirmation modal (3 variants: pre-confirm cancel, confirmed booking cancel, amendment cancel).

### Key Design Constraints

- Part 1 must use plain freight language. No ISO codes, no DCSA field names, no acronyms without explanation.
- Part 2 may use freight professional language (DCSA codes, ISO codes) — the ops exec is the audience.
- The gate between Part 1 and Part 2 must be unmistakable. Locked ≠ disabled. It must explain WHY and what to do next.
- The pre-population banner in Part 2 must be visible but not intrusive — a persistent top note, not a blocking modal.
- Status cards must update live — no manual refresh, no 'reload to see latest status'.
- The booking ref field in Step 1 must show the carrier prefix as a locked label left of the input — not inside a placeholder.

---

*INBRIT Freight Management Platform • Booking Request Feature PRD v1.1 • May 2026*

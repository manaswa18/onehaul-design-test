# INBRIT Freight Management Platform
## Shipment Management Module — Product Requirements Document

| Field | Value |
|---|---|
| **Status** | Draft — For Design Review |
| **Version** | 1.0 |
| **Date** | May 2026 |
| **Scope** | FCL (v1) · LCL & Air stubs deferred |
| **Author** | Product Team — INBRIT |
| **Audience** | Claude Design Project (UI/UX) |

---

## 1. Executive Summary

This PRD specifies the Shipment Management module — the central operational workspace of the INBRIT platform. It replaces fragmented manual tracking across emails, carrier portals, and spreadsheets with a single unified interface where every FCL shipment can be created, tracked, actioned, and audited from first enquiry through to final delivery.

The module is designed around two non-negotiable principles:
1. Every shipment that needs attention must be impossible to miss.
2. Every piece of information belonging to a shipment must be logically organised so it can be extracted as cleanly as pulling a physical file from a cabinet.

> **Design Audience Note:** This PRD is written as direct input for a Claude Design Project. Sections marked 🎨 are of primary interest to the designer. All field-level detail from the Booking Request feature PRD (v1.0, May 2026) is incorporated here by reference — the two documents should be read together.

---

## 2. Module Name

The module will be called **Shipments** in the primary navigation. The full internal name is Shipment Management.

| Option | Rationale |
|---|---|
| **Shipments (RECOMMENDED)** | Universal, user-facing, clean nav label. Scales to multi-modal without renaming. |
| Shipment Operations | Too long for nav; reads as internal function rather than user workspace. |
| Operations Hub | Too generic; could encompass finance, HR, etc. |
| Cargo Management | Cargo is a sub-concept within a shipment; misleading as a module name. |

---

## 3. Problem Statement

INBRIT's operations team currently manages FCL shipments across a patchwork of tools: carrier portals (Maersk.com, Hapag-Lloyd Navigator, MSC OVConnect), email inboxes, WhatsApp threads, Excel trackers, and INTTRA. The result:

- Critical deadlines (SI cutoff, VGM cutoff, CY cutoff) are missed because there is no unified view of what needs doing today vs. this week.
- Shipment information is scattered — the booking is in INTTRA, the BL draft is in an email, the VGM is in the carrier portal, and the commercial invoice is in a shared folder.
- New sales executives cannot easily pick up an existing shipment — there is no single file they can open.
- Customers call to ask for status updates that the team has to look up across three tools.
- Audit trails for compliance and disputes are incomplete.

---

## 4. User Personas

### 4.1 Sales Executive

Creates the internal booking request when a customer brings a requirement. Captures origin, destination, commodity, containers, and preferred shipping line. Does not interact with carrier APIs directly.

- Needs a quick intake form to log the requirement.
- Wants to see the status of shipments they created without digging into operational detail.

### 4.2 Freight Operations Executive _(Primary v1 User)_

Picks up the internal booking request from the sales executive and executes it: places the booking with the carrier, submits SI/VGM, manages documents, monitors status.

- Handles 5–30 shipments per day across multiple customers and carriers.
- Needs to know immediately what requires action today and why.
- Must be able to switch between shipments quickly without losing context.

### 4.3 Operations Manager _(Primary v1 User)_

Oversees the team's full shipment queue. Reviews SLA compliance, reassigns shipments, monitors exceptions.

- Needs a dashboard view across all executives and all clients.
- Wants alerts when something is overdue or a carrier has rejected/changed a booking.

### 4.4 Customer / Shipper _(Future — v2)_

Not in scope for v1. The data model must support a customer-facing view in future. The 'Client' field must be present and filterable from v1.

---

## 5. Scope

### 5.1 In Scope — v1

- Shipment list: table view (default) + card view toggle.
- Needs Attention tray: surface overdue/urgent tasks without overpowering the main list.
- Shipment detail: file-folder tab structure (9 tabs — see Section 9).
- FCL service mode only.
- Two-part booking request flow: Internal Booking Request (Sales) + Carrier Booking Request (Ops, via DCSA API).
- Complete task system with urgency tiers and deadline timestamps.
- Column customisation for the table view.
- Customer/Client as a filterable field in the list.
- Duplicate shipment (overflow action).

### 5.2 Out of Scope — v1

- LCL and Air service modes — stub tabs only, no functionality.
- Customer self-service portal — data model supports it, UI deferred to v2.
- Rate quoting / spot rate comparison — separate module.
- Finance / invoice management — separate module (Charges tab is read-only display only).
- Container tracking real-time feed — separate module (milestone data is manual/API-sourced).

---

## 6. Shipment Data Model Overview

A **Shipment** is the top-level record in this module. It can have multiple Bills of Lading (BLs). Within the shipment detail, BL-specific information must be clearly delineated so it can be read and extracted BL by BL — as if pulling a labelled file from a cabinet drawer.

| Entity | Description |
|---|---|
| **Shipment** | Top-level record. One internal Shipment Number (e.g. ONH-2026-04821). Groups all activity for a single freight movement. |
| **Bill of Lading (BL)** | One or more BLs under a shipment. Each BL has its own carrier booking ref, containers, parties, documents, and charges. Displayed as labelled sub-files within the shipment detail. |
| **Booking Request (Internal)** | The sales executive's intake record: customer, commodity, routing, containers, preferred carrier. Precedes the carrier booking. |
| **Booking Request (Carrier)** | The DCSA API booking sent to the shipping line. Linked to the internal booking request. Tracked via DCSA status flow. |
| **Task** | An action item on a shipment with a type, deadline, assignee, urgency tier, and completion state. |
| **Document** | Any file attached to the shipment or a BL: SI, BL draft, booking confirmation, invoice, certificate, etc. |
| **Communication** | Email threads, chat screenshots, or messages exchanged with customers or other stakeholders, linked to the shipment. |
| **Event Log Entry** | Immutable audit record of every action taken on the shipment (status change, document upload, task completion, API call). |

---

## 7. FCL Shipment Lifecycle — Milestone Stages

The following 10-stage lifecycle is the standard FCL export journey from INBRIT's perspective. This drives the milestone timeline displayed on the shipment detail page and determines which tasks are triggered at each stage.

| # | Stage | Visual Label | Triggered When |
|---|---|---|---|
| 1 | Shipment Created | Booking Initiated | Internal booking request submitted by sales executive. |
| 2 | Carrier Booking Sent | Booking Requested | Ops executive sends DCSA booking to carrier. |
| 3 | Booking Confirmed | Booking Confirmed | Carrier CONFIRMED notification received (DCSA). |
| 4 | Pre-Shipment | Pre-Shipment | Booking confirmed; SI / VGM / cutoff tasks now open. |
| 5 | Cargo Gated In | Cargo Ready | Container gated in at terminal (CY cutoff passed). |
| 6 | Vessel Departed | On the Water | ETD passed; vessel confirmed departed. |
| 7 | In Transit | In Transit | Between departure and arrival ports. |
| 8 | Vessel Arrived | Arrived at POD | ETA reached; vessel confirmed arrived. |
| 9 | Customs & Delivery | Clearance & Delivery | Import customs in progress; delivery arranged. |
| 10 | Completed | Completed | Delivery confirmed; BL surrendered or telex released. |

> 🎨 **UI Design Note — Milestone Timeline**
>
> Display the 10 stages as a horizontal stepper at the top of the Shipment Detail page (below the header bar). The active stage should be highlighted. Completed stages show a checkmark. Future stages are muted. Each node is clickable and shows a tooltip with the actual timestamp (or 'Estimated: [date]' if not yet reached). On narrow screens, collapse to a condensed pill indicator showing current stage only.

---

## 8. Task System

### 8.1 Task Types — Complete List

Tasks are generated automatically at each milestone stage or manually by any team member.

| Task Type | Stage Triggered | Description |
|---|---|---|
| Place Carrier Booking Request | Booking Initiated | Ops executive sends booking to carrier via DCSA API. Links to Part 2 of booking flow. |
| Confirm Internal Booking Request | Booking Initiated | Sales executive review and confirmation of intake details before ops picks it up. |
| Chase Booking Confirmation | Booking Requested | If no carrier confirmation within 24 hrs of submission. |
| Booking Amendment Required | Booking Confirmed | Triggered when carrier responds with PENDING_UPDATE or PENDING_AMENDMENT. |
| Submit Shipping Instructions (SI) | Pre-Shipment | Draft and submit SI to carrier before SI cutoff. |
| Submit VGM Declaration | Pre-Shipment | Submit Verified Gross Mass before VGM cutoff. |
| File Export Customs Declaration | Pre-Shipment | Submit export customs / EX1 / MRN before vessel departure. |
| Dangerous Goods Declaration | Pre-Shipment | Required when booking has DG cargo. DGD to carrier and port. |
| Cargo/CY Cutoff — Action Required | Pre-Shipment | Reminder 48 hrs before CY cutoff. Confirm cargo ready and booked for transport. |
| BL Draft Review & Approval | Pre-Shipment | Review carrier BL draft for accuracy before release. |
| Collect Certificate of Origin | Pre-Shipment | Obtain COO from chamber or relevant authority. |
| Collect Fumigation Certificate | Pre-Shipment | Required for wooden packing / specific commodities. |
| Upload Packing List | Pre-Shipment | Customer document required for SI and BL. |
| Upload Commercial Invoice | Pre-Shipment | Customer document required for SI and customs. |
| Original BL Release / Telex Release | Vessel Departed | Arrange OBL release or telex release with carrier after departure. |
| Notify Customer — Departure | Vessel Departed | Send pre-departure or departure advice to customer. |
| Arrival Notice — Acknowledge | Arrived at POD | Acknowledge arrival notice from carrier. |
| Notify Customer — Arrival | Arrived at POD | Inform customer vessel has arrived. |
| Arrange Import Customs Clearance | Clearance & Delivery | Initiate or monitor import customs filing at POD. |
| Arrange Delivery / Release | Clearance & Delivery | Issue delivery order; arrange trucking or collection. |
| Confirm Final Delivery | Completed | Record proof of delivery and close shipment. |
| Invoice / Charge Approval | Any | Manual task to review and approve carrier or third-party charge. |
| Customer Communication Required | Any | Manual task flagging an open customer query needing response. |
| Custom Task | Any | Free-form task created manually by any team member. |

### 8.2 Urgency Tiers

| Urgency Tier | Rule & Visual Treatment |
|---|---|
| **OVERDUE** | Deadline has passed. Red background. Shown at top of task lists. Cannot be dismissed without a resolution action. |
| **DUE TODAY** | Deadline is within the next 24 hours. Amber background. |
| **DUE THIS WEEK** | Deadline is within 7 days. Yellow/light amber. Visible in task list but not flagged in the main list view. |
| **UPCOMING** | Deadline is more than 7 days away. Grey. Visible in task panel only, not in list view. |
| **COMPLETED** | Task actioned and marked complete. Shown with strikethrough in task panel. Archived after 30 days. |

### 8.3 Task Filtering

In the Tasks tab of a shipment and in the global task tray, users can filter by:

- Urgency tier (Overdue / Due Today / This Week / Upcoming / Completed)
- Task type (any of the 24 types above)
- Assignee (self / any team member)
- Stage (e.g. Pre-Shipment, Vessel Departed)
- Date range (custom deadline window)

### 8.4 Task Display in List View

In the main shipment list, task urgency is surfaced without overwhelming the row:

- **OVERDUE tasks present:** red dot + count badge (e.g. ● 2 overdue)
- **No overdue, DUE TODAY present:** amber dot + count
- **No overdue or due-today, DUE THIS WEEK present:** muted yellow dot
- **No pending urgent tasks:** no badge shown. Clean row.

Hovering the badge shows a compact tooltip listing the task names and deadlines.

---

## 9. Shipment List — Needs Attention Tray

Above the main shipment table, a collapsible **Needs Attention** tray surfaces shipments that have overdue or due-today tasks.

### 9.1 Tray Behaviour

- Collapsed by default after first dismissal; user preference is persisted per session.
- Displays up to 5 shipment cards. A 'View all' link opens a filtered list.
- Each card shows: Shipment number, Client, Route (POL → POD), and the specific overdue/due-today task with its deadline.
- Tray header: _'Needs Attention — [N] shipments require action today.'_ with a red or amber dot.
- Clicking a card opens the shipment detail directly to the Tasks tab.

> 🎨 **UI Design Note — Tray**
>
> The tray should feel like an email inbox's priority section — noticeable but not alarming. Use a light red or amber tinted background strip, NOT a full-width red banner.
>
> On the Operations Manager view, the tray should also show the assignee name on each card so they can redistribute work at a glance.
>
> Include a collapse/expand chevron so experienced users can keep it hidden once they've reviewed it for the day.

---

## 10. Shipment List — Table View (Default)

### 10.1 Fixed Columns (Always Visible)

| Column | Data Type | Notes | Must? |
|---|---|---|---|
| Shipment No. | Text link | e.g. ONH-2026-04821. Clickable — opens shipment detail. | ✓ |
| Client / Customer | Text | Company name. Filterable. Future: hidden for customer-only views. | ✓ |
| Carrier | Logo + name | Carrier logo (16px) + short name. e.g. MSC, Maersk. | ✓ |
| Carrier Booking Ref | Text | Carrier's confirmed booking number. Shows 'Pending' if not yet confirmed. | ✓ |
| Origin | Text | POL city + country code. Or PRE city if door pickup. | ✓ |
| Destination | Text | POD city + country code. Or PDE city if door delivery. | ✓ |
| ETD | Date | Expected departure from POL. Colour-coded if changed by carrier. | ✓ |
| ETA | Date | Expected arrival at POD. | ✓ |
| Containers | Text | Count + ISO type. e.g. '3 × 40GP, 2 × 20GP'. | ✓ |
| Commodity | Text | Short commodity description. Truncate at 25 chars with tooltip. | ✓ |
| Stage | Badge | Current lifecycle stage (1 of 10). Badge with stage name. | ✓ |
| Booking Status | Badge | DCSA booking status (CONFIRMED, RECEIVED, etc.). | ✓ |
| Last Milestone | Text + timestamp | e.g. 'Gated in at terminal — 21 Apr, 07:46'. | ✓ |
| Next Event | Text + countdown | e.g. 'SI Cutoff — in 2 days'. Red if overdue. | ✓ |
| Tasks | Badge | Urgency dot + count. Red=overdue, Amber=due today, Yellow=this week. | ✓ |

### 10.2 Optional Columns (Column Picker)

Users can add these columns via a column customisation panel (gear icon in the table header). Selections are persisted per user.

| Optional Column | Notes |
|---|---|
| Vessel / Voyage | Main vessel name + voyage number. e.g. 'MAERSK VIRGINIA / 615S'. |
| CY Cutoff | Cargo/Container Yard cutoff date and time. |
| SI Cutoff | Shipping Instructions cutoff date and time. |
| VGM Cutoff | VGM declaration cutoff date and time. |
| Service Contract / Quotation Ref | Contract or quotation reference used for the booking. |
| Shipment Created | Date the shipment was first created in INBRIT. |
| Assigned To | Operations executive assigned to this shipment. |
| BL Number(s) | Comma-separated BL numbers once issued. |
| Transit Time | Carrier-confirmed transit time in days. |
| Movement Type | Port-to-Port / Door-to-Door / Door-to-Port / Port-to-Door. |

### 10.3 Filters & Search

- **Global search bar:** free-text across Shipment No., Client, Carrier Booking Ref, BL No., Vessel, Origin, Destination.
- **Filter chips (quick):** Stage, Booking Status, Client, Carrier, Assigned To, Date Range (ETD).
- **Advanced filter panel:** all columns including optional ones, urgency tier, task type.
- **Saved filters:** users can save a filter set and recall it as a named view (e.g. 'My MSC shipments this week').
- **Sort:** any column. Default sort: Next Event deadline ascending (most urgent first within current stage filter).

### 10.4 Row Actions

Accessible via a three-dot overflow menu on each row. Context-aware — shown/hidden based on current shipment stage and status.

| Action | When Available |
|---|---|
| Open Shipment | Always. Primary default click action. |
| Open Tasks | Always. Shortcut directly to the Tasks tab. |
| Place Carrier Booking | When stage = Booking Initiated and no carrier booking yet submitted. |
| Amend Booking | When carrier booking status = CONFIRMED or PENDING_AMENDMENT. |
| Cancel Booking | When carrier booking exists and is not yet COMPLETED. |
| Duplicate Shipment | Always. Hidden in overflow (not surfaced at top level). Creates a copy of the internal booking request with a new shipment number. |
| Assign To | Manager role only. Reassign the shipment to another executive. |

---

## 11. Shipment List — Card View (Toggle)

A card view toggle (list icon / grid icon) is available in the top-right of the list toolbar. Table view is the default and recommended for power users managing 20+ shipments.

### 11.1 Card Layout

Each card is roughly **320 × 200px**, structured in three zones:

**Card Zone 1 — Header Strip**
- Status badge (coloured) + Shipment No. + Carrier logo
- Background colour reflects urgency: red tint if overdue task, amber tint if due today, neutral white otherwise.

**Card Zone 2 — Routing Block**
- Origin (city + flag) → arrow → Destination (city + flag)
- ETD below origin. ETA below destination. Vessel/voyage name centred.

**Card Zone 3 — Footer**
- Client name (left). Container count + type (centre). Next event with countdown (right, coloured by urgency).

---

## 12. Shipment Detail — File Folder Structure

Opening a shipment navigates to a detail page structured as a file folder. Three persistent zones: a **header bar** (always visible), a **milestone timeline** (always visible), and a **tabbed content area** below.

### 12.1 Persistent Header Bar

Always visible regardless of which tab is active.

| Element | Detail |
|---|---|
| Shipment Number | ONH-2026-04821 — large, prominent. Copy-to-clipboard icon. |
| Client Name | Company name of the shipper/customer. |
| Route Summary | Origin city → Destination city. ETD / ETA dates. |
| Carrier + Booking Ref | Carrier logo + confirmed carrier booking ref (or 'Awaiting Confirmation'). |
| Container Summary | e.g. '3 × 40GP, 2 × 20GP'. Click to jump to Containers tab. |
| Current Stage Badge | Lifecycle stage badge (e.g. 'Pre-Shipment'). |
| Booking Status Badge | DCSA booking status (e.g. CONFIRMED, green). |
| Quick Actions | Primary actions based on stage: [Place Booking] or [Submit SI] or [View Tracking]. Three-dot overflow for secondary actions (Amend, Cancel, Duplicate, Assign). |
| Back Navigation | ← Back to Shipments list. Preserves scroll position and filters. |

### 12.2 Milestone Timeline

A horizontal 10-node stepper sits below the header bar. Always visible.

`Booking Initiated → Booking Requested → Booking Confirmed → Pre-Shipment → Cargo Ready → On the Water → In Transit → Arrived at POD → Clearance & Delivery → Completed`

> 🎨 **UI Design Note — Timeline**
>
> - **Completed stages:** filled circle with checkmark, dark blue.
> - **Active stage:** filled circle, pulsing ring, accent blue.
> - **Future stages:** empty circle, grey.
> - **Overdue stage:** filled circle with warning icon, red.
>
> Each node: click = tooltip with timestamp or 'ETA: [date]'. On mobile: collapse to '3 of 10 — Pre-Shipment' pill.

### 12.3 Tab Structure

| # | Tab Name | What Lives Here |
|---|---|---|
| 1 | Overview | Routing details, key dates, references, BL summary, carrier feedback, any open alerts. |
| 2 | Tasks | All tasks for this shipment — organised by urgency tier and stage. Primary working tab for ops. |
| 3 | Booking | Two-part booking flow: Internal Booking Request (Part 1) and Carrier Booking Request (Part 2 — DCSA). |
| 4 | Documents | All files: SI, BL draft, booking confirmation, certificates, customs docs. Organised by BL sub-file. |
| 5 | Containers | Per-container detail: ISO code, weight, seals, haulage, VGM status, gate-in event. |
| 6 | Parties | All parties: shipper, consignee, notify, booking agent, forwarder, customs agent. |
| 7 | Communications | Email threads, chat screenshots, customer messages. Linked to the shipment timeline. |
| 8 | Charges | Freight charges and surcharges from carrier (read-only in v1). Grouped by origin, ocean, destination. |
| 9 | Event Log | Complete immutable audit trail of every action, status change, API call, document upload. |

---

## 13. Tab 1 — Overview

### 13.1 Sections

**Key References**
- INBRIT Shipment No.
- Carrier Booking Reference (carrier-assigned once confirmed)
- Internal Booking Request Reference
- Service Contract / Quotation Reference
- BL Number(s) — once issued (links to Documents tab)

**Routing Summary**
- Movement type (e.g. Port-to-Port)
- Origin: Place of Receipt + POL + dates
- Destination: POD + Place of Delivery + dates
- Vessel / Voyage / Service / Flag
- Transit time

**Cut-Off Dates Panel**
- CY Cutoff (Cargo/Container Yard)
- SI Cutoff (Shipping Instructions)
- VGM Cutoff
- Doc Cutoff (Customs / BL)
- Each cutoff: date + time + urgency colour (red if passed, amber if today)

**Carrier Feedback**
- Shown only when carrier has returned `feedbacks[]` in a DCSA notification
- Displays each feedback item: type (changed value / unsupported field / info), field name, original vs. new value
- Links to Booking tab for resolution

**Open Alerts**
- Any system-generated alerts not yet acknowledged: booking rejection, amendment declined, cutoff approaching

---

## 14. Tab 2 — Tasks

Primary working tab for the operations executive.

### 14.1 Layout

- Four sections (collapsible): **OVERDUE**, **DUE TODAY**, **THIS WEEK**, **UPCOMING**
- Each task row: task type icon + task name + deadline timestamp + assignee avatar + status pill + action button
- Overdue and Due Today sections are expanded by default. This Week and Upcoming are collapsed.
- '+ Add Task' button at top right. Opens a modal: task type (dropdown from list), custom name, deadline, assignee, notes.

### 14.2 Task Row Actions

- **Mark Complete:** primary action. Opens confirmation with optional note.
- **Reassign:** change assignee.
- **Edit Deadline:** change the deadline (with reason field for audit log).
- **Open Related:** for tasks linked to a feature (e.g. 'Place Carrier Booking' opens Booking tab Part 2).
- **Add Note:** free-text note attached to the task visible in Event Log.

> 🎨 **UI Design Note — Tasks Tab**
>
> Tasks linked to a feature action (e.g. Submit SI, Place Carrier Booking) should have a prominent CTA button inline — e.g. 'Place Booking →' that navigates directly to the relevant sub-feature.
>
> Completed tasks should visually recede (strikethrough text, grey) but remain visible in a collapsible 'Completed' section for reference.
>
> Overdue tasks should have a red left-border accent on the row — distinguishable from section colouring without being alarming.

---

## 15. Tab 3 — Booking

### 15.1 Part 1 — Internal Booking Request (Sales)

The sales executive logs the customer's shipment requirement. This creates the shipment record and triggers the 'Confirm Internal Booking Request' and 'Place Carrier Booking Request' tasks for the ops team.

| Field | Input Type | Notes |
|---|---|---|
| Customer / Client | Dropdown (searchable) | Linked to CRM/customer list. |
| Customer Reference | Text input | Customer's own job or PO reference. |
| Origin — Place of Receipt | Location search | Optional. For door pickup. |
| Origin — Port of Loading (POL) | Port search (UNLOCODE) | Required. |
| Destination — Port of Discharge (POD) | Port search (UNLOCODE) | Required. |
| Destination — Place of Delivery | Location search | Optional. For door delivery. |
| Commodity | Text + HS Code | Short description + optional HS codes. |
| Container Requirements | Repeating rows | ISO type + quantity. e.g. 3 × 40GP. |
| Preferred Shipping Line(s) | Multi-select dropdown | MSC, Maersk, Hapag, etc. Not binding — guidance for ops. |
| Preferred ETD (window) | Date range picker | Customer's preferred departure window. |
| Special Requirements | Text area | DG, reefer, OOG, fumigation, etc. |
| Service Contract / Rate Reference | Text input | Customer's agreed rate or spot quote ref. |
| Assigned To (Ops) | User dropdown | Which operations executive should handle this. |
| Notes | Rich text area | Any additional instructions from customer. |

**Part 1 Statuses:**

| Status | Meaning |
|---|---|
| Draft | Sales exec started but not submitted. |
| Submitted | Submitted to ops for review. |
| Confirmed by Ops | Ops executive has reviewed and is ready to place carrier booking. |
| Carrier Booking Placed | Part 2 has been initiated. |

> 🎨 **UI Design Note — Part 1**
>
> Part 1 should feel like a fast CRM intake form, not a technical freight form. Short, clean, with autocomplete everywhere. It does not need all the DCSA fields — those are filled in Part 2. The confirmed Part 1 form becomes a read-only summary card at the top of the Booking tab once ops confirms it.

### 15.2 Part 2 — Carrier Booking Request (Ops + DCSA API)

The operations executive uses the full 7-step booking wizard to send the booking to the selected carrier via the DCSA API. This is fully specified in the companion **Booking Request PRD (v1.0, May 2026)**.

**Entry Point:** The task 'Place Carrier Booking Request' has a direct CTA button: 'Place Booking →' that opens the 7-step wizard pre-populated from the Part 1 intake data.

**Post-Submission Display:**
- Booking tab shows a status card with the DCSA status (RECEIVED → CONFIRMED, etc.)
- Cut-off dates returned by the carrier are extracted and shown in the Overview tab's Cut-Off Dates panel
- Carrier feedback (`feedbacks[]`) is shown in the Overview tab's Carrier Feedback section
- Amendment and cancellation actions are accessible from the Booking tab status card

> 🎨 **UI Design Note — Booking Tab Layout**
>
> - **Part 1 (completed):** collapsed read-only summary card with an 'Edit' link (if not yet confirmed by ops).
> - **Part 2 (pending):** prominent 'Place Carrier Booking →' CTA if not yet submitted.
> - **Part 2 (submitted):** DCSA status card showing current status, timestamps, carrier booking ref, and action buttons (Amend / Cancel).
> - If Part 1 is not yet confirmed, Part 2 section is locked with a message: _'Complete and confirm the Internal Booking Request to proceed.'_

---

## 16. Tab 4 — Documents

### 16.1 Shipment-Level Documents

- Internal Booking Request form (PDF export)
- Carrier Booking Confirmation (received from carrier)
- Commercial Invoice (uploaded by customer/ops)
- Packing List (uploaded)
- Certificate of Origin
- Fumigation Certificate
- Export Customs Declaration / MRN
- Insurance Certificate
- DG Declaration (if applicable)

### 16.2 BL-Level Documents — Sub-File Structure

Each BL is displayed as a named sub-file. Clicking a BL header expands it to show all documents specific to that BL.

| BL Sub-File | Description |
|---|---|
| BL Draft | Draft sent by carrier for review. Downloadable. Status: Pending Review / Approved / Rejected. |
| Original BL / Telex Release | Final BL issued by carrier. |
| Verify Copy | Carrier-issued verify copy (where applicable). |
| Shipping Instructions (SI) | The submitted SI document or confirmation. |
| VGM Certificate | VGM submission confirmation. |
| Arrival Notice | Notice from carrier upon arrival at POD. |
| Delivery Order | Release order for cargo collection. |

> 🎨 **UI Design Note — Documents Tab**
>
> BL sub-files should appear as labelled accordion sections, each with the BL number as the header (e.g. 'BL: MSCUUK123456'). A file-folder visual metaphor — slightly indented, with a folder icon.
>
> Each document row: icon (PDF/Word/Image), document name, uploaded by, upload date, status badge (where applicable), and a Download button.
>
> An 'Upload Document' button at the top right opens a modal: select BL (or shipment-level), document type, file picker.
>
> Documents sent by the carrier (booking confirmation, BL draft, arrival notice) are auto-tagged as 'From Carrier' with the carrier logo.

---

## 17. Tab 5 — Containers

| Column / Field | Description |
|---|---|
| Container No. | Carrier-assigned container number (e.g. MRKU8796881). Shown once assigned. |
| ISO Type | Container type code + plain label (e.g. 22GP — 20ft General Purpose). |
| Cargo Weight | Gross cargo weight in kg. |
| VGM | Verified Gross Mass in kg. Status: Not Submitted / Submitted / Confirmed. |
| Latest Event | Most recent terminal event (e.g. Gate In at GDANSK BALTIC HUB, 21 Apr 07:46). |
| Status | Operational status: Empty / Laden / Gated In / Loaded / Discharged / Delivered. |
| Actions | Amend VGM, Track container. |

### 17.1 Expanded Container Detail

- **Seals:** Shipper seal, Carrier seal numbers.
- **Haulage:** Collection point, haulage provider, collection date/time.
- **Tare Weight** (if SOC — Shipper Owned Container).
- Container tracking events timeline (mini version, linked to full tracking module).

---

## 18. Tab 6 — Parties

All parties displayed as labelled cards in a grid layout. Editable until the BL is issued.

| Party Role | Description |
|---|---|
| Booked By / Booking Agent | INBRIT entity that placed the booking. Pre-filled from entity profile. |
| Shipper | Exporter / cargo owner. Name + full address. |
| Consignee | Importer / cargo receiver. |
| Notify Party 1 (N1) | First notify party on the BL. |
| Notify Party 2 (N2) | Second notify party (if applicable). |
| Transport Document Receiver | Who receives the BL (if different from booking agent). |
| Service Contract Owner | Party owning the service contract (if different from booking agent). |
| Freight Forwarder at Origin (DDR) | Origin-side forwarder. |
| Freight Forwarder at Destination (DDS) | Destination-side forwarder. |
| Invoice Payer — Origin (COW) | Party paying origin charges. |
| Invoice Payer — Destination (COX) | Party paying destination charges. |
| Customs Agent | Export or import customs broker (INBRIT-specific, not DCSA). |
| Other Parties | Any additional parties added with a role code (NAC, NI, etc.). |

---

## 19. Tab 7 — Communications

### 19.1 Communication Types

- **Email thread:** forward or paste an email thread, linked to this shipment with a subject, sender, recipient, date.
- **File/screenshot:** upload a WhatsApp screenshot, Slack export, or any communication file.
- **Note:** free-text note visible to all team members. Optionally linked to a specific task.
- **Customer message:** a structured inbound customer communication with a 'Reply Required' flag.

### 19.2 Display

- Chronological thread view — newest at top.
- Each entry: avatar/icon of type, sender name/role, timestamp, subject or first line of content, expand to full.
- Filter by type (Email / File / Note / Customer Message).
- '+ Add Communication' button opens a modal with type selector and upload/paste fields.

> 🎨 **UI Design Note — Communications**
>
> This tab should feel like a lightweight CRM thread view — not a full email client, but clean and readable.
>
> Customer messages with 'Reply Required' should show an amber flag and appear at the top.
>
> In v1, this is manual — users paste or upload communications. In v2, email integration may auto-populate this. Design the component to support both without a rebuild.

---

## 20. Tab 8 — Charges

Read-only display of freight charges and surcharges. Sourced from carrier confirmation data and manually entered cost records.

### 20.1 Charge Display

- Grouped by section: Origin Charges, Ocean Freight, Destination Charges.
- Each charge: name, terms (Prepaid / Collect), payer, currency, amount.
- Contract ID and price calculation date shown at top.
- 'No invoices' notice if invoices not yet issued (with link to Finance module).
- BL-level charges shown per BL sub-section if multiple BLs exist.

---

## 21. Tab 9 — Event Log

An immutable, chronological audit trail of every action taken on this shipment. Cannot be edited or deleted.

| Timestamp | Event Type | Actor | Detail |
|---|---|---|---|
| 2026-04-22 09:07 | Shipment Created | Hadley (Sales) | Internal booking request submitted. Ref: BASE-020607. |
| 2026-04-22 09:15 | Assigned | Krzysztof (Mgr) | Shipment assigned to Ops Exec: Sahil Kala. |
| 2026-04-23 10:32 | Carrier Booking Submitted | Sahil (Ops) | MSC booking sent via DCSA API. Ref: INB20260423A. |
| 2026-04-23 10:33 | DCSA — RECEIVED | MSC (API) | carrierBookingRequestRef: MSCUUK-REQ-004821. |
| 2026-04-24 13:44 | DCSA — CONFIRMED | MSC (API) | Booking confirmed. carrierBookingRef: MSCUUK987654. |
| 2026-04-24 13:44 | Cut-offs Updated | System | CY: 14-May 06:00. SI: 12-May 15:00. VGM: 13-May 15:00. |
| 2026-04-24 14:09 | Document Added | Carrier — MSC | Booking Confirmation uploaded automatically. |
| 2026-05-01 11:00 | Task Completed | Sahil (Ops) | SI submitted to carrier. Document uploaded. |
| 2026-05-02 08:30 | Task Completed | Sahil (Ops) | VGM submitted for 3 containers. |

### 21.1 Filter & Export

- Filter by: date range, event type, actor.
- 'Export Log' button: generates PDF or CSV of filtered events.
- Default view: last 3 months (dropdown to change period).

---

## 22. Multi-BL Handling

| Rule | Detail |
|---|---|
| BL as a labelled sub-file | In every tab where BL-specific data exists (Documents, Containers, Parties, Charges), content is grouped under the BL number as an accordion header. |
| Shipment header reflects totals | Container count, status, and next event in the header bar reflect the aggregate across all BLs. |
| Individual BL status badges | Each BL in the Documents tab shows its own booking status and document status independently. |
| BL-level task assignment | Certain tasks (e.g. BL Draft Review, Original BL Release) are assigned per BL, not per shipment. |
| Adding a BL | '+ Add BL' button in the Documents tab (and Booking tab) allows ops to link an additional carrier booking reference to the same shipment. |
| Extractable BL file | Future: a 'Download BL Package' button exports all documents and data for a single BL as a structured PDF. |

---

## 23. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | List page must load within 2s for up to 500 shipments. Shipment detail page within 1.5s. |
| Real-time Updates | Task urgency tiers recalculate on page load. DCSA status updates reflect within 60s of notification receipt. |
| Accessibility | WCAG 2.1 AA. All tables keyboard-navigable. Colour urgency indicators must have a non-colour secondary indicator (icon or text). |
| Data Retention | Shipment records and event logs retained for minimum 7 years. |
| Security | Role-based access: Sales Executive (create Part 1 + view), Ops Executive (full access to assigned shipments), Manager (full access across all). |
| Column Persistence | User's column selection and filter saved per browser session and optionally persisted to user profile. |
| Mobile | List page and task tab must be usable on tablet. Full booking form is desktop-first. |
| Audit Immutability | Event log entries cannot be modified or deleted. Any correction creates a new entry referencing the original. |
| Export | Any table view can be exported to CSV or Excel. Event log can be exported to PDF. |

---

## 24. Open Questions

| # | Question | Owner |
|---|---|---|
| 1 | Shipment number format: ONH-YYYY-NNNNN is proposed. Should this be auto-generated sequentially, or does INBRIT have an existing numbering convention? | Product + IT |
| 2 | Multi-BL: Is 'Add BL' always manual, or should the system attempt to auto-link when a second carrier booking confirmation arrives with the same internal reference? | Engineering |
| 3 | Task auto-assignment: When a task is triggered automatically (e.g. SI Cutoff approaching), should it be assigned to the shipment's ops executive by default, or left unassigned? | Product + Ops |
| 4 | Duplicate Shipment: When duplicating, which fields should carry over (all Part 1 fields? Parties? Contract ref?) and which should reset (dates, container numbers, BL)? | Product |
| 5 | Communications tab — email integration: Is an email connector (Gmail/Outlook) in scope for v2, or will it always be manual upload/paste? | Product Roadmap |
| 6 | Charges tab: Should ops be able to enter manual cost estimates (e.g. trucking quote) in v1, or is it purely carrier-sourced data display? | Product + Finance |
| 7 | Customer portal data model: Which fields are customer-visible vs. internal-only? This affects how we tag fields in the data model now. | Product + Commercial |
| 8 | Manager view vs Exec view: Should the Shipments list show 'All shipments' by default for managers and 'My shipments' for execs, with a toggle to switch? Or always 'All' with a filter? | Product + Ops |
| 9 | VGM submission: Is VGM submitted directly through INBRIT's platform (API integration) or is it a manual task with a document upload as proof? | Engineering + Ops |

---

## 25. Design Handoff Checklist for Claude Design Project

### Screens Required — Shipment List

- [ ] Shipment list — table view (default). Populated state with 15+ rows.
- [ ] Shipment list — Needs Attention tray expanded (2 overdue, 1 due today).
- [ ] Shipment list — Needs Attention tray collapsed.
- [ ] Shipment list — card view toggle active.
- [ ] Shipment list — filter panel open.
- [ ] Shipment list — column picker open.
- [ ] Shipment list — empty state (no shipments match filter).

### Screens Required — Shipment Detail

- [ ] Shipment detail — Overview tab. Stage: Pre-Shipment. Cutoff dates visible.
- [ ] Shipment detail — Overview tab. Carrier feedback panel visible (PENDING_UPDATE state).
- [ ] Shipment detail — Tasks tab. Mix of overdue, due today, upcoming tasks.
- [ ] Shipment detail — Booking tab. Part 1 confirmed + Part 2 'Place Booking' CTA.
- [ ] Shipment detail — Booking tab. Part 2 submitted. DCSA status card showing CONFIRMED.
- [ ] Shipment detail — Documents tab. Two BL sub-files expanded.
- [ ] Shipment detail — Containers tab. Three containers, one expanded.
- [ ] Shipment detail — Parties tab. All party cards populated.
- [ ] Shipment detail — Communications tab. Mixed email thread + note + customer message.
- [ ] Shipment detail — Event Log tab. Chronological entries visible.

### Components Required

- [ ] Milestone timeline stepper (10 nodes, multiple state variants)
- [ ] Task row (overdue / due today / upcoming / completed variants)
- [ ] Needs Attention tray card (with urgency tier)
- [ ] BL sub-file accordion component
- [ ] Urgency badge (red dot, amber dot, yellow dot)
- [ ] Status badge library (lifecycle stage + DCSA booking status)
- [ ] Shipment header bar (all state variants)
- [ ] Column picker panel
- [ ] Card view card (routing, urgency state variants)
- [ ] Cut-off dates panel (normal, amber, red states)
- [ ] Carrier feedback panel

### Key Design Principles to Honour

1. **Urgency must be visible without being noisy.** One badge per row. No full-row colour fills in the table.
2. **The file folder metaphor must be tangible** — BL sub-files in Documents and Containers should feel like you could physically 'pull' them.
3. **Part 1 / Part 2 booking flow must feel sequential and unambiguous** — no user should accidentally submit to the carrier before confirming the internal request.
4. **The milestone timeline is the north star of the shipment detail** — always visible, always oriented.
5. **Table view is for power users (information-dense). Card view is for a quick visual scan.** Both must be equally complete — no information hidden in one vs. the other.

---

_INBRIT Freight Management Platform · Shipment Management Module PRD · v1.0 · May 2026_

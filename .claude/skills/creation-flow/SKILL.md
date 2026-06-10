# Creation Flow Skill

Use this skill whenever the user asks to build a multi-step creation/onboarding form using the accordion (Collapse) pattern — like the Trade Party creation flow in `app/trade-party/page.tsx`.

When invoked, gather from the user:
- How many steps, and the label + subLabel for each
- What fields each step contains (name, type, required or optional)
- Whether any step has a duplicate-check gate (like email or tax number uniqueness)
- Whether any step has conditional sections (e.g. a checkbox that reveals a file upload)
- Any special validation rules

Then implement the full flow end-to-end following every rule in this document.

---

## High-level Architecture

The flow lives inside a **Drawer** (width 720px). Inside the drawer body is a **Collapse** with `type="numbered"`. Each accordion panel is one step. The drawer footer has the final submit CTA, enabled only when **all steps are saved**.

```
Drawer (width=720)
  └── Collapse type="numbered"
        ├── Step 1 — always unlocked first
        ├── Step 2 — unlocked after step 1 saved
        ├── Step N — unlocked after step N-1 saved
  └── Footer: Cancel | Submit CTA (disabled until all saved)
```

---

## Imports and Cast Pattern

Always import from `@/components/<Name>` and cast with `as React.ComponentType<any>` to work around outdated `.d.ts` files. Never import from `antd` directly in pages.

```tsx
'use client';
import { useState, useMemo, useCallback } from 'react';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import Input from '@/components/Input';
import SelectComponent from '@/components/Select';
import ButtonComponent from '@/components/Button';
import CheckboxComponent from '@/components/Checkbox';
import FileUploadComponent from '@/components/FileUpload';
import { Building, EditPencil, Success, InfoCircle } from '@/icons';

const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
const Checkbox = CheckboxComponent as React.ComponentType<any>;
const FileUpload = FileUploadComponent as React.ComponentType<any>;
```

Only import `CheckboxComponent` / `FileUploadComponent` if the flow actually uses them.

---

## State Architecture

### Per-step saved state
Every step N gets one boolean: `stepNSaved`. Never track "edit mode" separately — `stepNSaved === false` **is** edit mode.

```ts
const [step1Saved, setStep1Saved] = useState(false);
const [step2Saved, setStep2Saved] = useState(false);
// ... one per step
```

### Cascade rule
When Edit is clicked on step N, **invalidate all downstream steps** (N+1 through last). This reflects that earlier data may change and later steps may depend on it.

```ts
// Example: step 1 edit invalidates 2, 3, 4
const onStep1Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // prevent accordion toggle from firing
    setStep1Saved(false);
    setStep2Saved(false);
    setStep3Saved(false);
    setStep4Saved(false);
    setActiveKeys(['1']);
}, []);
```

### Active keys (single-open accordion)
Only one accordion panel is open at a time.

```ts
const [activeKeys, setActiveKeys] = useState<string[]>(['1']);
```

The `onChange` handler enforces single-open:
```tsx
onChange={(keys: string | string[]) => {
    const next = Array.isArray(keys) ? keys : keys ? [keys] : [];
    // if multiple keys come in, keep only the last one (the newly opened one)
    setActiveKeys(next.length > 1 ? [next[next.length - 1]] : next);
}}
```

All `onStepNEdit` callbacks use `setActiveKeys(['N'])` — replace, never append.

---

## Collapse Component Props

```tsx
<Collapse
    type="numbered"          // renders numbered circles; green tick when completed
    items={collapseItems}
    activeKey={activeKeys}   // controlled
    onChange={...}           // single-open handler above
/>
```

Each item in `collapseItems`:

| Prop | Type | Purpose |
|------|------|---------|
| `key` | `'1'`…`'N'` | string index |
| `label` | string | Step title — Body 2 / Medium (14px, weight 500) when pending; Body 2 / SemiBold (14px, weight 600) + `success-100` green when completed |
| `subLabel` | string | 12px / Regular / `grey-50`. Describes the step; max 1–2 short sentences |
| `completed` | boolean | `stepNSaved` — shows green tick circle, green label |
| `disabled` | boolean | `!step(N-1)Saved` — greyed out, non-interactive |
| `suffix` | JSX \| null | Edit button when `stepNSaved`, else `null` |
| `children` | JSX | The `stepNContent` useMemo result |

### Edit button in suffix
```tsx
suffix: stepNSaved ? (
    <Button
        variant="link"
        size="md"
        icon={<EditPencil width={14} height={14} />}
        onClick={onStepNEdit}
    >
        Edit
    </Button>
) : null,
```

- `variant="link"` — no background, primary-60 blue text
- `size="md"` — not sm, matches accordion header height
- `e.stopPropagation()` inside the callback — prevents the header click from toggling the accordion

---

## Performance: useMemo + useCallback

Each step's JSX is expensive. Wrap every step's content in `useMemo` so it only re-renders when its own fields change. Wrap all handlers in `useCallback`.

```tsx
const step1Content = useMemo(() => {
    // derive locals: canSubmit, showForm, etc.
    return ( <div>...</div> );
}, [field1, field2, ..., stepNSaved, handler1, handler2]);
```

**useMemo deps rules:**
- Include every piece of state read inside the memo
- Include every `useCallback` handler called inside the memo
- `stepNSaved` must be in deps because it gates both the `disabled` props and the CTA visibility
- State setters (`setFoo`) are stable — never include them in deps

**useCallback deps rules:**
- Reset functions with no deps: `[]`
- Handlers that read state: list those state values
- `onStepNEdit` — no deps (only calls stable setters)

```tsx
const collapseItems = useMemo(() => [
    { key: '1', ..., children: step1Content },
    { key: '2', ..., children: step2Content },
    // ...
], [step1Saved, ..., stepNSaved, step1Content, ..., stepNContent, onStep1Edit, ..., onStepNEdit]);
```

---

## View Mode vs Edit Mode

`stepNSaved === true` means the step is saved. When a user opens a saved step by clicking the header (not the Edit button), it's **view mode** — read-only, no CTAs.

### Rules enforced via `stepNSaved`:

1. **All fields disabled** — add `disabled={stepNSaved}` to every Input, Select, Checkbox, FileUpload in that step. For fields that have their own disabled logic (e.g. enterprise lock), use `disabled={existingCondition || stepNSaved}`.

2. **Inline action buttons hidden** — If a step has a Check/Edit button inside the form (like the duplicate-check row), hide both when `stepNSaved`:
```tsx
{!stepNSaved && (duplicateState === 'idle' ? (
    <Button ...>Check</Button>
) : (
    <Button ...>Edit</Button>
))}
```

3. **Reset and Save CTAs hidden** — wrap the footer in `!stepNSaved`:
```tsx
{!stepNSaved && (
    <>
        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="md" style={{ width: 120 }}>Reset</Button>
            <Button variant="primary" size="md" style={{ width: 120 }}>Save</Button>
        </div>
    </>
)}
```

---

## Duplicate-Check Gate Pattern

Use this when a step has a uniqueness check before the rest of the form is revealed (e.g. tax number, email ID).

### State type
```ts
type DuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';
```

### State machine
- `idle` — initial; show the key field(s) + Check button
- `unique` — passes; show green chip + reveal the rest of the form
- `enterprise` — matches enterprise directory; show green chip + pre-fill some fields as disabled + reveal form
- `duplicate` — blocked; show red error card; form stays hidden

### Key field row layout
```tsx
<div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ flex: 1 }}>
        <Input
            placeholder="Key Field*"
            value={keyValue}
            onChange={...}
            helperText="Add value to check duplicity"
            disabled={duplicateState !== 'idle' || stepNSaved}
        />
    </div>
    {!stepNSaved && (duplicateState === 'idle' ? (
        <Button variant="primary" size="md" disabled={!canCheck} onClick={handleCheck}>
            Check
        </Button>
    ) : (
        <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleEdit}>
            Edit
        </Button>
    ))}
</div>
```

The inline Edit button (secondary, with pencil icon) resets `duplicateState` to `'idle'` and clears the form fields — it does NOT clear `stepNSaved` (that's only the header Edit button's job).

### Status chip (unique or enterprise)
```tsx
{(duplicateState === 'unique' || duplicateState === 'enterprise') && (
    <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '4px 12px 4px 4px', borderRadius: 32,
        background: 'var(--theme-color-success-20)', alignSelf: 'flex-start'
    }}>
        <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--theme-color-success-40)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
            <Success width={10} height={10} color="var(--theme-color-success-120)" />
        </div>
        <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
            {/* Your message */}
        </span>
    </div>
)}
```

### Duplicate error card
```tsx
{duplicateState === 'duplicate' && (
    <div style={{
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-error-40)',
        borderRadius: 8, padding: 12,
        display: 'flex', gap: 12, alignItems: 'flex-start'
    }}>
        <div style={{ paddingTop: 2, flexShrink: 0 }}>
            <InfoCircle width={14} height={14} color="var(--theme-color-error-120)" />
        </div>
        <div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>
                Title
            </div>
            <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>
                Description
            </div>
        </div>
    </div>
)}
```

### Form reveal
Only show the main form fields when `duplicateState === 'unique' || 'enterprise'`:
```tsx
{showForm && (
    <>
        {/* all main form fields */}
    </>
)}
```

---

## Conditional Section Pattern (Checkbox → Reveals Upload/Fields)

```tsx
<Checkbox
    checked={isSEZ}
    onChange={(e: any) => setIsSEZ(e.target.checked)}
    disabled={stepNSaved}
>
    Label text
</Checkbox>
{isSEZ && (
    <FileUpload
        variant="default"
        placeholder="Document Name"
        description="Drag & Drop files here or, click to Browse"
        helperText="Supported file types: PDF, JPEG, JPG"
        accept=".pdf,.jpeg,.jpg"
        value={files}
        onChange={(files: any[]) => setFiles(files)}
        disabled={stepNSaved}
    />
)}
```

---

## Field Layout Patterns

### Two equal columns
```tsx
<div style={{ display: 'flex', gap: 16 }}>
    <div style={{ flex: 1 }}><Input ... /></div>
    <div style={{ flex: 1 }}><Select ... /></div>
</div>
```

### Three equal columns
```tsx
<div style={{ display: 'flex', gap: 16 }}>
    <div style={{ flex: 1 }}><Input ... /></div>
    <div style={{ flex: 1 }}><Input ... /></div>
    <div style={{ flex: 1 }}><Input ... /></div>
</div>
```

### Phone code + number (fixed width code selector)
```tsx
<div style={{ display: 'flex', gap: 8 }}>
    <div style={{ width: 90, flexShrink: 0 }}>
        <Select placeholder="Code" options={PHONE_CODE_OPTIONS} ... />
    </div>
    <div style={{ flex: 1 }}>
        <Input placeholder="Phone*" ... />
    </div>
</div>
```

### Full-width fields
Just place them directly — no wrapper div needed.

---

## Step Content Container Spacing

Every step's return value follows this structure:
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
    {/* field groups */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* fields within the group — gap 32 between logical field rows */}
    </div>

    {/* Reset + Save footer — only when !stepNSaved */}
    {!stepNSaved && (
        <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button variant="secondary" size="md" style={{ width: 120 }}>Reset</Button>
                <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave}>Save</Button>
            </div>
        </>
    )}
</div>
```

**Gap summary:**
- `gap: 20` — outer container (between field groups and footer)
- `gap: 32` — between fields/rows within a group
- `gap: 16` — between fields inside a horizontal row
- `gap: 8` — between tight pairs (phone code + number, Reset + Save buttons)

---

## Sub-section / Details Card Pattern

When a step has a conditional sub-section (e.g. relationship details), use this card style:

```tsx
<>
    <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
    <div style={{
        background: 'var(--theme-color-primary-2)',
        border: '1px solid var(--theme-color-primary-5)',
        borderRadius: 8, padding: 16,
        display: 'flex', flexDirection: 'column', gap: 24
    }}>
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
            Section Title
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* sub-section fields */}
        </div>
    </div>
</>
```

Use a dashed divider (`border-top: 1px dashed`) to separate the sub-section from main form fields. Use solid `1px solid var(--theme-color-grey-10)` for all other dividers.

---

## Typography Reference

| Element | fontSize | fontWeight | lineHeight | color token |
|---------|----------|------------|------------|-------------|
| Accordion label (pending) | 14px | 500 (medium) | 20px | `grey-100` |
| Accordion label (completed) | 14px | 600 (semibold) | 20px | `success-100` |
| Accordion subLabel | 12px | 400 (regular) | 16px | `grey-50` |
| Section overline / card title | 12px | 500 (medium) | 16px | `grey-100`, uppercase |
| Sub-section label | 12px | 400 (regular) | 16px | `grey-50` |
| Error card title | 14px | 500 (medium) | 20px | `error-120` |
| Error card body | 12px | 400 (regular) | 16px | `grey-50` |
| Status chip text | 12px | 400 (regular) | 16px | `success-120` |
| Input placeholder | 14px | 400 (regular) | 20px | `grey-40` (antd default) |
| Button text | 14px | 500 (medium) | 20px | varies by variant |

---

## Component Sizes Reference

| Component | Size prop | When to use |
|-----------|-----------|-------------|
| Button (primary/secondary/link) | `size="md"` | All buttons inside step content and footer |
| Input | default (md) | All text inputs |
| Select | default (md) | All dropdowns |
| Phone code Select | default, `style={{ width: 90 }}` | Country code prefix |
| Reset / Save buttons | `style={{ width: 120 }}` | Fixed width footer buttons |
| Edit (suffix) button | `size="md"`, `variant="link"` | Accordion header Edit |
| EditPencil icon in buttons | `width={14} height={14}` | Inside Edit buttons |
| Success icon in chip | `width={10} height={10}` | Inside status chips |
| InfoCircle icon in error card | `width={14} height={14}` | Error card left icon |

---

## Reset Behavior

**Step Reset button** — clears only that step's fields; sets `stepNSaved(false)`. If the step is step 1, also cascade-clear all later steps and their fields.

**Full close/cancel** — resets everything: all step saved states, all field states, all duplicate states, `activeKeys` back to `['1']`.

```ts
const handleClose = useCallback(() => {
    setDrawerOpen(false);
    // reset every field and saved state
    resetStep1Fields();
    resetStep2Fields();
    // ...
    setStep1Saved(false); setStep2Saved(false); // ...
    setActiveKeys(['1']);
}, [/* all reset callbacks */]);
```

---

## Save Behavior

On Save: set `stepNSaved(true)`, then advance accordion to next step:
```ts
onClick={() => {
    setStepNSaved(true);
    setActiveKeys([String(N + 1)]); // open next step
}}
```

On the **last step**, close the accordion entirely:
```ts
onClick={() => {
    setLastStepSaved(true);
    setActiveKeys([]); // collapse all
}}
```

---

## Drawer Setup

```tsx
<Drawer
    open={drawerOpen}
    onClose={handleClose}
    width={720}
    title="Create [Entity]"
    subtitle="Add details to create a new [entity]"
    icon={Building}         // or relevant icon from @/icons
    footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button
                variant="primary"
                disabled={!(step1Saved && step2Saved /* && ... all steps */)}
            >
                Submit CTA Label
            </Button>
        </div>
    }
>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Collapse ... />
    </div>
</Drawer>
```

- `width={720}` — standard creation drawer width
- `maskClosable={false}` — default in the Drawer component; user must use Cancel
- The submit CTA is disabled until all steps are saved

---

## Full collapseItems Shape

```tsx
const collapseItems = useMemo(() => [
    {
        key: '1',
        label: 'Step One Title',
        subLabel: 'Short description of what this step collects.',
        completed: step1Saved,
        suffix: step1Saved ? (
            <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep1Edit}>
                Edit
            </Button>
        ) : null,
        children: step1Content,
    },
    {
        key: '2',
        label: 'Step Two Title',
        subLabel: 'Short description.',
        disabled: !step1Saved,
        completed: step2Saved,
        suffix: step2Saved ? (
            <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep2Edit}>
                Edit
            </Button>
        ) : null,
        children: step2Content,
    },
    // repeat pattern for remaining steps
], [step1Saved, step2Saved, /* ... */ step1Content, step2Content, /* ... */ onStep1Edit, onStep2Edit /* ... */]);
```

---

## Checklist Before Marking Done

Before handing back to the user, verify:

- [ ] Every step has `stepNSaved` state and `onStepNEdit` callback
- [ ] `onStepNEdit` sets `stepNSaved = false` **and all downstream** `step(N+1...last)Saved = false`
- [ ] `onStepNEdit` uses `setActiveKeys(['N'])` (replace, not append)
- [ ] Collapse `onChange` enforces single-open (last key wins)
- [ ] Every field in every step has `disabled={stepNSaved}` (or `... || stepNSaved`)
- [ ] Inline Check/Edit buttons are hidden when `stepNSaved`
- [ ] Reset/Save footer wrapped in `{!stepNSaved && ...}`
- [ ] Save button advances to next step via `setActiveKeys(['N+1'])`
- [ ] Last step Save uses `setActiveKeys([])`
- [ ] Submit CTA disabled until all steps saved
- [ ] `handleClose` resets every field and every saved state
- [ ] Every step's content is in a `useMemo` with correct deps (including `stepNSaved`)
- [ ] All handlers in `useCallback`
- [ ] All components cast with `as React.ComponentType<any>`
- [ ] Color values use `var(--theme-color-*)` CSS variables, never hex
- [ ] No Tailwind color/typography classes; layout utilities (`flex`, `gap`) are fine
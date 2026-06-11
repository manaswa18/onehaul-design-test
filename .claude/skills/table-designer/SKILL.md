# Table Designer Skill

Use this skill whenever the user asks to build a data table using the OneHaul design system — listing pages, read-only grids, anything powered by the `Table` component in `components/Table`.

When invoked, first ask the user:

> **"Do you want the full listing page (NavBar + white card shell + page header + toolbar + table), or just the table component?"**

Then gather:

**Always required:**
- Column list: for each column — header label, data field key, formatter type (see library below), preferred width
- Checkbox column needed? (yes = multi-row selection; no = omit)
- Right column type: `actions` (3-dot overflow menu), `chevron` (read-only, navigate on click), or `none`
- Row click navigation? (yes/no — if yes, which route)
- Any columns with special formatting not covered by the standard library?

**Only if full page requested:**
- Page title and subtitle
- CTA buttons in the page header (labels + variants, e.g. "Add Driver" primary, "Export CSV" secondary)
- Search placeholder text
- Route path for the new page (e.g. `/driver-management`)

If any of the above is unclear, ask before writing code.

---

## Table Component API

```tsx
import TableComponent from '@/components/Table';
const Table = TableComponent as React.ComponentType<any>;

<Table
  data={rowArray}
  columns={COLUMNS}
  onRowClick={handleRowClick}   // omit if read-only with no navigation
  options={{}}
/>
```

`Table` wraps Tabulator v6.4. It renders inside `.onehaul-table-wrapper` which provides the border, border-radius, and scroll container. Formatters must return **HTML strings**, not JSX.

---

## Header Cell Typography

Tabulator header cells are styled globally in `components/Table/Table.css`:

| Property | Value |
|----------|-------|
| Font size | 12px |
| Font weight | 600 (semibold) |
| Color | `var(--theme-color-grey-60)` |
| Text transform | UPPERCASE (apply in `title` string: `'COLUMN NAME'`) |
| Height | 40px |
| Padding | 8px 20px |
| Background | `var(--theme-color-grey-5)` |
| Right border | 1px solid `var(--theme-color-grey-20)` |

Always write column titles in UPPERCASE in the `title` field — the CSS does not auto-uppercase.

---

## Body Cell Typography

| Property | Value |
|----------|-------|
| Font size | 14px |
| Font weight | 400 (regular) |
| Color | `var(--theme-color-grey-100)` |
| Min height | 52px |
| Padding | 8px 20px |
| Right border | 1px solid `var(--theme-color-grey-20)` |

---

## Standard Formatter Library

Formatter functions live outside the component (not inside `useEffect` or component body). They return HTML strings only.

### 1. Plain text
```ts
function plainTextFormatter(cell: any) {
  return `<span class="oh-cell-text">${cell.getValue()}</span>`;
}
```

### 2. Link text (navigable ID / reference, primary-60 blue)
```ts
function linkTextFormatter(cell: any) {
  return `<span class="oh-cell-shipment-no">${cell.getValue()}</span>`;
}
```

### 3. Muted / pending text (italic, grey-40)
```ts
function mutedFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  return `<span class="oh-cell-muted">${val}</span>`;
}
```

### 4. Stacked two-line (primary + secondary label)
Use when a cell contains city + country code, event + date, or any two related values.
```ts
// If value is "City, CC" (comma-split):
function stackedFormatter(cell: any) {
  const val: string = cell.getValue() || '';
  const [primary, secondary] = val.split(', ');
  return `<div class="oh-cell-stack">
    <span class="primary">${primary}</span>
    <span class="secondary">${secondary || ''}</span>
  </div>`;
}

// If value is an object { line1, line2 }:
function stackedObjectFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  return `<div class="oh-cell-stack">
    <span class="primary">${val.line1}</span>
    <span class="secondary">${val.line2 || ''}</span>
  </div>`;
}
```
`.primary` → 14px / weight 400 / grey-100  
`.secondary` → 12px / grey-50

### 5. Status badge / pill
```ts
const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  // Map every possible value to a bg + color pair using theme tokens:
  ACTIVE:    { bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)' },
  INACTIVE:  { bg: 'var(--theme-color-grey-10)',    color: 'var(--theme-color-grey-60)' },
  PENDING:   { bg: 'var(--theme-color-yellow-20)',  color: 'var(--theme-color-yellow-120)' },
  ERROR:     { bg: 'var(--theme-color-error-20)',   color: 'var(--theme-color-error-100)' },
  // Add more as needed
};

function badgeFormatter(cell: any) {
  const val: string = cell.getValue();
  const s = STATUS_STYLES[val] || { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' };
  const label = val.replace(/_/g, ' ');
  return `<span class="oh-badge" style="background:${s.bg};color:${s.color};">${label}</span>`;
}
```
`.oh-badge` → inline-flex, padding 4px 12px, border-radius 32px, 12px / weight 400

### 6. Logo + text (carrier / brand with colored square abbreviation)
```ts
const BRAND_COLORS: Record<string, string> = {
  // Map brand name → hex or CSS var color
  'BrandName': '#0080C9',
};

function logoTextFormatter(cell: any) {
  const name: string = cell.getValue();
  const bg = BRAND_COLORS[name] || 'var(--theme-color-primary-60)';
  const abbr = name.substring(0, 3).toUpperCase();
  return `<div class="oh-carrier-cell">
    <div class="oh-carrier-logo" style="background:${bg};">${abbr}</div>
    <span>${name}</span>
  </div>`;
}
```
`.oh-carrier-logo` → 26×26px, border-radius 4px, 8px / weight 700 / white

### 7. Urgency dot + label
```ts
function urgencyFormatter(cell: any) {
  const val = cell.getValue(); // e.g. { count: 2, urgency: 'overdue' }
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  const dotColor = val.urgency === 'overdue'
    ? 'var(--theme-color-error-100)'
    : val.urgency === 'due-today'
    ? 'var(--theme-color-orange-100)'
    : 'var(--theme-color-yellow-120)';
  return `<div class="oh-tasks-cell">
    <div class="oh-urgency-dot" style="background:${dotColor};"></div>
    <span style="font-size:12px;color:var(--theme-color-grey-100);">${val.count} ${val.urgency === 'overdue' ? 'overdue' : 'due'}</span>
  </div>`;
}
```

### 8. Null/empty sentinel
For any cell that may be null/empty: render `<span style="color:var(--theme-color-grey-30);">—</span>`. Never render an empty string.

---

## Frozen Column Patterns

### Left frozen — checkbox selection column

Only include when the user needs multi-row selection.

**Import in page** (loads CSS even though not used directly in JSX):
```tsx
import CheckboxComponent from '@/components/Checkbox';
```

**Helpers** (outside component):
```ts
function checkboxHTML(checked: boolean, indeterminate = false) {
  const stateClass = checked ? ' checked' : indeterminate ? ' indeterminate' : '';
  return `<span class="oh-checkbox-cell"><span class="oh-cb${stateClass}"></span></span>`;
}

function updateHeaderCheckbox(table: any) {
  const rows = table.getRows();
  const sel = table.getSelectedRows();
  const allSelected = rows.length > 0 && sel.length === rows.length;
  const indeterminate = sel.length > 0 && sel.length < rows.length;
  const col = table.getColumns()[0];
  if (!col) return;
  const titleEl = col.getElement()?.querySelector('.tabulator-col-title');
  if (titleEl) titleEl.innerHTML = checkboxHTML(allSelected, indeterminate);
}
```

**Column definition** — must be the FIRST entry in `COLUMNS`:
```ts
{
  formatter: (cell: any) => checkboxHTML(cell.getRow().isSelected()),
  titleFormatter: (cell: any) => {
    const rows = cell.getTable().getRows();
    const sel = cell.getTable().getSelectedRows();
    return checkboxHTML(sel.length === rows.length && rows.length > 0, sel.length > 0 && sel.length < rows.length);
  },
  cellClick: (e: any, cell: any) => {
    e.stopPropagation();
    const row = cell.getRow();
    row.isSelected() ? row.deselect() : row.select();
    const cb = cell.getElement()?.querySelector('.oh-cb');
    if (cb) cb.className = `oh-cb${row.isSelected() ? ' checked' : ''}`;
    updateHeaderCheckbox(cell.getTable());
  },
  headerClick: (e: any, column: any) => {
    const table = column.getTable();
    const allSelected = table.getSelectedRows().length === table.getRows().length && table.getRows().length > 0;
    allSelected ? table.deselectRow() : table.selectRow();
    column.getCells().forEach((c: any) => {
      const cb = c.getElement()?.querySelector('.oh-cb');
      if (cb) cb.className = `oh-cb${c.getRow().isSelected() ? ' checked' : ''}`;
    });
    updateHeaderCheckbox(table);
  },
  cssClass: 'oh-col-checkbox',
  hozAlign: 'center',
  headerHozAlign: 'center',
  width: 48,
  minWidth: 48,
  headerSort: false,
  resizable: false,
  frozen: true,   // ← EXACTLY ONCE. Never duplicate this prop.
},
```

---

### Right frozen — actions column (3-dot overflow menu)

Use when rows have contextual actions (edit, delete, etc.).

Must be the LAST entry in `COLUMNS`:
```ts
{
  title: '',
  field: 'id',
  width: 52,
  minWidth: 52,
  headerSort: false,
  resizable: false,
  hozAlign: 'center',
  frozen: true,   // ← EXACTLY ONCE.
  cssClass: 'oh-col-actions',
  formatter: () => `<span class="oh-cell-center">
    <button type="button" class="ant-btn ant-btn-link onehaul-button onehaul-button-sm onehaul-button-link onehaul-icon-button" onclick="event.stopPropagation()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 12 12">
        <path fill="currentColor" d="M5.996 11q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881-.368.366-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881T6.004 1q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365"/>
      </svg>
    </button>
  </span>`,
},
```

---

### Right frozen — chevron column (read-only / navigation hint)

Use on read-only tables where rows navigate to a detail view. Always present on these tables.

Must be the LAST entry in `COLUMNS`:
```ts
{
  title: '',
  field: 'id',
  width: 48,
  minWidth: 48,
  headerSort: false,
  resizable: false,
  hozAlign: 'center',
  frozen: true,   // ← EXACTLY ONCE.
  cssClass: 'oh-col-actions',
  formatter: () => `<span class="oh-cell-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
      <path stroke="var(--theme-color-grey-40)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/>
    </svg>
  </span>`,
},
```

---

## Scroll Shadow — useEffect Listener

Both frozen columns show/hide a directional shadow as the user scrolls horizontally. The CSS rules are already in `components/Table/Table.css`. You only need to add this `useEffect` to the page component.

**CRITICAL — linter strips this repeatedly.** Always verify these two things survive a save:
1. `useEffect` is in the React import: `import React, { useState, useEffect } from 'react'`
2. The `useEffect(...)` call exists in the component body

```tsx
useEffect(() => {
  let holder: HTMLElement | null = null;
  const onScroll = () => {
    const wrapper = document.querySelector('.onehaul-table-wrapper') as HTMLElement | null;
    if (wrapper && holder) wrapper.classList.toggle('is-scrolled-x', holder.scrollLeft > 0);
  };
  const timer = setTimeout(() => {
    holder = document.querySelector('.tabulator-tableholder');
    holder?.addEventListener('scroll', onScroll, { passive: true });
  }, 300);
  return () => {
    clearTimeout(timer);
    holder?.removeEventListener('scroll', onScroll);
  };
}, []);
```

If there are **multiple tables on the same page**, scope the selectors with a unique wrapper class passed to the `className` prop on `<Table>`.

---

## Full Column Definition Skeleton

```ts
const COLUMNS = [
  // 1. Checkbox (include only if multi-select needed)
  { /* checkbox column — see above */ },

  // 2–N. Data columns
  { title: 'COLUMN NAME', field: 'fieldKey', width: 200, minWidth: 160, headerSort: false, formatter: myFormatter },

  // Last. Actions or chevron (omit if neither needed)
  { /* actions or chevron column — see above */ },
];
```

All data columns use `headerSort: false` unless sorting is explicitly requested.

---

## Column Width Guidelines

| Content type | Typical width | Min width |
|---|---|---|
| Short ID / code | 140–180 | 120 |
| Name / title | 200–240 | 160 |
| Status badge | 160–200 | 140 |
| Date | 120–140 | 100 |
| Stacked two-line | 180–240 | 160 |
| Long text (description) | 220–280 | 180 |
| Logo + name | 160–200 | 140 |
| Checkbox column | 48 (fixed) | 48 |
| Actions / chevron column | 48–52 (fixed) | 48–52 |

---

## Imports Checklist

```tsx
'use client';
import React, { useState, useEffect } from 'react'; // useEffect required for scroll listener
import TableComponent from '@/components/Table';
import CheckboxComponent from '@/components/Checkbox'; // only if checkbox column needed
// ... other imports

const Table = TableComponent as React.ComponentType<any>;
```

---

## Linter Gotchas

- **Never put `frozen: true` twice** in the same column object. TypeScript catches this at build time as a duplicate object key error.
- **`useEffect` import gets stripped** by the linter if it doesn't see it used statically. Always verify after auto-format.
- **`frozen: true` gets stripped** by the linter (treated as unknown Tabulator prop). Re-add it after auto-format.
- **`cell.reformat()` does not exist** in tabulator-tables@6.4. To update a cell's visual after interaction, mutate the DOM directly: `cell.getElement()?.querySelector('.oh-cb')`.
- **Never use Tabulator's built-in `formatter: 'rowSelection'`** — it renders unstyled native HTML that bypasses the design system. Always use the `checkboxHTML` pattern.
- **Formatter functions must be defined outside the React component** — placing them inside causes Tabulator to re-initialize on every render.

---

## CSS Variables Color Reference

Badge / status colors to reference when building `STATUS_STYLES`:

| Semantic | bg token | color token |
|---|---|---|
| Success / confirmed | `success-20` | `success-120` |
| Success strong | `success-40` | `success-120` |
| Warning / pending | `yellow-20` | `yellow-120` |
| In-progress / active | `primary-10` | `primary-60` |
| Alert / attention | `orange-20` | `orange-120` |
| Error / overdue | `error-20` | `error-100` |
| Neutral / inactive | `grey-10` | `grey-60` |
| Purple | `purple-20` | `purple-100` |
| Teal | `teal-20` | `teal-100` |

---

## Full Page Shell (when full page is requested)

Every listing page follows the same outer shell. Build it exactly as shown — don't deviate unless the user asks.

### Files to create
- `app/<route>/page.tsx`
- `app/<route>/<route>.css`

### Additional imports (full page only)
```tsx
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import { DocIcon, HelpIcon, NotificationIcon, FilterIcon } from '@/icons';
```

### NavBar component

Copy this verbatim — it is the same across all pages:

```tsx
function NavBar() {
  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 16px', zIndex: 10,
      }}
    >
      {/* Left: logo + company */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ width: 36, height: 36, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill="white"/>
            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="#EEEEEE"/>
            <path d="M14.5475 7.77799C15.6816 8.63951 16.3873 9.76104 16.6168 11.1717C16.8623 13.9193 14.7192 16.9331 13.1403 19.0351C13.113 19.0624 13.0857 19.0897 13.0575 19.1178C13.0494 19.2556 13.0468 19.3937 13.0472 19.5317C13.047 19.6068 13.0468 19.6819 13.0465 19.7593C13.0367 19.9431 13.0367 19.9431 13.1403 20.0283C13.3522 20.0385 13.5621 20.0437 13.7741 20.0458C13.9062 20.0481 14.0383 20.0505 14.1705 20.0529C14.3788 20.0563 14.5871 20.0594 14.7954 20.0616C15.8314 20.0735 16.7372 20.0884 17.5273 20.8561C18.0293 21.4943 18.1302 22.103 18.1294 22.8969C18.131 23.0703 18.1328 23.2438 18.1345 23.4172C18.1364 23.6891 18.1378 23.961 18.1383 24.2329C18.139 24.4963 18.1418 24.7597 18.1449 25.0232C18.1443 25.1446 18.1443 25.1446 18.1436 25.2685C18.1506 25.7556 18.2009 26.0284 18.5206 26.4018C18.8978 26.7333 19.2505 26.7477 19.7347 26.7526C19.8283 26.7537 19.8283 26.7537 19.9238 26.7547C20.0559 26.7558 20.188 26.7567 20.3201 26.7574C20.4544 26.7583 20.5887 26.76 20.723 26.7625C21.7475 26.8056 21.7475 26.8056 22.6593 26.4018C23.1187 25.7605 23.0247 24.8573 22.9575 24.1034C22.8373 23.4592 22.409 23.0133 21.9888 22.5344C21.7072 22.197 21.4717 21.8288 21.2314 21.4613C21.1828 21.3878 21.1342 21.3142 21.0841 21.2384C19.941 19.503 18.889 17.7561 19.3254 15.5932C19.402 15.3516 19.4901 15.1263 19.5967 14.8964C19.6257 14.8316 19.6547 14.7667 19.6846 14.6999C19.9513 14.1665 20.3404 13.7468 20.7555 13.3238C20.8004 13.2768 20.8453 13.2299 20.8916 13.1815C21.8906 12.2306 23.1814 12.026 24.4997 12.0511C25.7786 12.1094 26.7379 12.7898 27.6043 13.6875C28.5751 14.8077 28.7799 16.0348 28.7017 17.4624C28.4984 19.0751 27.3133 20.5954 26.4255 21.9011C26.3802 21.9687 26.335 22.0363 26.2884 22.1059C26.0867 22.4038 25.8887 22.6858 25.6378 22.9441C24.9505 23.6824 25.0805 24.2817 24.9645 24.5087C24.9816 25.5984 24.5368 27.1314 23.7992 27.9315C23.0454 28.6542 22.2728 28.978 21.2722 28.9875C21.2039 28.9882 21.1356 28.9888 21.0653 28.9895C20.9213 28.9907 20.7773 28.9916 20.6333 28.9922C20.488 28.9932 20.3427 28.9949 20.1975 28.9973C18.8852 29.0194 17.7939 28.9095 16.7824 27.9745C16.1279 27.2301 15.9054 26.3304 15.9042 25.361C15.9028 25.2741 15.9014 25.1872 15.9 25.0977C15.896 24.8237 15.8943 24.5497 15.8925 24.2756C15.8902 24.089 15.8877 23.9018 15.8851 23.7145C15.879 23.2585 15.8747 22.8026 15.8718 22.3467C15.7934 22.3451 15.715 22.3435 15.6342 22.3418C15.3396 22.3353 15.0449 22.3281 14.7503 22.3205C14.6235 22.3174 14.4966 22.3145 14.3698 22.3119C12.3133 22.2689 12.3133 22.2689 11.663 21.6131C11.2272 21.1379 11.0477 20.5581 11.0217 19.9161C10.9829 19.1425 10.8415 18.9233 10.3234 18.3342C9.06287 16.3746 7.23647 13.5982 7.3317 11.0412C7.36322 10.606 7.48936 10.2385 7.67727 9.8481C7.71557 9.767 7.75388 9.686 7.79334 9.6024C8.40433 8.4432 9.34183 7.6432 10.5711 7.1923C11.9396 6.7924 13.3476 7.0336 14.5475 7.77799Z" fill="#187C8A"/>
            <path d="M25.0641 15.0339C25.5194 15.3466 25.8109 15.7753 25.9691 16.3026C26.0427 16.9843 25.9444 17.5193 25.5811 18.0978C25.109 18.5698 24.6261 18.7936 23.9619 18.8117C23.3418 18.8034 22.9573 18.5969 22.5082 18.1805C22.0187 17.6497 21.9476 17.1902 21.9679 16.4808C22.0362 15.8474 22.3428 15.5021 22.8157 15.0979C23.4668 14.6493 24.3744 14.6745 25.0641 15.0339Z" fill="#FCFDFD"/>
            <path d="M14.5459 7.77799C15.68 8.63951 16.3857 9.76104 16.6152 11.1717C16.8462 13.7573 14.9349 16.5133 13.5112 18.5436C13.4773 18.5925 13.4434 18.6413 13.4085 18.6916C13.2423 18.9228 13.174 19.0123 12.9944 19.22C12.9307 19.2872 12.936 19.2833 12.8944 19.32C12.5933 19.5097 12.3448 19.5723 11.994 19.5708C11.8933 19.5712 11.8536 19.5657 11.7498 19.5661C11.4917 19.5454 11.2784 19.4308 11.0694 19.2834C10.8939 19.1345 10.8393 19.1005 10.6623 18.7893C10.5635 18.6196 10.4866 18.5405 10.4866 18.5405C10.4729 18.5263 10.3975 18.4478 10.3678 18.4137C10.2459 18.2681 10.2924 18.3252 10.1684 18.1631C10.1092 18.0686 9.9476 17.8494 9.88714 17.753C9.84577 17.6844 9.57675 17.2668 9.53413 17.1962C9.49062 17.1255 9.19378 16.7114 9.14895 16.6386C6.89134 13.8252 7.25198 10.8142 7.39952 10.5496C7.47394 10.3024 7.56373 10.0798 7.67564 9.8473C7.71395 9.76621 7.75226 9.68512 7.79172 9.60157C8.40271 8.44235 9.3402 7.64231 10.5695 7.19147C11.9379 6.79157 13.346 7.03275 14.5459 7.77799Z" fill="#2ABB96"/>
            <path d="M12.9683 9.82628C13.5259 10.1646 13.8789 10.528 14.0499 11.1717C14.1386 11.7969 14.048 12.367 13.7188 12.9099C13.2984 13.4037 12.8189 13.6808 12.1794 13.7664C11.5205 13.8025 11.0064 13.6215 10.5029 13.1934C10.0725 12.7387 9.90469 12.2033 9.875 11.5855C9.89872 10.9736 10.109 10.5217 10.5579 10.106C11.2926 9.52383 12.1219 9.3917 12.9683 9.82628Z" fill="#FDFEFE"/>
          </svg>
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 8, flexShrink: 0 }}>
            <rect width="32" height="32" rx="8" fill="#102B46"/>
            <path d="M13.8649 7H20.6757L21.8108 7.19495L22.6216 7.45487L23.2703 7.77978L23.8108 8.16967L24.3514 8.75451L24.7297 9.46931L24.9459 10.2491L25 10.574V11.7437L24.7838 12.9134L24.4595 14.083L24.0811 14.9278H23.8649L23.5946 14.6679L23 14.343L22.4595 14.213H21.3784L20.5135 14.4079L19.6486 14.7978L18.8919 15.2527L18.027 15.9675L16.8378 16.9422L15.973 17.657L14.9459 18.5018L13.4324 19.7365L12.5676 20.4513L10.6757 22.0108L10.027 22.5307L9.16216 23.2455L7.27027 24.8051L7 25L7.05405 24.6751L8.08108 22.0108L8.72973 20.3213L9.64865 17.917L10.4054 15.9675L11.2162 13.8231L12.027 11.7437L12.6216 10.1841L13.5946 7.64982L13.8649 7ZM19.5946 9.1444L20.027 11.0939L20.1351 11.3538L20.4054 11.2238L21.5946 10.3791L21.4324 10.1841L20.4054 9.5343L19.7027 9.1444H19.5946Z" fill="white"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)', whiteSpace: 'nowrap' }}>
              Eagle Inbrit Group: Inbrit Logistics Limited
            </Text>
            <Text variant="caption" size="md" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase' }}>
              Logistics mode
            </Text>
          </div>
        </div>
      </div>

      {/* Right: icon buttons + avatar */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative' }}>
          {([DocIcon, HelpIcon] as React.ComponentType<any>[]).map((Icon, i) => (
            <button key={i} style={{ width: 36, height: 36, border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, background: 'var(--theme-color-pure-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
          ))}
          <div style={{ position: 'relative' }}>
            <button style={{ width: 36, height: 36, border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, background: 'var(--theme-color-pure-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <NotificationIcon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: 'var(--theme-color-primary-60)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="caption" size="md" style={{ color: 'var(--theme-color-pure-100)', fontSize: 10 }}>2</Text>
            </div>
          </div>
          <Avatar size="md" style={{ cursor: 'pointer', border: '0.5px solid var(--theme-color-grey-10)' }}>AM</Avatar>
        </div>
      </div>
    </div>
  );
}
```

### Page outer shell JSX

```tsx
return (
  <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', position: 'relative', overflow: 'hidden' }}>
    <NavBar />
    <div style={{
      position: 'absolute', top: 72, left: 12, right: 12, bottom: 12,
      background: 'var(--theme-color-pure-100)',
      borderRadius: 16,
      boxShadow: '-2px 0px 16px 0px rgba(136, 136, 136, 0.06)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Page header */}
        <div className="[page]-header">
          <div className="[page]-header-left">
            <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
              Page Title
            </Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
              Subtitle text
            </Text>
          </div>
          <div className="[page]-header-actions">
            {/* CTA buttons — secondary first, primary last */}
            <Button variant="secondary" size="md">Secondary CTA</Button>
            <Button variant="primary" size="md" icon={<Add width={14} height={14} />}>Primary CTA</Button>
          </div>
        </div>

        {/* Toolbar + Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="[page]-toolbar">
            <Text variant="body" size="sm" weight="medium"
              style={{ color: 'var(--theme-color-grey-70)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {filteredData.length} items
            </Text>
            <div className="[page]-toolbar-right">
              <Input
                floated={false}
                placeholder="Search…"
                suffix={<Search width={14} height={14} color="var(--theme-color-grey-100)" />}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                style={{ width: 280 }}
              />
              <Button variant="secondary" size="md" icon={<FilterIcon width={14} height={14} />}>Filters</Button>
            </div>
          </div>

          <Table data={filteredData} columns={COLUMNS} onRowClick={handleRowClick} options={{}} />
        </div>

      </div>
    </div>
  </div>
);
```

Replace `[page]` with the page's kebab-case name (e.g. `driver-management`, `shipments`).

### CSS file pattern

Create `app/<route>/<route>.css` with these classes (replace `[page]` prefix):

```css
/* [Page Name] Page */

.[page]-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
}

.[page]-header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.[page]-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.[page]-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.[page]-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Row count label

Always uses `Text` with these exact styles — never a raw `<span>`:
```tsx
<Text variant="body" size="sm" weight="medium"
  style={{ color: 'var(--theme-color-grey-70)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
  {filteredData.length} items
</Text>
```

### Search filter pattern

Filter in the component, not via Tabulator's built-in filter API:
```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredData = MOCK_DATA.filter(row => {
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  return (
    row.fieldA.toLowerCase().includes(q) ||
    row.fieldB.toLowerCase().includes(q)
    // add any field the user should be able to search by
  );
});
```

---

## Checklist Before Marking Done

**Table (always):**
- [ ] All column `title` values are UPPERCASE strings
- [ ] All data columns have `headerSort: false`
- [ ] Checkbox column (if used): `frozen: true` appears exactly once
- [ ] Actions/chevron column (if used): `frozen: true` appears exactly once
- [ ] `useEffect` is in the React import
- [ ] `useEffect` scroll listener is in the component body
- [ ] All null/empty cell values render `—` in `grey-30`
- [ ] No formatter function is defined inside the React component
- [ ] `formatter: 'rowSelection'` is NOT used anywhere

**Full page (when full page requested):**
- [ ] NavBar component included verbatim
- [ ] Page outer shell uses `minHeight: 100vh` + grey-5 background + absolute white card (top: 72, left/right/bottom: 12, borderRadius: 16)
- [ ] Page header: title (`heading lg semibold grey-100`) + subtitle (`body sm grey-50`) + CTAs (secondary first, primary last)
- [ ] Toolbar: row count label (uppercase grey-70 + letterSpacing 0.04em) + search Input (width 280) + Filters button
- [ ] CSS file created with `[page]-header`, `[page]-header-left`, `[page]-header-actions`, `[page]-toolbar`, `[page]-toolbar-right` classes
- [ ] Search filters rows in component state (`filteredData`), not via Tabulator API
- [ ] `useRouter` imported and `handleRowClick` wired up if navigation requested

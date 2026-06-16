# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

---

## Project Purpose

This is a **Next.js App Router** project used to replicate Figma designs using the OneHaul design system. Work involves taking Figma file links, reading the design, and implementing screens using only the components and theme provided in this repo.

---

## Strict Design System Rules

These are non-negotiable constraints. Violating them breaks consistency.

**NEVER:**
- Use raw Ant Design components directly (e.g. `import { Button } from 'antd'`)
- Write custom inline styles for colors, spacing, or typography — use theme tokens
- Create ad-hoc wrapper components or one-off styled elements
- Use Tailwind utility classes for colors or typography (layout utilities like `flex`, `gap`, `grid` are fine)
- Import from `react-icons`, `@mui/icons-material`, or any other icon library directly in pages/components
- Build custom UI elements (toggles, switches, chips, etc.) inline before checking `components/` — always check the components folder first
- Use Tabulator's built-in native formatters for UI elements that have design system equivalents (e.g. `formatter: 'rowSelection'` for checkboxes) — these render unstyled raw HTML elements
- Use raw `<input type="date">` for date inputs — use `@/components/DatePicker` (`onChange` returns `Date | null`, float label is built-in via `placeholder` prop)
- Use raw `<textarea>` for multiline text — use `<Input type="textarea" rows={N} />` from `@/components/Input`
- Create custom float-label helper components — `DatePicker` and `Input` handle their own labels internally

**ALWAYS:**
- Import UI components exclusively from `@/components/<ComponentName>`
- Use color values from the theme: `const { currentTheme } = useTheme(); const { colors } = currentTheme;`
- Use CSS variables for color in plain style props: `var(--theme-color-primary-60)`
- Use the `Text` component from `@/components/Text` for all text rendering
- Mark pages/components as `'use client'` when they use hooks or any component that does
- Ask if you don't find any component or theme created

---

## Architecture

### Component System (`components/`)

Each component is a thin wrapper around the corresponding Ant Design v5 component with:
- A `onehaul-*` CSS class namespace applied
- Props mapped to OneHaul conventions (e.g. `variant="primary"` → `type="primary"`)
- Its own scoped CSS file (`ComponentName.css`) imported directly

Components follow this pattern:
```
components/
  Button/
    index.jsx       ← component logic
    Button.css      ← scoped styles
    index.d.ts      ← TypeScript types (may lag behind implementation)
    Button.stories.jsx
```

> **Note:** `.d.ts` files may be outdated. If TypeScript complains about a valid prop (e.g. `items` on Collapse), cast with `as React.ComponentType<any>` in the page — never modify the component files.

### Theme System (`lib/theme/`)

| File | Purpose |
|------|---------|
| `defaultTheme.js` | Full color palette (primary, grey, error, success, yellow, orange, magenta, purple, teal) |
| `getTheme.js` | Maps palette to Ant Design token overrides |
| `ThemeContext.jsx` | React context + `ConfigProvider` wrapper; also writes all colors as `--theme-color-*` CSS variables on `<html>` |
| `index.js` | Barrel export |

**Accessing colors in code:**
```jsx
const { currentTheme } = useTheme();
const { colors } = currentTheme;
// e.g. colors.primary_60, colors.grey_10
```

**Accessing colors in CSS/style props:**
```css
color: var(--theme-color-primary-60);
background: var(--theme-color-grey-5);
```

CSS variable names follow the pattern `--theme-color-{key}` where underscores become hyphens (e.g. `primary_60` → `--theme-color-primary-60`).

`ThemeProvider` wraps the entire app in `app/layout.tsx`. All pages have access to theme tokens automatically.

### Icons (`icons/`)

Components import icons from `@/icons` (e.g. `Chevrondown`, `Tick`, `Fail`, `Success`). The current `icons/index.jsx` contains **temporary stubs** using `react-icons` for development purposes. When the real icon assets are provided, replace this file — do not spread icon stubs into production pages.

### Font

Inter is the primary font, loaded via Next.js Google Fonts and set as `--font-inter`. Geist and Geist Mono are also loaded but secondary. All Ant Design components inherit Inter via the theme token `fontFamily`.

### Tabulator / Table (`components/Table`)

The `Table` component wraps `tabulator-tables`. Tabulator column formatters return **HTML strings**, not React JSX — React components cannot be rendered inside them.

**Rules for table cell UI elements:**

- **Never** use Tabulator's built-in native formatters (e.g. `formatter: 'rowSelection'`, built-in `tickCross`, etc.) when a design system equivalent exists in `components/`. These render unstyled raw HTML.
- **Always** write custom formatter functions that produce the same HTML markup as the design system component renders, so AntD/OneHaul CSS classes apply correctly.
- **Import** the corresponding design system component in the page (e.g. `import Checkbox from '@/components/Checkbox'`) even if not directly used in JSX — this ensures the component's scoped CSS is included in the bundle.
- **Handle interactions** via Tabulator column callbacks (`cellClick`, `headerClick`). Update cell visuals by directly mutating the DOM via `cell.getElement().querySelector(...)` — `cell.reformat()` does NOT exist in tabulator-tables@6.4.

**Checkbox column pattern:**
```typescript
// Load Checkbox CSS by importing the component
import CheckboxComponent from '@/components/Checkbox';

// Helper — returns AntD checkbox HTML that onehaul-checkbox CSS targets
function checkboxHTML(checked: boolean, indeterminate = false) {
  const checkedClass = checked ? ' ant-checkbox-checked' : '';
  const indeterminateClass = indeterminate ? ' ant-checkbox-indeterminate' : '';
  return `<label class="ant-checkbox-wrapper onehaul-checkbox onehaul-checkbox-md" style="margin:0">
    <span class="ant-checkbox${checkedClass}${indeterminateClass}">
      <input type="checkbox" class="ant-checkbox-input" ${checked ? 'checked' : ''} />
      <span class="ant-checkbox-inner"></span>
    </span>
  </label>`;
}

// Column definition
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
    // cell.reformat() does NOT exist in tabulator-tables@6.4 — update DOM directly
    const cb = cell.getElement()?.querySelector('.oh-cb');
    if (cb) cb.className = `oh-cb${row.isSelected() ? ' checked' : ''}`;
    // update header via DOM
  },
  headerClick: (e: any, column: any) => {
    const table = column.getTable();
    const allSelected = table.getSelectedRows().length === table.getRows().length && table.getRows().length > 0;
    allSelected ? table.deselectRow() : table.selectRow();
    column.getCells().forEach((c: any) => {
      const cb = c.getElement()?.querySelector('.oh-cb');
      if (cb) cb.className = `oh-cb${c.getRow().isSelected() ? ' checked' : ''}`;
    });
    // update header via DOM
  },
}
```

---

## Figma → Code Workflow

When given a Figma link:
1. Read the Figma frame/component using the Figma MCP tool
2. Identify every UI element and map it to a component in `components/`
3. Identify all colors used and map them to tokens in `defaultTheme.js`
4. For every text element, read its font size, weight, and line height from Figma, then find the matching `variant` + `size` + `weight` combination in the `Text` component (`components/Text/index.jsx`) — never hardcode font sizes or weights inline
5. For every type style (e.g. Body 2/Medium, Overline, Heading), cross-reference it against the `FONT_MAP` in `Text` to pick the correct props; if no exact match exists, get as close as possible using available variants and flag the discrepancy
6. Before writing any custom UI element, **check `components/` first** — run `ls components/` mentally against what you need (Toggle, Switch, Chips, Slider, etc.)
7. Build using only those components and tokens
8. If a required component doesn't exist in `components/`, flag it — don't improvise

---

## Behavioral Guidelines

### 1. Think Before Coding

Before implementing:
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask: *"Would a senior engineer say this is overcomplicated?"* If yes, simplify.

### 3. Surgical Changes

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that **your** changes made unused.
- Don't remove pre-existing dead code unless asked.

Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

For multi-step tasks, state a brief plan before starting:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

Transform vague tasks into verifiable goals before executing.
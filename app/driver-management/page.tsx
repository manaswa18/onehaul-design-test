'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Text from '@/components/Text';
import ButtonComponent from '@/components/Button';
import InputComponent from '@/components/Input';
import Avatar from '@/components/Avatar';
import TableComponent from '@/components/Table';
import { Search, Add, DocIcon, HelpIcon, NotificationIcon, FilterIcon } from '@/icons';
import './driver-management.css';

const Button = ButtonComponent as React.ComponentType<any>;
const Table = TableComponent as React.ComponentType<any>;
const Input = InputComponent as React.ComponentType<any>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface OpenTask {
  count: number;
  urgency: 'overdue' | 'due-today' | 'due-week';
}

interface Driver {
  id: string;
  driverId: string;
  name: string;
  homeLocation: string;
  assignedFleet: string | null;
  vehicleReg: string | null;
  status: 'Active' | 'On Trip' | 'On Leave' | 'Inactive' | 'Suspended';
  openTasks: OpenTask | null;
  lastActivity: string;
  contact: string | null;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DRIVERS: Driver[] = [
  {
    id: '1',
    driverId: 'DRV-2026-0041',
    name: 'Arjun Sharma',
    homeLocation: 'Mumbai, IN',
    assignedFleet: 'Fleet Alpha-3',
    vehicleReg: 'MH-04-AH-7821',
    status: 'Active',
    openTasks: { count: 2, urgency: 'overdue' },
    lastActivity: 'Completed Delivery • 10 Jun',
    contact: '+91 98765 43210',
  },
  {
    id: '2',
    driverId: 'DRV-2026-0042',
    name: 'Priya Mehta',
    homeLocation: 'Pune, IN',
    assignedFleet: 'Fleet Beta-1',
    vehicleReg: 'MH-12-BT-4520',
    status: 'On Trip',
    openTasks: { count: 1, urgency: 'due-today' },
    lastActivity: 'Departed Warehouse • 11 Jun',
    contact: '+91 87654 32109',
  },
  {
    id: '3',
    driverId: 'DRV-2026-0043',
    name: 'Ravi Kumar',
    homeLocation: 'Delhi, IN',
    assignedFleet: 'Fleet Alpha-1',
    vehicleReg: 'DL-01-RK-9034',
    status: 'Active',
    openTasks: null,
    lastActivity: 'Vehicle Inspection • 08 Jun',
    contact: '+91 76543 21098',
  },
  {
    id: '4',
    driverId: 'DRV-2026-0044',
    name: 'Samira Khan',
    homeLocation: 'Dubai, AE',
    assignedFleet: null,
    vehicleReg: null,
    status: 'On Leave',
    openTasks: null,
    lastActivity: 'On Leave Since • 05 Jun',
    contact: '+971 50 123 4567',
  },
  {
    id: '5',
    driverId: 'DRV-2026-0045',
    name: 'Zhang Wei',
    homeLocation: 'Shanghai, CN',
    assignedFleet: 'Fleet Gamma-2',
    vehicleReg: 'SH-A-88234',
    status: 'Active',
    openTasks: { count: 1, urgency: 'due-week' },
    lastActivity: 'Pickup Confirmed • 09 Jun',
    contact: '+86 138 0013 8000',
  },
  {
    id: '6',
    driverId: 'DRV-2026-0046',
    name: 'Carlos Ruiz',
    homeLocation: 'Valencia, ES',
    assignedFleet: 'Fleet Delta-1',
    vehicleReg: 'ES-1234-VLN',
    status: 'On Trip',
    openTasks: null,
    lastActivity: 'In Transit • 11 Jun',
    contact: '+34 612 345 678',
  },
  {
    id: '7',
    driverId: 'DRV-2026-0047',
    name: 'John Okafor',
    homeLocation: 'Lagos, NG',
    assignedFleet: 'Fleet Beta-2',
    vehicleReg: null,
    status: 'Inactive',
    openTasks: null,
    lastActivity: 'Completed Delivery • 01 Jun',
    contact: '+234 803 456 7890',
  },
  {
    id: '8',
    driverId: 'DRV-2026-0048',
    name: 'Anh Nguyen',
    homeLocation: 'Ho Chi Minh, VN',
    assignedFleet: 'Fleet Alpha-2',
    vehicleReg: '51A-123.45',
    status: 'Active',
    openTasks: { count: 1, urgency: 'overdue' },
    lastActivity: 'Arrived CFS • 10 Jun',
    contact: '+84 90 123 4567',
  },
  {
    id: '9',
    driverId: 'DRV-2026-0049',
    name: 'Fatima Al-Rashid',
    homeLocation: 'Riyadh, SA',
    assignedFleet: null,
    vehicleReg: null,
    status: 'Suspended',
    openTasks: { count: 1, urgency: 'overdue' },
    lastActivity: 'Document Pending • 03 Jun',
    contact: '+966 50 987 6543',
  },
  {
    id: '10',
    driverId: 'DRV-2026-0050',
    name: 'Raj Patel',
    homeLocation: 'Ahmedabad, IN',
    assignedFleet: 'Fleet Gamma-1',
    vehicleReg: 'GJ-01-RP-6723',
    status: 'Active',
    openTasks: null,
    lastActivity: 'Pickup Confirmed • 11 Jun',
    contact: '+91 99887 76655',
  },
  {
    id: '11',
    driverId: 'DRV-2026-0051',
    name: 'Maria Santos',
    homeLocation: 'Manila, PH',
    assignedFleet: 'Fleet Delta-2',
    vehicleReg: 'NBR-1234',
    status: 'On Trip',
    openTasks: { count: 2, urgency: 'due-today' },
    lastActivity: 'Departed Port • 10 Jun',
    contact: '+63 917 234 5678',
  },
  {
    id: '12',
    driverId: 'DRV-2026-0052',
    name: 'Kwame Asante',
    homeLocation: 'Accra, GH',
    assignedFleet: 'Fleet Beta-3',
    vehicleReg: null,
    status: 'On Leave',
    openTasks: null,
    lastActivity: 'On Leave Since • 07 Jun',
    contact: '+233 24 567 8901',
  },
];

// ─── Status styles ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Active:      { bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)' },
  'On Trip':   { bg: 'var(--theme-color-primary-10)', color: 'var(--theme-color-primary-60)' },
  'On Leave':  { bg: 'var(--theme-color-yellow-20)',  color: 'var(--theme-color-yellow-120)' },
  Inactive:    { bg: 'var(--theme-color-grey-10)',    color: 'var(--theme-color-grey-60)' },
  Suspended:   { bg: 'var(--theme-color-error-20)',   color: 'var(--theme-color-error-100)' },
};

// ─── Formatters (all outside component) ──────────────────────────────────────

function driverIdFormatter(cell: any) {
  return `<span class="oh-cell-shipment-no">${cell.getValue()}</span>`;
}

function nameFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  return `<span class="oh-cell-text">${val}</span>`;
}

function homeLocationFormatter(cell: any) {
  const val: string = cell.getValue() || '';
  const commaIdx = val.indexOf(', ');
  const city = commaIdx !== -1 ? val.slice(0, commaIdx) : val;
  const country = commaIdx !== -1 ? val.slice(commaIdx + 2) : '';
  return `<div class="oh-cell-stack">
    <span class="primary">${city}</span>
    <span class="secondary">${country}</span>
  </div>`;
}

function fleetFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span class="oh-cell-muted">Unassigned</span>`;
  return `<span class="oh-cell-text">${val}</span>`;
}

function vehicleRegFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span class="oh-cell-muted">Not Assigned</span>`;
  return `<span class="oh-cell-text">${val}</span>`;
}

function statusFormatter(cell: any) {
  const val: string = cell.getValue();
  const s = STATUS_STYLES[val] || { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' };
  return `<span class="oh-badge" style="background:${s.bg};color:${s.color};">${val}</span>`;
}

function openTasksFormatter(cell: any) {
  const tasks = cell.getValue() as OpenTask | null;
  if (!tasks) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  const dotColor = tasks.urgency === 'overdue'
    ? 'var(--theme-color-error-100)'
    : tasks.urgency === 'due-today'
    ? 'var(--theme-color-orange-100)'
    : 'var(--theme-color-yellow-120)';
  const label = tasks.urgency === 'overdue'
    ? `${tasks.count} overdue`
    : tasks.urgency === 'due-today'
    ? `${tasks.count} due today`
    : `${tasks.count} this week`;
  return `<div class="oh-tasks-cell">
    <div class="oh-urgency-dot" style="background:${dotColor};"></div>
    <span style="font-size:12px;color:var(--theme-color-grey-100);">${label}</span>
  </div>`;
}

function lastActivityFormatter(cell: any) {
  const val: string = cell.getValue() || '';
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  const sepIdx = val.indexOf(' • ');
  if (sepIdx === -1) return `<span class="oh-cell-text">${val}</span>`;
  const event = val.slice(0, sepIdx);
  const date = val.slice(sepIdx + 3);
  return `<div class="oh-cell-stack">
    <span class="primary">${event}</span>
    <span class="secondary">${date}</span>
  </div>`;
}

function contactFormatter(cell: any) {
  const val = cell.getValue();
  if (!val) return `<span style="color:var(--theme-color-grey-30);">—</span>`;
  return `<span class="oh-cell-text">${val}</span>`;
}

// ─── Checkbox helpers ─────────────────────────────────────────────────────────

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

// ─── Column definitions ───────────────────────────────────────────────────────

const COLUMNS = [
  // Left frozen: checkbox selection
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
    frozen: true,
  },
  // Data columns
  { title: 'DRIVER ID',    field: 'driverId',      width: 170, minWidth: 150, headerSort: false, formatter: driverIdFormatter },
  { title: 'DRIVER NAME',  field: 'name',           width: 200, minWidth: 160, headerSort: false, formatter: nameFormatter },
  { title: 'HOME LOCATION',field: 'homeLocation',   width: 180, minWidth: 150, headerSort: false, formatter: homeLocationFormatter },
  { title: 'ASSIGNED FLEET',field: 'assignedFleet', width: 180, minWidth: 150, headerSort: false, formatter: fleetFormatter },
  { title: 'VEHICLE REG.', field: 'vehicleReg',     width: 180, minWidth: 150, headerSort: false, formatter: vehicleRegFormatter },
  { title: 'STATUS',       field: 'status',         width: 150, minWidth: 130, headerSort: false, formatter: statusFormatter },
  { title: 'OPEN TASKS',   field: 'openTasks',      width: 170, minWidth: 140, headerSort: false, formatter: openTasksFormatter },
  { title: 'LAST ACTIVITY',field: 'lastActivity',   width: 230, minWidth: 190, headerSort: false, formatter: lastActivityFormatter },
  { title: 'CONTACT',      field: 'contact',        width: 180, minWidth: 150, headerSort: false, formatter: contactFormatter },
  // Right frozen: actions
  {
    title: '',
    field: 'id',
    width: 52,
    minWidth: 52,
    headerSort: false,
    resizable: false,
    hozAlign: 'center',
    frozen: true,
    cssClass: 'oh-col-actions',
    formatter: () => `<span class="oh-cell-center">
      <button type="button" class="ant-btn ant-btn-link onehaul-button onehaul-button-sm onehaul-button-link onehaul-icon-button" onclick="event.stopPropagation()">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 12 12">
          <path fill="currentColor" d="M5.996 11q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881-.368.366-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881T6.004 1q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365"/>
        </svg>
      </button>
    </span>`,
  },
];

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 16px',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          style={{
            width: 36, height: 36, border: 'none', background: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
          }}
        >
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

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative' }}>
          {([DocIcon, HelpIcon] as React.ComponentType<any>[]).map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 36, height: 36,
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                background: 'var(--theme-color-pure-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Icon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
          ))}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                width: 36, height: 36,
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                background: 'var(--theme-color-pure-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <NotificationIcon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
            <div
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16,
                background: 'var(--theme-color-primary-60)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text variant="caption" size="md" style={{ color: 'var(--theme-color-pure-100)', fontSize: 10 }}>2</Text>
            </div>
          </div>
          <Avatar size="md" style={{ cursor: 'pointer', border: '0.5px solid var(--theme-color-grey-10)' }}>AM</Avatar>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DriverManagementPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredDrivers = MOCK_DRIVERS.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.driverId.toLowerCase().includes(q) ||
      d.name.toLowerCase().includes(q) ||
      (d.assignedFleet?.toLowerCase().includes(q) ?? false)
    );
  });

  const handleRowClick = (data: Driver) => {
    router.push(`/driver-management/${data.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', position: 'relative', overflow: 'hidden' }}>
      <NavBar />

      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 12,
          right: 12,
          bottom: 12,
          background: 'var(--theme-color-pure-100)',
          borderRadius: 16,
          boxShadow: '-2px 0px 16px 0px rgba(136, 136, 136, 0.06)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Page header */}
          <div className="driver-header">
            <div className="driver-header-left">
              <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                Driver Management
              </Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                Monitor drivers, assignments, and open tasks across your fleet
              </Text>
            </div>
            <div className="driver-header-actions">
              <Button variant="secondary" size="md">Export CSV</Button>
              <Button variant="primary" size="md" icon={<Add width={14} height={14} />}>
                Add Driver
              </Button>
            </div>
          </div>

          {/* Toolbar + Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="driver-toolbar">
              <Text
                variant="body"
                size="sm"
                weight="medium"
                style={{ color: 'var(--theme-color-grey-70)', textTransform: 'uppercase', letterSpacing: '0.04em' }}
              >
                {filteredDrivers.length} drivers
              </Text>
              <div className="driver-toolbar-right">
                <Input
                  floated={false}
                  placeholder="Search by driver ID, name, fleet…"
                  suffix={<Search width={14} height={14} color="var(--theme-color-grey-100)" />}
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  style={{ width: 280 }}
                />
                <Button variant="secondary" size="md" icon={<FilterIcon width={14} height={14} />}>
                  Filters
                </Button>
              </div>
            </div>

            <Table
              data={filteredDrivers}
              columns={COLUMNS}
              onRowClick={handleRowClick}
              options={{}}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

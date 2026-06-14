'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadcrumbComponent from '@/components/Breadcrumb';
import ButtonComponent from '@/components/Button';
import TabsComponent from '@/components/Tabs';
import CollapseComponent from '@/components/Collapse';
import InputComponent from '@/components/Input';
import Text from '@/components/Text';
import Avatar from '@/components/Avatar';
import PillComponent from '@/components/Pill';
import SelectComponent from '@/components/Select';
import DrawerComponent from '@/components/Drawer';
import ChipsComponent from '@/components/Chips';
import DropdownComponent from '@/components/Dropdown';
import CheckboxComponent from '@/components/Checkbox';
import { MoreVert, DocIcon, HelpIcon, NotificationIcon, EditPencil, Add, Delete, Leftpanelopen, Leftpanelclose, User, Block, Bulkadd, Upload, Tick, Building, ShipmentIcon, MailOutline, Attachment, FilterIcon, Chevrondown, ChevronRight } from '@/icons';
import './shipment-details.css';

const Breadcrumb = BreadcrumbComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Tabs = TabsComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Pill = PillComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
const Input = InputComponent as React.ComponentType<any>;
const Drawer = DrawerComponent as React.ComponentType<any>;
const Dropdown = DropdownComponent as React.ComponentType<any>;

interface Props {
  params: Promise<{ id: string }>;
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <div
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 16px', zIndex: 10,
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
            <path d="M14.5475 7.77799C15.6816 8.63951 16.3873 9.76104 16.6168 11.1717C16.8623 13.9193 14.7192 16.9331 13.1403 19.0351C13.113 19.0624 13.0857 19.0897 13.0575 19.1178C13.0494 19.2556 13.0468 19.3937 13.0472 19.5317C13.047 19.6068 13.0468 19.6819 13.0465 19.7593C13.0367 19.9431 13.0367 19.9431 13.1403 20.0283C13.3522 20.0385 13.5621 20.0437 13.7741 20.0458C13.9062 20.0481 14.0383 20.0505 14.1705 20.0529C14.3788 20.0563 14.5871 20.0594 14.7954 20.0616C15.8314 20.0735 16.7372 20.0884 17.5273 20.8561C18.0293 21.4943 18.1302 22.103 18.1294 22.8969C18.131 23.0703 18.1328 23.2438 18.1345 23.4172C18.1364 23.6891 18.1378 23.961 18.1383 24.2329C18.139 24.4963 18.1418 24.7597 18.1449 25.0232C18.1443 25.1446 18.1443 25.1446 18.1436 25.2685C18.1506 25.7556 18.2009 26.0284 18.5206 26.4018C18.8978 26.7333 19.2505 26.7477 19.7347 26.7526C19.8283 26.7537 19.8283 26.7537 19.9238 26.7547C20.0559 26.7558 20.188 26.7567 20.3201 26.7574C20.4544 26.7583 20.5887 26.76 20.723 26.7625C21.7475 26.8056 21.7475 26.8056 22.6593 26.4018C23.1187 25.7605 23.0247 24.8573 22.9575 24.1034C22.8373 23.4592 22.409 23.0133 21.9888 22.5344C21.7072 22.197 21.4717 21.8288 21.2314 21.4613C21.1828 21.3878 21.1342 21.3142 21.0841 21.2384C19.941 19.503 18.889 17.7561 19.3254 15.5932C19.402 15.3516 19.4901 15.1263 19.5967 14.8964C19.6257 14.8316 19.6547 14.7667 19.6846 14.6999C19.9513 14.1665 20.3404 13.7468 20.7555 13.3238C20.8004 13.2768 20.8453 13.2299 20.8916 13.1815C21.8906 12.2306 23.1814 12.026 24.4997 12.0511C25.7786 12.1094 26.7379 12.7898 27.6043 13.6875C28.5751 14.8077 28.7799 16.0348 28.7017 17.4624C28.4984 19.0751 27.3133 20.5954 26.4255 21.9011C26.3802 21.9687 26.335 22.0363 26.2884 22.1059C26.0867 22.4038 25.8887 22.6858 25.6378 22.9441C24.9505 23.6824 25.0805 24.2817 24.9645 24.5087C24.9816 25.5984 24.5368 27.1314 23.7992 27.9315C23.0454 28.6542 22.2728 28.978 21.2722 28.9875C21.2039 28.9882 21.1356 28.9888 21.0653 28.9895C20.9213 28.9907 20.7773 28.9916 20.6333 28.9922C20.488 28.9932 20.3427 28.9949 20.1975 28.9973C18.8852 29.0194 17.7939 28.9095 16.7824 27.9745C16.1279 27.2301 15.9054 26.3304 15.9042 25.361C15.9028 25.2741 15.9014 25.1872 15.9 25.0977C15.896 24.8237 15.8943 24.5497 15.8925 24.2756C15.8902 24.0883 15.8877 23.9011 15.8851 23.7138C15.879 23.2579 15.8747 22.8019 15.8718 22.346C15.7934 22.3443 15.715 22.3427 15.6342 22.341C15.3396 22.3345 15.0449 22.3273 14.7503 22.3197C14.6235 22.3166 14.4966 22.3137 14.3698 22.3111C12.3133 22.2681 12.3133 22.2681 11.663 21.6123C11.2272 21.1371 11.0477 20.5573 11.0217 19.9153C10.9829 19.1417 10.8415 18.9225 10.3234 18.3334C9.06287 16.3738 7.23647 13.5974 7.3317 11.0404C7.36322 10.6052 7.48936 10.2377 7.67727 9.8473C7.71557 9.76621 7.75388 9.68512 7.79334 9.60157C8.40433 8.44235 9.34183 7.64231 10.5711 7.19147C11.9396 6.79157 13.3476 7.03275 14.5475 7.77799Z" fill="#187C8A"/>
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

// ─── Atoms ────────────────────────────────────────────────────────────────────

function StatusChip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div
      style={{
        background: bg, borderRadius: 32, height: 24,
        padding: '0 10px', display: 'inline-flex', alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <Text variant="body" size="sm" style={{ color, whiteSpace: 'nowrap' }}>{label}</Text>
    </div>
  );
}

function OperatorBadge({ name }: { name: string }) {
  const BG: Record<string, string> = { MSC: '#0080C9', Maersk: '#00243D', 'Hapag-Lloyd': '#E84A0C' };
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div
        style={{
          width: 20, height: 18,
          background: BG[name] || 'var(--theme-color-primary-60)',
          borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ color: '#fff', fontSize: 7, fontWeight: 700, letterSpacing: -0.5 }}>
          {name.slice(0, 3).toUpperCase()}
        </span>
      </div>
      <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
        {name}
      </Text>
    </div>
  );
}

// ─── Collapsible section contents ─────────────────────────────────────────────

function DetailsContent() {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: 'Booking Status',
      value: <StatusChip label="Confirmed" bg="var(--theme-color-success-20)" color="var(--theme-color-success-120)" />,
    },
    {
      label: 'Operator',
      value: <OperatorBadge name="MSC" />,
    },
    {
      label: 'ETD / ETA',
      value: (
        <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
          05/12/2024 – 25/12/2024
        </Text>
      ),
    },
    {
      label: 'Containers',
      value: (
        <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
          6 Containers
        </Text>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {rows.map((row) => (
        <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text variant="body" size="sm" weight="medium" style={{ flex: 1, color: 'var(--theme-color-grey-100)' }}>
            {row.label}
          </Text>
          {row.value}
        </div>
      ))}
    </div>
  );
}

const KEY_DATES = [
  { label: 'CY Cutoff',       date: '01 May 26, 12:00', status: 'Overdue',    bg: 'var(--theme-color-error-20)',   color: 'var(--theme-color-error-100)' },
  { label: 'SI Cutoff',       date: '05 May 26, 17:00', status: 'Overdue',    bg: 'var(--theme-color-error-20)',   color: 'var(--theme-color-error-100)' },
  { label: 'VGM Cutoff',      date: '08 May 26, 23:59', status: 'In 1 day',   bg: 'var(--theme-color-grey-10)',    color: 'var(--theme-color-grey-70)' },
  { label: 'ETD (Mumbai)',    date: '28 Apr 26',         status: 'Completed',  bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)' },
  { label: 'ETA (Jebel Ali)', date: '14 May 26',         status: 'In 12 days', bg: 'var(--theme-color-grey-10)',    color: 'var(--theme-color-grey-70)' },
];

function KeyDatesContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {KEY_DATES.map((d) => (
        <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
              {d.label}
            </Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
              {d.date}
            </Text>
          </div>
          <StatusChip label={d.status} bg={d.bg} color={d.color} />
        </div>
      ))}
    </div>
  );
}

const PEOPLE_OPTIONS = [
  { value: 'SK', label: 'Sahil Kala',   initials: 'SK', bg: '#1D3A5F', email: 'sahil.kala@onehaul.com' },
  { value: 'RA', label: 'Ravi Arora',   initials: 'RA', bg: '#34A853', email: 'ravi.arora@onehaul.com' },
  { value: 'LM', label: 'Laura Mills',  initials: 'LM', bg: '#7B61FF', email: 'laura.mills@onehaul.com' },
  { value: 'NT', label: 'Neha Tiwari',  initials: 'NT', bg: '#9E9E9E', email: 'neha.tiwari@onehaul.com' },
  { value: 'AM', label: 'Amir Mohsin',  initials: 'AM', bg: '#D32F2F', email: 'amir.mohsin@onehaul.com' },
];

const ROLES = [
  { role: 'Sales Agent',     assignedKey: 'SK' as string | null },
  { role: 'Ops Executive',   assignedKey: 'RA' as string | null },
  { role: 'Documentation',   assignedKey: null },
  { role: 'Finance',         assignedKey: 'NT' as string | null },
  { role: 'Account Manager', assignedKey: 'AM' as string | null },
];

function InternalTeamContent() {
  const [assignments, setAssignments] = useState<(string | null)[]>(
    ROLES.map((r) => r.assignedKey)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [drawerIndex, setDrawerIndex] = useState<number | null>(null);
  const [pendingValue, setPendingValue] = useState<string | null>(null);

  const openDrawer = (index: number) => {
    setDrawerIndex(index);
    setPendingValue(assignments[index]);
  };

  const closeDrawer = () => {
    setDrawerIndex(null);
    setPendingValue(null);
  };

  const handleConfirm = () => {
    if (drawerIndex !== null && pendingValue) {
      setAssignments((prev) => prev.map((a, i) => (i === drawerIndex ? pendingValue : a)));
    }
    closeDrawer();
  };

  const handleRemove = () => {
    if (drawerIndex !== null) {
      setAssignments((prev) => prev.map((a, i) => (i === drawerIndex ? null : a)));
    }
    closeDrawer();
  };

  const drawerRole = drawerIndex !== null ? ROLES[drawerIndex] : null;
  const isDrawerAssigned = drawerIndex !== null && !!assignments[drawerIndex];
  const currentPerson = isDrawerAssigned ? PEOPLE_OPTIONS.find((p) => p.value === assignments[drawerIndex!]) : null;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROLES.map((r, i) => {
          const assignedKey = assignments[i];
          const person = PEOPLE_OPTIONS.find((p) => p.value === assignedKey);
          const isAssigned = !!person;

          const taskCounts = isAssigned ? (() => {
            const personTasks = TASKS_DATA.filter(t => t.assignee?.initials === person!.initials);
            return {
              overdue:  personTasks.filter(t => t.urgency === 'overdue').length,
              dueToday: personTasks.filter(t => t.urgency === 'due-today').length,
            };
          })() : { overdue: 0, dueToday: 0 };

          const hasUrgentTasks = taskCounts.overdue > 0 || taskCounts.dueToday > 0;
          const isHovered = hoveredIndex === i;

          return (
            <React.Fragment key={r.role}>
              {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
            <div
              onClick={() => openDrawer(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: 'var(--theme-color-pure-100)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                cursor: 'pointer',
              }}
            >
              {/* Avatar (assigned) or dashed placeholder (unassigned) */}
              {isAssigned ? (
                <div style={{ position: 'relative', flexShrink: 0, width: 32, height: 32 }}>
                  <Avatar size={32} style={{ background: person!.bg, fontSize: 11, fontWeight: 600, color: '#fff' }}>
                    {person!.initials}
                  </Avatar>
                  {isHovered && (
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.38)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <EditPencil style={{ fontSize: 12, color: '#fff' }} />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  width: 32, height: 32, flexShrink: 0, borderRadius: '50%',
                  border: `1.5px ${isHovered ? 'solid' : 'dashed'} ${isHovered ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-30)'}`,
                  background: isHovered ? 'var(--theme-color-grey-10)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}>
                  <Add style={{ fontSize: 14, color: isHovered ? 'var(--theme-color-grey-60)' : 'var(--theme-color-grey-30)' }} />
                </div>
              )}

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Rows 1+2 container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Row 1: Name | Role chip */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <Text variant="body" size="sm" weight="medium" style={{ color: isAssigned ? 'var(--theme-color-grey-100)' : 'var(--theme-color-grey-40)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 1 }}>
                      {isAssigned ? displayName(person!.label, person!.initials) : 'Unassigned'}
                    </Text>
                    <div style={{ background: 'var(--theme-color-grey-10)', borderRadius: 4, padding: '1px 6px', flexShrink: 0 }}>
                      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)', fontSize: 10, fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {r.role}
                      </Text>
                    </div>
                  </div>

                  {/* Row 2: Email or placeholder */}
                  <Text variant="body" size="sm" style={{ color: isAssigned ? 'var(--theme-color-grey-50)' : 'var(--theme-color-grey-30)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                    {isAssigned ? person!.email : 'No member added yet'}
                  </Text>
                </div>

                {/* Row 3: Task urgency chips — only when there are urgent tasks */}
                {hasUrgentTasks && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {taskCounts.overdue > 0 && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--theme-color-error-20)', borderRadius: 4, padding: '1px 6px' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--theme-color-error-100)', display: 'inline-block', flexShrink: 0 }} />
                        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-100)', fontSize: 10, fontWeight: 600 }}>
                          {taskCounts.overdue} overdue
                        </Text>
                      </div>
                    )}
                    {taskCounts.dueToday > 0 && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--theme-color-yellow-20)', borderRadius: 4, padding: '1px 6px' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--theme-color-yellow-60)', display: 'inline-block', flexShrink: 0 }} />
                        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-yellow-120)', fontSize: 10, fontWeight: 600 }}>
                          {taskCounts.dueToday} due today
                        </Text>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            </React.Fragment>
          );
        })}
      </div>

      <Drawer
        open={drawerIndex !== null}
        onClose={closeDrawer}
        icon={isDrawerAssigned ? EditPencil : Add}
        title={isDrawerAssigned ? `Reassign ${drawerRole?.role}` : `Assign ${drawerRole?.role}`}
        subtitle={
          isDrawerAssigned
            ? `Currently assigned to ${currentPerson?.label}. Select a different team member to replace them.`
            : `No one is assigned to ${drawerRole?.role} yet. Pick a team member to take ownership.`
        }
        width={720}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              {isDrawerAssigned && (
                <Button variant="tertiary" error onClick={handleRemove} icon={<Delete />}>
                  Remove Member
                </Button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" onClick={closeDrawer}>Cancel</Button>
              <Button variant="primary" onClick={handleConfirm} disabled={!pendingValue}>
                {isDrawerAssigned ? 'Change' : 'Assign'}
              </Button>
            </div>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
              {isDrawerAssigned ? 'Replace With' : 'Assign To'}
            </Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
              {isDrawerAssigned
                ? `Select who will take over from ${currentPerson?.label} for this role.`
                : 'Choose a team member who will be responsible for this role.'}
            </Text>
          </div>
          <Select
            placeholder="Search team member"
            value={pendingValue || undefined}
            options={PEOPLE_OPTIONS}
            onChange={(val: string) => setPendingValue(val)}
            clearable={false}
            floatLabel={false}
          />
        </div>
      </Drawer>
    </>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function InlineBadge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div style={{ background: bg, borderRadius: 32, padding: '2px 10px', display: 'inline-flex', alignItems: 'center' }}>
      <Text variant="body" size="sm" style={{ color, whiteSpace: 'nowrap' }}>{label}</Text>
    </div>
  );
}

function FieldItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', fontSize: 12 }}>{label}</Text>
      {typeof value === 'string'
        ? <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)' }}>{value}</Text>
        : value}
    </div>
  );
}

const BOOKING_CARGO_FIELDS = [
  { label: 'Client',               value: 'Voltas India Limited' },
  { label: 'Customer Reference',   value: 'VOL-2026-1234' },
  { label: 'Commodity',            value: 'Metal Scrap (HMS 1&2)' },
  { label: 'HS Code',              value: '7204.49' },
  { label: 'Incoterms',            value: 'FOB Mumbai' },
  { label: 'Special Requirements', value: 'None' },
];

const BOOKING_CONTAINER_FIELDS = [
  { label: 'Container Type',  value: '2 × 40GP, 1 × 20GP' },
  { label: 'Cargo Weight',    value: '18 MT per unit' },
  { label: 'Total Weight',    value: '36 MT' },
  { label: 'Cargo Type',      value: 'Standard / FCL' },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', fontSize: 10, fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase' as const, display: 'block' }}>
      {children}
    </Text>
  );
}

const SHIPMENT_STATUS_DATA = {
  status: 'In Transit',
  bls: ['MSCUBLMUM654321', 'MSCUBLMUM654322'],
  origin:      { port: 'Nhava Sheva', country: 'IN', date: '19 Mar 2026', label: 'Departed' },
  destination: { port: 'Jebel Ali',   country: 'AE', date: '28 Mar 2026', label: 'ETA'      },
  vessel: 'MSC MIRIAM · AE6/PEX · V26023',
};

function ShipmentStatusCard() {
  const { origin, destination } = SHIPMENT_STATUS_DATA;
  return (
    <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>Shipment Status</Text>
        <Pill color="teal" theme="light" size="sm" showIcon={false}>{SHIPMENT_STATUS_DATA.status}</Pill>
      </div>

      {/* BL Numbers row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>BL Numbers</Text>
          {SHIPMENT_STATUS_DATA.bls.map(bl => (
            <Pill key={bl} color="blue" theme="light" size="sm" showIcon={false}>{bl}</Pill>
          ))}
        </div>
        <Button variant="link" size="sm" icon={<ChevronRight width={10} height={10} />} iconPosition="end">Track</Button>
      </div>

      <div style={{ height: 1, background: 'var(--theme-color-grey-10)' }} />

      {/* Route strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 160 }}>
          <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>{origin.port}</Text>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>{origin.country} · {origin.label}</Text>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>{origin.date}</Text>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8 }}>
            <div style={{ flex: 1, borderTop: '1px dashed var(--theme-color-grey-20)' }} />
            <ShipmentIcon width={18} height={18} color="var(--theme-color-grey-40)" />
            <div style={{ flex: 1, borderTop: '1px dashed var(--theme-color-grey-20)' }} />
          </div>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textAlign: 'center' as const }}>{SHIPMENT_STATUS_DATA.vessel}</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 160, alignItems: 'flex-end' }}>
          <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>{destination.port}</Text>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>{destination.country} · {destination.label}</Text>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>{destination.date}</Text>
        </div>
      </div>
    </div>
  );
}

function BookingDetailsCard() {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Cargo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionLabel>Cargo</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 24px' }}>
          {BOOKING_CARGO_FIELDS.map(({ label, value }) => (
            <FieldItem key={label} label={label} value={value} />
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--theme-color-grey-10)' }} />

      {/* Carrier & Terms */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionLabel>Carrier & Terms</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 24px' }}>
          <FieldItem label="Carrier Booking Ref" value={
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-primary-60)' }}>MSCUUK048912</Text>
          } />
          <FieldItem label="Contract / Rate Ref" value={
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-primary-60)' }}>EINBRIT-MSC-2026</Text>
          } />
          <FieldItem label="BL Numbers" value={
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)', fontStyle: 'italic' }}>Awaiting BL draft</Text>
          } />
          <FieldItem label="Vessel / Voyage" value="MSC MIRIAM · AE6/PEX · V26023" />
          <FieldItem label="Movement Type"    value="Door to Door" />
          <FieldItem label="Service Mode"     value="CY-CY (Merchant Haulage)" />
          <FieldItem label="Freight Terms"    value="Prepaid" />
          <FieldItem label="Booking Date"     value="19 Feb 2026, 08:16" />
          <FieldItem label="Booked By"        value="Ravi Arora" />
          <FieldItem label="Assigned To"      value="Sahil Kala" />
          <FieldItem label="Created"          value="14 Jan 2026" />
        </div>
      </div>
    </div>
  );

  return (
    <Collapse
      defaultActiveKey={[]}
      items={[{
        key: 'booking-details',
        label: 'Booking Details',
                children: content,
      }]}
    />
  );
}

function ContainerSummaryCard() {
  const content = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 24px' }}>
      {BOOKING_CONTAINER_FIELDS.map(({ label, value }) => (
        <FieldItem key={label} label={label} value={value} />
      ))}
    </div>
  );

  return (
    <Collapse
      defaultActiveKey={[]}
      items={[{
        key: 'container-summary',
        label: 'Container Summary',
                children: content,
      }]}
    />
  );
}

function TasksSummaryCard({ stage }: { stage: PreviewStage }) {
  const [view, setView] = useState<'mine' | 'all'>('mine');

  const visibleTasks = TASKS_BY_STAGE[stage].filter(t =>
    view === 'all' || t.assignee?.initials === CURRENT_USER_INITIALS || t.assignee === null
  );
  const overdueCount  = visibleTasks.filter(t => t.urgency === 'overdue').length;
  const dueTodayCount = visibleTasks.filter(t => t.urgency === 'due-today').length;
  const nextTask      = visibleTasks.find(t => t.urgency === 'overdue' || t.urgency === 'due-today') ?? null;

  return (
    <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
      {/* Card heading + toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16 }}>
        <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)', fontSize: 16 }}>Tasks to Complete</Text>
        {React.createElement(ChipsComponent as React.ComponentType<any>, {
          size: 'sm',
          theme: 'line',
          mandatory: true,
          items: [{ key: 'mine', label: 'Mine' }, { key: 'all', label: 'All' }],
          selected: view,
          setSelected: (key: string) => setView(key as 'mine' | 'all'),
        })}
      </div>

      {/* Count + urgency breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Pending</Text>
          <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, color: 'var(--theme-color-grey-100)', fontFamily: 'var(--font-inter)' }}>
            {visibleTasks.length}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
          {overdueCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--theme-color-error-60)', flexShrink: 0 }} />
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-100)' }}>{overdueCount} overdue</Text>
            </div>
          )}
          {dueTodayCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--theme-color-orange-60)', flexShrink: 0 }} />
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-orange-120)' }}>{dueTodayCount} due today</Text>
            </div>
          )}
          {overdueCount === 0 && dueTodayCount === 0 && (
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-success-100)' }}>All caught up</Text>
          )}
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--theme-color-grey-10)' }} />

      {/* Most Urgent task — or spacer to fill height when no urgent task */}
      {nextTask ? (
        <div style={{ paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
            Most Urgent
          </Text>
          <TaskCard task={nextTask} completed={false} onToggleComplete={() => {}} hideMenu />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, paddingTop: 12 }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-30)' }}>No pending tasks</Text>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-20)', fontSize: 11 }}>All tasks are completed</Text>
        </div>
      )}

      {/* Footer */}
      <div style={{ paddingTop: 12, borderTop: '1px solid var(--theme-color-grey-10)', marginTop: nextTask ? 12 : 0 }}>
        <Button variant="link" size="sm" icon={<ChevronRight width={10} height={10} />} iconPosition="end" style={{ marginLeft: -4 }}>View all tasks</Button>
      </div>
    </div>
  );
}

type ActivityTag = 'SYSTEM' | 'CARRIER' | 'OUTBOUND' | 'INTERNAL';

interface ActivityItem {
  avatarType: 'system' | 'carrier' | 'email' | 'person';
  avatarLabel?: string;
  actor: string;
  tag: ActivityTag;
  time: string;
  description: string;
}

const ACTIVITY_FEED: ActivityItem[] = [
  {
    avatarType: 'system',
    actor: 'System Event',
    tag: 'SYSTEM',
    time: 'Today, 09:00',
    description: 'Submit Shipping Instructions overdue since 05 May 2026, 17:00 — task flagged to Sahil Kala',
  },
  {
    avatarType: 'carrier',
    avatarLabel: 'MSC',
    actor: 'MSC Carrier',
    tag: 'CARRIER',
    time: '3 days ago',
    description: 'Booking MSCUUK048912 confirmed. SI cutoff 05 May 2026 17:00. VGM cutoff 08 May 2026 23:59.',
  },
  {
    avatarType: 'system',
    actor: 'ETD Updated',
    tag: 'SYSTEM',
    time: '4 days ago',
    description: 'ETD changed to 28 Apr 2026 (+2 days). Vessel rescheduled — port congestion at Nhava Sheva.',
  },
  {
    avatarType: 'email',
    actor: 'Sahil Kala (You) → Voltas India',
    tag: 'OUTBOUND',
    time: '5 days ago',
    description: 'Re: ONH-2026-04821 — ETD Update & New Carrier Cut-offs',
  },
  {
    avatarType: 'person',
    avatarLabel: 'SK',
    actor: 'Sahil Kala (You)',
    tag: 'INTERNAL',
    time: '14 Jan 2026',
    description: 'Customer requires original BL sent via courier to Voltas Mumbai office. Confirm details with Rohan More.',
  },
];

const TAG_STYLES: Record<ActivityTag, { bg?: string; color: string; chip: boolean }> = {
  SYSTEM:   { color: 'var(--theme-color-grey-50)',    chip: false },
  CARRIER:  { color: 'var(--theme-color-grey-50)',    chip: false },
  OUTBOUND: { bg: 'var(--theme-color-primary-10)', color: 'var(--theme-color-primary-70)', chip: true },
  INTERNAL: { bg: 'var(--theme-color-teal-10)',    color: 'var(--theme-color-teal-100)',   chip: true },
};

function ActivityAvatar({ type, label }: { type: ActivityItem['avatarType']; label?: string }) {
  if (type === 'system') {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: 'var(--theme-color-grey-10)',
        border: '1px solid var(--theme-color-grey-20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="var(--theme-color-grey-50)" strokeWidth="1.6"/>
          <path d="M12 7v5l3 3" stroke="var(--theme-color-grey-50)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    );
  }
  if (type === 'carrier') {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: '#102B46',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: -0.3 }}>{label}</span>
      </div>
    );
  }
  if (type === 'email') {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: 'var(--theme-color-primary-10)',
        border: '1px solid var(--theme-color-primary-20)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--theme-color-primary-60)" strokeWidth="1.6"/>
          <path d="M3 8l9 6 9-6" stroke="var(--theme-color-primary-60)" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }
  // person
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: '#1D3A5F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function ActivityTag({ tag }: { tag: ActivityTag }) {
  const s = TAG_STYLES[tag];
  if (s.chip) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: s.bg, borderRadius: 4,
        padding: '1px 6px',
      }}>
        <Text variant="body" size="sm" style={{ color: s.color, fontSize: 10, fontWeight: 600, letterSpacing: '0.4px' }}>
          {tag}
        </Text>
      </div>
    );
  }
  return (
    <Text variant="body" size="sm" style={{ color: s.color, fontSize: 11, fontWeight: 500, letterSpacing: '0.4px' }}>
      {tag}
    </Text>
  );
}

function RecentActivityCard() {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Note composer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          background: '#1D3A5F',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>SK</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Input placeholder="Add a note to this shipment..." floated={false} />
        </div>
      </div>

      {/* Feed */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {ACTIVITY_FEED.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              paddingTop: i === 0 ? 0 : 14,
              paddingBottom: i < ACTIVITY_FEED.length - 1 ? 14 : 0,
              borderBottom: i < ACTIVITY_FEED.length - 1 ? '1px solid var(--theme-color-grey-10)' : 'none',
            }}
          >
            <ActivityAvatar type={item.avatarType} label={item.avatarLabel} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3, flexWrap: 'wrap' }}>
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  {item.actor}
                </Text>
                <ActivityTag tag={item.tag} />
              </div>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)', lineHeight: '20px' }}>
                {item.description}
              </Text>
            </div>
            <div style={{ marginTop: 1, flexShrink: 0 }}>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', whiteSpace: 'nowrap' }}>
                {item.time}
              </Text>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--theme-color-grey-10)', paddingTop: 12 }}>
        <Button variant="link" size="sm" icon={<ChevronRight width={10} height={10} />} iconPosition="end" style={{ marginRight: -4 }}>View all communications</Button>
      </div>
    </div>
  );

  return (
    <Collapse
      className="sd-activity-collapse"
      defaultActiveKey={['recent-activity']}
      items={[{
        key: 'recent-activity',
        label: 'Recent Activity',
        extra: <Button variant="link" size="sm" style={{ marginRight: -4 }}>View all →</Button>,
                collapsible: 'icon',
        children: content,
      }]}
    />
  );
}

type PreviewStage = 'booking' | 'pre-shipment' | 'cargo-ready' | 'in-transit' | 'completed';

const PREVIEW_STAGES: { key: PreviewStage; label: string }[] = [
  { key: 'booking',      label: 'Booking' },
  { key: 'pre-shipment', label: 'Pre-Shipment' },
  { key: 'cargo-ready',  label: 'Cargo Ready' },
  { key: 'in-transit',   label: 'In Transit' },
  { key: 'completed',    label: 'Completed' },
];

type ChargesData = {
  pill: { label: string; color: string };
  sales: number | null;
  purchase: number | null;
  grossMarginAmt: number | null;
  invoicesRaised: number;
  disputed: number; // 0 = no disputes, >0 = show amount in error color
};

const CHARGES_BY_STAGE: Record<PreviewStage, ChargesData> = {
  booking: {
    pill: { label: 'Not Started', color: 'default' },
    sales: null, purchase: null, grossMarginAmt: null, invoicesRaised: 0, disputed: 0,
  },
  'pre-shipment': {
    pill: { label: '~ Estimated', color: 'yellow' },
    sales: 5040, purchase: 4371, grossMarginAmt: 669, invoicesRaised: 0, disputed: 0,
  },
  'cargo-ready': {
    pill: { label: '~ Estimated', color: 'yellow' },
    sales: 5040, purchase: 4320, grossMarginAmt: 720, invoicesRaised: 1, disputed: 0,
  },
  'in-transit': {
    pill: { label: '~ Estimated', color: 'yellow' },
    sales: 5040, purchase: 4371, grossMarginAmt: 669, invoicesRaised: 2, disputed: 420,
  },
  completed: {
    pill: { label: 'Confirmed', color: 'success' },
    sales: 5040, purchase: 4371, grossMarginAmt: 669, invoicesRaised: 7, disputed: 0,
  },
};

function ChargesCard({ stage }: { stage: PreviewStage }) {
  const data = CHARGES_BY_STAGE[stage];
  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  const empty = data.sales === null;

  return (
    <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16 }}>
        <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)', fontSize: 16 }}>Charges Summary</Text>
        <Pill color={data.pill.color} theme="light" size="sm" showIcon={false}>{data.pill.label}</Pill>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Gross Margin</Text>
            <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, color: empty ? 'var(--theme-color-grey-100)' : 'var(--theme-color-success-100)', fontFamily: 'var(--font-inter)' }}>
              {empty ? '—' : fmt(data.grossMarginAmt!)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Sales</Text>
              <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: 'var(--theme-color-grey-100)', fontFamily: 'var(--font-inter)' }}>{empty ? '—' : fmt(data.sales!)}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Purchase</Text>
              <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: 'var(--theme-color-grey-100)', fontFamily: 'var(--font-inter)' }}>{empty ? '—' : fmt(data.purchase!)}</span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'var(--theme-color-grey-10)', marginTop: 16 }} />

        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Invoices Raised</Text>
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)' }}>{empty || data.invoicesRaised === 0 ? '—' : data.invoicesRaised}</Text>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Disputed</Text>
            <Text variant="body" size="md" style={{ color: data.disputed > 0 ? 'var(--theme-color-error-120)' : 'var(--theme-color-grey-100)' }}>{empty || data.disputed === 0 ? '—' : fmt(data.disputed)}</Text>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', paddingTop: 12 }}>
          <Button variant="link" size="sm" icon={<ChevronRight width={10} height={10} />} iconPosition="end" style={{ marginLeft: -4 }}>View all charges</Button>
        </div>
      </div>
    </div>
  );
}

function OverviewContent({ previewStage, setPreviewStage }: { previewStage: PreviewStage; setPreviewStage: (s: PreviewStage) => void }) {
  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const activeStage = PREVIEW_STAGES.find(s => s.key === previewStage)!;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 350 }}>
        <TasksSummaryCard stage={previewStage} />
        <ChargesCard stage={previewStage} />
      </div>
      <BookingDetailsCard />
      <ContainerSummaryCard />

      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--theme-color-grey-90)',
        borderRadius: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}>
        {switcherOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', padding: '7px 7px 7px 14px', gap: 10 }}>
            <span style={{ color: 'var(--theme-color-grey-50)', fontSize: 10, fontFamily: 'var(--font-inter)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Stage
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {PREVIEW_STAGES.map((s, i) => (
                <React.Fragment key={s.key}>
                  {i > 0 && <span style={{ color: 'var(--theme-color-grey-60)', fontSize: 10, padding: '0 2px' }}>·</span>}
                  <button
                    onClick={() => { setPreviewStage(s.key); setSwitcherOpen(false); }}
                    style={{
                      padding: '3px 6px',
                      border: 'none',
                      cursor: 'pointer',
                      background: 'transparent',
                      color: previewStage === s.key ? 'var(--theme-color-pure-100)' : 'var(--theme-color-grey-50)',
                      fontSize: 12,
                      fontWeight: previewStage === s.key ? 600 : 400,
                      fontFamily: 'var(--font-inter)',
                      lineHeight: 1,
                    }}
                  >
                    {s.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={() => setSwitcherOpen(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'var(--theme-color-grey-80)', flexShrink: 0 }}
            >
              <Chevrondown width={11} height={11} style={{ color: 'var(--theme-color-grey-30)', transform: 'rotate(180deg)' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSwitcherOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 7px 7px 14px', border: 'none', cursor: 'pointer', background: 'transparent', borderRadius: 999 }}
          >
            <span style={{ color: 'var(--theme-color-grey-50)', fontSize: 10, fontFamily: 'var(--font-inter)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Stage</span>
            <span style={{ color: 'var(--theme-color-pure-100)', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-inter)' }}>{activeStage.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 999, background: 'var(--theme-color-grey-80)' }}>
              <Chevrondown width={11} height={11} style={{ color: 'var(--theme-color-grey-30)' }} />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

const CURRENT_USER_INITIALS = 'SK';
function displayName(name: string, initials: string): string {
  return initials === CURRENT_USER_INITIALS ? `${name} (You)` : name;
}

// ─── Right Panel: Tasks ───────────────────────────────────────────────────────

const URGENCY_CONFIG: Record<string, { label: string; dateColor: string }> = {
  'overdue':   { label: 'Overdue',   dateColor: 'var(--theme-color-error-100)'  },
  'due-today': { label: 'Due Today', dateColor: 'var(--theme-color-orange-120)' },
  'this-week': { label: 'This Week', dateColor: 'var(--theme-color-grey-50)'    },
  'upcoming':  { label: 'Upcoming',  dateColor: 'var(--theme-color-grey-50)'    },
};

type TaskCategory = 'document' | 'booking' | 'communication' | 'logistics' | 'customs' | 'finance' | 'custom';
interface Task {
  id: number; title: string; urgency: string; stage: string; dateLabel: string;
  assignee: { initials: string; name: string; color: string } | null;
  category: TaskCategory; linkedCTA?: string;
}

const TASKS_DATA: Task[] = [
  { id: 1, title: 'Submit Shipping Instructions',     urgency: 'overdue',   stage: 'Pre-Shipment', dateLabel: 'Overdue since 05 May 26, 17:00', assignee: { initials: 'SK', name: 'Sahil Kala', color: '#1D3A5F' }, category: 'document',      linkedCTA: 'Submit SI'   },
  { id: 2, title: 'Upload VGM Certificate',           urgency: 'overdue',   stage: 'Pre-Shipment', dateLabel: 'Overdue since 03 May 26, 23:59', assignee: { initials: 'PS', name: 'Priya Sharma', color: '#4A90D9' }, category: 'document'                        },
  { id: 3, title: 'BL Draft Review & Approval',       urgency: 'due-today', stage: 'Pre-Shipment', dateLabel: 'Due today, 17:00',               assignee: { initials: 'SK', name: 'Sahil Kala', color: '#1D3A5F' }, category: 'document',      linkedCTA: 'Review BL'  },
  { id: 4, title: 'Confirm Cargo Ready Date',         urgency: 'this-week', stage: 'Pre-Shipment', dateLabel: 'Due 09 May 26',                  assignee: { initials: 'SK', name: 'Sahil Kala', color: '#1D3A5F' }, category: 'logistics'                       },
  { id: 5, title: 'Arrange Inland Transport to Port', urgency: 'this-week', stage: 'Cargo Ready',  dateLabel: 'Due 10 May 26',                  assignee: null,                                                   category: 'logistics'                       },
  { id: 6, title: 'Notify Customer — Departure',      urgency: 'upcoming',  stage: 'On the Water', dateLabel: 'Due 18 May 26',                  assignee: { initials: 'AM', name: 'Amir Mohsin',  color: '#D32F2F' }, category: 'communication', linkedCTA: 'Send Mail'      },
  { id: 7, title: 'File Export Customs Declaration',  urgency: 'upcoming',  stage: 'Pre-Shipment', dateLabel: 'Due 20 May 26',                  assignee: null,                                                   category: 'customs'                         },
];

const TASKS_BY_STAGE: Record<PreviewStage, Task[]> = {
  booking: [
    { id: 101, title: 'Confirm Carrier Booking',                 urgency: 'due-today', stage: 'Booking', dateLabel: 'Due today, 18:00',   assignee: { initials: 'SK', name: 'Sahil Kala',  color: '#1D3A5F' }, category: 'booking'                       },
    { id: 102, title: 'Send Quotation to Customer',              urgency: 'this-week', stage: 'Booking', dateLabel: 'Due 20 Apr 26',      assignee: { initials: 'SK', name: 'Sahil Kala',  color: '#1D3A5F' }, category: 'communication', linkedCTA: 'Send Mail' },
    { id: 103, title: 'Collect Commercial Invoice & Packing List', urgency: 'this-week', stage: 'Booking', dateLabel: 'Due 22 Apr 26',  assignee: null,                                                    category: 'document'                      },
    { id: 104, title: 'Set Up Shipment File',                    urgency: 'upcoming',  stage: 'Booking', dateLabel: 'Due 25 Apr 26',      assignee: { initials: 'AM', name: 'Amir Mohsin', color: '#D32F2F' }, category: 'booking'                       },
  ],
  'pre-shipment': [
    { id: 1,   title: 'Submit Shipping Instructions',            urgency: 'overdue',   stage: 'Pre-Shipment', dateLabel: 'Overdue since 05 May 26, 17:00', assignee: { initials: 'SK', name: 'Sahil Kala',   color: '#1D3A5F' }, category: 'document',  linkedCTA: 'Submit SI'  },
    { id: 2,   title: 'Upload VGM Certificate',                  urgency: 'overdue',   stage: 'Pre-Shipment', dateLabel: 'Overdue since 03 May 26, 23:59', assignee: { initials: 'PS', name: 'Priya Sharma', color: '#4A90D9' }, category: 'document'                      },
    { id: 3,   title: 'BL Draft Review & Approval',              urgency: 'due-today', stage: 'Pre-Shipment', dateLabel: 'Due today, 17:00',               assignee: { initials: 'SK', name: 'Sahil Kala',   color: '#1D3A5F' }, category: 'document',  linkedCTA: 'Review BL' },
    { id: 4,   title: 'Confirm Cargo Ready Date',                urgency: 'this-week', stage: 'Pre-Shipment', dateLabel: 'Due 09 May 26',                  assignee: { initials: 'SK', name: 'Sahil Kala',   color: '#1D3A5F' }, category: 'logistics'                     },
    { id: 7,   title: 'File Export Customs Declaration',         urgency: 'upcoming',  stage: 'Pre-Shipment', dateLabel: 'Due 20 May 26',                  assignee: null,                                                    category: 'customs'                       },
  ],
  'cargo-ready': [
    { id: 201, title: 'Confirm Cargo Handover at CY',            urgency: 'due-today', stage: 'Cargo Ready', dateLabel: 'Due today, 12:00',  assignee: { initials: 'SK', name: 'Sahil Kala',  color: '#1D3A5F' }, category: 'logistics'                         },
    { id: 5,   title: 'Arrange Inland Transport to Port',        urgency: 'this-week', stage: 'Cargo Ready', dateLabel: 'Due 10 May 26',     assignee: null,                                                   category: 'logistics'                         },
    { id: 202, title: 'Notify Customer — Cargo Ready',           urgency: 'this-week', stage: 'Cargo Ready', dateLabel: 'Due 11 May 26',     assignee: { initials: 'AM', name: 'Amir Mohsin', color: '#D32F2F' }, category: 'communication', linkedCTA: 'Send Mail' },
  ],
  'in-transit': [
    { id: 301, title: 'Prepare Import Documentation',            urgency: 'due-today', stage: 'In Transit', dateLabel: 'Due today, 17:00',  assignee: { initials: 'SK', name: 'Sahil Kala',  color: '#1D3A5F' }, category: 'document'                          },
    { id: 302, title: 'Monitor Vessel ETA',                      urgency: 'this-week', stage: 'In Transit', dateLabel: 'Due 14 May 26',     assignee: { initials: 'SK', name: 'Sahil Kala',  color: '#1D3A5F' }, category: 'logistics'                         },
    { id: 6,   title: 'Notify Customer — ETA Update',            urgency: 'upcoming',  stage: 'In Transit', dateLabel: 'Due 18 May 26',     assignee: { initials: 'AM', name: 'Amir Mohsin', color: '#D32F2F' }, category: 'communication', linkedCTA: 'Send Mail' },
  ],
  completed: [],
};

function getCategoryIcon(category: TaskCategory, color: string): React.ReactNode {
  const p = { width: 12, height: 12, color };
  switch (category) {
    case 'document': case 'customs': case 'finance': return <DocIcon {...p} />;
    case 'booking':       return <Building     {...p} />;
    case 'communication': return <MailOutline  {...p} />;
    case 'logistics':     return <ShipmentIcon {...p} />;
    case 'custom':        return <HelpIcon     {...p} />;
  }
}

const TASK_TYPES = [
  'Submit Shipping Instructions', 'Submit VGM Declaration', 'BL Draft Review & Approval',
  'Place Carrier Booking Request', 'File Export Customs Declaration', 'Cargo/CY Cutoff — Action Required',
  'Collect Certificate of Origin', 'Upload Packing List', 'Upload Commercial Invoice',
  'Original BL Release / Telex Release', 'Notify Customer — Departure', 'Confirm Final Delivery',
  'Chase Booking Confirmation', 'Booking Amendment Required', 'Dangerous Goods Declaration',
];

const LIFECYCLE_STAGES = [
  'Booking Initiated', 'Booking Confirmed', 'Pre-Shipment',
  'Cargo Ready', 'On the Water', 'In Transit',
  'Arrived at POD', 'Clearance & Delivery', 'Completed',
];

const PANEL_ASSIGNEES = [
  { initials: 'SK', name: 'Sahil Kala', color: '#1D3A5F' },
  { initials: 'RA', name: 'Ravi Arora',  color: '#34A853' },
  { initials: 'PS', name: 'Priya Sharma', color: '#4A90D9' },
  { initials: 'NT', name: 'Neha Tiwari',  color: '#9E9E9E' },
  { initials: 'AM', name: 'Amir Mohsin',  color: '#D32F2F' },
];

const DROPDOWN_PANEL: React.CSSProperties = {
  background: 'var(--theme-color-pure-100)',
  borderRadius: 10,
  boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
  border: '1px solid var(--theme-color-grey-10)',
  minWidth: 200,
  overflow: 'hidden',
};

function FilterDropdownChip({
  label, active, open, onOpenChange, dropdownContent,
}: {
  label: string; active: boolean; open: boolean;
  onOpenChange: (v: boolean) => void; dropdownContent: React.ReactNode;
}) {
  return (
    <Dropdown
      trigger={['click']}
      open={open}
      onOpenChange={onOpenChange}
      placement="bottomLeft"
      overlay={<div style={DROPDOWN_PANEL}>{dropdownContent}</div>}
    >
      <div>
        <Button
          variant="secondary"
          size="sm"
          style={active ? { background: 'var(--theme-color-primary-10)', borderColor: 'var(--theme-color-primary-20)', color: 'var(--theme-color-primary-60)' } : {}}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            {label}
            <Chevrondown width={10} height={10} color={active ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-40)'} />
          </span>
        </Button>
      </div>
    </Dropdown>
  );
}

function TaskCard({ task, completed, onToggleComplete, hideMenu = false }: {
  task: Task; completed: boolean; onToggleComplete: () => void; hideMenu?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cfg = URGENCY_CONFIG[task.urgency];

  const menuItems = [
    { key: 'complete', type: 'action' as const, label: completed ? 'Reopen' : 'Mark Complete' },
    { key: 'reassign', type: 'action' as const, label: 'Reassign' },
    { key: 'deadline', type: 'action' as const, label: 'Edit Deadline' },
  ];

  const handleMenuAction = (key: string) => {
    if (key === 'complete') onToggleComplete();
    setMenuOpen(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Rows 1+2 container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Row 1 — task name */}
          <Text variant="body" size="sm" weight="medium" style={{
            color: completed ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-100)',
            textDecoration: completed ? 'line-through' : 'none',
            display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {task.title}
          </Text>

          {/* Row 2 — icon + date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {getCategoryIcon(task.category, completed ? 'var(--theme-color-grey-30)' : cfg.dateColor)}
            <Text variant="body" size="sm" style={{
              color: completed ? 'var(--theme-color-grey-30)' : cfg.dateColor,
              fontSize: 11,
            }}>
              {completed ? 'Completed' : task.dateLabel}
            </Text>
          </div>
        </div>

        {/* Row 3 — assignee */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {task.assignee ? (
            <>
              <Avatar size={18} style={{ background: task.assignee.color, fontSize: 9, fontWeight: 600, flexShrink: 0 }}>
                {task.assignee.initials}
              </Avatar>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 11 }}>
                {displayName(task.assignee.name, task.assignee.initials)}
              </Text>
            </>
          ) : (
            <>
              <div style={{
                width: 18, height: 18, flexShrink: 0, borderRadius: '50%',
                border: '1.5px dashed var(--theme-color-grey-30)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <User width={10} height={10} color="var(--theme-color-grey-30)" />
              </div>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-30)', fontSize: 11 }}>
                Unassigned
              </Text>
            </>
          )}
        </div>

      </div>

      {/* Right side — CTA link button + overflow, centre-aligned with each other */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        {task.linkedCTA && !completed && task.assignee?.initials === 'SK' && (
          <Button
            variant="link"
            size="sm"
            icon={<ChevronRight width={10} height={10} />}
            iconPosition="end"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {task.linkedCTA}
          </Button>
        )}

      {/* Three-dot menu */}
      {!hideMenu && (
        <Dropdown
          trigger={['click']}
          open={menuOpen}
          onOpenChange={(v: boolean) => setMenuOpen(v)}
          placement="bottomRight"
          items={menuItems}
          onAction={handleMenuAction}
          showTick={false}
        >
          <button
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <MoreVert width={14} height={14} color="var(--theme-color-grey-100)" />
          </button>
        </Dropdown>
      )}
      </div>

    </div>
  );
}

function RightPanelTasks() {
  const [openFilter, setOpenFilter]       = useState<string | null>(null);
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [typeFilter, setTypeFilter]       = useState<string[]>([]);
  const [stageFilter, setStageFilter]     = useState<string[]>([]);
  const [dateFrom, setDateFrom]           = useState('');
  const [dateTo, setDateTo]               = useState('');
  const [completedIds, setCompletedIds]   = useState<Set<number>>(new Set());

  const toggleComplete = (id: number) => setCompletedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const toggleFilter  = (key: string) => setOpenFilter(p => p === key ? null : key);
  const toggleType    = (v: string) => setTypeFilter(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const toggleStage   = (v: string) => setStageFilter(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const filtered = TASKS_DATA.filter(t => {
    const done = completedIds.has(t.id);
    if (urgencyFilter === 'completed') return done;
    if (done) return false;
    if (urgencyFilter !== 'all' && t.urgency !== urgencyFilter) return false;
    if (assigneeFilter !== 'all' && assigneeFilter !== 'mine' && t.assignee?.initials !== assigneeFilter) return false;
    if (typeFilter.length > 0 && !typeFilter.includes(t.title)) return false;
    if (stageFilter.length > 0 && !stageFilter.includes(t.stage)) return false;
    return true;
  });

  const urgencyLabel  = 'Urgency';
  const assigneeLabel = 'Assignee';
  const typeLabel     = 'Type';
  const stageLabel    = 'Stage';
  const dateLabel     = 'Date Range';

  // Row style for single-select dropdown items
  const ddRow = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 14px', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
    background: active ? 'var(--theme-color-primary-10)' : 'transparent',
    color: active ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-80)',
    transition: 'background 0.1s',
  });

  // Row style for multi-select dropdown items
  const ddCheckRow = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '7px 14px', cursor: 'pointer',
    background: active ? 'var(--theme-color-primary-5)' : 'transparent',
  });

  const CustomCheckbox = ({ checked }: { checked: boolean }) => (
    <div style={{
      width: 14, height: 14, borderRadius: 3, flexShrink: 0,
      border: `1.5px solid ${checked ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-30)'}`,
      background: checked ? 'var(--theme-color-primary-60)' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {checked && <Tick width={9} height={9} color="white" />}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* ── Filter chips row ── */}
      <div className="sd-tab-content" style={{ display: 'flex', gap: 6, padding: '10px 16px', minHeight: 48, borderBottom: '1px solid var(--theme-color-grey-10)', flexShrink: 0, overflowX: 'auto' }}>

        {/* Urgency Tier */}
        <FilterDropdownChip
          label={urgencyLabel} active={urgencyFilter !== 'all'}
          open={openFilter === 'urgency'} onOpenChange={v => setOpenFilter(v ? 'urgency' : null)}
          dropdownContent={
            <div style={{ padding: '6px 0' }}>
              {[{ key: 'all', label: 'All' }, { key: 'overdue', label: 'Overdue' }, { key: 'due-today', label: 'Due Today' }, { key: 'this-week', label: 'This Week' }, { key: 'upcoming', label: 'Upcoming' }, { key: 'completed', label: 'Completed' }].map(opt => (
                <div key={opt.key} style={ddRow(urgencyFilter === opt.key)} onClick={() => { setUrgencyFilter(opt.key); setOpenFilter(null); }}>
                  <Text variant="body" size="sm" style={{ color: 'inherit' }}>{opt.label}</Text>
                  {urgencyFilter === opt.key && <Tick width={12} height={12} color="var(--theme-color-primary-60)" />}
                </div>
              ))}
            </div>
          }
        />

        {/* Assignee */}
        <FilterDropdownChip
          label={assigneeLabel} active={assigneeFilter !== 'all'}
          open={openFilter === 'assignee'} onOpenChange={v => setOpenFilter(v ? 'assignee' : null)}
          dropdownContent={
            <div style={{ padding: '6px 0' }}>
              {[{ key: 'all', label: 'All', initials: null as string | null, color: null as string | null }, { key: 'mine', label: 'Mine', initials: null, color: null }, ...PANEL_ASSIGNEES.map(a => ({ key: a.initials, label: a.name, initials: a.initials, color: a.color }))].map(opt => (
                <div key={opt.key} style={ddRow(assigneeFilter === opt.key)} onClick={() => { setAssigneeFilter(opt.key); setOpenFilter(null); }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    {opt.initials && (
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: opt.color!, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: '#fff', flexShrink: 0 }}>
                        {opt.initials}
                      </span>
                    )}
                    <Text variant="body" size="sm" style={{ color: 'inherit' }}>{opt.label}</Text>
                  </div>
                  {assigneeFilter === opt.key && <Tick width={12} height={12} color="var(--theme-color-primary-60)" />}
                </div>
              ))}
            </div>
          }
        />

        {/* Task Type */}
        <FilterDropdownChip
          label={typeLabel} active={typeFilter.length > 0}
          open={openFilter === 'type'} onOpenChange={v => setOpenFilter(v ? 'type' : null)}
          dropdownContent={
            <div>
              {typeFilter.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 14px', borderBottom: '1px solid var(--theme-color-grey-10)' }}>
                  <button onClick={() => setTypeFilter([])} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 12, color: 'var(--theme-color-primary-60)', fontFamily: 'inherit' }}>Clear</button>
                </div>
              )}
              <div className="sd-tab-content" style={{ maxHeight: 240, overflowY: 'auto', padding: '4px 0' }}>
                {TASK_TYPES.map(type => {
                  const on = typeFilter.includes(type);
                  return (
                    <div key={type} style={ddCheckRow(on)} onClick={() => toggleType(type)}>
                      <CustomCheckbox checked={on} />
                      <Text variant="body" size="sm" style={{ color: on ? 'var(--theme-color-grey-100)' : 'var(--theme-color-grey-70)' }}>{type}</Text>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />

        {/* Stage */}
        <FilterDropdownChip
          label={stageLabel} active={stageFilter.length > 0}
          open={openFilter === 'stage'} onOpenChange={v => setOpenFilter(v ? 'stage' : null)}
          dropdownContent={
            <div>
              {stageFilter.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 14px', borderBottom: '1px solid var(--theme-color-grey-10)' }}>
                  <button onClick={() => setStageFilter([])} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 12, color: 'var(--theme-color-primary-60)', fontFamily: 'inherit' }}>Clear</button>
                </div>
              )}
              <div style={{ padding: '4px 0' }}>
                {LIFECYCLE_STAGES.map(s => {
                  const on = stageFilter.includes(s);
                  return (
                    <div key={s} style={ddCheckRow(on)} onClick={() => toggleStage(s)}>
                      <CustomCheckbox checked={on} />
                      <Text variant="body" size="sm" style={{ color: on ? 'var(--theme-color-grey-100)' : 'var(--theme-color-grey-70)' }}>{s}</Text>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />

        {/* Date Range */}
        <FilterDropdownChip
          label={dateLabel} active={!!(dateFrom || dateTo)}
          open={openFilter === 'date'} onOpenChange={v => setOpenFilter(v ? 'date' : null)}
          dropdownContent={
            <div style={{ padding: 14 }} onClick={e => e.stopPropagation()}>
              <div style={{ marginBottom: 12 }}><Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-70)', display: 'block' }}>Date Range</Text></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ marginBottom: 4 }}><Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', display: 'block' }}>From</Text></div>
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ width: '100%', height: 32, border: '1px solid var(--theme-color-grey-20)', borderRadius: 6, padding: '0 8px', fontSize: 12, fontFamily: 'inherit', color: 'var(--theme-color-grey-80)', outline: 'none', background: 'var(--theme-color-pure-100)', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ marginBottom: 4 }}><Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', display: 'block' }}>To</Text></div>
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ width: '100%', height: 32, border: '1px solid var(--theme-color-grey-20)', borderRadius: 6, padding: '0 8px', fontSize: 12, fontFamily: 'inherit', color: 'var(--theme-color-grey-80)', outline: 'none', background: 'var(--theme-color-pure-100)', boxSizing: 'border-box' }} />
                </div>
                {(dateFrom || dateTo) && (
                  <button onClick={() => { setDateFrom(''); setDateTo(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 12, color: 'var(--theme-color-primary-60)', fontFamily: 'inherit', textAlign: 'left' }}>
                    Clear dates
                  </button>
                )}
              </div>
            </div>
          }
        />

      </div>

      {/* ── Flat task list ── */}
      <div style={{ padding: 16 }}>
        {filtered.length === 0 ? (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', display: 'block' }}>
              No tasks match the selected filters
            </Text>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((t, i) => (
              <React.Fragment key={t.id}>
                {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
                <TaskCard task={t} completed={completedIds.has(t.id)} onToggleComplete={() => toggleComplete(t.id)} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ─── Right Panel: Messages ────────────────────────────────────────────────────

type EmailDirection = 'inbound' | 'outbound' | 'carrier';
type EmailState = 'reply-required' | 'awaiting-reply' | 'none';

interface Email {
  id: number;
  otherParty: string;       // always the non-INBRIT party
  initials: string;
  avatarColor: string;
  direction: EmailDirection;
  subject: string;
  time: string;
  state: EmailState;
}

const EMAILS: Email[] = [
  {
    id: 1,
    otherParty: 'Rohan More (Voltas)',
    initials: 'RM',
    avatarColor: '#1D3A5F',
    direction: 'inbound',
    subject: 'RE: Booking Request — Metal Scrap April Shipment',
    time: '02 May, 10:05',
    state: 'reply-required',
  },
  {
    id: 2,
    otherParty: 'MSC Notifications',
    initials: 'MSC',
    avatarColor: '#102B46',
    direction: 'carrier',
    subject: 'Booking MSCUUK987654 — Schedule Update',
    time: '05 May, 11:42',
    state: 'none',
  },
  {
    id: 3,
    otherParty: 'Rohan More (Voltas)',
    initials: 'RM',
    avatarColor: '#1D3A5F',
    direction: 'outbound',
    subject: 'Booking Confirmation — ONH-2026-04821 / MSCUUK987654',
    time: '03 May, 16:20',
    state: 'awaiting-reply',
  },
  {
    id: 4,
    otherParty: 'Rohan More (Voltas)',
    initials: 'RM',
    avatarColor: '#1D3A5F',
    direction: 'outbound',
    subject: 'Booking Request Received — Metal Scrap INMUN→AEJEA',
    time: '14 Jan, 09:30',
    state: 'none',
  },
];

const EMAIL_DIR_STYLE: Record<EmailDirection, { bg: string; color: string; label: string }> = {
  inbound:  { bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)', label: 'INBOUND'  },
  outbound: { bg: 'var(--theme-color-primary-10)', color: 'var(--theme-color-primary-70)',  label: 'OUTBOUND' },
  carrier:  { bg: 'var(--theme-color-grey-10)',    color: 'var(--theme-color-grey-60)',     label: 'CARRIER'  },
};

function EmailDirTag({ direction }: { direction: EmailDirection }) {
  const s = EMAIL_DIR_STYLE[direction];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: s.bg, borderRadius: 4, padding: '1px 6px', flexShrink: 0 }}>
      <Text variant="body" size="sm" style={{ color: s.color, fontSize: 10, fontWeight: 600, letterSpacing: '0.4px' }}>
        {s.label}
      </Text>
    </div>
  );
}

function EmailStateChip({ state }: { state: EmailState }) {
  if (state === 'reply-required') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--theme-color-orange-10)', borderRadius: 4, padding: '1px 6px', flexShrink: 0 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--theme-color-orange-100)', display: 'inline-block', flexShrink: 0 }} />
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-orange-120)', fontSize: 10, fontWeight: 600 }}>
          REPLY REQUIRED
        </Text>
      </div>
    );
  }
  if (state === 'awaiting-reply') {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--theme-color-grey-10)', borderRadius: 4, padding: '1px 6px', flexShrink: 0 }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 10, fontWeight: 500 }}>
          AWAITING REPLY
        </Text>
      </div>
    );
  }
  return null;
}

function MessageCard({ email }: { email: Email }) {
  return (
    <div style={{
      background: 'var(--theme-color-pure-100)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: 'pointer',
    }}>
      {/* Avatar */}
      <Avatar size={32} style={{ background: email.avatarColor, fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
        {email.initials}
      </Avatar>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Rows 1+2 container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Row 1: Name + direction tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexShrink: 1 }}>
              {email.otherParty}
            </Text>
            <EmailDirTag direction={email.direction} />
          </div>

          {/* Row 2: Timestamp */}
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 11 }}>
            {email.time}
          </Text>
        </div>

        {/* Row 3: Subject */}
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
          {email.subject}
        </Text>
      </div>

      {/* Right side: CTA — mirrors TaskCard's right-column pattern */}
      <div style={{ flexShrink: 0 }}>
        <Button
          variant="link"
          size="sm"
          icon={<ChevronRight width={10} height={10} />}
          iconPosition="end"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          View Mail
        </Button>
      </div>
    </div>
  );
}

function RightPanelMessages() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 48, flexShrink: 0, borderBottom: '1px solid var(--theme-color-grey-10)' }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
          {EMAILS.length} emails
        </Text>
        <Button variant="secondary" size="sm" icon={<Add width={12} height={12} />}>
          Compose
        </Button>
      </div>

      {/* Email list */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EMAILS.map((email, i) => (
          <React.Fragment key={email.id}>
            {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
            <MessageCard email={email} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const HEADER_PILL_MAP: Record<PreviewStage, { booking: { label: string; color: string }; stage: { label: string; color: string } }> = {
  booking:       { booking: { label: 'Booking Pending',   color: 'yellow'   }, stage: { label: 'Booking',      color: 'default' } },
  'pre-shipment':{ booking: { label: 'Booking Confirmed', color: 'success'  }, stage: { label: 'Pre-Shipment', color: 'blue'    } },
  'cargo-ready': { booking: { label: 'Booking Confirmed', color: 'success'  }, stage: { label: 'Cargo Ready',  color: 'blue'    } },
  'in-transit':  { booking: { label: 'Booking Confirmed', color: 'success'  }, stage: { label: 'In Transit',   color: 'blue'    } },
  completed:     { booking: { label: 'Booking Confirmed', color: 'success'  }, stage: { label: 'Completed',    color: 'success' } },
};

export default function ShipmentDetailsPage({ params }: Props) {
  const router = useRouter();
const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [rightPanelTab, setRightPanelTab] = useState('tasks');
  const [previewStage, setPreviewStage] = useState<PreviewStage>('in-transit');

  const mainTabItems = [
    { key: 'overview',   label: 'Overview',   children: null },
    { key: 'booking',    label: 'Booking',    children: null },
    { key: 'documents',  label: 'Documents',  children: null },
    { key: 'containers', label: 'Containers', children: null },
    { key: 'parties',    label: 'Parties',    children: null },
    { key: 'charges',    label: 'Charges',    children: null },
    { key: 'event-log',  label: 'Event Log',  children: null },
  ];

  const expandButton = (
    <Button
      variant="secondary"
      size="md"
      icon={rightPanelOpen
        ? <Leftpanelopen width={16} height={16} />
        : <Leftpanelclose width={16} height={16} />
      }
      onClick={() => setRightPanelOpen((o) => !o)}
    />
  );

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--theme-color-grey-5)', position: 'relative' }}>
      <NavBar />

      {/* White card — single flex row: left content + right panel inside */}
      <div style={{
        position: 'absolute',
        top: 72, left: 12, right: 12, bottom: 12,
        background: 'var(--theme-color-pure-100)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        padding: '40px 0 0 40px',
        overflowY: 'auto',
        boxShadow: '-2px 0px 8px rgba(136, 136, 136, 0.06)',
      }}>

        {/* Left column: breadcrumb + title + tabs + scrollable content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', paddingRight: rightPanelOpen ? 0 : 40 }}>

          {/* Breadcrumb */}
          <div style={{ marginBottom: 24, flexShrink: 0 }}>
            <Breadcrumb
              items={[
                {
                  title: (
                    <span
                      onClick={() => router.push('/shipments')}
                      style={{ cursor: 'pointer', color: 'var(--theme-color-grey-50)', fontSize: 12 }}
                    >
                      Shipments
                    </span>
                  ),
                },
                {
                  title: (
                    <span style={{ color: 'var(--theme-color-primary-100)', fontSize: 12, fontWeight: 500 }}>
                      ONH-2026-04821
                    </span>
                  ),
                },
              ]}
            />
          </div>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32, flexShrink: 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  ONH-2026-04821
                </Text>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  <Pill color={HEADER_PILL_MAP[previewStage].booking.color} theme="light" size="sm" showIcon={false}>{HEADER_PILL_MAP[previewStage].booking.label}</Pill>
                  <Pill color={HEADER_PILL_MAP[previewStage].stage.color} theme="light" size="sm" showIcon={false}>{HEADER_PILL_MAP[previewStage].stage.label}</Pill>
                </div>
              </div>
              <div style={{ marginTop: 4 }}>
                <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-50)' }}>
                  {'Voltas India Limited • '}
                  <span style={{ color: 'var(--theme-color-orange-120)', fontWeight: 500 }}>INMUN</span>
                  {', Mumbai → '}
                  <span style={{ color: 'var(--theme-color-orange-120)', fontWeight: 500 }}>AEJEA</span>
                  {', Jebel Ali • FCL • Door to Door'}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
<Dropdown
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="sd-overflow-menu"
                items={[
                  { key: 'amend-booking',   type: 'action', label: 'Amend Booking',                                   icon: <ChevronRight width={14} height={14} /> },
                  { key: 'split-shipment',  type: 'action', label: 'Split Shipment',                                  icon: <Add width={14} height={14} /> },
                  { key: 'merge-shipments', type: 'action', label: 'Merge Shipments',                                 icon: <Bulkadd width={14} height={14} /> },
                  { type: 'divider' },
                  { key: 'assign-to',       type: 'action', label: 'Assign To',                                       icon: <User width={14} height={14} /> },
                  { key: 'new-booking',     type: 'action', label: 'Initiate new booking request from this shipment', icon: <Add width={14} height={14} />, disabled: true },
                  { type: 'divider' },
                  { key: 'cancel-booking',  type: 'action', label: 'Cancel Booking', icon: <Block width={14} height={14} />, danger: true },
                ]}
              >
                <div>
                  <Button variant="secondary" size="md" icon={<MoreVert width={16} height={16} />} />
                </div>
              </Dropdown>
              {expandButton}
            </div>
          </div>

          {/* Tabs nav */}
          <div style={{ flexShrink: 0 }}>
            <Tabs
              className="sd-main-tabs"
              activeKey={activeTab}
              onChange={setActiveTab}
              items={mainTabItems}
            />
          </div>

          {/* Tab content */}
          <div style={{ paddingTop: 24, paddingBottom: 40 }}>
            {activeTab === 'overview' && <OverviewContent previewStage={previewStage} setPreviewStage={setPreviewStage} />}
          </div>

        </div>

        {/* Right panel — animated flex sibling, slides in from card's right wall */}
        <div style={{
          flexShrink: 0,
          alignSelf: 'flex-start',
          width: rightPanelOpen ? 504 : 0,  // 24px gap + 440px panel + 40px right margin
          overflow: 'hidden',
          transition: 'width 0.25s ease',
        }}>
          {/* Panel card: normal flow so bottom border is never clipped by the wrapper */}
          <div style={{
            marginTop: 40,
            marginLeft: 24,
            marginRight: 40,
            marginBottom: 40,
            width: 440,
            border: '1px solid var(--theme-color-grey-10)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {/* Tab nav */}
            <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--theme-color-grey-10)', flexShrink: 0 }}>
              {[
                { key: 'tasks',    label: 'Tasks',    icon: <ShipmentIcon width={14} height={14} /> },
                { key: 'messages', label: 'Messages', icon: <MailOutline width={14} height={14} /> },
                { key: 'team',     label: 'Team',     icon: <Building width={14} height={14} /> },
              ].map(tab => (
                <Button
                  key={tab.key}
                  variant="secondary"
                  size="md"
                  icon={tab.icon}
                  style={rightPanelTab === tab.key ? { background: 'var(--theme-color-primary-10)', borderColor: 'transparent' } : {}}
                  onClick={() => setRightPanelTab(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Tab content */}
            {rightPanelTab === 'tasks'    && <RightPanelTasks />}
            {rightPanelTab === 'messages' && <RightPanelMessages />}
            {rightPanelTab === 'team'     && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 48, flexShrink: 0, borderBottom: '1px solid var(--theme-color-grey-10)' }}>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                    {ROLES.length} members
                  </Text>
                </div>
                <div style={{ padding: 16 }}><InternalTeamContent /></div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

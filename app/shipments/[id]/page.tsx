'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BreadcrumbComponent from '@/components/Breadcrumb';
import ButtonComponent from '@/components/Button';
import TabsComponent from '@/components/Tabs';
import CollapseComponent from '@/components/Collapse';
import Text from '@/components/Text';
import Avatar from '@/components/Avatar';
import PillComponent from '@/components/Pill';
import SelectComponent from '@/components/Select';
import DrawerComponent from '@/components/Drawer';
import DropdownComponent from '@/components/Dropdown';
import { MoreVert, DocIcon, HelpIcon, NotificationIcon, EditPencil, Add, Delete, Nav, Navclose, User, Block, Redirect, Bulkadd } from '@/icons';
import './shipment-details.css';

const Breadcrumb = BreadcrumbComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Tabs = TabsComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Pill = PillComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
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
    setHoveredIndex(null);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROLES.map((r, i) => {
          const assignedKey = assignments[i];
          const person = PEOPLE_OPTIONS.find((p) => p.value === assignedKey);
          const isAssigned = !!person;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={r.role}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Avatar with pencil overlay (assigned) or clickable dashed circle (unassigned) */}
              {isAssigned ? (
                <div
                  style={{ position: 'relative', flexShrink: 0, cursor: 'pointer', width: 32, height: 32 }}
                  onClick={() => openDrawer(i)}
                >
                  <Avatar
                    size={32}
                    style={{ background: person!.bg, fontSize: 11, fontWeight: 600, color: '#fff' }}
                  >
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
                <div
                  onClick={() => openDrawer(i)}
                  style={{
                    width: 32, height: 32, flexShrink: 0, borderRadius: '50%', cursor: 'pointer',
                    border: `1.5px ${isHovered ? 'solid' : 'dashed'} ${isHovered ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-30)'}`,
                    background: isHovered ? 'var(--theme-color-grey-10)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Add style={{ fontSize: 14, color: isHovered ? 'var(--theme-color-grey-60)' : 'var(--theme-color-grey-30)' }} />
                </div>
              )}

              {/* Name + email (assigned) or Unassigned placeholder */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {isAssigned ? (
                  <>
                    <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
                      {person!.label}
                    </Text>
                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {person!.email}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-40)' }}>
                      Unassigned
                    </Text>
                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-30)' }}>
                      No member added yet
                    </Text>
                  </>
                )}
              </div>

              {/* Right: role label for both assigned and unassigned */}
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', flexShrink: 0 }}>
                {r.role}
              </Text>
            </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

// ─── Overview tab components ──────────────────────────────────────────────────

function Field({
  label,
  value,
  isLink = false,
  isItalic = false,
}: {
  label: string;
  value: React.ReactNode;
  isLink?: boolean;
  isItalic?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Text
        variant="body"
        size="sm"
        style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', letterSpacing: '0.4px', fontSize: 11 }}
      >
        {label}
      </Text>
      <Text
        variant="body"
        size="md"
        style={{
          color: isLink ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-100)',
          fontStyle: isItalic ? 'italic' : 'normal',
        }}
      >
        {value}
      </Text>
    </div>
  );
}

function TwoColGrid({ fields }: { fields: Array<{ label: string; value: React.ReactNode; isLink?: boolean; isItalic?: boolean }> }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 40px' }}>
      {fields.map((f) => (
        <Field key={f.label} label={f.label} value={f.value} isLink={f.isLink} isItalic={f.isItalic} />
      ))}
    </div>
  );
}

function KeyReferencesContent() {
  return (
    <TwoColGrid
      fields={[
        { label: 'Carrier Booking Ref', value: 'MSCUUK048912', isLink: true },
        { label: 'BL Numbers', value: 'Awaiting BL draft', isItalic: true },
        { label: 'Contract Ref', value: 'EINBRIT-MSC-2026', isLink: true },
        { label: 'Movement Type', value: 'Door to Door' },
        { label: 'Vessel / Voyage', value: 'MSC MIRIAM · AE6/PEX · V26023' },
        { label: 'Assigned To', value: 'Sahil Kala' },
        { label: 'Commodity', value: 'Metal Scrap (HMS 1&2)' },
        { label: 'Created', value: '14 Jan 2026' },
      ]}
    />
  );
}

function ContainerSummaryContent() {
  return (
    <TwoColGrid
      fields={[
        { label: 'Container Type', value: '2 × 40GP' },
        { label: 'Cargo Weight', value: '18 MT per unit' },
        { label: 'Total Weight', value: '36 MT' },
        { label: 'Cargo Type', value: 'Standard / FCL' },
      ]}
    />
  );
}

// ─── Routing timeline ─────────────────────────────────────────────────────────

type StopStatus = 'completed' | 'active' | 'pending';

interface RouteStop {
  location: string;
  subType: string;
  status: StopStatus;
  dates: Array<{ label: string; value: string; alert?: boolean; italic?: boolean; tick?: boolean }>;
  leg?: { mode: string; detail: string; status: StopStatus };
}

const ROUTE_STOPS: RouteStop[] = [
  {
    location: 'Ferozabad, IN',
    subType: 'Origin Door',
    status: 'completed',
    dates: [{ label: 'Pickup', value: '14 Apr 2026', tick: true }],
    leg: { mode: 'Inland Haulage', detail: 'Truck · ~3 days', status: 'completed' },
  },
  {
    location: 'INMUN · Mumbai (Nhava Sheva)',
    subType: 'Port of Loading',
    status: 'active',
    dates: [
      { label: 'ETD', value: '28 Apr 2026' },
      { label: 'CY Cutoff', value: '01 May 26 !', alert: true },
    ],
    leg: { mode: 'Ocean · In Progress', detail: 'MSC MIRIAM · AE6/PEX · V26023 · ~16 days', status: 'active' },
  },
  {
    location: 'AEJEA · Jebel Ali',
    subType: 'Port of Discharge',
    status: 'pending',
    dates: [{ label: 'ETA', value: '14 May 2026' }],
    leg: { mode: 'Destination Haulage', detail: 'Pending confirmation', status: 'pending' },
  },
  {
    location: 'Dubai, AE',
    subType: 'Destination Door',
    status: 'pending',
    dates: [{ label: 'Delivery ETA', value: 'TBC', italic: true }],
  },
];

function verticalLine(legStatus: StopStatus | undefined) {
  if (!legStatus) return {};
  if (legStatus === 'completed') return { background: 'var(--theme-color-primary-60)' };
  if (legStatus === 'active') {
    return {
      background: `repeating-linear-gradient(
        to bottom,
        var(--theme-color-primary-60) 0,
        var(--theme-color-primary-60) 6px,
        transparent 6px,
        transparent 10px
      )`,
    };
  }
  return {
    background: `repeating-linear-gradient(
      to bottom,
      var(--theme-color-grey-20) 0,
      var(--theme-color-grey-20) 4px,
      transparent 4px,
      transparent 8px
    )`,
  };
}

function RoutingContent() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Timeline */}
      <div style={{ flex: 1 }}>
        {ROUTE_STOPS.map((stop, i) => {
          const isLast = i === ROUTE_STOPS.length - 1;
          const nodeColor = stop.status !== 'pending' ? 'var(--theme-color-primary-60)' : 'transparent';
          const nodeBorder = stop.status === 'pending' ? '2px solid var(--theme-color-grey-30)' : 'none';

          return (
            <div key={stop.location} style={{ display: 'flex', gap: 16 }}>
              {/* Left: node + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: nodeColor, border: nodeBorder,
                  flexShrink: 0, marginTop: 3,
                }} />
                {!isLast && (
                  <div style={{ flex: 1, width: 2, minHeight: 32, ...verticalLine(stop.leg?.status) }} />
                )}
              </div>

              {/* Right: stop content + leg badge */}
              <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
                <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  {stop.location}
                </Text>
                <div style={{ marginTop: 2 }}>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                    {stop.subType}
                  </Text>
                </div>
                {stop.dates.length > 0 && (
                  <div style={{ display: 'flex', gap: 24, marginTop: 10 }}>
                    {stop.dates.map((d) => (
                      <div key={d.label}>
                        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', letterSpacing: '0.4px', fontSize: 10 }}>
                          {d.label}
                        </Text>
                        <div style={{ marginTop: 2 }}>
                          <Text variant="body" size="md" style={{
                            color: d.alert ? 'var(--theme-color-error-100)' : 'var(--theme-color-grey-100)',
                            fontStyle: d.italic ? 'italic' : 'normal',
                          }}>
                            {d.value}{d.tick ? ' ✓' : ''}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {stop.leg && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0,
                      background: stop.leg.status === 'active' ? 'var(--theme-color-primary-5)' : 'var(--theme-color-grey-5)',
                      border: `1px solid ${stop.leg.status === 'active' ? 'var(--theme-color-primary-20)' : 'var(--theme-color-grey-20)'}`,
                      borderRadius: 16, padding: '3px 10px',
                    }}>
                      {stop.leg.status === 'active' && (
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-primary-60)', flexShrink: 0 }} />
                      )}
                      <Text variant="body" size="sm" style={{ color: stop.leg.status === 'active' ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-70)' }}>
                        {stop.leg.mode}
                      </Text>
                    </div>
                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                      {stop.leg.detail}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Route map placeholder */}
      <div style={{
        width: 240, flexShrink: 0,
        background: 'var(--theme-color-grey-5)',
        borderRadius: 8, border: '1px solid var(--theme-color-grey-10)',
        display: 'flex', flexDirection: 'column', padding: 16, minHeight: 220, gap: 8,
      }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: 11 }}>
          Route Map
        </Text>
      </div>
    </div>
  );
}

function OverviewContent() {
  const sections = [
    { key: 'key-refs',   label: 'Key References',   children: <KeyReferencesContent /> },
    {
      key: 'routing',
      label: 'Routing',
      suffix: '3 legs · Ocean in progress',
      children: <RoutingContent />,
    },
    { key: 'containers', label: 'Container Summary', children: <ContainerSummaryContent /> },
  ];

  return (
    <Collapse
      className="sd-overview-collapse"
      items={sections}
      defaultActiveKey={['key-refs', 'routing', 'containers']}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShipmentDetailsPage({ params }: Props) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);

  const mainTabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: <OverviewContent />,
    },
    { key: 'services',       label: 'Services',       children: null },
    { key: 'documents',      label: 'Documents',      children: null },
    { key: 'containers',     label: 'Containers',     children: null },
    { key: 'parties',        label: 'Parties',        children: null },
    { key: 'communications', label: 'Communications', children: null },
    { key: 'charges',        label: 'Charges',        children: null },
  ];

  const collapseSections = [
    { key: 'details',       label: 'Shipment Snapshot', children: <DetailsContent /> },
    { key: 'key-dates',     label: 'Key Dates',     children: <KeyDatesContent /> },
    { key: 'internal-team', label: 'Internal Team', children: <InternalTeamContent /> },
  ];

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--theme-color-grey-5)', position: 'relative' }}>
      <NavBar />

      {/* Single white card — flex row so divider spans full height */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 12,
          right: 12,
          bottom: 12,
          background: 'var(--theme-color-pure-100)',
          borderRadius: 16,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          boxShadow: '-2px 0px 8px rgba(136, 136, 136, 0.06)',
        }}
      >
          {/* Left: breadcrumb, title + CTAs, tabs — 40px padding on all sides */}
          <div className="sd-left-panel" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: 40, overflowY: 'auto', scrollbarWidth: 'none' }}>
            {/* Breadcrumb */}
            <div style={{ flexShrink: 0, marginBottom: 16 }}>
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

            {/* Title row + CTAs */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, flexShrink: 0 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                    ONH-2026-04821
                  </Text>
                  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                    <Pill color="success" theme="light" size="sm" showIcon={false}>Booking Confirmed</Pill>
                    <Pill color="blue" theme="light" size="sm" showIcon={false}>In Transit</Pill>
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
                <Button variant="secondary" size="md" onClick={() => router.push(`/shipments/${id}/booking`)}>Manage Booking</Button>
                <Dropdown
                  trigger={['click']}
                  placement="bottomRight"
                  overlayClassName="sd-overflow-menu"
                  items={[
                    { key: 'amend-booking',  type: 'action', label: 'Amend Booking',                                      icon: <Redirect width={14} height={14} /> },
                    { key: 'split-shipment', type: 'action', label: 'Split Shipment',                                     icon: <Add width={14} height={14} /> },
                    { key: 'merge-shipments',type: 'action', label: 'Merge Shipments',                                    icon: <Bulkadd width={14} height={14} /> },
                    { type: 'divider' },
                    { key: 'assign-to',      type: 'action', label: 'Assign To',                                          icon: <User width={14} height={14} /> },
                    { key: 'new-booking',    type: 'action', label: 'Initiate new booking request from this shipment',    icon: <Add width={14} height={14} />, disabled: true },
                    { type: 'divider' },
                    { key: 'cancel-booking', type: 'action', label: 'Cancel Booking', icon: <Block width={14} height={14} />, danger: true },
                  ]}
                >
                  <div>
                    <Button
                      variant="secondary"
                      size="md"
                      icon={<MoreVert width={16} height={16} />}
                    />
                  </div>
                </Dropdown>
              </div>
            </div>

            <Tabs
              className="sd-main-tabs"
              items={mainTabItems}
              defaultActiveKey="overview"
            />
          </div>

          {/* Right panel wrapper — relative so toggle button can bleed left over the border */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Toggle button — floats on the border between panels */}
            <button
              onClick={() => setRightPanelCollapsed((c) => !c)}
              style={{
                position: 'absolute',
                left: -14,
                top: 20,
                zIndex: 10,
                width: 28,
                height: 28,
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                background: 'var(--theme-color-pure-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                boxShadow: '-2px 0px 8px rgba(136,136,136,0.06)',
              }}
            >
              {rightPanelCollapsed
                ? <Navclose width={14} height={14} color="var(--theme-color-grey-70)" />
                : <Nav width={14} height={14} color="var(--theme-color-grey-70)" />
              }
            </button>

            {/* Actual scrollable right panel */}
            <div
              className="sd-right-panel"
              style={{
                width: rightPanelCollapsed ? 24 : 320,
                borderLeft: '2px solid var(--theme-color-grey-10)',
                overflowX: 'hidden',
                overflowY: rightPanelCollapsed ? 'hidden' : 'auto',
                padding: rightPanelCollapsed ? 0 : '24px',
                scrollbarWidth: 'none',
                transition: 'width 0.25s ease, padding 0.25s ease',
                height: '100%',
              }}
            >
              {!rightPanelCollapsed && (
                <Collapse
                  className="sd-sidebar-collapse"
                  ghost
                  items={collapseSections}
                  defaultActiveKey={['details', 'key-dates', 'internal-team']}
                />
              )}
            </div>
          </div>

      </div>
    </div>
  );
}

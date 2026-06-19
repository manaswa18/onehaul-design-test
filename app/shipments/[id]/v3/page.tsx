'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadcrumbComponent from '@/components/Breadcrumb';
import ButtonComponent from '@/components/Button';
import TabsComponent from '@/components/Tabs';
import Text from '@/components/Text';
import Avatar from '@/components/Avatar';
import PillComponent from '@/components/Pill';
import DropdownComponent from '@/components/Dropdown';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import SelectComponent from '@/components/Select';
import { MoreVert, DocIcon, HelpIcon, NotificationIcon, Add, Bulkadd, User, Block, ChevronRight, Leftpanelopen, Success, Attachment, EditPencil, Delete, Building, MailOutline, ShipmentIcon } from '@/icons';
import './shipment-details.css';

const Breadcrumb = BreadcrumbComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Tabs = TabsComponent as React.ComponentType<any>;
const Pill = PillComponent as React.ComponentType<any>;
const Dropdown = DropdownComponent as React.ComponentType<any>;
const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;

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

// ─── Card shell ───────────────────────────────────────────────────────────────

function Card({ title, height, style, children }: { title: string; height?: number; style?: React.CSSProperties; children?: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 8,
        padding: 20,
        height,
        display: 'flex',
        flexDirection: 'column',
        gap: children ? 16 : 0,
        ...style,
      }}
    >
      <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
        {title}
      </Text>
      {children}
    </div>
  );
}

// ─── Tasks to complete ──────────────────────────────────────────────────────────

const URGENCY_CONFIG: Record<string, { dateColor: string }> = {
  'overdue':   { dateColor: 'var(--theme-color-error-100)'  },
  'due-today': { dateColor: 'var(--theme-color-orange-120)' },
  'this-week': { dateColor: 'var(--theme-color-grey-50)'    },
  'upcoming':  { dateColor: 'var(--theme-color-grey-50)'    },
};

type TaskCategory = 'document' | 'booking' | 'communication' | 'logistics' | 'customs' | 'finance' | 'custom';

interface OverviewTask {
  id: number; title: string; urgency: string; dateLabel: string;
  category: TaskCategory; linkedCTA?: string;
}

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

const OVERVIEW_TASKS: OverviewTask[] = [
  { id: 1, title: 'Submit Shipping Instructions', urgency: 'overdue',   dateLabel: 'Overdue since 05 May 26, 17:00', category: 'document',  linkedCTA: 'Submit SI' },
  { id: 2, title: 'Submit VGM Declaration',       urgency: 'due-today', dateLabel: 'Due today, 23:59',               category: 'document' },
  { id: 3, title: 'Pick empty container',         urgency: 'this-week', dateLabel: 'Due 09 May 26',                  category: 'logistics' },
];

function TaskCard({ task, completed, onToggleComplete }: { task: OverviewTask; completed: boolean; onToggleComplete: () => void }) {
  const router = useRouter();
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
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          <Text variant="body" size="sm" style={{ color: completed ? 'var(--theme-color-grey-30)' : cfg.dateColor, fontSize: 11 }}>
            {completed ? 'Completed' : task.dateLabel}
          </Text>
        </div>
      </div>

      {/* Right side — CTA link + overflow menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        {task.linkedCTA && !completed && (
          <Button
            variant="link"
            size="sm"
            icon={<ChevronRight width={10} height={10} />}
            iconPosition="end"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              if (task.linkedCTA === 'Submit SI') router.push(`/shipments/${SHIPMENT_ID}/submit-si`);
            }}
          >
            {task.linkedCTA}
          </Button>
        )}
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
      </div>
    </div>
  );
}

function TasksToCompleteContent() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const toggle = (id: number) => setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {OVERVIEW_TASKS.map((t, i) => (
        <React.Fragment key={t.id}>
          {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
          <TaskCard task={t} completed={!!completed[t.id]} onToggleComplete={() => toggle(t.id)} />
        </React.Fragment>
      ))}
      <div style={{ marginTop: 4 }}>
        <Button variant="secondary" size="md">View all tasks</Button>
      </div>
    </div>
  );
}

// ─── Recent activity (condensed Event Log preview) ──────────────────────────────

type ActivityCat = 'created' | 'assigned' | 'booking' | 'document' | 'task' | 'cutoff' | 'milestone' | 'comm' | 'amendment';

const ACTIVITY_ICON: Record<ActivityCat, { Icon: React.ComponentType<any>; color: string }> = {
  created:   { Icon: ShipmentIcon,     color: 'primary-60' },
  assigned:  { Icon: User,             color: 'primary-60' },
  booking:   { Icon: Building,         color: 'primary-60' },
  document:  { Icon: DocIcon,          color: 'grey-70' },
  task:      { Icon: Success,          color: 'success-100' },
  cutoff:    { Icon: NotificationIcon, color: 'orange-120' },
  milestone: { Icon: ShipmentIcon,     color: 'teal-100' },
  comm:      { Icon: MailOutline,      color: 'purple-100' },
  amendment: { Icon: EditPencil,       color: 'orange-120' },
};

const RECENT_ACTIVITY: { cat: ActivityCat; title: string; detail: string; actor: string; time: string }[] = [
  { cat: 'task',     title: 'VGM submitted',                  detail: 'VGM submitted for 3 containers.',         actor: 'Sahil Kala',     time: '02 May 2026, 08:30' },
  { cat: 'task',     title: 'Shipping Instructions submitted', detail: 'SI submitted to carrier (MSC).',          actor: 'Sahil Kala',     time: '01 May 2026, 11:00' },
  { cat: 'document', title: 'Booking Confirmation added',     detail: 'Uploaded automatically from MSC.',         actor: 'MSC',            time: '24 Apr 2026, 14:09' },
  { cat: 'cutoff',   title: 'Cut-off dates updated',          detail: 'CY 14 May · SI 12 May · VGM 13 May.',      actor: 'System',         time: '24 Apr 2026, 13:44' },
  { cat: 'booking',  title: 'Booking confirmed',              detail: 'Carrier confirmed. Ref MSCUUK987654.',     actor: 'MSC',            time: '24 Apr 2026, 13:44' },
  { cat: 'created',  title: 'Shipment created',               detail: 'Internal booking request submitted.',     actor: 'Hadley (Sales)', time: '22 Apr 2026, 09:07' },
];

function RecentActivityContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {RECENT_ACTIVITY.slice(0, 3).map((a, i) => {
        const { Icon, color } = ACTIVITY_ICON[a.cat];
        return (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'var(--theme-color-grey-5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon width={15} height={15} color={`var(--theme-color-${color})`} />
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>{a.title}</Text>
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>{a.detail}</Text>
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', fontSize: 11 }}>{a.actor} · {a.time}</Text>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <div style={{ marginTop: 4 }}>
        <Button variant="secondary" size="md">View all activity</Button>
      </div>
    </div>
  );
}

// ─── Cutoff dates + Internal team (ported from v2) ──────────────────────────────

function StatusChip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <div style={{ background: bg, borderRadius: 32, padding: '2px 10px', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
      <Text variant="body" size="sm" style={{ color, whiteSpace: 'nowrap' }}>{label}</Text>
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

function CutoffDatesContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {KEY_DATES.map((d, i) => (
        <React.Fragment key={d.label}>
          {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>{d.label}</Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>{d.date}</Text>
            </div>
            <StatusChip label={d.status} bg={d.bg} color={d.color} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// Overview shipment-stage preview (drives which Key Details are available yet)
type ShipmentStage = 'booking-initiated' | 'carrier-booking-sent' | 'booking-confirmed' | 'pre-shipment' | 'in-transit';

const SHIPMENT_STAGE_OPTIONS = [
  { value: 'booking-initiated',    label: 'Booking Initiated' },
  { value: 'carrier-booking-sent', label: 'Carrier Booking Sent' },
  { value: 'booking-confirmed',    label: 'Booking Confirmed' },
  { value: 'pre-shipment',         label: 'Pre-Shipment' },
  { value: 'in-transit',           label: 'In Transit' },
];

const STAGE_INDEX: Record<ShipmentStage, number> = {
  'booking-initiated': 1, 'carrier-booking-sent': 2, 'booking-confirmed': 3, 'pre-shipment': 4, 'in-transit': 7,
};

// Curated, at-a-glance references + key terms (full detail lives in Booking / SI).
// `from` = lifecycle stage index at which the data point becomes available.
const KEY_DETAILS: { label: string; value: string; from: number; awaiting?: string }[] = [
  { label: 'Shipment No.',        value: 'ONH-2026-04821',               from: 1 },
  { label: 'Customer Ref / PO',   value: 'VOL-2026-1234',                from: 1 },
  { label: 'Commodity',           value: 'AC & refrigeration equipment', from: 1 },
  { label: 'Incoterms',           value: 'FOB Mumbai',                   from: 1 },
  { label: 'Containers',          value: '2 × 40ft HC, 1 × 20ft Std',    from: 2 },
  { label: 'Gross Weight',        value: '18.4 MT',                      from: 2 },
  { label: 'Freight Terms',       value: 'Prepaid',                      from: 2 },
  { label: 'Carrier Booking Ref', value: 'MSCUUK987654',                 from: 3, awaiting: 'Awaiting confirmation' },
  { label: 'BL Number(s)',        value: 'MSCUBLMUM654321, 654322',      from: 4, awaiting: 'Awaiting issuance' },
];

function KeyDetailsContent({ stage }: { stage: ShipmentStage }) {
  const idx = STAGE_INDEX[stage];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 24px' }}>
      {KEY_DETAILS.map((d) => (
        <FieldItem
          key={d.label}
          label={d.label}
          value={idx >= d.from
            ? d.value
            : <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)', fontStyle: 'italic' }}>{d.awaiting || 'Awaiting'}…</Text>}
        />
      ))}
    </div>
  );
}

const CURRENT_USER_INITIALS = 'SK';
function displayName(name: string, initials: string): string {
  return initials === CURRENT_USER_INITIALS ? `${name} (You)` : name;
}

const PEOPLE_OPTIONS = [
  { value: 'SK', label: 'Sahil Kala',  initials: 'SK', bg: '#1D3A5F', email: 'sahil.kala@onehaul.com' },
  { value: 'RA', label: 'Ravi Arora',  initials: 'RA', bg: '#34A853', email: 'ravi.arora@onehaul.com' },
  { value: 'LM', label: 'Laura Mills', initials: 'LM', bg: '#7B61FF', email: 'laura.mills@onehaul.com' },
  { value: 'NT', label: 'Neha Tiwari', initials: 'NT', bg: '#9E9E9E', email: 'neha.tiwari@onehaul.com' },
  { value: 'AM', label: 'Amir Mohsin', initials: 'AM', bg: '#D32F2F', email: 'amir.mohsin@onehaul.com' },
];

const ROLES = [
  { role: 'Sales Agent',     assignedKey: 'SK' as string | null },
  { role: 'Ops Executive',   assignedKey: 'RA' as string | null },
  { role: 'Documentation',   assignedKey: null },
  { role: 'Finance',         assignedKey: 'NT' as string | null },
  { role: 'Account Manager', assignedKey: 'AM' as string | null },
];

// Per-person urgent task counts (used for the urgency chips in the team list)
const TASK_COUNTS: Record<string, { overdue: number; dueToday: number }> = {
  SK: { overdue: 1, dueToday: 1 },
  AM: { overdue: 0, dueToday: 1 },
};

function InternalTeamContent() {
  const [assignments, setAssignments] = useState<(string | null)[]>(ROLES.map((r) => r.assignedKey));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [drawerIndex, setDrawerIndex] = useState<number | null>(null);
  const [pendingValue, setPendingValue] = useState<string | null>(null);

  const openDrawer = (index: number) => { setDrawerIndex(index); setPendingValue(assignments[index]); };
  const closeDrawer = () => { setDrawerIndex(null); setPendingValue(null); };
  const handleConfirm = () => {
    if (drawerIndex !== null && pendingValue) {
      setAssignments((prev) => prev.map((a, i) => (i === drawerIndex ? pendingValue : a)));
    }
    closeDrawer();
  };
  const handleRemove = () => {
    if (drawerIndex !== null) setAssignments((prev) => prev.map((a, i) => (i === drawerIndex ? null : a)));
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
          const counts = (isAssigned && TASK_COUNTS[person!.initials]) || { overdue: 0, dueToday: 0 };
          const hasUrgentTasks = counts.overdue > 0 || counts.dueToday > 0;
          const isHovered = hoveredIndex === i;

          return (
            <React.Fragment key={r.role}>
              {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
              <div
                onClick={() => openDrawer(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ background: 'var(--theme-color-pure-100)', display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
              >
                {isAssigned ? (
                  <div style={{ position: 'relative', flexShrink: 0, width: 32, height: 32 }}>
                    <Avatar size={32} style={{ background: person!.bg, fontSize: 11, fontWeight: 600, color: '#fff' }}>
                      {person!.initials}
                    </Avatar>
                    {isHovered && (
                      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EditPencil style={{ fontSize: 12, color: '#fff' }} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{
                    width: 32, height: 32, flexShrink: 0, borderRadius: '50%',
                    border: `1.5px ${isHovered ? 'solid' : 'dashed'} ${isHovered ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-30)'}`,
                    background: isHovered ? 'var(--theme-color-grey-10)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s ease',
                  }}>
                    <Add style={{ fontSize: 14, color: isHovered ? 'var(--theme-color-grey-60)' : 'var(--theme-color-grey-30)' }} />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                    <Text variant="body" size="sm" style={{ color: isAssigned ? 'var(--theme-color-grey-50)' : 'var(--theme-color-grey-30)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                      {isAssigned ? person!.email : 'No member added yet'}
                    </Text>
                  </div>

                  {hasUrgentTasks && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      {counts.overdue > 0 && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--theme-color-error-20)', borderRadius: 4, padding: '1px 6px' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--theme-color-error-100)', display: 'inline-block', flexShrink: 0 }} />
                          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-100)', fontSize: 10, fontWeight: 600 }}>
                            {counts.overdue} overdue
                          </Text>
                        </div>
                      )}
                      {counts.dueToday > 0 && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--theme-color-yellow-20)', borderRadius: 4, padding: '1px 6px' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--theme-color-yellow-60)', display: 'inline-block', flexShrink: 0 }} />
                          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-yellow-120)', fontSize: 10, fontWeight: 600 }}>
                            {counts.dueToday} due today
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

// ─── Field helpers (mirror v2 patterns) ────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', fontSize: 10, fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase' as const, display: 'block' }}>
      {children}
    </Text>
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

function FieldGrid({ fields, columns = 4 }: { fields: { label: string; value: string }[]; columns?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '16px 24px' }}>
      {fields.map(f => <FieldItem key={f.label} label={f.label} value={f.value} />)}
    </div>
  );
}

const Divider = () => <div style={{ height: 1, background: 'var(--theme-color-grey-10)' }} />;

// ─── Amendment history (shared by Booking & SI) ────────────────────────────────

interface AmendmentEntry { version: string; date: string; actor: string; status: string; note: string; }

const AMENDMENT_STATUS_COLOR: Record<string, string> = {
  Confirmed: 'success', Submitted: 'blue', Pending: 'orange', Declined: 'error',
};

// Timeline dot — uses valid theme tokens (Pill's "blue" has no --theme-color-blue var)
const AMENDMENT_DOT_TOKEN: Record<string, string> = {
  Confirmed: 'success-100', Submitted: 'primary-60', Pending: 'orange-100', Declined: 'error-100',
};

const SI_AMENDMENTS: AmendmentEntry[] = [
  { version: 'Amendment v2', date: '14 May 2026, 09:10', actor: 'Sahil Kala',  status: 'Confirmed', note: 'Updated consignee address and package count.' },
  { version: 'Initial submission', date: '12 May 2026, 11:23', actor: 'Sahil Kala', status: 'Submitted', note: 'SI submitted to carrier (MSC).' },
];

const BOOKING_AMENDMENTS: AmendmentEntry[] = [
  { version: 'Amendment #1', date: '02 May 2026, 16:40', actor: 'Sahil Kala',   status: 'Confirmed', note: 'Vessel / voyage and ETD updated per carrier availability.' },
  { version: 'Initial booking', date: '24 Apr 2026, 13:44', actor: 'System · MSC', status: 'Confirmed', note: 'Carrier confirmed booking. Ref MSCUUK987654.' },
];

function AmendmentHistory({ entries }: { entries: AmendmentEntry[] }) {
  const body = entries.length === 0 ? (
    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>No amendments yet.</Text>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        return (
          <div key={e.version + e.date} style={{ display: 'flex', gap: 12 }}>
            {/* Rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: `var(--theme-color-${AMENDMENT_DOT_TOKEN[e.status] || 'grey-40'})`, marginTop: 4 }} />
              {!last && <div style={{ width: 2, flex: 1, background: 'var(--theme-color-grey-10)', marginTop: 2 }} />}
            </div>
            {/* Content */}
            <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>{e.version}</Text>
                <Pill color={AMENDMENT_STATUS_COLOR[e.status] || 'default'} theme="light" size="sm" showIcon={false}>{e.status}</Pill>
              </div>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>{e.date} · {e.actor}</Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>{e.note}</Text>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Collapse
      className="sd-history-collapse"
      activeKey={['history']}
      items={[{ key: 'history', label: `Amendment History${entries.length ? ` (${entries.length})` : ''}`, children: body }]}
    />
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewContent() {
  const [stage, setStage] = useState<ShipmentStage>('booking-confirmed');

  return (
    <div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Main column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
            <Card title="Tasks to Complete" style={{ flex: 1 }}><TasksToCompleteContent /></Card>
            <Card title="Recent Activity" style={{ flex: 1 }}><RecentActivityContent /></Card>
          </div>
          <Card title="Key Details"><KeyDetailsContent stage={stage} /></Card>
          <Card title="Route Details & Tracking" height={200} />
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
          <Card title="Internal Team" style={{ width: 360 }}><InternalTeamContent /></Card>
          <Card title="Cutoff Dates" style={{ width: 360 }}><CutoffDatesContent /></Card>
        </div>
      </div>

      {/* Floating shipment-stage preview switcher (drives Key Details availability) */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 200,
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 12, padding: '12px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column', gap: 10,
        width: 240,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-primary-60)', flexShrink: 0 }} />
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>
            Shipment Stage Preview
          </Text>
        </div>
        <Select
          value={stage}
          options={SHIPMENT_STAGE_OPTIONS}
          onChange={(val: ShipmentStage) => setStage(val)}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

// ─── Booking & Instructions tab ─────────────────────────────────────────────────

const BOOKING_INSTRUCTIONS_SUBTABS = [
  { key: 'booking',  label: 'Booking' },
  { key: 'shipping', label: 'Instructions' },
];

function BookingInstructionsContent() {
  const [subTab, setSubTab] = useState('booking');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs
        className="sd-sub-tabs"
        type="secondary"
        activeKey={subTab}
        onChange={setSubTab}
        items={BOOKING_INSTRUCTIONS_SUBTABS.map(t => ({ ...t, children: null }))}
      />
      {subTab === 'booking'  && <BookingContent />}
      {subTab === 'shipping' && <ShippingInstructionsContent />}
    </div>
  );
}

// ─── Shipping Instructions sub-tab ──────────────────────────────────────────────

const SHIPMENT_ID = 'ONH-2026-04821';
const SI_CUTOFF = '12 May 2026, 15:00';

type SiState = 'not-submitted' | 'submitted' | 'confirmed';

const SI_STATE_OPTIONS = [
  { value: 'not-submitted', label: 'Not Submitted' },
  { value: 'submitted',     label: 'Submitted' },
  { value: 'confirmed',     label: 'Confirmed' },
];

const SI_SUMMARY = {
  blDetails: [
    { label: 'BL Type',                value: 'Original Bill of Lading' },
    { label: 'Number of Original BLs', value: '3' },
    { label: 'Freight Payment Terms',  value: 'Freight Prepaid' },
    { label: 'Freight Payable At',     value: 'Port of Loading (Mumbai)' },
    { label: 'BL Draft Reference',     value: 'MSCUBLMUM654321-DRAFT' },
  ],
  shipper: [
    { label: 'Shipper Name',    value: 'Voltas India Limited' },
    { label: 'Address Line 1',  value: 'Voltas House, T B Kadam Marg' },
    { label: 'Address Line 2',  value: 'Chinchpokli' },
    { label: 'City / State',    value: 'Mumbai, Maharashtra' },
    { label: 'Country',         value: 'India' },
    { label: 'Contact Person',  value: 'Rohan More' },
    { label: 'Phone',           value: '+91 22 6665 4321' },
    { label: 'Email',           value: 'rohan.more@voltas.com' },
  ],
  consignee: [
    { label: 'Consignee Name', value: 'Al-Futtaim Logistics LLC' },
    { label: 'Address',        value: 'Jebel Ali Free Zone, Plot S20604' },
    { label: 'City',           value: 'Dubai' },
    { label: 'Country',        value: 'United Arab Emirates' },
  ],
  notify1: [
    { label: 'Name',    value: 'Al-Futtaim Logistics LLC' },
    { label: 'Address', value: 'Jebel Ali Free Zone, Plot S20604' },
    { label: 'City',    value: 'Dubai' },
    { label: 'Country', value: 'United Arab Emirates' },
  ],
  cargo: [
    { label: 'Description of Goods', value: 'Air conditioning units & refrigeration equipment' },
    { label: 'Package Type',         value: 'Pallets' },
    { label: 'Number of Packages',   value: '120' },
    { label: 'Gross Weight (kg)',    value: '18,400' },
    { label: 'Net Weight (kg)',      value: '17,250' },
    { label: 'Measurement (CBM)',    value: '64.8' },
    { label: 'HS Code(s)',           value: '8415.10' },
  ],
  specialInstructions: 'Keep upright. Do not stack above 2 units. Notify consignee 48h before arrival.',
  containers: [
    { containerNo: 'MSCU1234567', sealNo: 'SL-889201', marksNumbers: 'VOLTAS / JEBEL ALI / 1-40',   tareWeight: '3,750' },
    { containerNo: 'MSCU7654321', sealNo: 'SL-889202', marksNumbers: 'VOLTAS / JEBEL ALI / 41-80',  tareWeight: '3,750' },
    { containerNo: 'TGHU4456789', sealNo: 'SL-889203', marksNumbers: 'VOLTAS / JEBEL ALI / 81-120', tareWeight: '2,250' },
  ],
};

const SI_SECTION_TITLES = [
  'BL Details & Freight Terms',
  'Shipper Details',
  'Consignee & Notify Parties',
  'Cargo & Container Details',
];

function SiStatusCard({ siState, onSubmit }: { siState: SiState; onSubmit: () => void }) {
  const submitted = siState !== 'not-submitted';

  const pill =
    siState === 'not-submitted' ? <Pill color="default" theme="light" size="sm" showIcon={false}>Not Submitted</Pill>
    : siState === 'submitted'   ? <Pill color="blue"    theme="light" size="sm" showIcon={false}>Submitted</Pill>
    :                             <Pill color="success" theme="light" size="sm" showIcon={false}>Confirmed</Pill>;

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: 'Submitted by',  value: 'Sahil Kala (Ops Exec)' },
    { label: 'Submitted on',  value: '12 May 2026, 11:23' },
    { label: 'SI Cutoff',     value: SI_CUTOFF },
    { label: 'Cutoff status', value: <span style={{ color: 'var(--theme-color-success-120)' }}>✓ Submitted before cutoff</span> },
  ];
  if (siState === 'confirmed') {
    meta.push({ label: 'Carrier confirmation', value: <span style={{ color: 'var(--theme-color-success-120)' }}>✓ Confirmed by MSC · 13 May 2026, 09:40</span> });
  }

  return (
    <div style={{
      background: 'var(--theme-color-pure-100)',
      border: `1px solid ${submitted ? 'var(--theme-color-success-40)' : 'var(--theme-color-grey-10)'}`,
      borderRadius: 8,
      padding: 20,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Heading */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: submitted ? 'var(--theme-color-success-20)' : 'var(--theme-color-error-20)',
        }}>
          {submitted
            ? <Success width={18} height={18} color="var(--theme-color-success-100)" />
            : <DocIcon width={18} height={18} color="var(--theme-color-error-100)" />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
            Shipping Instructions
          </Text>
          <div>{pill}</div>
        </div>
      </div>

      {/* Details */}
      {submitted ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 24px' }}>
          {meta.map((item) => (
            <FieldItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      ) : (
        <div>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', display: 'block' }}>SI Cutoff</Text>
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-error-100)' }}>
            {SI_CUTOFF} · Overdue — submit immediately
          </Text>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {siState === 'not-submitted' && (
          <Button variant="primary" size="md" onClick={onSubmit}>Submit SI</Button>
        )}
        {siState === 'submitted' && (
          <Button variant="secondary" size="md" onClick={onSubmit}>Amend SI</Button>
        )}
        {submitted && (
          <Button variant="secondary" size="md" icon={<DocIcon width={16} height={16} />}>Download SI Document</Button>
        )}
      </div>
    </div>
  );
}

function SiEmptyState({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div style={{
      background: 'var(--theme-color-pure-100)',
      border: '1px solid var(--theme-color-grey-10)',
      borderRadius: 8,
      padding: 40,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' as const,
    }}>
      <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
        Shipping Instructions not yet submitted
      </Text>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', maxWidth: 440 }}>
        Draft and submit the SI to the carrier before the cutoff. The sections below are completed in the submission form.
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 440, marginTop: 4 }}>
        {SI_SECTION_TITLES.map((title) => (
          <div key={title} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 12px', borderRadius: 8,
            border: '1px solid var(--theme-color-grey-10)', background: 'var(--theme-color-grey-2)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--theme-color-grey-30)', flexShrink: 0 }} />
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>{title}</Text>
          </div>
        ))}
      </div>
      <Button variant="primary" size="md" onClick={onSubmit}>Submit SI</Button>
    </div>
  );
}

function SiSummary() {
  const items = [
    {
      key: 'bl',
      label: 'BL Details & Freight Terms',
      children: <FieldGrid fields={SI_SUMMARY.blDetails} />,
    },
    {
      key: 'shipper',
      label: 'Shipper Details',
      children: <FieldGrid fields={SI_SUMMARY.shipper} />,
    },
    {
      key: 'consignee',
      label: 'Consignee & Notify Parties',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionLabel>Consignee</SectionLabel>
            <FieldGrid fields={SI_SUMMARY.consignee} />
          </div>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionLabel>Notify Party 1</SectionLabel>
            <FieldGrid fields={SI_SUMMARY.notify1} />
          </div>
        </div>
      ),
    },
    {
      key: 'cargo',
      label: 'Cargo & Container Details',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionLabel>Cargo</SectionLabel>
            <FieldGrid fields={SI_SUMMARY.cargo} />
            <FieldItem label="Special Instructions for Carrier" value={SI_SUMMARY.specialInstructions} />
          </div>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionLabel>Container Details</SectionLabel>
            {SI_SUMMARY.containers.map((c, i) => (
              <div key={c.containerNo} style={{
                border: '1px solid var(--theme-color-primary-5)',
                background: 'var(--theme-color-primary-2)',
                borderRadius: 8, padding: 16,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  Container {i + 1}
                </Text>
                <FieldGrid fields={[
                  { label: 'Container No.',   value: c.containerNo },
                  { label: 'Seal Number',     value: c.sealNo },
                  { label: 'Marks & Numbers', value: c.marksNumbers },
                  { label: 'Tare Weight (kg)', value: c.tareWeight },
                ]} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return <Collapse className="sd-si-collapse" activeKey={items.map((i) => i.key)} items={items} />;
}

function ShippingInstructionsContent() {
  const router = useRouter();
  const [siState, setSiState] = useState<SiState>('submitted');
  const goSubmit = () => router.push(`/shipments/${SHIPMENT_ID}/submit-si`);

  return (
    <div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: filled details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {siState === 'not-submitted' ? <SiEmptyState onSubmit={goSubmit} /> : <SiSummary />}
        </div>
        {/* Right: status + amendment history */}
        <div style={{ width: 440, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SiStatusCard siState={siState} onSubmit={goSubmit} />
          {siState === 'confirmed' && <AmendmentHistory entries={SI_AMENDMENTS} />}
        </div>
      </div>

      {/* Floating SI state preview switcher */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 200,
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 12, padding: '12px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column', gap: 10,
        width: 220,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-primary-60)', flexShrink: 0 }} />
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>
            SI Preview State
          </Text>
        </div>
        <Select
          value={siState}
          options={SI_STATE_OPTIONS}
          onChange={(val: SiState) => setSiState(val)}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

// ─── Bill of Ladings sub-tab ────────────────────────────────────────────────────

type BlStatus = 'awaiting-draft' | 'pending-review' | 'rejected' | 'approved' | 'released' | 'surrendered';

const BL_STATUS_OPTIONS = [
  { value: 'awaiting-draft', label: 'Awaiting Draft' },
  { value: 'pending-review', label: 'Draft — Pending Review' },
  { value: 'rejected',       label: 'Draft Rejected' },
  { value: 'approved',       label: 'Draft Approved' },
  { value: 'released',       label: 'Released' },
  { value: 'surrendered',    label: 'Surrendered' },
];

const BL_LIST = [
  {
    number: 'MSCUBLMUM654321', type: 'Original BL', carrier: 'MSC',
    bookingRef: 'MSCUUK048912', freightTerms: 'Prepaid', numOriginals: '3',
    docCutoff: '06 May 2026, 12:00', issueDate: '13 May 2026',
    release: '3 originals couriered · DHL 7849 2210 33',
    surrender: 'Surrendered at destination · 22 May 2026',
  },
  {
    number: 'MSCUBLMUM654322', type: 'Telex Release', carrier: 'MSC',
    bookingRef: 'MSCUUK048913', freightTerms: 'Prepaid', numOriginals: '',
    docCutoff: '06 May 2026, 12:00', issueDate: '13 May 2026',
    release: 'Telex released · 13 May 2026',
    surrender: 'Telex released · 13 May 2026',
  },
];

type Bl = typeof BL_LIST[number];

const BL_STEPS = ['Draft', 'Review & Approval', 'Release', 'Surrender'];

// Maps a BL status to the Stepper's current index + per-step status overrides
function blStepInfo(status: BlStatus): { current: number; error: boolean } {
  switch (status) {
    case 'awaiting-draft': return { current: 0, error: false };
    case 'pending-review': return { current: 1, error: false };
    case 'rejected':       return { current: 1, error: true };
    case 'approved':       return { current: 2, error: false };
    case 'released':       return { current: 3, error: false };
    case 'surrendered':    return { current: 4, error: false };
  }
}

// Inline process indicator (the design-system Stepper ships broken CSS, so we render
// a lightweight horizontal stepper from theme tokens — consistent with this page's style)
function BlSteps({ current, error }: { current: number; error: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {BL_STEPS.map((title, i) => {
        const isError = error && i === 1;
        const done = i < current;
        const active = i === current;
        const nodeBg = isError ? 'var(--theme-color-error-100)'
          : done ? 'var(--theme-color-success-100)'
          : active ? 'var(--theme-color-primary-60)'
          : 'var(--theme-color-grey-10)';
        const nodeColor = (done || active || isError) ? 'var(--theme-color-pure-100)' : 'var(--theme-color-grey-40)';
        const labelColor = isError ? 'var(--theme-color-error-100)'
          : (done || active) ? 'var(--theme-color-grey-100)'
          : 'var(--theme-color-grey-40)';
        return (
          <React.Fragment key={title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: nodeBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Text variant="body" size="sm" weight="medium" style={{ color: nodeColor, fontSize: 11 }}>
                  {isError ? '!' : i + 1}
                </Text>
              </div>
              <Text variant="body" size="sm" weight={active ? 'medium' : 'regular'} style={{ color: labelColor }}>
                {title}
              </Text>
            </div>
            {i < BL_STEPS.length - 1 && (
              <div style={{ flex: 1, minWidth: 16, height: 2, margin: '0 12px', background: done ? 'var(--theme-color-success-40)' : 'var(--theme-color-grey-10)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function blStatusPill(status: BlStatus) {
  switch (status) {
    case 'awaiting-draft': return <Pill color="default" theme="light" size="sm" showIcon={false}>Awaiting Draft</Pill>;
    case 'pending-review': return <Pill color="orange"  theme="light" size="sm" showIcon={false}>Pending Review</Pill>;
    case 'rejected':       return <Pill color="error"   theme="light" size="sm" showIcon={false}>Draft Rejected</Pill>;
    case 'approved':       return <Pill color="blue"    theme="light" size="sm" showIcon={false}>Draft Approved</Pill>;
    case 'released':       return <Pill color="success" theme="light" size="sm" showIcon={false}>Released</Pill>;
    case 'surrendered':    return <Pill color="teal"    theme="light" size="sm" showIcon={false}>Surrendered</Pill>;
  }
}

function DocRow({ label, status, downloadable }: { label: string; status: string; downloadable?: boolean }) {
  const statusColor: Record<string, string> = {
    Available: 'success', Submitted: 'success', Approved: 'blue', 'Pending Review': 'orange', Rejected: 'error',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 32 }}>
      <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)' }}>{label}</Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {status === '—'
          ? <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-30)' }}>—</Text>
          : <Pill color={statusColor[status] || 'default'} theme="light" size="sm" showIcon={false}>{status}</Pill>}
        {downloadable && (
          <Button variant="link" size="sm" icon={<DocIcon width={14} height={14} />}>Download</Button>
        )}
      </div>
    </div>
  );
}

function BlBody({ bl, status }: { bl: Bl; status: BlStatus }) {
  const isOriginal = bl.type === 'Original BL';
  const released = status === 'released' || status === 'surrendered';
  const surrendered = status === 'surrendered';
  const preApproval = status === 'awaiting-draft' || status === 'pending-review' || status === 'rejected';

  const { current, error } = blStepInfo(status);

  const draftStatus =
    status === 'awaiting-draft' ? '—'
    : status === 'pending-review' ? 'Pending Review'
    : status === 'rejected'       ? 'Rejected'
    :                               'Approved';

  const docRows = [
    { label: 'BL Draft',                                   status: draftStatus,              downloadable: status !== 'awaiting-draft' },
    { label: isOriginal ? 'Original BL' : 'Telex Release', status: released ? 'Available' : '—', downloadable: released },
    { label: 'Verify Copy',                                status: released ? 'Available' : '—', downloadable: released },
    { label: 'Shipping Instructions (SI)',                 status: 'Submitted',              downloadable: true },
    { label: 'VGM Certificate',                            status: 'Submitted',              downloadable: true },
    { label: 'Arrival Notice',                             status: surrendered ? 'Available' : '—', downloadable: surrendered },
    { label: 'Delivery Order',                             status: surrendered ? 'Available' : '—', downloadable: surrendered },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Process stepper */}
      <BlSteps current={current} error={error} />

      {/* Doc Cutoff urgency (pre-approval) */}
      {preApproval && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>Doc Cutoff (BL / Customs)</Text>
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-error-100)' }}>
            {bl.docCutoff} · Overdue
          </Text>
        </div>
      )}

      {/* Action row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {status === 'awaiting-draft' && (
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontStyle: 'italic' }}>
            Awaiting draft BL from carrier
          </Text>
        )}
        {status === 'pending-review' && (
          <>
            <Button variant="primary" size="md">Review Draft BL</Button>
            <Button variant="secondary" size="md" icon={<DocIcon width={16} height={16} />}>Download Draft</Button>
          </>
        )}
        {status === 'rejected' && (
          <>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-100)', fontStyle: 'italic' }}>
              Draft rejected — awaiting corrected draft from carrier
            </Text>
            <Button variant="secondary" size="md" icon={<DocIcon width={16} height={16} />}>Download Draft</Button>
          </>
        )}
        {status === 'approved' && (
          <>
            <Button variant="primary" size="md">{isOriginal ? 'Arrange Originals' : 'Request Telex Release'}</Button>
            <Button variant="secondary" size="md" icon={<DocIcon width={16} height={16} />}>Download Draft</Button>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontStyle: 'italic' }}>
              Released after vessel departure
            </Text>
          </>
        )}
        {released && (
          <>
            <Button variant="secondary" size="md" icon={<DocIcon width={16} height={16} />}>Download BL</Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Success width={16} height={16} color="var(--theme-color-success-100)" />
              <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-success-120)' }}>
                {surrendered ? bl.surrender : bl.release}
              </Text>
            </div>
          </>
        )}
      </div>

      <Divider />

      {/* Associated documents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionLabel>Associated Documents</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {docRows.map((d, i) => (
            <React.Fragment key={d.label}>
              {i > 0 && <div style={{ height: 1, background: 'var(--theme-color-grey-5)' }} />}
              <DocRow label={d.label} status={d.status} downloadable={d.downloadable} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillOfLadingsContent() {
  // Each BL carries its own status — diverged by default to show independence
  const [blStates, setBlStates] = useState<Record<string, BlStatus>>({
    [BL_LIST[0].number]: 'released',
    [BL_LIST[1].number]: 'pending-review',
  });
  const [selectedBl, setSelectedBl] = useState(BL_LIST[0].number);

  const items = BL_LIST.map((bl) => ({
    key: bl.number,
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Attachment width={16} height={16} color="var(--theme-color-grey-70)" />
        <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
          BL: {bl.number}
        </Text>
        <Pill color="blue" theme="line" size="sm" showIcon={false}>{bl.type}</Pill>
      </span>
    ),
    suffix: blStatusPill(blStates[bl.number]),
    children: <BlBody bl={bl} status={blStates[bl.number]} />,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Collapse className="sd-bl-collapse" defaultActiveKey={[BL_LIST[0].number]} items={items} />

      {/* Floating per-BL state preview switcher */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 200,
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 12, padding: '12px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column', gap: 10,
        width: 240,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-primary-60)', flexShrink: 0 }} />
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>
            BL Preview State
          </Text>
        </div>
        <Select
          value={selectedBl}
          options={BL_LIST.map((bl) => ({ value: bl.number, label: bl.number }))}
          onChange={(val: string) => setSelectedBl(val)}
          floatLabel={false}
          clearable={false}
        />
        <Select
          value={blStates[selectedBl]}
          options={BL_STATUS_OPTIONS}
          onChange={(val: BlStatus) => setBlStates((prev) => ({ ...prev, [selectedBl]: val }))}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

// ─── Booking sub-tab ────────────────────────────────────────────────────────────

type BookingState =
  | 'draft' | 'submitted' | 'revision-requested' | 'confirmed-p1'
  | 'awaiting-carrier' | 'booking-confirmed' | 'pending-update';

const BOOKING_STATE_OPTIONS = [
  { value: 'draft',              label: 'Draft' },
  { value: 'submitted',          label: 'Submitted to Ops' },
  { value: 'revision-requested', label: 'Revision Requested' },
  { value: 'confirmed-p1',       label: 'Part 1 Confirmed' },
  { value: 'awaiting-carrier',   label: 'Awaiting Carrier' },
  { value: 'booking-confirmed',  label: 'Booking Confirmed' },
  { value: 'pending-update',     label: 'Pending Update' },
];

// Part 2 (carrier) reached — booking channel + carrier request ref exist
const BOOKING_PART2: BookingState[] = ['awaiting-carrier', 'booking-confirmed', 'pending-update'];
// Carrier booking confirmed — carrier booking ref + cutoffs exist
const BOOKING_CONFIRMED: BookingState[] = ['booking-confirmed', 'pending-update'];

const BOOKING_SUMMARY = {
  customer: [
    { label: 'Client',                value: 'Voltas India Limited' },
    { label: 'Customer Reference',    value: 'VOL-2026-1234' },
    { label: 'Assigned Ops Executive', value: 'Sahil Kala' },
    { label: 'Priority',              value: 'Standard' },
  ],
  route: [
    { label: 'Movement Type',     value: 'Door to Door' },
    { label: 'Loading Port (POL)', value: 'INMUN, Mumbai' },
    { label: 'Discharge Port (POD)', value: 'AEJEA, Jebel Ali' },
    { label: 'Collection Address', value: 'Chinchpokli, Mumbai' },
    { label: 'Delivery Address',  value: 'Jebel Ali Free Zone, Dubai' },
    { label: 'ETD Window',        value: '05–08 May 2026' },
    { label: 'ETA By',            value: '14 May 2026' },
  ],
  cargo: [
    { label: 'Commodity',              value: 'Air conditioning & refrigeration equipment' },
    { label: 'HS Code(s)',             value: '8415.10' },
    { label: 'Estimated Gross Weight', value: '18.4 MT' },
    { label: 'Number of Packages',     value: '120' },
    { label: 'Dangerous Goods',        value: 'No' },
    { label: 'Special Requirements',   value: 'None' },
    { label: 'Equipment',              value: '2 × 40ft HC, 1 × 20ft Std' },
    { label: 'Shipper-Owned (SOC)',    value: 'No' },
  ],
  carrier: [
    { label: 'Carrier',             value: 'MSC' },
    { label: 'Contract / Rate Ref', value: 'EINBRIT-MSC-2026' },
    { label: 'Vessel / Voyage',     value: 'MSC MIRIAM · AE6/PEX · V26023' },
    { label: 'Service Mode',        value: 'CY-CY (Merchant Haulage)' },
    { label: 'Freight Terms',       value: 'Prepaid' },
    { label: 'Booking Date',        value: '19 Feb 2026, 08:16' },
    { label: 'Booked By',           value: 'Ravi Arora' },
    { label: 'Preferred Lines',     value: 'MSC, Maersk' },
  ],
};

const BOOKING_CUTOFFS = [
  { label: 'CY Cutoff',  value: '04 May 2026, 16:00' },
  { label: 'SI Cutoff',  value: '12 May 2026, 15:00' },
  { label: 'VGM Cutoff', value: '08 May 2026, 23:59' },
  { label: 'Doc Cutoff', value: '06 May 2026, 12:00' },
];

function bookingStatusPill(state: BookingState) {
  switch (state) {
    case 'draft':              return <Pill color="default" theme="light" size="sm" showIcon={false}>Draft</Pill>;
    case 'submitted':          return <Pill color="blue"    theme="light" size="sm" showIcon={false}>Submitted to Ops</Pill>;
    case 'revision-requested': return <Pill color="orange"  theme="light" size="sm" showIcon={false}>Revision Requested</Pill>;
    case 'confirmed-p1':       return <Pill color="blue"    theme="light" size="sm" showIcon={false}>Part 1 Confirmed</Pill>;
    case 'awaiting-carrier':   return <Pill color="yellow"  theme="light" size="sm" showIcon={false}>Awaiting Carrier</Pill>;
    case 'booking-confirmed':  return <Pill color="success" theme="light" size="sm" showIcon={false}>Confirmed</Pill>;
    case 'pending-update':     return <Pill color="orange"  theme="light" size="sm" showIcon={false}>Pending Update</Pill>;
  }
}

function BookingStatusCard({ state }: { state: BookingState }) {
  const isPart2    = BOOKING_PART2.includes(state);
  const isConfirmed = BOOKING_CONFIRMED.includes(state);

  const meta: { label: string; value: string }[] = [
    { label: 'Booking Channel Ref',     value: isPart2 ? 'INB20260501A' : '—' },
    { label: 'Carrier Booking Req Ref', value: isPart2 ? 'MSCUUK-REQ-004821' : '—' },
    { label: 'Carrier Booking Ref',     value: isConfirmed ? 'MSCUUK987654' : '—' },
    { label: 'Last Updated',            value: '01 May 2026, 11:00' },
  ];

  return (
    <div style={{
      background: 'var(--theme-color-pure-100)',
      border: `1px solid ${isConfirmed ? 'var(--theme-color-success-40)' : 'var(--theme-color-grey-10)'}`,
      borderRadius: 8, padding: 20,
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Heading */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 36, height: 18, borderRadius: 3, flexShrink: 0,
          background: '#0080C9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: -0.3 }}>MSC</span>
        </div>
        <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
          Carrier Booking
        </Text>
        {bookingStatusPill(state)}
      </div>

      {/* Carrier refs */}
      <FieldGrid fields={meta} columns={2} />

      {state === 'pending-update' && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 8, background: 'var(--theme-color-orange-20)' }}>
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-orange-120)' }}>
            Carrier requested changes — review feedback and amend the booking.
          </Text>
        </div>
      )}

      {/* Cut-off dates (post-CONFIRMED) */}
      {isConfirmed && (
        <>
          <Divider />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel>Cut-Off Dates</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 24px' }}>
              {BOOKING_CUTOFFS.map((c) => <FieldItem key={c.label} label={c.label} value={c.value} />)}
            </div>
          </div>
        </>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {state === 'draft' && (
          <>
            <Button variant="primary" size="md">Submit to Ops</Button>
            <Button variant="secondary" size="md" icon={<EditPencil width={16} height={16} />}>Edit</Button>
          </>
        )}
        {state === 'submitted' && (
          <>
            <Button variant="primary" size="md">Confirm</Button>
            <Button variant="secondary" size="md">Request Revision</Button>
          </>
        )}
        {state === 'revision-requested' && (
          <Button variant="secondary" size="md" icon={<EditPencil width={16} height={16} />}>Edit Part 1</Button>
        )}
        {state === 'confirmed-p1' && (
          <Button variant="primary" size="md" icon={<ChevronRight width={14} height={14} />} iconPosition="end">Place Carrier Booking</Button>
        )}
        {state === 'awaiting-carrier' && (
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontStyle: 'italic' }}>
            Awaiting carrier acknowledgement…
          </Text>
        )}
        {isConfirmed && (
          <>
            <Button variant="secondary" size="md">Amend Booking</Button>
            <Button variant="secondary" size="md">Cancel Booking</Button>
          </>
        )}
      </div>
    </div>
  );
}

function BookingSummary() {
  const items = [
    { key: 'customer', label: 'Customer & Reference', children: <FieldGrid fields={BOOKING_SUMMARY.customer} /> },
    { key: 'route',    label: 'Route',                children: <FieldGrid fields={BOOKING_SUMMARY.route} /> },
    { key: 'cargo',    label: 'Cargo & Equipment',    children: <FieldGrid fields={BOOKING_SUMMARY.cargo} /> },
    { key: 'carrier',  label: 'Carrier & Terms',      children: <FieldGrid fields={BOOKING_SUMMARY.carrier} /> },
  ];
  return <Collapse className="sd-booking-collapse" activeKey={items.map((i) => i.key)} items={items} />;
}

function BookingContent() {
  const [bookingState, setBookingState] = useState<BookingState>('booking-confirmed');

  return (
    <div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: filled details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <BookingSummary />
        </div>
        {/* Right: status + amendment history */}
        <div style={{ width: 440, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <BookingStatusCard state={bookingState} />
          {bookingState === 'booking-confirmed' && <AmendmentHistory entries={BOOKING_AMENDMENTS} />}
        </div>
      </div>

      {/* Floating booking state preview switcher */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 200,
        background: 'var(--theme-color-pure-100)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 12, padding: '12px 16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex', flexDirection: 'column', gap: 10,
        width: 220,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-primary-60)', flexShrink: 0 }} />
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>
            Booking Preview State
          </Text>
        </div>
        <Select
          value={bookingState}
          options={BOOKING_STATE_OPTIONS}
          onChange={(val: BookingState) => setBookingState(val)}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const MAIN_TABS = [
  { key: 'overview',             label: 'Overview' },
  { key: 'booking-instructions', label: 'Booking & Instructions' },
  { key: 'containers',           label: 'Containers' },
  { key: 'documents',            label: 'Documents' },
  { key: 'charges',              label: 'Charges' },
  { key: 'services',             label: 'Services' },
  { key: 'parties',              label: 'Parties' },
  { key: 'activity',             label: 'Activity' },
];

export default function ShipmentDetailsV3Page({ params }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--theme-color-grey-5)', position: 'relative' }}>
      <NavBar />

      {/* White card */}
      <div style={{
        position: 'absolute',
        top: 72, left: 12, right: 12, bottom: 12,
        background: 'var(--theme-color-pure-100)',
        borderRadius: 16,
        padding: '40px 40px 0',
        overflowY: 'auto',
        boxShadow: '-2px 0px 8px rgba(136, 136, 136, 0.06)',
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 24 }}>
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
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                ONH-2026-04821
              </Text>
              <Pill color="blue" theme="light" size="sm" showIcon={false}>In Transit</Pill>
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
          <div style={{ flexShrink: 0 }}>
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
          </div>
        </div>

        {/* Tabs nav */}
        <Tabs
          className="sd-main-tabs"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={MAIN_TABS.map(t => ({ ...t, children: null }))}
        />

        {/* Tab content */}
        <div style={{ paddingTop: activeTab === 'booking-instructions' ? 8 : 24, paddingBottom: 40 }}>
          {activeTab === 'overview'             && <OverviewContent />}
          {activeTab === 'booking-instructions' && <BookingInstructionsContent />}
        </div>
      </div>

      {/* Bottom-left panel toggle */}
      <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 200 }}>
        <Button variant="secondary" size="md" icon={<Leftpanelopen width={16} height={16} />} />
      </div>
    </div>
  );
}

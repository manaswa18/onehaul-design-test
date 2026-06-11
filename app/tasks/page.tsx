'use client';

import React, { useState } from 'react';
import Text from '@/components/Text';
import ButtonComponent from '@/components/Button';
import Avatar from '@/components/Avatar';
import PillComponent from '@/components/Pill';
import ChipsComponent from '@/components/Chips';
import CheckboxComponent from '@/components/Checkbox';
import TabsComponent from '@/components/Tabs';
import CollapseComponent from '@/components/Collapse';
import { Add, ListIcon, HelpIcon, NotificationIcon, DocIcon, MoreVert } from '@/icons';
import './tasks.css';

const Button = ButtonComponent as React.ComponentType<any>;
const Pill = PillComponent as React.ComponentType<any>;
const Chips = ChipsComponent as React.ComponentType<any>;
const Checkbox = CheckboxComponent as React.ComponentType<any>;
const Tabs = TabsComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;

// ─── Types ────────────────────────────────────────────────────────────────────

type Urgency = 'overdue' | 'due-today' | 'due-week' | 'upcoming' | 'completed';

interface Assignee {
  name: string;
  initials: string;
  color: string;
}

interface TaskItem {
  id: string;
  name: string;
  shipmentNo: string;
  client: string;
  stage: string;
  urgency: Urgency;
  assignee: Assignee | null;
  deadlineDate: string;
  deadlineLabel: string;
  hasCTA: boolean;
  ctaLabel?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_TASKS: TaskItem[] = [
  // OVERDUE
  {
    id: 't1', name: 'Submit Shipping Instructions (SI)', shipmentNo: 'ONH-2026-04821', client: 'Voltas India',
    stage: 'Pre-Shipment', urgency: 'overdue',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: '7 May 2026', deadlineLabel: '2 days overdue', hasCTA: true, ctaLabel: 'Submit SI',
  },
  {
    id: 't2', name: 'Place Original BL Order', shipmentNo: 'ONH-2026-04795', client: 'Steel Authority of India',
    stage: 'Pre-Shipment', urgency: 'overdue',
    assignee: { name: 'Priya Sharma', initials: 'PS', color: 'var(--theme-color-purple-100)' },
    deadlineDate: '6 May 2026', deadlineLabel: '3 days overdue', hasCTA: true, ctaLabel: 'Place Order',
  },
  {
    id: 't3', name: 'VGM Declaration', shipmentNo: 'ONH-2026-04788', client: 'Tata Motors Export',
    stage: 'Pre-Shipment', urgency: 'overdue',
    assignee: null,
    deadlineDate: '5 May 2026', deadlineLabel: '4 days overdue', hasCTA: true, ctaLabel: 'Submit VGM',
  },
  // DUE TODAY
  {
    id: 't4', name: 'Upload Export Customs Entry', shipmentNo: 'ONH-2026-04821', client: 'Voltas India',
    stage: 'Pre-Shipment', urgency: 'due-today',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: 'Today', deadlineLabel: '17:00', hasCTA: true, ctaLabel: 'Upload',
  },
  {
    id: 't5', name: 'Send Pre-Alert to Destination Agent', shipmentNo: 'ONH-2026-04803', client: 'Havells International',
    stage: 'Ocean Transit', urgency: 'due-today',
    assignee: { name: 'Arjun Mehta', initials: 'AM', color: 'var(--theme-color-success-100)' },
    deadlineDate: 'Today', deadlineLabel: '12:00', hasCTA: true, ctaLabel: 'Send',
  },
  {
    id: 't6', name: 'Upload Commercial Invoice', shipmentNo: 'ONH-2026-04811', client: 'Bharat Electronics',
    stage: 'Pre-Shipment', urgency: 'due-today',
    assignee: { name: 'Priya Sharma', initials: 'PS', color: 'var(--theme-color-purple-100)' },
    deadlineDate: 'Today', deadlineLabel: '14:00', hasCTA: true, ctaLabel: 'Upload',
  },
  {
    id: 't7', name: 'Confirm Internal Booking Request', shipmentNo: 'ONH-2026-04819', client: 'Jindal Steel',
    stage: 'Pre-Shipment', urgency: 'due-today',
    assignee: null,
    deadlineDate: 'Today', deadlineLabel: '18:00', hasCTA: true, ctaLabel: 'Review',
  },
  // THIS WEEK
  {
    id: 't8', name: 'BL Draft Review & Approval', shipmentNo: 'ONH-2026-04821', client: 'Voltas India',
    stage: 'Pre-Shipment', urgency: 'due-week',
    assignee: { name: 'Priya Sharma', initials: 'PS', color: 'var(--theme-color-purple-100)' },
    deadlineDate: '13 May 2026', deadlineLabel: 'In 2 days', hasCTA: true, ctaLabel: 'Review BL',
  },
  {
    id: 't9', name: 'File Export Customs Declaration', shipmentNo: 'ONH-2026-04795', client: 'Steel Authority of India',
    stage: 'Pre-Shipment', urgency: 'due-week',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: '14 May 2026', deadlineLabel: 'In 3 days', hasCTA: false,
  },
  {
    id: 't10', name: 'Notify Customer — Departure Confirmed', shipmentNo: 'ONH-2026-04803', client: 'Havells International',
    stage: 'Vessel Departed', urgency: 'due-week',
    assignee: { name: 'Arjun Mehta', initials: 'AM', color: 'var(--theme-color-success-100)' },
    deadlineDate: '16 May 2026', deadlineLabel: 'In 5 days', hasCTA: true, ctaLabel: 'Draft Message',
  },
  {
    id: 't11', name: 'Update Shipment Milestone — Gated In', shipmentNo: 'ONH-2026-04788', client: 'Tata Motors Export',
    stage: 'Pre-Shipment', urgency: 'due-week',
    assignee: { name: 'Ravi Patel', initials: 'RP', color: 'var(--theme-color-orange-100)' },
    deadlineDate: '15 May 2026', deadlineLabel: 'In 4 days', hasCTA: false,
  },
  {
    id: 't12', name: 'Chase Carrier for Vessel Allocation', shipmentNo: 'ONH-2026-04819', client: 'Jindal Steel',
    stage: 'Booking Confirmed', urgency: 'due-week',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: '17 May 2026', deadlineLabel: 'In 6 days', hasCTA: false,
  },
  // UPCOMING
  {
    id: 't13', name: 'Original BL Release / Telex Release', shipmentNo: 'ONH-2026-04795', client: 'Steel Authority of India',
    stage: 'Vessel Departed', urgency: 'upcoming',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: '21 May 2026', deadlineLabel: 'In 10 days', hasCTA: false,
  },
  {
    id: 't14', name: 'Arrival Notice — Acknowledge Receipt', shipmentNo: 'ONH-2026-04803', client: 'Havells International',
    stage: 'Arrived at POD', urgency: 'upcoming',
    assignee: { name: 'Priya Sharma', initials: 'PS', color: 'var(--theme-color-purple-100)' },
    deadlineDate: '25 May 2026', deadlineLabel: 'In 14 days', hasCTA: false,
  },
  {
    id: 't15', name: 'Arrange Import Customs Clearance', shipmentNo: 'ONH-2026-04811', client: 'Bharat Electronics',
    stage: 'Clearance & Delivery', urgency: 'upcoming',
    assignee: { name: 'Ravi Patel', initials: 'RP', color: 'var(--theme-color-orange-100)' },
    deadlineDate: '29 May 2026', deadlineLabel: 'In 18 days', hasCTA: false,
  },
  {
    id: 't16', name: 'Confirm Final Delivery to Customer', shipmentNo: 'ONH-2026-04788', client: 'Tata Motors Export',
    stage: 'Clearance & Delivery', urgency: 'upcoming',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: '5 Jun 2026', deadlineLabel: 'In 25 days', hasCTA: true, ctaLabel: 'Record Delivery',
  },
  // COMPLETED
  {
    id: 't17', name: 'Place Carrier Booking Request', shipmentNo: 'ONH-2026-04821', client: 'Voltas India',
    stage: 'Booking Initiated', urgency: 'completed',
    assignee: { name: 'Sahil Kala', initials: 'SK', color: 'var(--theme-color-teal-100)' },
    deadlineDate: 'Completed', deadlineLabel: '15 Apr 2026', hasCTA: false,
  },
  {
    id: 't18', name: 'Confirm Internal Booking Request', shipmentNo: 'ONH-2026-04803', client: 'Havells International',
    stage: 'Booking Initiated', urgency: 'completed',
    assignee: { name: 'Ravi Patel', initials: 'RP', color: 'var(--theme-color-orange-100)' },
    deadlineDate: 'Completed', deadlineLabel: '14 Apr 2026', hasCTA: false,
  },
];

// ─── Section config ───────────────────────────────────────────────────────────

const SECTIONS: {
  urgency: Urgency;
  label: string;
  dotColor: string;
  labelColor: string;
  pillColor: string;
  defaultExpanded: boolean;
}[] = [
  { urgency: 'overdue',   label: 'OVERDUE',   dotColor: 'var(--theme-color-error-100)',    labelColor: 'var(--theme-color-error-100)',  pillColor: 'error',   defaultExpanded: true },
  { urgency: 'due-today', label: 'DUE TODAY', dotColor: 'var(--theme-color-orange-100)',   labelColor: 'var(--theme-color-orange-120)', pillColor: 'orange',  defaultExpanded: true },
  { urgency: 'due-week',  label: 'THIS WEEK', dotColor: 'var(--theme-color-yellow-120)',   labelColor: 'var(--theme-color-grey-100)',   pillColor: 'yellow',  defaultExpanded: false },
  { urgency: 'upcoming',  label: 'UPCOMING',  dotColor: 'var(--theme-color-grey-30)',      labelColor: 'var(--theme-color-grey-60)',    pillColor: 'default', defaultExpanded: false },
  { urgency: 'completed', label: 'COMPLETED', dotColor: 'var(--theme-color-success-100)',  labelColor: 'var(--theme-color-grey-60)',    pillColor: 'success', defaultExpanded: false },
];

// ─── Icon box ─────────────────────────────────────────────────────────────────

const ICON_BG: Record<Urgency, string> = {
  overdue:    'var(--theme-color-error-100)',
  'due-today': 'var(--theme-color-orange-100)',
  'due-week': 'var(--theme-color-yellow-120)',
  upcoming:   'var(--theme-color-grey-40)',
  completed:  'var(--theme-color-success-100)',
};

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
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('urgency');
  const [activeKeys, setActiveKeys] = useState<string[]>(['overdue', 'due-today']);

  const tasksByUrgency = (urgency: Urgency) => MOCK_TASKS.filter(t => t.urgency === urgency);

  const visibleSections = activeFilter === 'all'
    ? SECTIONS
    : SECTIONS.filter(s => s.urgency === activeFilter);

  const totalOpen = MOCK_TASKS.filter(t => t.urgency !== 'completed').length;
  const totalOverdue = tasksByUrgency('overdue').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', position: 'relative', overflow: 'hidden' }}>
      <NavBar />

      <div
        style={{
          position: 'absolute', top: 72, left: 12, right: 12, bottom: 12,
          background: 'var(--theme-color-pure-100)',
          borderRadius: 16,
          boxShadow: '-2px 0px 16px 0px rgba(136, 136, 136, 0.06)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Page header */}
          <div className="tasks-page-header">
            <div className="tasks-header-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  Tasks
                </Text>
              </div>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                {totalOpen} open tasks · {totalOverdue} overdue · Last updated just now
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Tabs
                type="secondary"
                defaultActiveKey="urgency"
                items={[
                  { key: 'urgency', label: 'By Urgency' },
                  { key: 'assignee', label: 'By Assignee' },
                ]}
                onChange={(key: string) => setViewMode(key)}
              />
              <Button variant="primary" size="md" icon={<Add width={14} height={14} />}>
                Add Task
              </Button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="tasks-filter-bar">
            <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', letterSpacing: '0.06em', fontSize: 11, textTransform: 'uppercase', flexShrink: 0 }}>
              Filter
            </Text>
            <Chips
              items={[
                { key: 'all',       label: 'All urgency' },
                { key: 'overdue',   label: '● Overdue' },
                { key: 'due-today', label: 'Due today' },
                { key: 'due-week',  label: 'Due this week' },
                { key: 'upcoming',  label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
              ]}
              selected={activeFilter}
              setSelected={setActiveFilter}
              mandatory
              theme="line"
              size="sm"
            />
            <div className="tasks-filter-divider" />
            {(['Task type', 'Assignee', 'Shipment', 'Stage', 'Carrier', 'Client'] as string[]).map(label => (
              <button key={label} className="tasks-filter-btn">
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>{label}</Text>
              </button>
            ))}
            <button className="tasks-filter-clear">
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>× Clear</Text>
            </button>
            <button className="tasks-filter-save">
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-primary-60)' }}>+ Save view</Text>
            </button>
          </div>

          {/* Column headers — plain, no background or border */}
          <div className="tasks-col-header">
            <div className="tasks-col-cb" />
            <div className="tasks-col-task">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Task
              </Text>
            </div>
            <div className="tasks-col-stage">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Stage
              </Text>
            </div>
            <div className="tasks-col-shipment">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Shipment
              </Text>
            </div>
            <div className="tasks-col-assignee">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Assignee
              </Text>
            </div>
            <div className="tasks-col-deadline">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Deadline
              </Text>
            </div>
            <div className="tasks-col-action">
              <Text variant="caption" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Action
              </Text>
            </div>
          </div>

          {/* Task sections — Collapse component */}
          <div className="tasks-sections">
            <Collapse
              type="default"
              expandIconPosition="start"
              activeKey={activeKeys}
              onChange={(keys: string | string[]) =>
                setActiveKeys(Array.isArray(keys) ? keys : keys ? [keys] : [])
              }
              items={visibleSections
                .filter(s => tasksByUrgency(s.urgency).length > 0)
                .map(section => {
                  const tasks = tasksByUrgency(section.urgency);
                  return {
                    key: section.urgency,
                    label: (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: section.dotColor, display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ color: section.labelColor, fontWeight: 600, letterSpacing: '0.06em', fontSize: 13 }}>{section.label}</span>
                      </span>
                    ),
                    suffix: (
                      <Pill color={section.pillColor} theme="light" size="sm" showIcon={false}>
                        {tasks.length} tasks
                      </Pill>
                    ),
                    children: (
                      <div className="tasks-section-rows">
                        {tasks.map((task, idx) => {
                          const isOverdue = task.urgency === 'overdue';
                          const isDueToday = task.urgency === 'due-today';
                          const isCompleted = task.urgency === 'completed';
                          return (
                            <div
                              key={task.id}
                              className={`tasks-row${idx < tasks.length - 1 ? ' tasks-row--divided' : ''}`}
                              style={{ borderLeft: `3px solid ${isOverdue ? 'var(--theme-color-error-100)' : isDueToday ? 'var(--theme-color-orange-100)' : 'transparent'}` }}
                            >
                              {/* Checkbox */}
                              <div className="tasks-col-cb">
                                <Checkbox />
                              </div>

                              {/* Task: icon + name + shipment + client */}
                              <div className="tasks-col-task">
                                <div style={{ width: 24, height: 24, borderRadius: 4, flexShrink: 0, background: ICON_BG[task.urgency], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <ListIcon width={12} height={12} color="white" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                                  <Text variant="body" size="sm" weight="medium" style={{ color: isCompleted ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-100)', textDecoration: isCompleted ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {task.name}
                                  </Text>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Text variant="caption" size="md" style={{ color: 'var(--theme-color-primary-60)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                      {task.shipmentNo}
                                    </Text>
                                    <Text variant="caption" size="md" style={{ color: 'var(--theme-color-grey-50)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {task.client}
                                    </Text>
                                  </div>
                                </div>
                              </div>

                              {/* Stage */}
                              <div className="tasks-col-stage">
                                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {task.stage}
                                </Text>
                              </div>

                              {/* Shipment link */}
                              <div className="tasks-col-shipment">
                                <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-primary-60)', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                                  {task.shipmentNo}
                                </Text>
                              </div>

                              {/* Assignee */}
                              <div className="tasks-col-assignee">
                                {task.assignee ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Avatar size="sm" style={{ background: task.assignee.color, flexShrink: 0 }}>{task.assignee.initials}</Avatar>
                                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-80)', whiteSpace: 'nowrap' }}>{task.assignee.name}</Text>
                                  </div>
                                ) : (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px dashed var(--theme-color-grey-30)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 1C3.79 7 2 7.895 2 9v.5h8V9c0-1.105-1.79-2-4-2Z" fill="var(--theme-color-grey-40)"/>
                                      </svg>
                                    </div>
                                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>Unassigned</Text>
                                  </div>
                                )}
                              </div>

                              {/* Deadline */}
                              <div className="tasks-col-deadline">
                                {isCompleted ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-40)' }}>{task.deadlineDate}</Text>
                                    <Text variant="caption" size="md" style={{ color: 'var(--theme-color-grey-40)' }}>{task.deadlineLabel}</Text>
                                  </div>
                                ) : isDueToday ? (
                                  <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-orange-120)' }}>
                                    Today  {task.deadlineLabel}
                                  </Text>
                                ) : isOverdue ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-error-100)' }}>{task.deadlineDate}</Text>
                                    <Text variant="caption" size="md" style={{ color: 'var(--theme-color-error-100)' }}>{task.deadlineLabel}</Text>
                                  </div>
                                ) : (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-80)' }}>{task.deadlineDate}</Text>
                                    <Text variant="caption" size="md" style={{ color: 'var(--theme-color-grey-50)' }}>{task.deadlineLabel}</Text>
                                  </div>
                                )}
                              </div>

                              {/* Action */}
                              <div className="tasks-col-action">
                                {task.hasCTA && !isCompleted && (
                                  <Button variant="secondary" size="sm">{task.ctaLabel} →</Button>
                                )}
                                <button className="tasks-overflow-btn" onClick={e => e.stopPropagation()}>
                                  <MoreVert width={14} height={14} color="var(--theme-color-grey-50)" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ),
                  };
                })
              }
            />
          </div>

        </div>
      </div>
    </div>
  );
}

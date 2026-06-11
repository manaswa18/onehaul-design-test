'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BreadcrumbComponent from '@/components/Breadcrumb';
import ButtonComponent from '@/components/Button';
import CollapseComponent from '@/components/Collapse';
import InputComponent from '@/components/Input';
import InputNumberComponent from '@/components/InputNumber';
import SelectComponent from '@/components/Select';
import Text from '@/components/Text';
import Avatar from '@/components/Avatar';
import PillComponent from '@/components/Pill';
import { DocIcon, HelpIcon, NotificationIcon, EditPencil, Redirect, Block } from '@/icons';

const Breadcrumb = BreadcrumbComponent as React.ComponentType<any>;
const Button     = ButtonComponent as React.ComponentType<any>;
const Collapse   = CollapseComponent as React.ComponentType<any>;
const Input       = InputComponent as React.ComponentType<any>;
const InputNumber = InputNumberComponent as React.ComponentType<any>;
const Select      = SelectComponent as React.ComponentType<any>;
const Pill       = PillComponent as React.ComponentType<any>;

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingState =
  | 'draft'
  | 'submitted'
  | 'revision-requested'
  | 'confirmed-p1'
  | 'awaiting-carrier'
  | 'booking-confirmed'
  | 'pending-update';

const STATE_OPTIONS = [
  { value: 'draft',              label: 'Draft' },
  { value: 'submitted',          label: 'Submitted to Ops' },
  { value: 'revision-requested', label: 'Revision Requested' },
  { value: 'confirmed-p1',       label: 'Part 1 Confirmed' },
  { value: 'awaiting-carrier',   label: 'Awaiting Carrier' },
  { value: 'booking-confirmed',  label: 'Booking Confirmed' },
  { value: 'pending-update',     label: 'Pending Update' },
];

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 16px', zIndex: 10,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ width: 36, height: 36, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
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

// ─── Atoms ────────────────────────────────────────────────────────────────────

// Field (uppercase label variant) — preserved for potential future use.
/*
function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px' }}>
        {label}
      </Text>
      <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)' }}>
        {value || '—'}
      </Text>
    </div>
  );
}
*/

// View-mode field: label 12px grey-40 / value 14px grey-100, matching Figma read state
function ViewField({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 12, lineHeight: '16px' }}>
        {label}
      </Text>
      <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)', lineHeight: '20px' }}>
        {value || '—'}
      </Text>
    </div>
  );
}

const MOVEMENT_TYPE_OPTIONS = [
  { value: 'port-to-port', label: 'Port to Port' },
  { value: 'door-to-door', label: 'Door to Door' },
  { value: 'door-to-port', label: 'Door to Port' },
  { value: 'port-to-door', label: 'Port to Door' },
];

// ─── DCSA carrier card ────────────────────────────────────────────────────────

function DCSACard({ statusLabel, statusColor, refs }: { statusLabel: string; statusColor: string; refs: { label: string; value: string }[] }) {
  return (
    <div style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--theme-color-grey-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#102B46', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Text variant="body" size="sm" weight="semibold" style={{ color: 'white', fontSize: 11 }}>MSC</Text>
          </div>
          <div>
            <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>MSC Mediterranean Shipping Company</Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>DCSA v2.2 · Carrier Booking API</Text>
          </div>
        </div>
        <Pill color={statusColor} theme="light" size="sm" showIcon={false}>{statusLabel}</Pill>
      </div>
      <div style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 40px' }}>
        {refs.map((r) => <ViewField key={r.label} label={r.label} value={r.value} />)}
      </div>
    </div>
  );
}

// ─── Compact Part 1 summary ───────────────────────────────────────────────────

// P1SummaryCard — compact summary card, preserved for potential future use.
// Now replaced by full view-mode accordions (CustomerRefView + RouteView + CargoEquipmentView + CarrierPrefsView).
/*
function P1SummaryCard() {
  return (
    <div style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Customer',         value: 'Voltas India Limited' },
          { label: 'Route',            value: 'INMUN → AEJEA · Port to Port' },
          { label: 'Equipment',        value: '2 × 40GP' },
          { label: 'Preferred Carrier', value: 'MSC, Maersk' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ padding: '12px 16px', borderRight: i < arr.length - 1 ? '1px solid var(--theme-color-grey-5)' : undefined }}>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px', marginBottom: 4, display: 'block' }}>
              {item.label}
            </Text>
            <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>{item.value}</Text>
          </div>
        ))}
      </div>
      <div style={{ padding: '8px 16px', background: 'var(--theme-color-grey-2)', borderTop: '1px solid var(--theme-color-grey-5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>
          Confirmed by <strong style={{ color: 'var(--theme-color-grey-60)' }}>Sahil Kala (Ops)</strong> · 22 Apr 2026, 14:30
        </Text>
        <Button variant="tertiary" size="sm" icon={<EditPencil width={12} height={12} />}>View details</Button>
      </div>
    </div>
  );
}
*/

// ─── Booking Journey (right sidebar stepper) ──────────────────────────────────

// ─── Booking Journey (right sidebar stepper) ──────────────────────────────────

interface JourneyStep {
  title: string;
  description: string;
  stepIndex: number;
  current: number;
}

function StepCircle({ index, current }: { index: number; current: number }) {
  const done   = index < current;
  const active = index === current;
  const bg     = done ? 'var(--theme-color-success-60)' : active ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-10)';
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {done ? (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5L5.5 10L11 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <Text variant="caption" size="sm" weight="semibold" style={{ color: active ? 'white' : 'var(--theme-color-grey-40)', lineHeight: 1 }}>
          {index + 1}
        </Text>
      )}
    </div>
  );
}

function BookingJourney({
  steps, current, viewingStep, onStepClick, isConfirmed,
}: {
  steps: { title: string; description: string; cta?: string }[];
  current: number;
  viewingStep: number;
  onStepClick: (i: number) => void;
  isConfirmed: boolean;
}) {
  const clampedCurrent = Math.min(current, steps.length - 1);
  return (
    <div>
      <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
        Booking Journey
      </Text>
      {steps.map((step, i) => {
        const isDone        = i < current;
        const isCurrent     = i === clampedCurrent;
        // Completed steps: always show CTA. Current step: show CTA only when user has jumped away.
        const showCta       = step.cta && (isDone || (isCurrent && viewingStep !== i));
        return (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <StepCircle index={i} current={current} />
              {i < steps.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 16, background: isDone ? 'var(--theme-color-success-40)' : 'var(--theme-color-grey-10)', margin: '4px 0' }} />
              )}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 48 : 0, flex: 1, minWidth: 0 }}>
              <Text variant="body" size="sm" weight={isCurrent ? 'semibold' : 'medium'} style={{ color: i > current ? 'var(--theme-color-grey-40)' : 'var(--theme-color-grey-100)', display: 'block', marginBottom: 2 }}>
                {step.title}
              </Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', display: 'block', marginBottom: showCta ? 6 : 0 }}>
                {step.description}
              </Text>
              {showCta && (
                <Button
                  variant="link"
                  size="sm"
                  style={{ marginLeft: -4 }}
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); onStepClick(i); }}
                >
                  {step.cta}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Collapse section content ─────────────────────────────────────────────────

interface FormState {
  movementType: string;
}

function CustomerRefContent({ readonly }: { readonly: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Select placeholder="Customer" floatLabel clearable={false} disabled={readonly} value="Voltas India Limited" options={[{ value: 'Voltas India Limited', label: 'Voltas India Limited' }]} /></div>
        <div style={{ flex: 1 }}><Input placeholder="Customer Reference" disabled={readonly} value="VIL-EXP-2026-112" /></div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Select placeholder="Assigned Ops Executive" floatLabel clearable={false} disabled={readonly} value="Sahil Kala" options={[{ value: 'Sahil Kala', label: 'Sahil Kala' }]} /></div>
        <div style={{ flex: 1 }}><Input placeholder="Internal Notes" disabled={readonly} value="Customer requires pre-alert 48 hrs before departure." /></div>
      </div>
    </div>
  );
}

function RouteContent({ formState, setFormState, readonly }: { formState: FormState; setFormState: React.Dispatch<React.SetStateAction<FormState>>; readonly: boolean }) {
  const showReceipt  = formState.movementType === 'door-to-door' || formState.movementType === 'door-to-port';
  const showDelivery = formState.movementType === 'door-to-door' || formState.movementType === 'port-to-door';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Select
            placeholder="Movement Type"
            floatLabel
            clearable={false}
            disabled={readonly}
            value={formState.movementType}
            options={MOVEMENT_TYPE_OPTIONS}
            onChange={(v: string) => setFormState((s) => ({ ...s, movementType: v }))}
          />
        </div>
        <div style={{ flex: 1 }} />
      </div>
      {showReceipt && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><Input placeholder="Place of Receipt" disabled={readonly} value="Ferozabad, IN" /></div>
          <div style={{ flex: 1 }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Select placeholder="Port of Loading (POL)" floatLabel clearable={false} disabled={readonly} value="INMUN" options={[{ value: 'INMUN', label: 'INMUN — Mumbai (Nhava Sheva)' }]} /></div>
        <div style={{ flex: 1 }}><Select placeholder="Port of Discharge (POD)" floatLabel clearable={false} disabled={readonly} value="AEJEA" options={[{ value: 'AEJEA', label: 'AEJEA — Jebel Ali' }]} /></div>
      </div>
      {showDelivery && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><Input placeholder="Place of Delivery" disabled={readonly} value="Dubai, AE" /></div>
          <div style={{ flex: 1 }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Input placeholder="ETD Window — From" disabled={readonly} value="25 Apr 2026" /></div>
        <div style={{ flex: 1 }}><Input placeholder="ETD Window — To" disabled={readonly} value="10 May 2026" /></div>
      </div>
    </div>
  );
}

function CargoEquipmentContent({ readonly }: { readonly: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Input placeholder="Commodity Description" disabled={readonly} value="Metal Scrap (HMS 1&2)" /></div>
        <div style={{ flex: 1 }}><Input placeholder="HS Code" disabled={readonly} value="7204.49" /></div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Select placeholder="UN Number (if DG)" floatLabel clearable={false} disabled={readonly} value="" options={[{ value: '', label: 'Not applicable' }]} /></div>
        <div style={{ flex: 1 }}><Input placeholder="Special Requirements" disabled={readonly} value="None" /></div>
      </div>

      <div style={{ borderTop: '1px solid var(--theme-color-grey-5)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px' }}>
          Equipment
        </Text>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <Select
              placeholder="Container Type"
              floatLabel
              clearable={false}
              disabled={readonly}
              value="40GP"
              options={[
                { value: '20GP', label: "20' General Purpose" },
                { value: '40GP', label: "40' General Purpose" },
                { value: '40HC', label: "40' High Cube" },
                { value: '20RF', label: "20' Reefer" },
              ]}
            />
          </div>
          <div style={{ width: 120 }}>
            <InputNumber placeholder="Quantity" floated disabled={readonly} value={2} min={1} max={99} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View-mode content (step 0 / Internal Booking Request in confirmed states) ─

function CustomerRefView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Customer" value="Voltas India Limited" /></div>
        <div style={{ flex: 1 }}><ViewField label="Customer Reference" value="VIL-EXP-2026-112" /></div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Assigned Ops Executive" value="Sahil Kala" /></div>
        <div style={{ flex: 1 }}><ViewField label="Internal Notes" value="Customer requires pre-alert 48 hrs before departure." /></div>
      </div>
    </div>
  );
}

function RouteView({ formState }: { formState: FormState }) {
  const showReceipt  = formState.movementType === 'door-to-door' || formState.movementType === 'door-to-port';
  const showDelivery = formState.movementType === 'door-to-door' || formState.movementType === 'port-to-door';
  const movementLabel = MOVEMENT_TYPE_OPTIONS.find((o) => o.value === formState.movementType)?.label ?? formState.movementType;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Movement Type" value={movementLabel} /></div>
        <div style={{ flex: 1 }} />
      </div>
      {showReceipt && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><ViewField label="Place of Receipt" value="Ferozabad, IN" /></div>
          <div style={{ flex: 1 }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Port of Loading (POL)" value="INMUN — Mumbai (Nhava Sheva)" /></div>
        <div style={{ flex: 1 }}><ViewField label="Port of Discharge (POD)" value="AEJEA — Jebel Ali" /></div>
      </div>
      {showDelivery && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><ViewField label="Place of Delivery" value="Dubai, AE" /></div>
          <div style={{ flex: 1 }} />
        </div>
      )}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="ETD Window — From" value="25 Apr 2026" /></div>
        <div style={{ flex: 1 }}><ViewField label="ETD Window — To" value="10 May 2026" /></div>
      </div>
    </div>
  );
}

function CargoEquipmentView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Commodity Description" value="Metal Scrap (HMS 1&2)" /></div>
        <div style={{ flex: 1 }}><ViewField label="HS Code" value="7204.49" /></div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="UN Number (if DG)" value="Not applicable" /></div>
        <div style={{ flex: 1 }}><ViewField label="Special Requirements" value="None" /></div>
      </div>
      <div style={{ borderTop: '1px solid var(--theme-color-grey-5)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px' }}>
          Equipment
        </Text>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}><ViewField label="Container Type" value="40' General Purpose (40GP)" /></div>
          <div style={{ flex: 1 }}><ViewField label="Quantity" value="2" /></div>
        </div>
      </div>
    </div>
  );
}

function CarrierPrefsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Preferred Shipping Lines" value="MSC" /></div>
        <div style={{ flex: 1 }}><ViewField label="Booking Priority" value="Preferred carrier only" /></div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><ViewField label="Contract / Rate Reference" value="EINBRIT-MSC-2026" /></div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function CarrierPrefsContent({ readonly }: { readonly: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 4, paddingBottom: 4 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Select
            placeholder="Preferred Shipping Lines"
            floatLabel
            clearable={false}
            disabled={readonly}
            value="msc"
            options={[
              { value: 'msc',    label: 'MSC' },
              { value: 'maersk', label: 'Maersk' },
              { value: 'cma',    label: 'CMA CGM' },
              { value: 'hapag',  label: 'Hapag-Lloyd' },
            ]}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Select
            placeholder="Booking Priority"
            floatLabel
            clearable={false}
            disabled={readonly}
            value="preferred"
            options={[
              { value: 'cheapest',  label: 'Cheapest rate available' },
              { value: 'fastest',   label: 'Fastest transit time' },
              { value: 'preferred', label: 'Preferred carrier only' },
            ]}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}><Input placeholder="Contract / Rate Reference" disabled={readonly} value="EINBRIT-MSC-2026" /></div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function CarrierBookingContent({ state }: { state: BookingState }) {
  if (state === 'confirmed-p1') {
    return (
      <div style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--theme-color-grey-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#102B46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text variant="body" size="sm" weight="semibold" style={{ color: 'white', fontSize: 11 }}>MSC</Text>
            </div>
            <div>
              <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>MSC Mediterranean Shipping Company</Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)' }}>DCSA v2.2 · Ready to submit</Text>
            </div>
          </div>
        </div>
        <div style={{ padding: '12px 20px', background: 'var(--theme-color-grey-2)' }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
            Part 1 confirmed. Submit to MSC via DCSA API. Contract ref:{' '}
            <strong style={{ color: 'var(--theme-color-grey-70)' }}>EINBRIT-MSC-2026</strong>
          </Text>
        </div>
      </div>
    );
  }

  return (
    <DCSACard
      statusLabel={['booking-confirmed', 'pending-update'].includes(state) ? 'Received' : 'Sent'}
      statusColor={['booking-confirmed', 'pending-update'].includes(state) ? 'blue' : 'yellow'}
      refs={[
        { label: 'Booking Channel Ref', value: 'BCH-INB-20260423-001' },
        { label: 'Carrier Request Ref', value: 'INB20260423A' },
        { label: 'Submitted',           value: '23 Apr 2026, 10:32' },
      ]}
    />
  );
}

function CarrierResponseContent({ state }: { state: BookingState }) {
  if (state === 'awaiting-carrier') {
    return (
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
        <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>Awaiting carrier confirmation</Text>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', maxWidth: 360 }}>
          Booking request sent to MSC via DCSA. Carriers typically respond within 24 hours.
        </Text>
      </div>
    );
  }

  if (state === 'pending-update') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ padding: '12px 16px', borderRadius: 8, background: 'var(--theme-color-orange-10)', border: '1px solid var(--theme-color-orange-40)' }}>
          <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>
            MSC has responded with changes. Review and amend to proceed.
          </Text>
        </div>
        <DCSACard
          statusLabel="Pending Update"
          statusColor="orange"
          refs={[
            { label: 'Carrier Booking Ref', value: 'MSCUUK987654' },
            { label: 'Amendment Reason',    value: 'Vessel / ETD change' },
            { label: 'Carrier Response',    value: '26 Apr 2026, 09:15' },
          ]}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { field: 'ETD',    original: '25 Apr 2026', updated: '28 Apr 2026' },
            { field: 'Vessel', original: 'MSC DIANA',   updated: 'MSC MIRIAM'  },
          ].map((a) => (
            <div key={a.field} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 16px', borderRadius: 8, border: '1px solid var(--theme-color-orange-30)', background: 'var(--theme-color-orange-10)' }}>
              <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', width: 64, flexShrink: 0 }}>{a.field}</Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', textDecoration: 'line-through' }}>{a.original}</Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-30)' }}>→</Text>
              <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-orange-120)' }}>{a.updated}</Text>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // booking-confirmed
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DCSACard
        statusLabel="Confirmed"
        statusColor="success"
        refs={[
          { label: 'Carrier Booking Ref', value: 'MSCUUK987654' },
          { label: 'Vessel / Voyage',     value: 'MSC MIRIAM · AE6/PEX · V26023' },
          { label: 'Confirmed on',        value: '24 Apr 2026, 13:44' },
        ]}
      />
      <div>
        <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-50)', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px', marginBottom: 8, display: 'block' }}>
          Cut-off Dates
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'CY Cutoff',  date: '14 May 2026', time: '06:00', overdue: false },
            { label: 'SI Cutoff',  date: '12 May 2026', time: '15:00', overdue: true  },
            { label: 'VGM Cutoff', date: '13 May 2026', time: '15:00', overdue: false },
          ].map((c) => (
            <div key={c.label} style={{ padding: '12px 14px', borderRadius: 8, border: `1px solid ${c.overdue ? 'var(--theme-color-error-40)' : 'var(--theme-color-grey-10)'}`, background: c.overdue ? 'var(--theme-color-error-20)' : 'var(--theme-color-grey-2)', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Text variant="body" size="sm" style={{ color: c.overdue ? 'var(--theme-color-error-80)' : 'var(--theme-color-grey-50)', fontSize: 11 }}>{c.label}</Text>
              <Text variant="body" size="md" weight="semibold" style={{ color: c.overdue ? 'var(--theme-color-error-100)' : 'var(--theme-color-grey-100)' }}>{c.date}</Text>
              <Text variant="body" size="sm" style={{ color: c.overdue ? 'var(--theme-color-error-60)' : 'var(--theme-color-grey-40)' }}>{c.time}{c.overdue ? ' · Overdue' : ''}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManageBookingPage() {
  const router = useRouter();
  const [bookingState, setBookingState] = useState<BookingState>('draft');
  const [formState, setFormState] = useState<FormState>({ movementType: 'port-to-port' });
  const [viewingStep, setViewingStep] = useState<number>(0);

  const isEditing   = ['draft', 'revision-requested'].includes(bookingState);
  const isSubmitted = bookingState === 'submitted';
  const readonly    = isSubmitted;
  const isConfirmed = !['draft', 'submitted', 'revision-requested'].includes(bookingState);

  // ── Stepper ──────────────────────────────────────────────────────────────

  const stepperCurrent: Record<BookingState, number> = {
    'draft':              0,
    'submitted':          0,
    'revision-requested': 0,
    'confirmed-p1':       1,
    'awaiting-carrier':   2,
    'booking-confirmed':  3,
    'pending-update':     2,
  };

  const stepperDescription: Record<BookingState, [string, string, string]> = {
    'draft':              ['Draft — in progress',         'Not started yet',                    'Not started yet'],
    'submitted':          ['Submitted · Awaiting confirm', 'Not started yet',                    'Not started yet'],
    'revision-requested': ['Revision requested by Ops',   'Not started yet',                    'Not started yet'],
    'confirmed-p1':       ['Confirmed by Ops',             'Ready to place carrier booking',     'Not started yet'],
    'awaiting-carrier':   ['Confirmed by Ops',             'Sent to MSC · 23 Apr 2026',          'Awaiting MSC confirmation'],
    'booking-confirmed':  ['Confirmed by Ops',             'Received · 24 Apr 2026',             'Confirmed by MSC · 24 Apr 2026'],
    'pending-update':     ['Confirmed by Ops',             'Received · 24 Apr 2026',             'Pending amendment from MSC'],
  };

  const stepperItems = [
    {
      title: 'Internal Booking Request',
      description: stepperDescription[bookingState][0],
      // Done in all confirmed states
      cta: isConfirmed ? 'View Submitted Request →' : undefined,
    },
    {
      title: 'Carrier Booking Sent',
      description: stepperDescription[bookingState][1],
      // Done once sent; current (not yet sent) in confirmed-p1
      cta: ['awaiting-carrier', 'booking-confirmed', 'pending-update'].includes(bookingState)
        ? 'View Carrier Payload →'
        : bookingState === 'confirmed-p1' ? 'Go to Carrier Booking →' : undefined,
    },
    {
      title: 'Carrier Response',
      description: stepperDescription[bookingState][2],
      // Done in booking-confirmed; current in awaiting-carrier / pending-update
      cta: bookingState === 'booking-confirmed'
        ? 'View Carrier Response →'
        : ['awaiting-carrier', 'pending-update'].includes(bookingState) ? 'Go to Carrier Response →' : undefined,
    },
  ];

  // Reset viewingStep whenever the booking state changes
  useEffect(() => {
    setViewingStep(Math.min(stepperCurrent[bookingState], 2));
  }, [bookingState]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Collapse items ───────────────────────────────────────────────────────

  const collapseItems = useMemo(() => {
    if (!isConfirmed) {
      return [
        { key: 'customer',        label: 'Customer & Reference', subLabel: 'Who is booking and internal references',         children: <CustomerRefContent readonly={readonly} /> },
        { key: 'route',           label: 'Route',                subLabel: 'Ports, movement type and ETD window',            children: <RouteContent formState={formState} setFormState={setFormState} readonly={readonly} /> },
        { key: 'cargo-equipment', label: 'Cargo & Equipment',    subLabel: 'Commodity, HS code and container requirements',  children: <CargoEquipmentContent readonly={readonly} /> },
        { key: 'carrier-prefs',   label: 'Carrier Preferences',  subLabel: 'Preferred lines, priority and contract',         children: <CarrierPrefsContent readonly={readonly} /> },
      ];
    }

    // In confirmed states the accordion shows one step at a time, driven by viewingStep.
    // Step 0 — Internal Booking Request: all four sections in view (read-only label/value) mode.
    //           Hidden by default (journey map shows it is complete); accessible via sidebar step 0.
    if (viewingStep === 0) {
      return [
        { key: 'customer',        label: 'Customer & Reference', subLabel: 'Who is booking and internal references',        completed: true, children: <CustomerRefView /> },
        { key: 'route',           label: 'Route',                subLabel: 'Ports, movement type and ETD window',           completed: true, children: <RouteView formState={formState} /> },
        { key: 'cargo-equipment', label: 'Cargo & Equipment',    subLabel: 'Commodity, HS code and container requirements', completed: true, children: <CargoEquipmentView /> },
        { key: 'carrier-prefs',   label: 'Carrier Preferences',  subLabel: 'Preferred lines, priority and contract',        completed: true, children: <CarrierPrefsView /> },
      ];
    }

    // Step 1 — Carrier Booking
    const step1Completed = ['awaiting-carrier', 'booking-confirmed', 'pending-update'].includes(bookingState);
    if (viewingStep === 1) {
      return [
        {
          key: 'carrier-booking',
          label: 'Carrier Booking',
          subLabel: bookingState === 'confirmed-p1' ? 'Ready to place with MSC' : 'Submitted to MSC via DCSA',
          completed: step1Completed,
          showArrow: false,
          collapsible: 'icon',
          children: <CarrierBookingContent state={bookingState} />,
        },
      ];
    }

    // Step 2 — Carrier Response
    const step2Completed = bookingState === 'booking-confirmed';
    return ['awaiting-carrier', 'booking-confirmed', 'pending-update'].includes(bookingState)
      ? [
          {
            key: 'carrier-response',
            label: 'Carrier Response',
            subLabel: bookingState === 'booking-confirmed' ? 'Confirmed by MSC · 24 Apr 2026' : bookingState === 'pending-update' ? 'Pending amendment' : 'Awaiting carrier',
            completed: step2Completed,
            showArrow: false,
            collapsible: 'icon',
            children: <CarrierResponseContent state={bookingState} />,
          },
        ]
      : [];
  }, [bookingState, formState, readonly, isConfirmed, viewingStep]);

  // 'numbered' shows the green tick for completed items.
  // 'default' gives a plain accordion with no prefix/padding (used when the step isn't done yet).
  const collapseType = (() => {
    if (!isConfirmed || viewingStep === 0) return 'numbered';
    if (viewingStep === 1) return ['awaiting-carrier', 'booking-confirmed', 'pending-update'].includes(bookingState) ? 'numbered' : 'default';
    return bookingState === 'booking-confirmed' ? 'numbered' : 'default';
  })();

  const defaultOpenKeys = useMemo((): string[] => {
    if (!isConfirmed) return ['customer'];
    if (viewingStep === 0) return ['customer', 'route', 'cargo-equipment', 'carrier-prefs'];
    if (viewingStep === 1) return ['carrier-booking'];
    return ['carrier-response'];
  }, [isConfirmed, viewingStep]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--theme-color-grey-5)', position: 'relative' }}>
      <NavBar />

      <div style={{
        position: 'absolute', top: 72, left: 12, right: 12, bottom: 12,
        background: 'var(--theme-color-pure-100)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '-2px 0px 8px rgba(136,136,136,0.06)',
      }}>
        {/* Single scroll container for the whole sheet */}
        <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>

          {/* Full-width heading */}
          <div style={{ padding: '40px 40px 28px' }}>
            <div style={{ marginBottom: 16 }}>
              <Breadcrumb
                items={[
                  { title: <span onClick={() => router.push('/shipments')} style={{ cursor: 'pointer', color: 'var(--theme-color-grey-50)', fontSize: 12 }}>Shipments</span> },
                  { title: <span onClick={() => router.back()} style={{ cursor: 'pointer', color: 'var(--theme-color-grey-50)', fontSize: 12 }}>ONH-2026-04821</span> },
                  { title: <span style={{ color: 'var(--theme-color-primary-100)', fontSize: 12, fontWeight: 500 }}>Manage Booking</span> },
                ]}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  Manage Booking
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-50)' }}>
                    Carrier booking · 2 × 40GP · MSC Mediterranean ·{' '}
                    <span style={{ color: 'var(--theme-color-orange-120)', fontWeight: 500 }}>INMUN</span>
                    {' → '}
                    <span style={{ color: 'var(--theme-color-orange-120)', fontWeight: 500 }}>AEJEA</span>
                  </Text>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center', paddingTop: 4 }}>
                {isEditing && <Button variant="secondary" size="md">Save Draft</Button>}
                {isEditing && (
                  <Button variant="primary" size="md" icon={<Redirect width={14} height={14} />}>
                    {bookingState === 'revision-requested' ? 'Re-submit to Ops' : 'Submit to Ops'}
                  </Button>
                )}
                {bookingState === 'submitted' && (
                  <>
                    <Button variant="secondary" size="md">Request Revision</Button>
                    <Button variant="primary" size="md">Confirm Part 1</Button>
                  </>
                )}
                {bookingState === 'confirmed-p1' && (
                  <Button variant="primary" size="md" icon={<Redirect width={14} height={14} />}>Place Carrier Booking</Button>
                )}
                {bookingState === 'booking-confirmed' && (
                  <>
                    <Button variant="tertiary" size="md" error={true} icon={<Block width={14} height={14} />}>Cancel Booking</Button>
                    <Button variant="primary" size="md">Amend Booking</Button>
                  </>
                )}
                {bookingState === 'pending-update' && (
                  <Button variant="primary" size="md">Amend Booking</Button>
                )}
              </div>
            </div>
          </div>

          {/* Two-column layout — left journey + right form — within ONE sheet */}
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 40px 40px', gap: 32 }}>

            {/* Left: sticky Booking Journey */}
            <div style={{ width: 260, flexShrink: 0, position: 'sticky', top: 40 }}>
              <div style={{
                background: 'var(--theme-color-grey-2)',
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                padding: '20px 16px',
              }}>
                <BookingJourney
                  steps={stepperItems}
                  current={stepperCurrent[bookingState]}
                  viewingStep={viewingStep}
                  onStepClick={setViewingStep}
                  isConfirmed={isConfirmed}
                />
              </div>
            </div>

            {/* Right: form */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* State-specific banners */}
              {bookingState === 'submitted' && (
                <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 8, background: 'var(--theme-color-yellow-10)', border: '1px solid var(--theme-color-yellow-40)' }}>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>
                    Submitted by <strong>Ramesh K.</strong> on 22 Apr 2026, 10:15 — awaiting ops confirmation.
                  </Text>
                </div>
              )}
              {bookingState === 'revision-requested' && (
                <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 8, background: 'var(--theme-color-orange-10)', border: '1px solid var(--theme-color-orange-40)' }}>
                  <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-orange-120)', display: 'block', marginBottom: 4 }}>
                    Revision requested by Ops · 22 Apr 2026, 11:40
                  </Text>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>
                    &ldquo;Please clarify the HS code and confirm whether DG goods are included in this shipment.&rdquo;
                  </Text>
                </div>
              )}

              <Collapse
                key={`${bookingState}-${viewingStep}`}
                type={collapseType}
                items={collapseItems}
                defaultActiveKey={defaultOpenKeys}
              />

            </div>

          </div>
        </div>
      </div>

      {/* Floating state preview switcher */}
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
            Preview State
          </Text>
        </div>
        <Select
          value={bookingState}
          options={STATE_OPTIONS}
          onChange={(val: BookingState) => setBookingState(val)}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

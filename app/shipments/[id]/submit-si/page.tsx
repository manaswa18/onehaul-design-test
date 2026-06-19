'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Text from '@/components/Text';
import BreadcrumbComponent from '@/components/Breadcrumb';
import ButtonComponent from '@/components/Button';
import CollapseComponent from '@/components/Collapse';
import InputComponent from '@/components/Input';
import SelectComponent from '@/components/Select';
import CheckboxComponent from '@/components/Checkbox';
import PillComponent from '@/components/Pill';
import Avatar from '@/components/Avatar';
import { DocIcon, HelpIcon, NotificationIcon, EditPencil, Success } from '@/icons';
import './submit-si.css';

const Breadcrumb = BreadcrumbComponent as React.ComponentType<any>;
const Button     = ButtonComponent as React.ComponentType<any>;
const Collapse   = CollapseComponent as React.ComponentType<any>;
const Input      = InputComponent as React.ComponentType<any>;
const Select     = SelectComponent as React.ComponentType<any>;
const Checkbox   = CheckboxComponent as React.ComponentType<any>;
const Pill       = PillComponent as React.ComponentType<any>;

// ─── Constants ────────────────────────────────────────────────────────────────

const SHIPMENT_ID = 'ONH-2026-04821';

const BL_TYPE_OPTIONS = [
  { value: 'original',   label: 'Original Bill of Lading' },
  { value: 'telex',      label: 'Telex Release' },
  { value: 'seawaybill', label: 'Sea Waybill (Non-Negotiable)' },
];

const FREIGHT_TERMS_OPTIONS = [
  { value: 'prepaid', label: 'Freight Prepaid' },
  { value: 'collect', label: 'Freight Collect' },
  { value: 'both',    label: 'Freight Prepaid / Collect' },
];

const FREIGHT_PAYABLE_OPTIONS = [
  { value: 'pol', label: 'Port of Loading (Felixstowe)' },
  { value: 'pod', label: 'Port of Discharge (Gdańsk)' },
];

const COUNTRY_OPTIONS = [
  { value: 'IN', label: 'India' },
  { value: 'CN', label: 'China' },
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SG', label: 'Singapore' },
  { value: 'JP', label: 'Japan' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'PL', label: 'Poland' },
  { value: 'FR', label: 'France' },
  { value: 'AU', label: 'Australia' },
];

const PACKAGE_TYPE_OPTIONS = [
  { value: 'cartons',  label: 'Cartons' },
  { value: 'pallets',  label: 'Pallets' },
  { value: 'bags',     label: 'Bags' },
  { value: 'drums',    label: 'Drums' },
  { value: 'coils',    label: 'Coils' },
  { value: 'crates',   label: 'Crates' },
  { value: 'bundles',  label: 'Bundles' },
  { value: 'other',    label: 'Other' },
];

const ROLE_OPTIONS = [
  { value: 'ops',     label: 'Freight Ops Executive' },
  { value: 'sales',   label: 'Sales Executive' },
  { value: 'manager', label: 'Operations Manager' },
];

const STATE_OPTIONS = [
  { value: 'empty',  label: 'Not filled' },
  { value: 'filled', label: 'Pre-filled' },
];

type RoleType = 'ops' | 'sales' | 'manager';
type FormStateType = 'empty' | 'filled';

interface ContainerRow {
  id: number;
  containerNo: string;
  sealNo: string;
  marksNumbers: string;
  tareWeight: string;
}

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

// ─── SI Journey Sidebar ───────────────────────────────────────────────────────

// ─── Step footer (Reset + Save) ───────────────────────────────────────────────

function StepFooter({ canSave, onReset, onSave }: { canSave: boolean; onReset: () => void; onSave: () => void }) {
  return (
    <>
      <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="md" style={{ width: 120 }} onClick={onReset}>Reset</Button>
        <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={onSave}>Save</Button>
      </div>
    </>
  );
}

// ─── SI Status Card (post-submit) ─────────────────────────────────────────────

function SIStatusCard() {
  return (
    <div style={{
      background: 'var(--theme-color-pure-100)',
      border: '1px solid var(--theme-color-success-40)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--theme-color-success-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Success width={18} height={18} color="var(--theme-color-success-100)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <Text variant="body" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                Shipping Instructions Submitted
              </Text>
              <Pill color="success" theme="light" size="sm" showIcon={false}>Submitted</Pill>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { label: 'Submitted by',   value: 'Sahil Kala (Ops Exec)' },
                { label: 'Submitted on',   value: '12 May 2026, 11:23' },
                { label: 'SI Cutoff',      value: '12 May 2026, 15:00' },
                { label: 'Cutoff status',  value: '✓ Submitted before cutoff' },
              ].map((item) => (
                <div key={item.label}>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 11, display: 'block' }}>
                    {item.label}
                  </Text>
                  <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button variant="secondary" size="md" style={{ flexShrink: 0 }}>
          Download SI Document
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SubmitSIPage() {
  const router = useRouter();

  // ── Role preview & submission state ──────────────────────────────────────
  const [previewRole, setPreviewRole] = useState<RoleType>('ops');
  const [previewState, setPreviewState] = useState<FormStateType>('empty');
  const [siSubmitted, setSiSubmitted] = useState(false);

  const formLocked = previewRole === 'sales' || siSubmitted;
  const isSalesView = previewRole === 'sales';
  // In sales view, bypass cascade disable so they can browse all sections
  const cascadeEnabled = !isSalesView;

  // ── Accordion state ───────────────────────────────────────────────────────
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);
  const [step1Saved, setStep1Saved] = useState(false);
  const [step2Saved, setStep2Saved] = useState(false);
  const [step3Saved, setStep3Saved] = useState(false);
  const [step4Saved, setStep4Saved] = useState(false);

  // ── Step 1 fields — BL Details & Freight Terms ────────────────────────────
  const [blType,           setBlType]           = useState('original');
  const [numOriginals,     setNumOriginals]      = useState('3');
  const [freightTerms,     setFreightTerms]      = useState('prepaid');
  const [freightPayableAt, setFreightPayableAt]  = useState('');
  const [blDraftRef,       setBlDraftRef]        = useState('');

  // ── Step 2 fields — Shipper ───────────────────────────────────────────────
  const [shipperName,    setShipperName]    = useState('');
  const [shipperAddr1,   setShipperAddr1]   = useState('');
  const [shipperAddr2,   setShipperAddr2]   = useState('');
  const [shipperCity,    setShipperCity]    = useState('');
  const [shipperCountry, setShipperCountry] = useState('');
  const [shipperContact, setShipperContact] = useState('');
  const [shipperPhone,   setShipperPhone]   = useState('');
  const [shipperEmail,   setShipperEmail]   = useState('');

  // ── Step 3 fields — Consignee & Notify ───────────────────────────────────
  const [toOrder,           setToOrder]           = useState(false);
  const [consigneeName,     setConsigneeName]     = useState('');
  const [consigneeAddr1,    setConsigneeAddr1]    = useState('');
  const [consigneeCity,     setConsigneeCity]     = useState('');
  const [consigneeCountry,  setConsigneeCountry]  = useState('');
  const [notify1Name,       setNotify1Name]       = useState('');
  const [notify1Addr,       setNotify1Addr]       = useState('');
  const [notify1City,       setNotify1City]       = useState('');
  const [notify1Country,    setNotify1Country]    = useState('');
  const [showNotify2,       setShowNotify2]       = useState(false);
  const [notify2Name,       setNotify2Name]       = useState('');
  const [notify2Addr,       setNotify2Addr]       = useState('');
  const [notify2City,       setNotify2City]       = useState('');
  const [notify2Country,    setNotify2Country]    = useState('');

  // ── Step 4 fields — Cargo & Containers ───────────────────────────────────
  const [goodsDescription,    setGoodsDescription]    = useState('');
  const [packageType,         setPackageType]          = useState('');
  const [numPackages,         setNumPackages]          = useState('');
  const [grossWeight,         setGrossWeight]          = useState('');
  const [netWeight,           setNetWeight]            = useState('');
  const [measurement,         setMeasurement]          = useState('');
  const [hsCodes,             setHsCodes]              = useState('');
  const [specialInstructions, setSpecialInstructions]  = useState('');
  const [containers, setContainers] = useState<ContainerRow[]>([
    { id: 1, containerNo: 'MRKU8796881', sealNo: '', marksNumbers: '', tareWeight: '' },
    { id: 2, containerNo: 'TCKU7654321', sealNo: '', marksNumbers: '', tareWeight: '' },
    { id: 3, containerNo: 'MSCU4567890', sealNo: '', marksNumbers: '', tareWeight: '' },
  ]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCollapseChange = useCallback((keys: string | string[]) => {
    const next = Array.isArray(keys) ? keys : keys ? [keys] : [];
    setActiveKeys(next.length > 1 ? [next[next.length - 1]] : next);
  }, []);

  const onStep1Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep1Saved(false); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false);
    setActiveKeys(['1']);
  }, []);

  const onStep2Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep2Saved(false); setStep3Saved(false); setStep4Saved(false);
    setActiveKeys(['2']);
  }, []);

  const onStep3Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep3Saved(false); setStep4Saved(false);
    setActiveKeys(['3']);
  }, []);

  const onStep4Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep4Saved(false);
    setActiveKeys(['4']);
  }, []);

  const resetStep1 = useCallback(() => {
    setBlType('original'); setNumOriginals('3'); setFreightTerms('prepaid');
    setFreightPayableAt(''); setBlDraftRef('');
  }, []);

  const resetStep2 = useCallback(() => {
    setShipperName(''); setShipperAddr1(''); setShipperAddr2('');
    setShipperCity(''); setShipperCountry(''); setShipperContact('');
    setShipperPhone(''); setShipperEmail('');
  }, []);

  const resetStep3 = useCallback(() => {
    setToOrder(false); setConsigneeName(''); setConsigneeAddr1('');
    setConsigneeCity(''); setConsigneeCountry('');
    setNotify1Name(''); setNotify1Addr(''); setNotify1City(''); setNotify1Country('');
    setShowNotify2(false); setNotify2Name(''); setNotify2Addr(''); setNotify2City(''); setNotify2Country('');
  }, []);

  const resetStep4 = useCallback(() => {
    setGoodsDescription(''); setPackageType(''); setNumPackages('');
    setGrossWeight(''); setNetWeight(''); setMeasurement('');
    setHsCodes(''); setSpecialInstructions('');
    setContainers([
      { id: 1, containerNo: 'MRKU8796881', sealNo: '', marksNumbers: '', tareWeight: '' },
      { id: 2, containerNo: 'TCKU7654321', sealNo: '', marksNumbers: '', tareWeight: '' },
      { id: 3, containerNo: 'MSCU4567890', sealNo: '', marksNumbers: '', tareWeight: '' },
    ]);
  }, []);

  const updateContainer = useCallback((id: number, field: keyof ContainerRow, value: string) => {
    setContainers(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  }, []);

  const addContainerRow = useCallback(() => {
    setContainers(prev => [...prev, { id: Date.now(), containerNo: '', sealNo: '', marksNumbers: '', tareWeight: '' }]);
  }, []);

  const applyEmptyState = useCallback(() => {
    setBlType('original'); setNumOriginals('3'); setFreightTerms('prepaid');
    setFreightPayableAt(''); setBlDraftRef('');
    setShipperName(''); setShipperAddr1(''); setShipperAddr2('');
    setShipperCity(''); setShipperCountry(''); setShipperContact('');
    setShipperPhone(''); setShipperEmail('');
    setToOrder(false); setConsigneeName(''); setConsigneeAddr1('');
    setConsigneeCity(''); setConsigneeCountry('');
    setNotify1Name(''); setNotify1Addr(''); setNotify1City(''); setNotify1Country('');
    setShowNotify2(false); setNotify2Name(''); setNotify2Addr(''); setNotify2City(''); setNotify2Country('');
    setGoodsDescription(''); setPackageType(''); setNumPackages('');
    setGrossWeight(''); setNetWeight(''); setMeasurement('');
    setHsCodes(''); setSpecialInstructions('');
    setContainers([
      { id: 1, containerNo: 'MRKU8796881', sealNo: '', marksNumbers: '', tareWeight: '' },
      { id: 2, containerNo: 'TCKU7654321', sealNo: '', marksNumbers: '', tareWeight: '' },
      { id: 3, containerNo: 'MSCU4567890', sealNo: '', marksNumbers: '', tareWeight: '' },
    ]);
    setStep1Saved(false); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false);
    setActiveKeys(['1']);
    setSiSubmitted(false);
  }, []);

  const applyFilledState = useCallback(() => {
    setBlType('original'); setNumOriginals('3'); setFreightTerms('prepaid');
    setFreightPayableAt('pol'); setBlDraftRef('MSCUUK-BL-004821');
    setShipperName('Voltas India Limited'); setShipperAddr1('7th Floor, World Trade Centre');
    setShipperAddr2('Cuffe Parade'); setShipperCity('Mumbai, Maharashtra'); setShipperCountry('IN');
    setShipperContact('Priya Sharma'); setShipperPhone('+91 98765 43210'); setShipperEmail('priya.sharma@voltas.com');
    setToOrder(false); setConsigneeName('Al Futtaim Logistics LLC'); setConsigneeAddr1('Dubai Festival City, Building 1');
    setConsigneeCity('Dubai'); setConsigneeCountry('AE');
    setNotify1Name('Emirates NBD'); setNotify1Addr('DIFC Gate Village, Building 6');
    setNotify1City('Dubai'); setNotify1Country('AE');
    setShowNotify2(false); setNotify2Name(''); setNotify2Addr(''); setNotify2City(''); setNotify2Country('');
    setGoodsDescription('Air Conditioning Equipment – Centralized HVAC Units and Components.\nCommodity: Chapters 84, 85. FCL Containerized Cargo.');
    setPackageType('coils'); setNumPackages('120'); setGrossWeight('24500'); setNetWeight('22100');
    setMeasurement('42'); setHsCodes('8415.10, 8415.20');
    setSpecialInstructions('KEEP UPRIGHT. HANDLE WITH CARE. CLEAN ON BOARD.');
    setContainers([
      { id: 1, containerNo: 'MRKU8796881', sealNo: 'MSC-2345671', marksNumbers: 'VOLTAS / AIR CONDITIONING\nCASE NO: 1-40', tareWeight: '2200' },
      { id: 2, containerNo: 'TCKU7654321', sealNo: 'MSC-2345672', marksNumbers: 'VOLTAS / AIR CONDITIONING\nCASE NO: 41-80', tareWeight: '2100' },
      { id: 3, containerNo: 'MSCU4567890', sealNo: 'MSC-2345673', marksNumbers: 'VOLTAS / AIR CONDITIONING\nCASE NO: 81-120', tareWeight: '2150' },
    ]);
    setStep1Saved(true); setStep2Saved(true); setStep3Saved(true); setStep4Saved(true);
    setActiveKeys([]);
    setSiSubmitted(false);
  }, []);

  // ── Step can-save guards ──────────────────────────────────────────────────

  const canSave1 = !!freightPayableAt;
  const canSave2 = !!shipperName.trim() && !!shipperAddr1.trim() && !!shipperCity.trim() && !!shipperCountry;
  const canSave3 = (toOrder || (!!consigneeName.trim() && !!consigneeCity.trim() && !!consigneeCountry))
    && !!notify1Name.trim() && !!notify1City.trim() && !!notify1Country;
  const canSave4 = !!goodsDescription.trim() && !!numPackages.trim() && !!grossWeight.trim() && !!measurement.trim();

  // ── Step 1 content ────────────────────────────────────────────────────────

  const step1Content = useMemo(() => {
    const locked = step1Saved || formLocked;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="BL Type*"
                floatLabel
                clearable={false}
                value={blType}
                options={BL_TYPE_OPTIONS}
                onChange={(v: string) => setBlType(v)}
                disabled={locked}
              />
            </div>
            {blType === 'original' && (
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="Number of Original BLs*"
                  value={numOriginals}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumOriginals(e.target.value)}
                  disabled={locked}
                />
              </div>
            )}
            {blType !== 'original' && <div style={{ flex: 1 }} />}
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Freight Payment Terms*"
                floatLabel
                clearable={false}
                value={freightTerms}
                options={FREIGHT_TERMS_OPTIONS}
                onChange={(v: string) => setFreightTerms(v)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Freight Payable At*"
                floatLabel
                clearable={false}
                value={freightPayableAt}
                options={FREIGHT_PAYABLE_OPTIONS}
                onChange={(v: string) => setFreightPayableAt(v)}
                disabled={locked}
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="BL Draft Reference (optional)"
              value={blDraftRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlDraftRef(e.target.value)}
              disabled={locked}
            />
          </div>
        </div>
        {!step1Saved && !formLocked && (
          <StepFooter
            canSave={canSave1}
            onReset={resetStep1}
            onSave={() => { setStep1Saved(true); setActiveKeys(['2']); }}
          />
        )}
      </div>
    );
  }, [blType, numOriginals, freightTerms, freightPayableAt, blDraftRef, step1Saved, formLocked, canSave1, resetStep1]);

  // ── Step 2 content ────────────────────────────────────────────────────────

  const step2Content = useMemo(() => {
    const locked = step2Saved || formLocked;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Input
            placeholder="Shipper Name*"
            value={shipperName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperName(e.target.value)}
            disabled={locked}
          />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Address Line 1*"
                value={shipperAddr1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperAddr1(e.target.value)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Address Line 2 (optional)"
                value={shipperAddr2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperAddr2(e.target.value)}
                disabled={locked}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="City / State*"
                value={shipperCity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperCity(e.target.value)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Country*"
                floatLabel
                clearable={false}
                value={shipperCountry}
                options={COUNTRY_OPTIONS}
                onChange={(v: string) => setShipperCountry(v)}
                disabled={locked}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Contact Person (optional)"
                value={shipperContact}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperContact(e.target.value)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Phone (optional)"
                value={shipperPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperPhone(e.target.value)}
                disabled={locked}
              />
            </div>
          </div>
          <Input
            placeholder="Email (optional)"
            value={shipperEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShipperEmail(e.target.value)}
            disabled={locked}
          />
        </div>
        {!step2Saved && !formLocked && (
          <StepFooter
            canSave={canSave2}
            onReset={resetStep2}
            onSave={() => { setStep2Saved(true); setActiveKeys(['3']); }}
          />
        )}
      </div>
    );
  }, [
    shipperName, shipperAddr1, shipperAddr2, shipperCity, shipperCountry,
    shipperContact, shipperPhone, shipperEmail, step2Saved, formLocked, canSave2, resetStep2,
  ]);

  // ── Step 3 content ────────────────────────────────────────────────────────

  const step3Content = useMemo(() => {
    const locked = step3Saved || formLocked;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Consignee sub-section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
              Consignee
            </span>
            <Checkbox
              checked={toOrder}
              onChange={(e: any) => setToOrder(e.target.checked)}
              disabled={locked}
            >
              To Order (Negotiable BL — consignee determined at destination)
            </Checkbox>
            {!toOrder && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <Input
                  placeholder="Consignee Name*"
                  value={consigneeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsigneeName(e.target.value)}
                  disabled={locked}
                />
                <Input
                  placeholder="Address*"
                  value={consigneeAddr1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsigneeAddr1(e.target.value)}
                  disabled={locked}
                />
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="City*"
                      value={consigneeCity}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsigneeCity(e.target.value)}
                      disabled={locked}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Select
                      placeholder="Country*"
                      floatLabel
                      clearable={false}
                      value={consigneeCountry}
                      options={COUNTRY_OPTIONS}
                      onChange={(v: string) => setConsigneeCountry(v)}
                      disabled={locked}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notify Party 1 sub-section */}
          <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
          <div style={{
            background: 'var(--theme-color-primary-2)',
            border: '1px solid var(--theme-color-primary-5)',
            borderRadius: 8, padding: 16,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
              Notify Party 1
            </span>
            <Input
              placeholder="Name*"
              value={notify1Name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify1Name(e.target.value)}
              disabled={locked}
            />
            <Input
              placeholder="Address*"
              value={notify1Addr}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify1Addr(e.target.value)}
              disabled={locked}
            />
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="City*"
                  value={notify1City}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify1City(e.target.value)}
                  disabled={locked}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Select
                  placeholder="Country*"
                  floatLabel
                  clearable={false}
                  value={notify1Country}
                  options={COUNTRY_OPTIONS}
                  onChange={(v: string) => setNotify1Country(v)}
                  disabled={locked}
                />
              </div>
            </div>
          </div>

          {/* Notify Party 2 (optional) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Checkbox
              checked={showNotify2}
              onChange={(e: any) => setShowNotify2(e.target.checked)}
              disabled={locked}
            >
              Add second notify party
            </Checkbox>
            {showNotify2 && (
              <div style={{
                background: 'var(--theme-color-primary-2)',
                border: '1px solid var(--theme-color-primary-5)',
                borderRadius: 8, padding: 16,
                display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
                  Notify Party 2
                </span>
                <Input
                  placeholder="Name"
                  value={notify2Name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify2Name(e.target.value)}
                  disabled={locked}
                />
                <Input
                  placeholder="Address"
                  value={notify2Addr}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify2Addr(e.target.value)}
                  disabled={locked}
                />
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="City"
                      value={notify2City}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotify2City(e.target.value)}
                      disabled={locked}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Select
                      placeholder="Country"
                      floatLabel
                      clearable={false}
                      value={notify2Country}
                      options={COUNTRY_OPTIONS}
                      onChange={(v: string) => setNotify2Country(v)}
                      disabled={locked}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!step3Saved && !formLocked && (
          <StepFooter
            canSave={canSave3}
            onReset={resetStep3}
            onSave={() => { setStep3Saved(true); setActiveKeys(['4']); }}
          />
        )}
      </div>
    );
  }, [
    toOrder, consigneeName, consigneeAddr1, consigneeCity, consigneeCountry,
    notify1Name, notify1Addr, notify1City, notify1Country,
    showNotify2, notify2Name, notify2Addr, notify2City, notify2Country,
    step3Saved, formLocked, canSave3, resetStep3,
  ]);

  // ── Step 4 content ────────────────────────────────────────────────────────

  const step4Content = useMemo(() => {
    const locked = step4Saved || formLocked;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Cargo overview */}
          <Input
            type="textarea"
            rows={4}
            placeholder="Description of Goods*"
            value={goodsDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGoodsDescription(e.target.value)}
            disabled={locked}
          />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Package Type*"
                floatLabel
                clearable={false}
                value={packageType}
                options={PACKAGE_TYPE_OPTIONS}
                onChange={(v: string) => setPackageType(v)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Number of Packages*"
                value={numPackages}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumPackages(e.target.value)}
                disabled={locked}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Gross Weight (kg)*"
                value={grossWeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrossWeight(e.target.value)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Net Weight (kg) (optional)"
                value={netWeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetWeight(e.target.value)}
                disabled={locked}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Measurement (CBM)*"
                value={measurement}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMeasurement(e.target.value)}
                disabled={locked}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="HS Code(s) (optional)"
                value={hsCodes}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHsCodes(e.target.value)}
                disabled={locked}
              />
            </div>
          </div>
          <Input
            type="textarea"
            rows={3}
            placeholder="Special Instructions for Carrier (optional, e.g. CLEAN ON BOARD)"
            value={specialInstructions}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpecialInstructions(e.target.value)}
            disabled={locked}
          />

          {/* Per-container details */}
          <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
          <div style={{
            background: 'var(--theme-color-primary-2)',
            border: '1px solid var(--theme-color-primary-5)',
            borderRadius: 8, padding: 16,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
              Container Details
            </span>
            {containers.map((container) => (
              <div
                key={container.id}
                style={{
                  background: 'var(--theme-color-pure-100)',
                  border: '1px solid var(--theme-color-grey-10)',
                  borderRadius: 8,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Container No."
                      value={container.containerNo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(container.id, 'containerNo', e.target.value)}
                      disabled={locked}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Seal Number*"
                      value={container.sealNo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(container.id, 'sealNo', e.target.value)}
                      disabled={locked}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 2 }}>
                    <Input
                      type="textarea"
                      rows={2}
                      placeholder="Marks & Numbers*"
                      value={container.marksNumbers}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateContainer(container.id, 'marksNumbers', e.target.value)}
                      disabled={locked}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="Tare Weight (kg)"
                      value={container.tareWeight}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateContainer(container.id, 'tareWeight', e.target.value)}
                      disabled={locked}
                    />
                  </div>
                </div>
              </div>
            ))}
            {!locked && (
              <Button variant="secondary" size="md" onClick={addContainerRow} style={{ alignSelf: 'flex-start' }}>
                + Add Container Row
              </Button>
            )}
          </div>
        </div>
        {!step4Saved && !formLocked && (
          <StepFooter
            canSave={canSave4}
            onReset={resetStep4}
            onSave={() => { setStep4Saved(true); setActiveKeys([]); }}
          />
        )}
      </div>
    );
  }, [
    goodsDescription, packageType, numPackages, grossWeight, netWeight,
    measurement, hsCodes, specialInstructions, containers,
    step4Saved, formLocked, canSave4, resetStep4, updateContainer, addContainerRow,
  ]);

  // ── Collapse items ────────────────────────────────────────────────────────

  const collapseItems = useMemo(() => [
    {
      key: '1',
      label: 'BL Details & Freight Terms',
      subLabel: 'Select bill of lading type and freight payment terms.',
      completed: step1Saved,
      suffix: step1Saved && !siSubmitted ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep1Edit}>
          Edit
        </Button>
      ) : null,
      children: step1Content,
    },
    {
      key: '2',
      label: 'Shipper Details',
      subLabel: 'Enter shipper name and address exactly as it should appear on the BL.',
      disabled: cascadeEnabled ? !step1Saved : false,
      completed: step2Saved,
      suffix: step2Saved && !siSubmitted ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep2Edit}>
          Edit
        </Button>
      ) : null,
      children: step2Content,
    },
    {
      key: '3',
      label: 'Consignee & Notify Parties',
      subLabel: 'Enter consignee and notify party details for the bill of lading.',
      disabled: cascadeEnabled ? !step2Saved : false,
      completed: step3Saved,
      suffix: step3Saved && !siSubmitted ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep3Edit}>
          Edit
        </Button>
      ) : null,
      children: step3Content,
    },
    {
      key: '4',
      label: 'Cargo & Container Details',
      subLabel: 'Describe the cargo and add per-container details for the bill of lading.',
      disabled: cascadeEnabled ? !step3Saved : false,
      completed: step4Saved,
      suffix: step4Saved && !siSubmitted ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep4Edit}>
          Edit
        </Button>
      ) : null,
      children: step4Content,
    },
  ], [
    step1Saved, step2Saved, step3Saved, step4Saved,
    siSubmitted, cascadeEnabled,
    step1Content, step2Content, step3Content, step4Content,
    onStep1Edit, onStep2Edit, onStep3Edit, onStep4Edit,
  ]);

  const allSaved = step1Saved && step2Saved && step3Saved && step4Saved;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--theme-color-grey-5)', position: 'relative' }}>
      <NavBar />

      <div style={{
        position: 'absolute', top: 72, left: 12, right: 12, bottom: 12,
        background: 'var(--theme-color-pure-100)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '-2px 0px 8px rgba(136,136,136,0.06)',
      }}>
        <div style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>

          {/* Page heading */}
          <div style={{ padding: '40px 40px 28px' }}>
            <div style={{ marginBottom: 16 }}>
              <Breadcrumb
                items={[
                  { title: <span onClick={() => router.push('/shipments')} style={{ cursor: 'pointer', color: 'var(--theme-color-grey-50)', fontSize: 12 }}>Shipments</span> },
                  { title: <span onClick={() => router.push(`/shipments/${SHIPMENT_ID}/v2`)} style={{ cursor: 'pointer', color: 'var(--theme-color-grey-50)', fontSize: 12 }}>{SHIPMENT_ID}</span> },
                  { title: <span style={{ color: 'var(--theme-color-primary-100)', fontSize: 12, fontWeight: 500 }}>Submit SI</span> },
                ]}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                  Submit Shipping Instructions
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-50)' }}>
                    Complete all sections and submit to carrier before SI cutoff · MSC ·{' '}
                    <span style={{ color: 'var(--theme-color-grey-70)', fontWeight: 500 }}>Felixstowe → Gdańsk</span>
                  </Text>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center', paddingTop: 4 }}>
                {!siSubmitted && !isSalesView && (
                  <Button variant="secondary" size="md">Save Draft</Button>
                )}
                {!siSubmitted && !isSalesView && (
                  <Button
                    variant="primary"
                    size="md"
                    disabled={!allSaved}
                    onClick={() => setSiSubmitted(true)}
                  >
                    Submit SI
                  </Button>
                )}
                {siSubmitted && (
                  <Button variant="secondary" size="md">Amend SI</Button>
                )}
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 40px 40px', gap: 32 }}>

            {/* Left: sticky shipment context */}
            <div style={{ width: 260, flexShrink: 0, position: 'sticky', top: 40 }}>
              <div style={{
                background: 'var(--theme-color-grey-2)',
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                padding: '14px 16px',
              }}>
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 11, display: 'block', marginBottom: 2 }}>
                  SI CUTOFF
                </Text>
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-error-100)', display: 'block' }}>
                  12 May 2026, 15:00
                </Text>
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-60)', fontSize: 11, display: 'block', marginTop: 2 }}>
                  Overdue — submit immediately
                </Text>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* SI status card — appears after submission */}
              {siSubmitted && <SIStatusCard />}

              {/* Sales role info banner */}
              {isSalesView && (
                <div style={{ marginBottom: 24, padding: '14px 16px', borderRadius: 8, background: 'var(--theme-color-yellow-10)', border: '1px solid var(--theme-color-yellow-40)' }}>
                  <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>
                    SI is being prepared by the operations team. You have read-only access to this form.
                  </Text>
                </div>
              )}

              <Collapse
                type="numbered"
                items={collapseItems}
                activeKey={activeKeys}
                onChange={handleCollapseChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating role preview switcher */}
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
            Preview Role
          </Text>
        </div>
        <Select
          value={previewRole}
          options={ROLE_OPTIONS}
          onChange={(val: RoleType) => setPreviewRole(val)}
          floatLabel={false}
          clearable={false}
        />
        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--theme-color-grey-30)', flexShrink: 0 }} />
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.6px' }}>
            Form State
          </Text>
        </div>
        <Select
          value={previewState}
          options={STATE_OPTIONS}
          onChange={(val: FormStateType) => {
            setPreviewState(val);
            if (val === 'filled') applyFilledState();
            else applyEmptyState();
          }}
          floatLabel={false}
          clearable={false}
        />
      </div>
    </div>
  );
}

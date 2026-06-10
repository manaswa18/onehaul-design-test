'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import Input from '@/components/Input';
import SelectComponent from '@/components/Select';
import ButtonComponent from '@/components/Button';
import CheckboxComponent from '@/components/Checkbox';
import InputNumberComponent from '@/components/InputNumber';
import DatePickerComponent from '@/components/DatePicker';
import { EditPencil, Add, Delete, ShipmentIcon } from '@/icons';

const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
const Checkbox = CheckboxComponent as React.ComponentType<any>;
const InputNumber = InputNumberComponent as React.ComponentType<any>;
const DatePicker = DatePickerComponent as React.ComponentType<any>;

// ─── Options ──────────────────────────────────────────────────────────────────

const CUSTOMER_OPTIONS = [
  { label: 'Techno Exports Ltd', value: 'techno_exports' },
  { label: 'Global Traders Inc', value: 'global_traders' },
  { label: 'Sunrise Manufacturing', value: 'sunrise_mfg' },
  { label: 'Prime Commodities LLC', value: 'prime_commodities' },
  { label: 'Heritage Exports Pvt Ltd', value: 'heritage_exports' },
  { label: 'Summit Industries', value: 'summit_industries' },
  { label: 'Nexus Global Freight', value: 'nexus_global' },
  { label: 'BlueStar Trading Co', value: 'bluestar_trading' },
];

const MODE_OPTIONS = [
  { label: 'Sea FCL', value: 'sea_fcl' },
  { label: 'Sea LCL', value: 'sea_lcl' },
  { label: 'Air', value: 'air' },
];

const MOVEMENT_TYPE_OPTIONS = [
  { label: 'Port to Port', value: 'port_to_port' },
  { label: 'Door to Port', value: 'door_to_port' },
  { label: 'Port to Door', value: 'port_to_door' },
  { label: 'Door to Door', value: 'door_to_door' },
];

const PORT_OPTIONS = [
  { label: 'Shanghai (CNSHA)', value: 'CNSHA' },
  { label: 'Rotterdam (NLRTM)', value: 'NLRTM' },
  { label: 'Singapore (SGSIN)', value: 'SGSIN' },
  { label: 'Dubai Jebel Ali (AEJEA)', value: 'AEJEA' },
  { label: 'Hamburg (DEHAM)', value: 'DEHAM' },
  { label: 'Antwerp (BEANR)', value: 'BEANR' },
  { label: 'Nhava Sheva / JNPT (INNSA)', value: 'INNSA' },
  { label: 'Mundra (INMUN)', value: 'INMUN' },
  { label: 'Felixstowe (GBFXT)', value: 'GBFXT' },
  { label: 'Los Angeles (USLAX)', value: 'USLAX' },
  { label: 'Colombo (LKCMB)', value: 'LKCMB' },
  { label: 'Karachi (PKKHI)', value: 'PKKHI' },
  { label: 'Port Qasim (PKPQZ)', value: 'PKPQZ' },
  { label: 'Busan (KRPUS)', value: 'KRPUS' },
  { label: 'Qingdao (CNTAO)', value: 'CNTAO' },
];

const LOCATION_OPTIONS = [
  { label: 'Mumbai, IN', value: 'mumbai_in' },
  { label: 'Delhi, IN', value: 'delhi_in' },
  { label: 'Ahmedabad, IN', value: 'ahmedabad_in' },
  { label: 'Chennai, IN', value: 'chennai_in' },
  { label: 'Karachi, PK', value: 'karachi_pk' },
  { label: 'Dubai, AE', value: 'dubai_ae' },
  { label: 'Shanghai, CN', value: 'shanghai_cn' },
  { label: 'Singapore, SG', value: 'singapore_sg' },
  { label: 'Hamburg, DE', value: 'hamburg_de' },
  { label: 'Rotterdam, NL', value: 'rotterdam_nl' },
  { label: 'London, GB', value: 'london_gb' },
];

const CONTAINER_TYPE_OPTIONS = [
  { label: '20GP', value: '20gp' },
  { label: '40GP', value: '40gp' },
  { label: '40HC', value: '40hc' },
  { label: '45HC', value: '45hc' },
  { label: '20RF', value: '20rf' },
  { label: '40RF', value: '40rf' },
];

const COMMODITY_OPTIONS = [
  { label: 'Electronics & Consumer Goods', value: 'electronics' },
  { label: 'Textiles & Apparel', value: 'textiles' },
  { label: 'Machinery & Equipment', value: 'machinery' },
  { label: 'Pharmaceuticals', value: 'pharma' },
  { label: 'Chemicals', value: 'chemicals' },
  { label: 'Food & Beverages', value: 'food' },
  { label: 'Automotive Parts', value: 'automotive' },
  { label: 'Furniture & Home Furnishings', value: 'furniture' },
  { label: 'Plastics & Rubber', value: 'plastics' },
  { label: 'Steel & Metal Products', value: 'steel' },
  { label: 'Agricultural Commodities', value: 'agri' },
  { label: 'Sporting Goods', value: 'sporting' },
  { label: 'Toys & Games', value: 'toys' },
  { label: 'FMCG Products', value: 'fmcg' },
  { label: 'Raw Materials', value: 'raw_materials' },
];

const SHIPPING_LINE_OPTIONS = [
  { label: 'MSC', value: 'msc' },
  { label: 'Maersk', value: 'maersk' },
  { label: 'Hapag-Lloyd', value: 'hapag_lloyd' },
  { label: 'CMA CGM', value: 'cma_cgm' },
  { label: 'COSCO', value: 'cosco' },
  { label: 'Evergreen', value: 'evergreen' },
  { label: 'ONE', value: 'one' },
  { label: 'Yang Ming', value: 'yang_ming' },
];

const DG_CLASS_OPTIONS = [
  { label: 'Class 1 — Explosives', value: '1' },
  { label: 'Class 2 — Gases', value: '2' },
  { label: 'Class 3 — Flammable Liquids', value: '3' },
  { label: 'Class 4 — Flammable Solids', value: '4' },
  { label: 'Class 5 — Oxidizing Substances', value: '5' },
  { label: 'Class 6 — Toxic Substances', value: '6' },
  { label: 'Class 7 — Radioactive', value: '7' },
  { label: 'Class 8 — Corrosive', value: '8' },
  { label: 'Class 9 — Miscellaneous', value: '9' },
];

const USER_OPTIONS = [
  { label: 'Arjun Mehta', value: 'arjun_mehta' },
  { label: 'Priya Nair', value: 'priya_nair' },
  { label: 'Ravi Kumar', value: 'ravi_kumar' },
  { label: 'Sanya Singh', value: 'sanya_singh' },
  { label: 'Ahmed Al-Farsi', value: 'ahmed_alfarsi' },
];

const TEAM_OPTIONS = [
  { label: 'Sea Freight Team', value: 'sea_freight' },
  { label: 'Air Freight Team', value: 'air_freight' },
  { label: 'Operations Team', value: 'operations' },
  { label: 'Customer Success', value: 'customer_success' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContainerRow {
  id: string;
  type: string;
  quantity: number | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date | null): string {
  if (!date) return '—';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function labelFor(options: { label: string; value: string }[], value: string): string {
  return options.find(o => o.value === value)?.label || value || '—';
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 11, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-40)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontSize: 13, fontWeight: 400, lineHeight: '20px', color: 'var(--theme-color-grey-100)' }}>
        {value || '—'}
      </span>
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function generateShipmentNo(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 90000) + 10000);
  return `ONH-${year}-${seq}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface CreateShipmentDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateShipmentDrawer({ open, onClose }: CreateShipmentDrawerProps) {
  const router = useRouter();
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

  // ── Step saved states
  const [step1Saved, setStep1Saved] = useState(false);
  const [step2Saved, setStep2Saved] = useState(false);
  const [step3Saved, setStep3Saved] = useState(false);

  // ── Step 1 — Shipment Basics
  const [customer, setCustomer] = useState('');
  const [customerRef, setCustomerRef] = useState('');
  const [mode, setMode] = useState('sea_fcl');
  const [movementType, setMovementType] = useState('');
  const [placeOfReceipt, setPlaceOfReceipt] = useState('');
  const [pol, setPol] = useState('');
  const [pod, setPod] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [etdStart, setEtdStart] = useState<Date | null>(null);
  const [etdEnd, setEtdEnd] = useState<Date | null>(null);

  // ── Step 2 — Cargo Details
  const [commodity, setCommodity] = useState('');
  const [hsCode, setHsCode] = useState('');
  const [cargoDescription, setCargoDescription] = useState('');
  const [containers, setContainers] = useState<ContainerRow[]>([{ id: '1', type: '', quantity: null }]);
  const [preferredCarrier, setPreferredCarrier] = useState('');
  const [serviceContract, setServiceContract] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [cargoNotes, setCargoNotes] = useState('');
  const [isDangerousGoods, setIsDangerousGoods] = useState(false);
  const [unNumber, setUnNumber] = useState('');
  const [dgClass, setDgClass] = useState('');
  const [dgNotes, setDgNotes] = useState('');
  const [isReefer, setIsReefer] = useState(false);
  const [temperature, setTemperature] = useState('');
  const [ventilation, setVentilation] = useState('');

  // ── Step 3 — Assignment & Review
  const [opsExecutive, setOpsExecutive] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [accountManager, setAccountManager] = useState('');
  const salesOwner = 'Manaswa Machhi';

  // ── Container row helpers
  const addContainerRow = useCallback(() => {
    setContainers(prev => [...prev, { id: Date.now().toString(), type: '', quantity: null }]);
  }, []);

  const removeContainerRow = useCallback((id: string) => {
    setContainers(prev => prev.filter(r => r.id !== id));
  }, []);

  const updateContainerType = useCallback((id: string, type: string) => {
    setContainers(prev => prev.map(r => r.id === id ? { ...r, type } : r));
  }, []);

  const updateContainerQty = useCallback((id: string, quantity: any) => {
    setContainers(prev => prev.map(r => r.id === id ? { ...r, quantity: typeof quantity === 'number' ? quantity : null } : r));
  }, []);

  // ── Field reset helpers
  const resetStep1Fields = useCallback(() => {
    setCustomer('');
    setCustomerRef('');
    setMode('sea_fcl');
    setMovementType('');
    setPlaceOfReceipt('');
    setPol('');
    setPod('');
    setPlaceOfDelivery('');
    setEtdStart(null);
    setEtdEnd(null);
  }, []);

  const resetStep2Fields = useCallback(() => {
    setCommodity('');
    setHsCode('');
    setCargoDescription('');
    setContainers([{ id: '1', type: '', quantity: null }]);
    setPreferredCarrier('');
    setServiceContract('');
    setSpecialRequirements('');
    setCargoNotes('');
    setIsDangerousGoods(false);
    setUnNumber('');
    setDgClass('');
    setDgNotes('');
    setIsReefer(false);
    setTemperature('');
    setVentilation('');
  }, []);

  const resetStep3Fields = useCallback(() => {
    setOpsExecutive('');
    setAssignedTeam('');
    setAccountManager('');
  }, []);

  // ── Close (full reset)
  const handleClose = useCallback(() => {
    onClose();
    resetStep1Fields();
    resetStep2Fields();
    resetStep3Fields();
    setStep1Saved(false);
    setStep2Saved(false);
    setStep3Saved(false);
    setActiveKeys(['1']);
  }, [onClose, resetStep1Fields, resetStep2Fields, resetStep3Fields]);

  // ── Edit handlers (cascade invalidation)
  const onStep1Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep1Saved(false);
    setStep2Saved(false);
    setStep3Saved(false);
    setActiveKeys(['1']);
  }, []);

  const onStep2Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep2Saved(false);
    setStep3Saved(false);
    setActiveKeys(['2']);
  }, []);

  const onStep3Edit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setStep3Saved(false);
    setActiveKeys(['3']);
  }, []);

  // ── Submit
  const handleSubmit = useCallback(() => {
    const newId = generateShipmentNo();
    handleClose();
    router.push(`/shipments/${newId}`);
  }, [handleClose, router]);

  // ── Step 1 content
  const step1Content = useMemo(() => {
    const canSave = customer !== '' && mode !== '' && movementType !== '' && pol !== '' && pod !== '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Customer / Client*"
                options={CUSTOMER_OPTIONS}
                value={customer}
                onChange={(val: string) => setCustomer(val)}
                clearable={false}
                disabled={step1Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Customer Reference"
                value={customerRef}
                onChange={(e: any) => setCustomerRef(e.target.value)}
                disabled={step1Saved}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Mode*"
                options={MODE_OPTIONS}
                value={mode}
                onChange={(val: string) => setMode(val)}
                clearable={false}
                disabled={step1Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Movement Type*"
                options={MOVEMENT_TYPE_OPTIONS}
                value={movementType}
                onChange={(val: string) => setMovementType(val)}
                clearable={false}
                disabled={step1Saved}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Place of Receipt"
                options={LOCATION_OPTIONS}
                value={placeOfReceipt}
                onChange={(val: string) => setPlaceOfReceipt(val)}
                clearable
                disabled={step1Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Port of Loading (POL)*"
                options={PORT_OPTIONS}
                value={pol}
                onChange={(val: string) => setPol(val)}
                clearable={false}
                disabled={step1Saved}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Port of Discharge (POD)*"
                options={PORT_OPTIONS}
                value={pod}
                onChange={(val: string) => setPod(val)}
                clearable={false}
                disabled={step1Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Place of Delivery"
                options={LOCATION_OPTIONS}
                value={placeOfDelivery}
                onChange={(val: string) => setPlaceOfDelivery(val)}
                clearable
                disabled={step1Saved}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <DatePicker
                placeholder="Preferred ETD From"
                value={etdStart}
                onChange={(d: Date | null) => setEtdStart(d)}
                disabled={step1Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <DatePicker
                placeholder="Preferred ETD To"
                value={etdEnd}
                onChange={(d: Date | null) => setEtdEnd(d)}
                disabled={step1Saved}
              />
            </div>
          </div>
        </div>

        {!step1Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                size="md"
                style={{ width: 120 }}
                onClick={() => { resetStep1Fields(); setStep2Saved(false); setStep3Saved(false); }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ width: 120 }}
                disabled={!canSave}
                onClick={() => { setStep1Saved(true); setActiveKeys(['2']); }}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }, [
    customer, customerRef, mode, movementType,
    placeOfReceipt, pol, pod, placeOfDelivery,
    etdStart, etdEnd,
    step1Saved,
    resetStep1Fields,
  ]);

  // ── Step 2 content
  const step2Content = useMemo(() => {
    const validContainers = containers.length > 0 &&
      containers.every(c => c.type !== '' && c.quantity !== null && c.quantity > 0);
    const canSave = commodity !== '' && validContainers;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Commodity*"
                options={COMMODITY_OPTIONS}
                value={commodity}
                onChange={(val: string) => setCommodity(val)}
                clearable={false}
                disabled={step2Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="HS Code"
                value={hsCode}
                onChange={(e: any) => setHsCode(e.target.value)}
                disabled={step2Saved}
              />
            </div>
          </div>

          <Input
            placeholder="Cargo Description"
            value={cargoDescription}
            onChange={(e: any) => setCargoDescription(e.target.value)}
            disabled={step2Saved}
          />

          {/* Container requirements repeater */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-60)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Container Requirements*
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {containers.map(row => (
                <div key={row.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <Select
                      placeholder="Container Type*"
                      options={CONTAINER_TYPE_OPTIONS}
                      value={row.type}
                      onChange={(val: string) => updateContainerType(row.id, val)}
                      clearable={false}
                      disabled={step2Saved}
                    />
                  </div>
                  <div style={{ width: 120 }}>
                    <InputNumber
                      placeholder="Qty*"
                      value={row.quantity}
                      onChange={(val: any) => updateContainerQty(row.id, val)}
                      min={1}
                      disabled={step2Saved}
                    />
                  </div>
                  {!step2Saved && containers.length > 1 && (
                    <Button
                      variant="link"
                      size="md"
                      icon={<Delete width={14} height={14} />}
                      onClick={() => removeContainerRow(row.id)}
                    />
                  )}
                </div>
              ))}
            </div>
            {!step2Saved && (
              <div>
                <Button
                  variant="link"
                  size="md"
                  icon={<Add width={14} height={14} />}
                  onClick={addContainerRow}
                >
                  Add Container Type
                </Button>
              </div>
            )}
          </div>

          <Select
            placeholder="Preferred Shipping Line"
            options={SHIPPING_LINE_OPTIONS}
            value={preferredCarrier}
            onChange={(val: string) => setPreferredCarrier(val)}
            clearable
            disabled={step2Saved}
          />

          <Input
            placeholder="Service Contract / Rate Reference"
            value={serviceContract}
            onChange={(e: any) => setServiceContract(e.target.value)}
            disabled={step2Saved}
          />

          {/* DG conditional section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Checkbox
              checked={isDangerousGoods}
              onChange={(e: any) => setIsDangerousGoods(e.target.checked)}
              disabled={step2Saved}
            >
              Dangerous Goods Cargo
            </Checkbox>
            {isDangerousGoods && (
              <>
                <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
                <div style={{ background: 'var(--theme-color-primary-2)', border: '1px solid var(--theme-color-primary-5)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Dangerous Goods Details
                  </span>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <Input
                        placeholder="UN Number"
                        value={unNumber}
                        onChange={(e: any) => setUnNumber(e.target.value)}
                        disabled={step2Saved}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Select
                        placeholder="DG Class"
                        options={DG_CLASS_OPTIONS}
                        value={dgClass}
                        onChange={(val: string) => setDgClass(val)}
                        clearable={false}
                        disabled={step2Saved}
                      />
                    </div>
                  </div>
                  <Input
                    placeholder="DG Notes"
                    value={dgNotes}
                    onChange={(e: any) => setDgNotes(e.target.value)}
                    disabled={step2Saved}
                  />
                </div>
              </>
            )}
          </div>

          {/* Reefer conditional section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Checkbox
              checked={isReefer}
              onChange={(e: any) => setIsReefer(e.target.checked)}
              disabled={step2Saved}
            >
              Temperature Controlled Cargo
            </Checkbox>
            {isReefer && (
              <>
                <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
                <div style={{ background: 'var(--theme-color-primary-2)', border: '1px solid var(--theme-color-primary-5)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Reefer Details
                  </span>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <Input
                        placeholder="Temperature (e.g. -18°C)"
                        value={temperature}
                        onChange={(e: any) => setTemperature(e.target.value)}
                        disabled={step2Saved}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Input
                        placeholder="Ventilation Setting"
                        value={ventilation}
                        onChange={(e: any) => setVentilation(e.target.value)}
                        disabled={step2Saved}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Input
            placeholder="Special Requirements"
            value={specialRequirements}
            onChange={(e: any) => setSpecialRequirements(e.target.value)}
            disabled={step2Saved}
          />

          <Input
            placeholder="Notes"
            value={cargoNotes}
            onChange={(e: any) => setCargoNotes(e.target.value)}
            disabled={step2Saved}
          />
        </div>

        {!step2Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                size="md"
                style={{ width: 120 }}
                onClick={() => { resetStep2Fields(); setStep3Saved(false); }}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ width: 120 }}
                disabled={!canSave}
                onClick={() => { setStep2Saved(true); setActiveKeys(['3']); }}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }, [
    commodity, hsCode, cargoDescription,
    containers, preferredCarrier, serviceContract,
    specialRequirements, cargoNotes,
    isDangerousGoods, unNumber, dgClass, dgNotes,
    isReefer, temperature, ventilation,
    step2Saved,
    addContainerRow, removeContainerRow, updateContainerType, updateContainerQty,
    resetStep2Fields,
  ]);

  // ── Step 3 content
  const step3Content = useMemo(() => {
    const canSave = opsExecutive !== '';

    const customerLabel = labelFor(CUSTOMER_OPTIONS, customer);
    const movementTypeLabel = labelFor(MOVEMENT_TYPE_OPTIONS, movementType);
    const polLabel = labelFor(PORT_OPTIONS, pol);
    const podLabel = labelFor(PORT_OPTIONS, pod);
    const etdWindow = etdStart || etdEnd ? `${formatDate(etdStart)} – ${formatDate(etdEnd)}` : '—';
    const containerCount = containers.reduce((sum, c) => sum + (c.quantity || 0), 0);
    const containerSummary = containers.filter(c => c.type && c.quantity)
      .map(c => `${c.quantity} × ${labelFor(CONTAINER_TYPE_OPTIONS, c.type)}`).join(', ') || '—';
    const carrierLabel = labelFor(SHIPPING_LINE_OPTIONS, preferredCarrier);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
        {/* Review summary cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SummaryCard title="Shipment Summary">
            <SummaryField label="Customer" value={customerLabel} />
            <SummaryField label="Movement Type" value={movementTypeLabel} />
            <SummaryField label="POL → POD" value={`${polLabel} → ${podLabel}`} />
            <SummaryField label="ETD Window" value={etdWindow} />
          </SummaryCard>

          <SummaryCard title="Cargo Summary">
            <SummaryField label="Commodity" value={commodity || '—'} />
            <SummaryField
              label="Containers"
              value={containerCount > 0 ? `${containerCount} unit(s) — ${containerSummary}` : '—'}
            />
            <SummaryField label="Preferred Carrier" value={carrierLabel} />
          </SummaryCard>
        </div>

        <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />

        {/* Assignment fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Assigned Ops Executive*"
                options={USER_OPTIONS}
                value={opsExecutive}
                onChange={(val: string) => setOpsExecutive(val)}
                clearable={false}
                disabled={step3Saved}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Team"
                options={TEAM_OPTIONS}
                value={assignedTeam}
                onChange={(val: string) => setAssignedTeam(val)}
                clearable={false}
                disabled={step3Saved}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Input
                placeholder="Sales Owner"
                value={salesOwner}
                disabled
              />
            </div>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Account Manager"
                options={USER_OPTIONS}
                value={accountManager}
                onChange={(val: string) => setAccountManager(val)}
                clearable={false}
                disabled={step3Saved}
              />
            </div>
          </div>
        </div>

        {!step3Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                size="md"
                style={{ width: 120 }}
                onClick={resetStep3Fields}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ width: 120 }}
                disabled={!canSave}
                onClick={() => { setStep3Saved(true); setActiveKeys([]); }}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }, [
    opsExecutive, assignedTeam, accountManager,
    step3Saved,
    customer, movementType, pol, pod, etdStart, etdEnd,
    commodity, containers, preferredCarrier,
    resetStep3Fields,
  ]);

  // ── Collapse items
  const collapseItems = useMemo(() => [
    {
      key: '1',
      label: 'Shipment Basics',
      subLabel: 'Customer, routing, mode, and preferred ETD window.',
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
      label: 'Cargo Details',
      subLabel: 'Commodity, container requirements, and carrier preferences.',
      disabled: !step1Saved,
      completed: step2Saved,
      suffix: step2Saved ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep2Edit}>
          Edit
        </Button>
      ) : null,
      children: step2Content,
    },
    {
      key: '3',
      label: 'Assignment & Review',
      subLabel: 'Assign ownership and review shipment details before creation.',
      disabled: !step2Saved,
      completed: step3Saved,
      suffix: step3Saved ? (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep3Edit}>
          Edit
        </Button>
      ) : null,
      children: step3Content,
    },
  ], [
    step1Saved, step2Saved, step3Saved,
    step1Content, step2Content, step3Content,
    onStep1Edit, onStep2Edit, onStep3Edit,
  ]);

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      width={720}
      title="Create Shipment"
      subtitle="Add details to initiate a new freight movement"
      icon={ShipmentIcon}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="secondary" size="md" onClick={handleClose}>Cancel</Button>
          <Button
            variant="primary"
            size="md"
            disabled={!(step1Saved && step2Saved && step3Saved)}
            onClick={handleSubmit}
          >
            Create Shipment
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Collapse
          type="numbered"
          items={collapseItems}
          activeKey={activeKeys}
          onChange={(keys: string | string[]) => {
            const next = Array.isArray(keys) ? keys : keys ? [keys] : [];
            setActiveKeys(next.length > 1 ? [next[next.length - 1]] : next);
          }}
        />
      </div>
    </Drawer>
  );
}

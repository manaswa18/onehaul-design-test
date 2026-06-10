'use client';

import { useState, useMemo, useCallback } from 'react';
import Text from '@/components/Text';
import ButtonComponent from '@/components/Button';
import PillComponent from '@/components/Pill';
import TabsComponent from '@/components/Tabs';
import InputComponent from '@/components/Input';
import SelectComponent from '@/components/Select';
import CheckboxComponent from '@/components/Checkbox';
import FileUploadComponent from '@/components/FileUpload';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import ToggleComponent from '@/components/Toggle';
import Avatar from '@/components/Avatar';
import {
  Add,
  Building,
  Chevrondown,
  ChevronRight,
  EditPencil,
  Search,
  Tick,
  MoreVert,
  Phone,
  MailOutline,
  DocIcon,
  ListIcon,
  HelpIcon,
  NotificationIcon,
  Success,
  InfoCircle,
  Link,
  Linkoff,
} from '@/icons';

const Button = ButtonComponent as React.ComponentType<any>;
const Pill = PillComponent as React.ComponentType<any>;
const Tabs = TabsComponent as React.ComponentType<any>;
const Input = InputComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
const Checkbox = CheckboxComponent as React.ComponentType<any>;
const FileUpload = FileUploadComponent as React.ComponentType<any>;
const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Toggle = ToggleComponent as React.ComponentType<any>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShipperDetails {
  iecCode: string;
  exporterCode: string;
  adCode: string;
}

interface TransporterDetails {
  licenseNumber: string;
  vehicleTypes: string;
  serviceRegions: string;
}

interface TradeParty {
  id: string;
  name: string;
  legalName: string;
  status: 'active' | 'inactive';
  roles: string[];
  businessName?: string;
  tradeName?: string;
  country?: string;
  taxNumber?: string;
  shipperDetails?: ShipperDetails;
  transporterDetails?: TransporterDetails;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  verified: boolean;
  roles: string[];
}

interface PartyContact {
  id: string;
  name: string;
  linked: boolean;
  phones: string[];
  emails: string[];
}

interface PartyAddress {
  id: string;
  name: string;
  types: string[];
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  isSEZ?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TRADE_PARTIES: TradeParty[] = [
  {
    id: 'sapphire',
    name: 'Sapphire Global Logistics',
    legalName: 'Sapphire Global Logistics Private Limited',
    status: 'active',
    roles: ['Shipper', 'Transporter'],
    businessName: 'Sapphire Global Logistics',
    tradeName: 'Sapphire Logistics',
    country: 'India',
    taxNumber: '27AAECS4821M1Z7',
    shipperDetails: { iecCode: '0516908743', exporterCode: 'EXP-MUM-4821', adCode: '1234567' },
    transporterDetails: {
      licenseNumber: 'MH14/TRP/2021/45872',
      vehicleTypes: 'Trailer, LCV',
      serviceRegions: 'West India',
    },
  },
  {
    id: 'testparty',
    name: 'Test Party',
    legalName: 'Test Party Pvt Ltd',
    status: 'active',
    roles: ['Paying Party', 'Shipper', 'Consignee', 'Notify Party'],
  },
  {
    id: 'studiopod',
    name: 'Studio Pod',
    legalName: 'Studio Pod Pvt Ltd',
    status: 'inactive',
    roles: ['Shipper'],
  },
];

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Aniket Manekar',
    phone: '+ 91 70494 21867',
    email: 'aniket.manekar@gmail.com',
    verified: true,
    roles: ['AUTHORISED TO TRANSACT'],
  },
  {
    id: '2',
    name: 'Aniket Manekar',
    phone: '+ 91 70494 21867',
    email: 'aniket.manekar@gmail.com',
    verified: true,
    roles: ['ADMIN', 'DECISION MAKER', 'AUTHORISED TO TR..'],
  },
  {
    id: '3',
    name: 'Aniket Manekar',
    phone: '+ 91 70494 21867',
    email: 'aniket.manekar@gmail.com',
    verified: true,
    roles: ['ADMIN', 'DECISION MAKER', 'AUTHORISED TO TR..'],
  },
];

const PARTY_CONTACTS: Record<string, PartyContact[]> = {
  sapphire: [
    { id: 'c1', name: 'Rahul Mehta', linked: true, phones: ['+91 98765 43210', '+91 98111 22334'], emails: ['rahul.mehta@sapphirelogistics.com', 'operations@sapphirelogistics.com'] },
    { id: 'c2', name: 'Akhil Sharma', linked: false, phones: ['+91 70545 54545'], emails: ['akhil.sharma@eagleinbrit.com'] },
  ],
  testparty: [],
  studiopod: [],
};

const PARTY_ADDRESSES: Record<string, PartyAddress[]> = {
  sapphire: [
    { id: 'a1', name: 'Head Office', types: ['Billing', 'Registered'], line1: '14th Floor, Sunshine Tower', line2: 'Senapati Bapat Marg, Dadar West', city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { id: 'a2', name: 'Warehouse – Nhava Sheva', types: ['Shipping'], line1: 'Plot No. 7, JNPT Road', city: 'Navi Mumbai', state: 'Maharashtra', country: 'India', isSEZ: true },
    { id: 'a3', name: 'Delhi Branch', types: ['Billing'], line1: 'C-12, Connaught Place', city: 'New Delhi', state: 'Delhi', country: 'India' },
  ],
  testparty: [],
  studiopod: [],
};

const PARTY_NOTES: Record<string, string> = {
  sapphire: 'Preferred CHA for Mumbai Port.\nContact Rajesh for urgent bookings.',
  testparty: '',
  studiopod: '',
};

const SIDEBAR_TABS = [
  'Customer Profile',
  'Details',
  'Stakeholders',
  'Searches',
  'RFQs',
  'Quotations',
  'Booking Requests',
  'Trade Parties',
];

const ROLE_COLOR: Record<string, string> = {
  Transporter: 'teal',
  Shipper: 'purple',
  'Paying Party': 'purple',
  Consignee: 'purple',
  'Notify Party': 'purple',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getRoleHeaderLabel(roles: string[]): string {
  if (roles.length <= 2) return roles.join(', ');
  return `${roles[0]}, ${roles[1]} +${roles.length - 2}`;
}

// ─── Small reusable sub-components ───────────────────────────────────────────

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: 2 }}>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-40)', whiteSpace: 'nowrap' }}>
        {label}
      </Text>
      <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-100)' }}>
        {value}
      </Text>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
      }}
    >
      <Text
        variant="body"
        size="sm"
        style={{ color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.02em' }}
      >
        {title}
      </Text>
      {children}
    </div>
  );
}

function SubInfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--theme-color-grey-2)',
        border: '1px solid var(--theme-color-grey-10)',
        borderRadius: 8,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
      }}
    >
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-70)' }}>
        {title}
      </Text>
      {children}
    </div>
  );
}

// ─── Details Tab Content ──────────────────────────────────────────────────────

function DetailsTabContent({ party }: { party: TradeParty }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
          Trade Party Details
        </Text>
        <Button
          variant="secondary"
          size="sm"
          icon={<EditPencil width={10} height={10} />}
        >
          Edit
        </Button>
      </div>

      {/* Business Information */}
      <InfoCard title="BUSINESS INFORMATION">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <DetailField label="Legal name" value={party.legalName} />
            <DetailField label="Business Name" value={party.businessName || '–'} />
            <DetailField label="Trade/DBA Name" value={party.tradeName || '–'} />
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <DetailField label="Country of Reg." value={party.country || '–'} />
            <DetailField label="Tax Number" value={party.taxNumber || '–'} />
            <div style={{ flex: 1 }} />
          </div>
        </div>
      </InfoCard>

      {/* Relationships */}
      <InfoCard title="RELATIONSHIPS">
        {/* Role pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {party.roles.map((role) => (
            <Pill
              key={role}
              color={ROLE_COLOR[role] || 'purple'}
              theme="line"
              size="sm"
              showIcon={false}
            >
              {role}
            </Pill>
          ))}
        </div>

        {/* Sub-detail cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {party.shipperDetails && (
            <SubInfoCard title="Shipper Details">
              <div style={{ display: 'flex', gap: 16 }}>
                <DetailField label="IEC Code" value={party.shipperDetails.iecCode} />
                <DetailField label="Exporter Code" value={party.shipperDetails.exporterCode} />
                <DetailField label="AD Code" value={party.shipperDetails.adCode} />
              </div>
            </SubInfoCard>
          )}
          {party.transporterDetails && (
            <SubInfoCard title="Transporter Details">
              <div style={{ display: 'flex', gap: 16 }}>
                <DetailField label="Transport License Number" value={party.transporterDetails.licenseNumber} />
                <DetailField label="Vehicle Types" value={party.transporterDetails.vehicleTypes} />
                <DetailField label="Service Regions" value={party.transporterDetails.serviceRegions} />
              </div>
            </SubInfoCard>
          )}
        </div>
      </InfoCard>
    </div>
  );
}

// ─── Trade Party Accordion ────────────────────────────────────────────────────

// ─── Addresses & Contacts Tab Content ────────────────────────────────────────

function LinkedChip({ linked }: { linked: boolean }) {
  if (linked) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, paddingLeft: 4, paddingRight: 12, borderRadius: 32, background: 'var(--theme-color-success-20)', flexShrink: 0 }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Link width={10} height={10} color="var(--theme-color-success-120)" />
        </div>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>Linked</Text>
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, paddingLeft: 4, paddingRight: 12, borderRadius: 32, background: 'var(--theme-color-error-20)', flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-error-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Linkoff width={10} height={10} color="var(--theme-color-error-120)" />
      </div>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-error-120)', whiteSpace: 'nowrap' }}>De-linked</Text>
    </div>
  );
}

function AddressesContactsTabContent({ partyId }: { partyId: string }) {
  const [view, setView] = useState<'addresses' | 'contacts'>('contacts');
  const contacts = PARTY_CONTACTS[partyId] || [];
  const addresses = PARTY_ADDRESSES[partyId] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toggle header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Toggle
          checked={view === 'contacts'}
          onChange={(checked: boolean) => setView(checked ? 'contacts' : 'addresses')}
          offLabel={`Addresses (${addresses.length})`}
          onLabel={`Contacts (${contacts.length})`}
          size="md"
        />
        <Button variant="secondary" size="sm" icon={<Add width={10} height={10} />}>
          {view === 'contacts' ? 'Add Contact' : 'Add Address'}
        </Button>
      </div>

      {/* Contacts list */}
      {view === 'contacts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contacts.length === 0 && (
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)' }}>No contacts added yet.</Text>
          )}
          {contacts.map((c) => (
            <div key={c.id} style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Name + chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>{c.name}</Text>
                  <LinkedChip linked={c.linked} />
                </div>
                {/* Phone + Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Phone width={12} height={12} color="var(--theme-color-grey-40)" />
                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>
                      {c.phones.join(' | ')}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MailOutline width={12} height={12} color="var(--theme-color-grey-40)" />
                    <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>
                      {c.emails.join(' | ')}
                    </Text>
                  </div>
                </div>
              </div>
              <button style={{ width: 28, height: 28, background: 'var(--theme-color-grey-2)', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <MoreVert width={12} height={12} color="var(--theme-color-grey-70)" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Addresses list */}
      {view === 'addresses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {addresses.length === 0 && (
            <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)' }}>No addresses added yet.</Text>
          )}
          {addresses.map((a) => (
            <div key={a.id} style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>{a.name}</Text>
                  {a.isSEZ && <Pill color="teal" theme="line" size="sm" showIcon={false}>SEZ</Pill>}
                  <div style={{ display: 'flex', gap: 4 }}>
                    {a.types.map((t) => (
                      <Pill key={t} color="purple" theme="line" size="sm" showIcon={false}>{t}</Pill>
                    ))}
                  </div>
                </div>
                <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>
                  {[a.line1, a.line2, a.city, a.state, a.country].filter(Boolean).join(', ')}
                </Text>
              </div>
              <button style={{ width: 28, height: 28, background: 'var(--theme-color-grey-2)', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <MoreVert width={12} height={12} color="var(--theme-color-grey-70)" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OtherTabContent({ partyId }: { partyId: string }) {
  const note = PARTY_NOTES[partyId] ?? '';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Notes section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
          Notes
        </Text>
        <Button variant="secondary" size="sm" icon={<EditPencil width={10} height={10} />}>
          Edit
        </Button>
      </div>
      {/* Notes card */}
      <div style={{ border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          Notes
        </Text>
        <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-70)', whiteSpace: 'pre-line' }}>
          {note || '—'}
        </Text>
      </div>
    </div>
  );
}

function TradePartyAccordion({
  party,
  expanded,
  onToggle,
}: {
  party: TradeParty;
  expanded: boolean;
  onToggle: () => void;
}) {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    gap: 20,
    alignItems: 'flex-start',
    padding: '12px 20px',
    background: 'var(--theme-color-grey-2)',
    cursor: 'pointer',
    ...(expanded
      ? {
          borderTop: '1px solid var(--theme-color-grey-10)',
          borderLeft: '1px solid var(--theme-color-grey-10)',
          borderRight: '1px solid var(--theme-color-grey-10)',
          borderRadius: '8px 8px 0 0',
        }
      : {
          border: '1px solid var(--theme-color-grey-10)',
          borderRadius: 8,
        }),
  };

  const subTabItems = [
    {
      key: 'details',
      label: 'Details',
      children: <DetailsTabContent party={party} />,
    },
    {
      key: 'addresses',
      label: 'Addresses & Contacts',
      children: <AddressesContactsTabContent partyId={party.id} />,
    },
    {
      key: 'other',
      label: 'Other',
      children: <OtherTabContent partyId={party.id} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Accordion Header */}
      <div style={headerStyle} onClick={onToggle}>
        {/* Left: name + legal name + chips */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
              {party.name}
            </Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
              {party.legalName}
            </Text>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
            {party.status === 'active' ? (
              <Pill color="success" theme="line" size="sm" showIcon>
                Active
              </Pill>
            ) : (
              <Pill color="error" theme="line" size="sm" showIcon>
                Inactive
              </Pill>
            )}
            <Pill color="purple" theme="line" size="sm" showIcon={false}>
              {getRoleHeaderLabel(party.roles)}
            </Pill>
          </div>
        </div>

        {/* Right: overflow + chevron */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <MoreVert width={12} height={12} color="var(--theme-color-grey-100)" />
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={onToggle}
          >
            <Chevrondown
              width={12}
              height={12}
              color="var(--theme-color-grey-100)"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            />
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      {expanded && (
        <div
          style={{
            background: 'var(--theme-color-pure-100)',
            border: '1px solid var(--theme-color-grey-10)',
            borderRadius: '0 0 8px 8px',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <Tabs
            items={subTabItems}
            defaultActiveKey="details"
          />
        </div>
      )}
    </div>
  );
}

// ─── Contact Card ─────────────────────────────────────────────────────────────

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div
      style={{
        background: 'var(--theme-color-pure-100)',
        borderRadius: 8,
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: '100%',
      }}
    >
      {/* Name row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Text variant="body" size="md" weight="medium" style={{ color: 'var(--theme-color-grey-100)', whiteSpace: 'nowrap' }}>
              {contact.name}
            </Text>
            {contact.verified && (
              <Tick width={10} height={10} color="var(--theme-color-primary-60)" />
            )}
          </div>
          <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
            <Button variant="link" size="sm" icon={<EditPencil width={12} height={12} />} />
            <Button variant="link" size="sm" icon={<MoreVert width={12} height={12} />} />
          </div>
        </div>

        {/* Phone & Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Phone width={12} height={12} color="var(--theme-color-grey-50)" />
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', whiteSpace: 'nowrap' }}>
              {contact.phone}
            </Text>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <MailOutline width={12} height={12} color="var(--theme-color-grey-50)" />
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', whiteSpace: 'nowrap' }}>
              {contact.email}
            </Text>
          </div>
        </div>
      </div>

      {/* Dashed divider */}
      <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)', width: '100%' }} />

      {/* Role tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
        {contact.roles.map((role, i) => (
          <span key={role} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && (
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--theme-color-grey-50)',
                  display: 'inline-block',
                }}
              />
            )}
            <Text variant="caption" size="md" style={{ color: 'var(--theme-color-grey-50)', whiteSpace: 'nowrap' }}>
              {role}
            </Text>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Nav Bar ─────────────────────────────────────────────────────────────────

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
      {/* Left: mode selector + company */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          style={{
            width: 36,
            height: 36,
            border: 'none',
            background: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill="white"/>
            <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" stroke="#EEEEEE"/>
            <path d="M14.5475 7.77799C15.6816 8.63951 16.3873 9.76104 16.6168 11.1717C16.8623 13.9193 14.7192 16.9331 13.1403 19.0351C13.113 19.0624 13.0857 19.0897 13.0575 19.1178C13.0494 19.2556 13.0468 19.3937 13.0472 19.5317C13.047 19.6068 13.0468 19.6819 13.0465 19.7593C13.0367 19.9431 13.0367 19.9431 13.1403 20.0283C13.3522 20.0385 13.5621 20.0437 13.7741 20.0458C13.9062 20.0481 14.0383 20.0505 14.1705 20.0529C14.3788 20.0563 14.5871 20.0594 14.7954 20.0616C15.8314 20.0735 16.7372 20.0884 17.5273 20.8561C18.0293 21.4943 18.1302 22.103 18.1294 22.8969C18.131 23.0703 18.1328 23.2438 18.1345 23.4172C18.1364 23.6891 18.1378 23.961 18.1383 24.2329C18.139 24.4963 18.1418 24.7597 18.1449 25.0232C18.1443 25.1446 18.1443 25.1446 18.1436 25.2685C18.1506 25.7556 18.2009 26.0284 18.5206 26.4018C18.8978 26.7333 19.2505 26.7477 19.7347 26.7526C19.8283 26.7537 19.8283 26.7537 19.9238 26.7547C20.0559 26.7558 20.188 26.7567 20.3201 26.7574C20.4544 26.7583 20.5887 26.76 20.723 26.7625C21.7475 26.8056 21.7475 26.8056 22.6593 26.4018C23.1187 25.7605 23.0247 24.8573 22.9575 24.1034C22.8373 23.4592 22.409 23.0133 21.9888 22.5344C21.7072 22.197 21.4717 21.8288 21.2314 21.4613C21.1828 21.3878 21.1342 21.3142 21.0841 21.2384C19.941 19.503 18.889 17.7561 19.3254 15.5932C19.402 15.3516 19.4901 15.1263 19.5967 14.8964C19.6257 14.8316 19.6547 14.7667 19.6846 14.6999C19.9513 14.1665 20.3404 13.7468 20.7555 13.3238C20.8004 13.2768 20.8453 13.2299 20.8916 13.1815C21.8906 12.2306 23.1814 12.026 24.4997 12.0511C25.7786 12.1094 26.7379 12.7898 27.6043 13.6875C28.5751 14.8077 28.7799 16.0348 28.7017 17.4624C28.4984 19.0751 27.3133 20.5954 26.4255 21.9011C26.3802 21.9687 26.335 22.0363 26.2884 22.1059C26.0867 22.4038 25.8887 22.6858 25.6378 22.9441C24.9505 23.6824 25.0805 24.2817 24.9645 24.5087C24.9816 25.5984 24.5368 27.1314 23.7992 27.9315C23.0454 28.6542 22.2728 28.978 21.2722 28.9875C21.2039 28.9882 21.1356 28.9888 21.0653 28.9895C20.9213 28.9907 20.7773 28.9916 20.6333 28.9922C20.488 28.9932 20.3427 28.9949 20.1975 28.9973C18.8852 29.0194 17.7939 28.9095 16.7824 27.9745C16.1279 27.2301 15.9054 26.3304 15.9042 25.361C15.9028 25.2741 15.9014 25.1872 15.9 25.0977C15.896 24.8237 15.8943 24.5497 15.8925 24.2756C15.8902 24.0883 15.8877 23.9011 15.8851 23.7138C15.879 23.2579 15.8747 22.8019 15.8718 22.346C15.7934 22.3443 15.715 22.3427 15.6342 22.341C15.3396 22.3345 15.0449 22.3273 14.7503 22.3197C14.6235 22.3166 14.4966 22.3137 14.3698 22.3111C12.3133 22.2681 12.3133 22.2681 11.663 21.6123C11.2272 21.1371 11.0477 20.5573 11.0217 19.9153C10.9829 19.1417 10.8415 18.9225 10.3234 18.3334C9.06287 16.3738 7.23647 13.5974 7.3317 11.0404C7.36322 10.6052 7.48936 10.2377 7.67727 9.8473C7.71557 9.76621 7.75388 9.68512 7.79334 9.60157C8.40433 8.44235 9.34183 7.64231 10.5711 7.19147C11.9396 6.79157 13.3476 7.03275 14.5475 7.77799Z" fill="#187C8A"/>
            <path d="M10.3242 18.208C10.4335 18.2353 10.5427 18.2626 10.6553 18.2908C10.6656 18.342 10.6758 18.3932 10.6864 18.446C10.7275 18.6377 10.7275 18.6377 10.9036 18.7874C11.0692 19.0357 11.0692 19.0357 11.0692 19.2841C11.3736 19.3799 11.6621 19.3778 11.9797 19.3772C12.0804 19.3774 12.1811 19.3776 12.2849 19.3778C12.5952 19.3655 12.5952 19.3655 12.8902 19.2841C12.9175 19.2294 13.0386 19.1379 13.0667 19.0816C13.0718 19.1404 13.0436 19.0906 13.0488 19.1511C13.0557 19.2272 13.0394 19.4585 13.0466 19.5369C13.0469 19.7166 13.0377 19.6841 13.0446 19.7622C13.0368 19.917 13.0359 19.9431 13.1385 20.029C13.3504 20.0392 13.5603 20.0444 13.7723 20.0465C13.9044 20.0488 14.0365 20.0512 14.1687 20.0536C14.377 20.057 14.5853 20.06 14.7936 20.0622C15.8296 20.0741 16.7354 20.0891 17.5255 20.8567C18.0275 21.495 18.1284 22.1037 18.1276 22.8976C18.1292 23.071 18.131 23.2444 18.1327 23.4178C18.1346 23.6897 18.136 23.9616 18.1365 24.2336C18.1372 24.497 18.14 24.7604 18.1431 25.0238C18.1425 25.1453 18.1425 25.1453 18.1418 25.2692C18.1488 25.7562 18.1991 26.0291 18.5188 26.4025C18.896 26.734 19.2487 26.7484 19.7329 26.7533C19.8265 26.7543 19.8265 26.7543 19.922 26.7553C20.0541 26.7565 20.1862 26.7574 20.3183 26.758C20.4526 26.759 20.5869 26.7607 20.7212 26.7631C21.7457 26.8063 21.7783 26.7915 22.6065 26.4071C22.7891 26.2813 22.9385 25.8726 22.9481 25.4956C22.9511 25.4035 22.954 25.3115 22.957 25.2167C22.9598 25.0738 22.9598 25.0738 22.9627 24.9281C22.9655 24.8313 22.9684 24.7345 22.9713 24.6347C22.9781 24.3962 22.9831 24.2588 22.9003 23.8863C23.1051 24.1015 23.0829 24.0926 23.3488 24.2386C23.6607 24.3149 23.8119 24.3504 24.0646 24.3332C24.5408 24.2926 24.8223 24.0673 25.0938 23.8863C25.0524 24.2174 25.011 24.4244 24.9696 24.7968C24.9752 24.9111 24.9627 25.1793 24.9696 25.2935C25.0289 26.2769 24.9203 27.051 24.2809 27.8284C23.6227 28.5519 22.8104 28.9233 21.8266 28.9778C21.6411 28.9834 21.4559 28.9864 21.2704 28.9882C21.2021 28.9888 21.1338 28.9895 21.0635 28.9902C20.9195 28.9913 20.7755 28.9922 20.6315 28.9929C20.4862 28.9938 20.3409 28.9955 20.1957 28.998C18.8834 29.0201 17.7921 28.9101 16.7806 27.9752C16.1261 27.2307 15.9036 26.3311 15.9024 25.3617C15.901 25.2748 15.8996 25.1879 15.8982 25.0984C15.8942 24.8243 15.8925 24.5503 15.8907 24.2763C15.8884 24.089 15.8859 23.9018 15.8833 23.7145C15.8772 23.2585 15.8729 22.8026 15.87 22.3466C15.7916 22.345 15.7132 22.3434 15.6324 22.3417C15.3378 22.3352 15.0431 22.328 14.7485 22.3204C14.6217 22.3172 14.4948 22.3143 14.368 22.3117C12.3115 22.2688 12.3115 22.2688 11.6612 21.613C11.222 21.1342 11.064 20.779 11.0252 20.1333C10.9838 19.4669 10.9342 18.9935 10.4451 18.4974C10.3242 18.3736 10.3242 18.3736 10.3242 18.208Z" fill="url(#paint0_linear_navbar)"/>
            <path d="M25.0641 15.0339C25.5194 15.3466 25.8109 15.7753 25.9691 16.3026C26.0427 16.9843 25.9444 17.5193 25.5811 18.0978C25.109 18.5698 24.6261 18.7936 23.9619 18.8117C23.3418 18.8034 22.9573 18.5969 22.5082 18.1805C22.0187 17.6497 21.9476 17.1902 21.9679 16.4808C22.0362 15.8474 22.3428 15.5021 22.8157 15.0979C23.4668 14.6493 24.3744 14.6745 25.0641 15.0339Z" fill="#FCFDFD"/>
            <path d="M14.5459 7.77799C15.68 8.63951 16.3857 9.76104 16.6152 11.1717C16.8462 13.7573 14.9349 16.5133 13.5112 18.5436C13.4773 18.5925 13.4434 18.6413 13.4085 18.6916C13.2423 18.9228 13.174 19.0123 12.9944 19.22C12.9307 19.2872 12.936 19.2833 12.8944 19.32C12.5933 19.5097 12.3448 19.5723 11.994 19.5708C11.8933 19.5712 11.8536 19.5657 11.7498 19.5661C11.4917 19.5454 11.2784 19.4308 11.0694 19.2834C10.8939 19.1345 10.8393 19.1005 10.6623 18.7893C10.5635 18.6196 10.4866 18.5405 10.4866 18.5405C10.4729 18.5263 10.3975 18.4478 10.3678 18.4137C10.2459 18.2681 10.2924 18.3252 10.1684 18.1631C10.1092 18.0686 9.9476 17.8494 9.88714 17.753C9.84577 17.6844 9.57675 17.2668 9.53413 17.1962C9.49062 17.1255 9.19378 16.7114 9.14895 16.6386C6.89134 13.8252 7.25198 10.8142 7.39952 10.5496C7.47394 10.3024 7.56373 10.0798 7.67564 9.8473C7.71395 9.76621 7.75226 9.68512 7.79172 9.60157C8.40271 8.44235 9.3402 7.64231 10.5695 7.19147C11.9379 6.79157 13.346 7.03275 14.5459 7.77799Z" fill="#2ABB96"/>
            <path d="M12.9683 9.82628C13.5259 10.1646 13.8789 10.528 14.0499 11.1717C14.1386 11.7969 14.048 12.367 13.7188 12.9099C13.2984 13.4037 12.8189 13.6808 12.1794 13.7664C11.5205 13.8025 11.0064 13.6215 10.5029 13.1934C10.0725 12.7387 9.90469 12.2033 9.875 11.5855C9.89872 10.9736 10.109 10.5217 10.5579 10.106C11.2926 9.52383 12.1219 9.3917 12.9683 9.82628Z" fill="#FDFEFE"/>
            <defs>
              <linearGradient id="paint0_linear_navbar" x1="24.3565" y1="26.5324" x2="12.1777" y2="19.9237" gradientUnits="userSpaceOnUse">
                <stop stopColor="#74AC4C"/>
                <stop offset="1" stopColor="#348070"/>
              </linearGradient>
            </defs>
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

      {/* Right: search + actions + avatar */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 280 }}>
          <Input
            placeholder="Search for Anything"
            prefix={<Search width={14} height={14} color="var(--theme-color-grey-40)" />}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', position: 'relative' }}>
          {[DocIcon, ListIcon, HelpIcon].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 36,
                height: 36,
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                background: 'var(--theme-color-pure-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Icon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
          ))}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                width: 36,
                height: 36,
                border: '1px solid var(--theme-color-grey-10)',
                borderRadius: 8,
                background: 'var(--theme-color-pure-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <NotificationIcon width={16} height={16} color="var(--theme-color-grey-70)" />
            </button>
            <div
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 16,
                height: 16,
                background: 'var(--theme-color-primary-60)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="caption" size="md" style={{ color: 'var(--theme-color-pure-100)', fontSize: 10 }}>
                2
              </Text>
            </div>
          </div>
          <Avatar size="md" style={{ cursor: 'pointer', border: '0.5px solid var(--theme-color-grey-10)' }}>
            AM
          </Avatar>
        </div>
      </div>
    </div>
  );
}

// ─── Account Header ───────────────────────────────────────────────────────────

function AccountHeader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px 20px 40px',
        background: 'var(--theme-color-pure-100)',
        borderRadius: '12px 0 0 0',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        {/* Logo */}
        <div style={{ padding: '4px 0' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ borderRadius: 8, flexShrink: 0 }}>
            <rect width="36" height="36" rx="8" fill="url(#pattern_voltas)"/>
            <defs>
              <pattern id="pattern_voltas" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image_voltas" transform="scale(0.00444444)"/>
              </pattern>
              <image id="image_voltas" width="225" height="225" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEUJa9P///8AYtEAZNEAZ9IAX9CxyO2xy+4AadMAYdEAcNVblN4AXdCTtuiUtOfa5Pbz+P05gNmjwOt2o+KFreUsetfg6/nM3fTv9fzo8PrS4vZRjdy90vFwn+EZctUmd9ZMitxomuBbkt7D1vKcvOqJsOZ9qeQAWM8wf9nR3vRyoOGpxexNkd6ApeLa6PiGUvVYAAAHj0lEQVR4nO2a2XbiOBCGbckOMhHEkLAvgbAkHabz/o83eJGqJMvG3Wdu5pz/u0pEbNVfKpVKRaIIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8B8hRYVqfCIsfFQl5RMyaT5g3yVE4ownohNJLw8NulTzy+D8YYHjp5Lt0H9CPBkGM/N2qYeH78v06TZ9O76nvhHyYp945RKT3eCpi6n54+RAfzgOSZRptHkdTW+38/U4ywKrEiBbxxVDX+AoNmyryVT2Pn6Jifmbcpcqos8+2CdKruJObjZIljT4kvmmKhFd1+yx1W3WR2ObQjWzb8orA7L3rW/acsMDOHmlDzQf/+gWGO9rOzWfoKEwEee84ZuGG/orTGm1DsV6JPIWMm4ngo+MeIili26Bi9od8shHfYXi0NB350dEj2hRKN7sS6Zp8fumJdImNk7UhEZnLHpYNIQ5VhGt9o4ET6F4DT88eCgxDSpUtKXm8m6tfgu/P47XqbXhbAcXKXsXGw+yrDeTdpfaVeiuL2fyaCuGFWY027uKVBqM0AqbUzQtwZFnIB2KLkYd0eLiDjsK1TvzyMsLj6fbo0VMfwIK5bd9weX+gvSpw0ATJiyfLLlbk5bwslR5phHLjkJBHn+N0lROKOn+8HgJKjTpwVlD6/YiCFM6N+5sL9fzD/vdpM2UEqHj1mQ3qhmTmcuLGRy9lkuohHmnsZ0rTA72yV0hSEkayB+l09Aasqx9d7CzBW4ilVJ+8m1ZFxdDGpk5WyORNZ9z+xdnbQZlFdDp1EoIKMxOvj+1XcT8L6KUxdtOuuHznNVZgcXtVzkkr3bgRwdnasu15ZQb88nF/MQUKmljKo9qA8qtmOf5fPEXa5hY/5w0S0V3DsZf3NpDOaemyL2GS0pB6erF93tmJCw/nwMK2WwvUelk9bGZzPaR0PrhmZ+a0LEKKXEWGUOygOTHOyXIMl1zI1pmIsc1fEB7eCOsQsogblF0mxUa1Z2oV13aUMh2dXEQJPTqAc9aZG6ZC4XdR/E2nNySZ3qTdE2TO3o2eajwbsgk63uxCCnU9rC5pY7lOXOZ2tN85a5jh94mCc0TpTZbxCc3slgxs1chheor9jjNehSkRpCnMLMVyEorR8kbi1FFCz0vFCZH+l2G/cty7bPrA213+lVEIYVR2iwZB8OwIx8qZPupKLglHYW5U4nR0pYnPqXzeBTO3izXLl0fUAlcOCuoUAaqhvzQdkf2FRr3VArpfjDKXOc5lgsaLyo0vtT+PdPMQ7nWrbNYCBY+DSqMxKApsbrz/KlCKg7XhUA6pugSV8CCssyckmrKRTjP8MLSqZWVsHVAse9bFEZ63FSY9xLoKmRr4WfIE5+QXQPKrJFStXIMO5ZdMNwrXWanqAxuURiJSfOWOX18OfQV0l31Wj6syfIdb0uwMqfIGizv5OEGEW9kOA0YdjZVBWqbwkjpD97CKCcLF08dCulKcdKVXfQ2HqQsr5SZU1AN1+JWHu7uJ/ZcXX9GnQrvH+mZtx33vRSaKYaRGppzKa8ab4rsmjPHc3NLx6f0e8t9NCPTnI3KLiT1ky0KVRkbKts71+mvPgc/U0hXiudKD6vYfrETliXSlXcYNgpOYyAVBN8s3KmYiaf1BJ7CJMu01mL49VEV60rs2dXt/c8USltWPZnWEJ2GzKO8I1bWL6wh8Dt8RiV0o875fqYqYGlbpo7C5LhYzysLTZmQsNLh0eXXU6jMTyszG0ulK5tBMhYng8Lx/CBo6V+ybtuABwMNH41rXIVsh5v4V9Kmv3m/TGPih7qF9iTlPaRjFX9Kswt/1a2QdFRt26pFeuZAPmD9vIW11VXIXGMeZAvf87QwCv8xz42smewgvxdJ92u50DOesb9KV2S0LQ+ZdKhdxXywooqNX7hoQ7kKM5puXIekpqTVK9GQQmMnW3r31lI0aJxTt7oussyaX8YOozqrCNa+sG5XrExgFWHrGsaFi2WWkMCWa5pP6vf6mGOUiDu4VhNkoZLR/In0F4uO1ZS2wIplH28f8pdvL78vA2Zur0zaVHjlsd1l/XclUGUdTqjCgbUv1rTf2KG6aVWY7OJWjj3vFp5Ct6/T3pDPn8351dEOrS4RirUv2GlCgyfnaxzvxG9tJ1/6xSjrAVV4rQ/R0s1f742p2a92hVWC5xcRe7XihyovCH2Fsu3rhGvvS75wFDZWPgvcWuL8qo1RXV+71EcAq2LtacKKGad30FzD8EZZHnodFE2Fg+bKp8el9/b8HJEfur52qS5SivWyTF3Cv2b6cW/8vkKVBWY4+1/Ndirkngn9gVRX3sRfXCPuPunrZ2+ryiAWZ0tTGAneg/W+8jcK58bb2WzqtGl+xvv+C1i88TawtLQFpE4+LufbbTr6/tLul/dqMmjltS7fR3bEtEnVYWvHLt5+sp+d7URK6GFpwN2C34csbWl1tcL+J6L1yfb/v1CiFeOuwD9odP3LhQp+kMjKAqn+UB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/j/8C1RlZxOGa+XSAAAAAElFTkSuQmCC"/>
            </defs>
          </svg>
        </div>
        {/* Name + chips */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text variant="heading" size="md" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
              Voltas Private Limited
            </Text>
            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
              Voltas Private Limited | #05453
            </Text>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Pill color="success" theme="line" showIcon={false} size="sm">
              KYC Verified: Activated
            </Pill>
            <Pill color="orange" theme="line" showIcon={false} size="sm">
              Transacting
            </Pill>
          </div>
        </div>
      </div>
      {/* Overflow button */}
      <button
        style={{
          width: 28,
          height: 28,
          background: 'var(--theme-color-grey-2)',
          border: 'none',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <MoreVert width={12} height={12} color="var(--theme-color-grey-70)" />
      </button>
    </div>
  );
}

// ─── Sidebar Tabs ─────────────────────────────────────────────────────────────

function SidebarTabs({ activeTab }: { activeTab: string }) {
  return (
    <div
      style={{
        width: 180,
        background: 'var(--theme-color-pure-100)',
        borderTop: '1px solid var(--theme-color-grey-10)',
        borderRight: '1px solid var(--theme-color-grey-10)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Spacer tab at top */}
      <div style={{ height: 27, background: 'var(--theme-color-pure-100)' }} />
      {SIDEBAR_TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <div
            key={tab}
            style={{
              height: 48,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 32,
              paddingRight: 12,
              cursor: 'pointer',
              background: 'var(--theme-color-pure-100)',
            }}
          >
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  right: -1,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'var(--theme-color-primary-60)',
                }}
              />
            )}
            <Text
              variant="body"
              size="md"
              weight={isActive ? 'medium' : 'regular'}
              style={{
                color: isActive ? 'var(--theme-color-primary-60)' : 'var(--theme-color-grey-40)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </Text>
          </div>
        );
      })}
    </div>
  );
}

// ─── Drawer: fixtures & options ──────────────────────────────────────────────

type DrawerDuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';
type DrawerContactDuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';

const BLOCKED_COMBINATIONS = new Set(['IN|27AAECS4821M1Z7', 'US|12-3456789', 'SG|201234567K']);

interface EnterpriseEntry {
  legalName: string; businessName: string; tradeName: string; relationshipTags: string[];
  iecCode?: string; exporterCode?: string; adCode?: string;
  transportLicense?: string; vehicleTypes?: string[]; serviceRegions?: string[];
}

const ENTERPRISE_DIRECTORY: Record<string, EnterpriseEntry> = {
  'IN|27BBFCS1234M2Z8': { legalName: 'Sapphire Global Logistics Private Limited', businessName: 'Sapphire Global Logistics', tradeName: 'Sapphire Logistics', relationshipTags: ['shipper', 'transporter'], iecCode: '0516908743', exporterCode: 'EXP-MUM-4821', adCode: '1234567', transportLicense: 'MH14/TRP/2021/45872', vehicleTypes: ['trailer', 'lcv'], serviceRegions: ['west', 'north'] },
  'GB|GB987654321': { legalName: 'Sapphire Global Logistics Ltd', businessName: 'Sapphire Global', tradeName: '', relationshipTags: ['shipper'], iecCode: 'UK-IEC-4400821', exporterCode: 'EXP-LON-0099', adCode: '9087654' },
  'AE|AE1234567890': { legalName: 'Sapphire Middle East FZE', businessName: 'Sapphire Middle East', tradeName: 'Sapphire ME', relationshipTags: ['transporter'], transportLicense: 'DXB/TRP/2022/88103', vehicleTypes: ['hcv', 'container'], serviceRegions: ['west'] },
};

const CONTACT_BLOCKED_SET = new Set(['existing@sapphirelogistics.com', 'duplicate@testcorp.com', 'blocked@tradeorg.com']);
const CONTACT_ENTERPRISE_DIR: Record<string, { name: string; phoneCode: string; phone: string }> = {
  'rahul.mehta@sapphirelogistics.com': { name: 'Rahul Mehta', phoneCode: '+91', phone: '9876543210' },
  'priya.sharma@globalfreight.com': { name: 'Priya Sharma', phoneCode: '+91', phone: '9123456789' },
  'john.doe@maritime.co.uk': { name: 'John Doe', phoneCode: '+44', phone: '7700900123' },
};

const COUNTRY_OPTIONS = [
  { label: 'India', value: 'IN' }, { label: 'United States', value: 'US' }, { label: 'China', value: 'CN' },
  { label: 'United Kingdom', value: 'GB' }, { label: 'United Arab Emirates', value: 'AE' }, { label: 'Germany', value: 'DE' },
  { label: 'Singapore', value: 'SG' }, { label: 'Japan', value: 'JP' }, { label: 'Australia', value: 'AU' },
  { label: 'Canada', value: 'CA' }, { label: 'France', value: 'FR' }, { label: 'Netherlands', value: 'NL' },
];
const RELATIONSHIP_TAG_OPTIONS = [
  { label: 'Shipper', value: 'shipper' }, { label: 'Consignee', value: 'consignee' },
  { label: 'Notify Party', value: 'notify_party' }, { label: 'Transporter', value: 'transporter' },
  { label: 'Customs Broker', value: 'customs_broker' }, { label: 'Freight Forwarder', value: 'freight_forwarder' },
  { label: 'Bank', value: 'bank' }, { label: 'Port Agent', value: 'port_agent' },
];
const VEHICLE_TYPE_OPTIONS = [
  { label: 'Trailer', value: 'trailer' }, { label: 'LCV', value: 'lcv' }, { label: 'HCV', value: 'hcv' },
  { label: 'Container', value: 'container' }, { label: 'Refrigerated', value: 'refrigerated' },
];
const PHONE_CODE_OPTIONS = [
  { label: '+91', value: '+91' }, { label: '+1', value: '+1' }, { label: '+44', value: '+44' },
  { label: '+65', value: '+65' }, { label: '+971', value: '+971' },
];
const SERVICE_REGION_OPTIONS = [
  { label: 'North India', value: 'north' }, { label: 'South India', value: 'south' },
  { label: 'East India', value: 'east' }, { label: 'West India', value: 'west' }, { label: 'Pan India', value: 'pan' },
];
const ADDRESS_TYPE_OPTIONS = [
  { label: 'Registered Office', value: 'registered_office' }, { label: 'Branch Office', value: 'branch_office' },
  { label: 'Warehouse', value: 'warehouse' }, { label: 'Factory', value: 'factory' }, { label: 'Port', value: 'port' },
];
const STATE_OPTIONS = [
  { label: 'Maharashtra', value: 'maharashtra' }, { label: 'Gujarat', value: 'gujarat' },
  { label: 'Karnataka', value: 'karnataka' }, { label: 'Tamil Nadu', value: 'tamil_nadu' },
  { label: 'Delhi', value: 'delhi' },
];
const CITY_OPTIONS = [
  { label: 'Mumbai', value: 'mumbai' }, { label: 'Pune', value: 'pune' }, { label: 'Ahmedabad', value: 'ahmedabad' },
  { label: 'Bengaluru', value: 'bengaluru' }, { label: 'Chennai', value: 'chennai' },
  { label: 'Delhi', value: 'delhi' }, { label: 'Kolkata', value: 'kolkata' },
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TradePartyListingPage() {
  // ── listing state ──
  const [expandedPartyId, setExpandedPartyId] = useState<string | null>('sapphire');
  const handleToggle = (id: string) => setExpandedPartyId((prev) => (prev === id ? null : id));

  // ── drawer open state ──
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

  // ── step 1: trade party details ──
  const [country, setCountry] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [duplicateState, setDuplicateState] = useState<DrawerDuplicateState>('idle');
  const [legalName, setLegalName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [relationshipTags, setRelationshipTags] = useState<string[]>([]);
  const [iecCode, setIecCode] = useState('');
  const [exporterCode, setExporterCode] = useState('');
  const [adCode, setAdCode] = useState('');
  const [transportLicense, setTransportLicense] = useState('');
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [serviceRegions, setServiceRegions] = useState<string[]>([]);
  const [step1Saved, setStep1Saved] = useState(false);

  // ── step 2: contact ──
  const [contactEmail, setContactEmail] = useState('');
  const [contactDuplicateState, setContactDuplicateState] = useState<DrawerContactDuplicateState>('idle');
  const [contactName, setContactName] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [altPhoneCode, setAltPhoneCode] = useState('+91');
  const [altPhone, setAltPhone] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [step2Saved, setStep2Saved] = useState(false);

  // ── step 3: address ──
  const [addrName, setAddrName] = useState('');
  const [addrCountry, setAddrCountry] = useState('');
  const [addrType, setAddrType] = useState<string[]>([]);
  const [isSEZ, setIsSEZ] = useState(false);
  const [sezFiles, setSezFiles] = useState<any[]>([]);
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [step3Saved, setStep3Saved] = useState(false);

  // ── step 4: notes ──
  const [notes, setNotes] = useState('');
  const [step4Saved, setStep4Saved] = useState(false);

  // ── handlers ──
  const resetForm = useCallback(() => {
    setLegalName(''); setBusinessName(''); setTradeName(''); setRelationshipTags([]);
    setIecCode(''); setExporterCode(''); setAdCode('');
    setTransportLicense(''); setVehicleTypes([]); setServiceRegions([]);
  }, []);

  const resetContactForm = useCallback(() => {
    setContactName(''); setPhoneCode('+91'); setPhone('');
    setAltPhoneCode('+91'); setAltPhone(''); setAltEmail('');
  }, []);

  const resetAddressForm = useCallback(() => {
    setAddrName(''); setAddrCountry(''); setAddrType([]); setIsSEZ(false);
    setSezFiles([]); setAddrLine1(''); setAddrLine2(''); setAddrState(''); setAddrCity('');
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    setCountry(''); setTaxNumber(''); setDuplicateState('idle');
    resetForm();
    setStep1Saved(false); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false);
    setContactEmail(''); setContactDuplicateState('idle');
    resetContactForm(); resetAddressForm(); setNotes(''); setActiveKeys(['1']);
  }, [resetForm, resetContactForm, resetAddressForm]);

  const handleCheck = useCallback(() => {
    const key = `${country}|${taxNumber.trim()}`;
    if (BLOCKED_COMBINATIONS.has(key)) { setDuplicateState('duplicate'); return; }
    const entry = ENTERPRISE_DIRECTORY[key];
    if (entry) { setDuplicateState('enterprise'); setLegalName(entry.legalName); return; }
    setDuplicateState('unique');
  }, [country, taxNumber]);

  const handleEdit = useCallback(() => { setDuplicateState('idle'); resetForm(); }, [resetForm]);

  const handleContactCheck = useCallback(() => {
    const email = contactEmail.trim();
    if (CONTACT_BLOCKED_SET.has(email)) { setContactDuplicateState('duplicate'); return; }
    const entry = CONTACT_ENTERPRISE_DIR[email];
    if (entry) { setContactDuplicateState('enterprise'); setContactName(entry.name); setPhoneCode(entry.phoneCode); setPhone(entry.phone); return; }
    setContactDuplicateState('unique');
  }, [contactEmail]);

  const handleContactEdit = useCallback(() => { setContactDuplicateState('idle'); resetContactForm(); }, [resetContactForm]);

  const onStep1Edit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setStep1Saved(false); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false); setActiveKeys(['1']); }, []);
  const onStep2Edit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false); setActiveKeys(['2']); }, []);
  const onStep3Edit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setStep3Saved(false); setStep4Saved(false); setActiveKeys(['3']); }, []);
  const onStep4Edit = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setStep4Saved(false); setActiveKeys(['4']); }, []);

  // ── drawer content ──
  const tradePartyDetailsContent = useMemo(() => {
    const canCheck = !!country && !!taxNumber.trim();
    const showForm = duplicateState === 'unique' || duplicateState === 'enterprise';
    const hasShipper = relationshipTags.includes('shipper');
    const hasTransporter = relationshipTags.includes('transporter');
    const canSubmit = showForm && legalName.trim() !== '' && businessName.trim() !== '' && relationshipTags.length > 0;

    const statusChip = (duplicateState === 'unique' || duplicateState === 'enterprise') ? (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Success width={10} height={10} color="var(--theme-color-success-120)" />
        </div>
        <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
          {duplicateState === 'enterprise' ? 'Trade Party exists in enterprise directory, will be linked.' : 'Country of Registration and Tax Number is unique.'}
        </span>
      </div>
    ) : null;

    const duplicateAlert = duplicateState === 'duplicate' ? (
      <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ paddingTop: 2, flexShrink: 0 }}><InfoCircle width={14} height={14} color="var(--theme-color-error-120)" /></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>Trade Party already added in this organization</div>
          <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>A trade party with the same Country of Registration and Tax Number already exists and cannot be added again.</div>
        </div>
      </div>
    ) : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Select placeholder="Country of Reg.*" options={COUNTRY_OPTIONS} value={country} onChange={(val: string) => setCountry(val)} helperText="Add country & tax no. to check duplicity" clearable={false} disabled={duplicateState !== 'idle' || step1Saved} />
              </div>
              <div style={{ flex: 1 }}>
                <Input placeholder="Tax Identification Number*" value={taxNumber} onChange={(e: any) => setTaxNumber(e.target.value)} disabled={duplicateState !== 'idle' || step1Saved} />
              </div>
              {!step1Saved && (duplicateState === 'idle'
                ? <Button variant="primary" size="md" disabled={!canCheck} onClick={handleCheck}>Check</Button>
                : <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleEdit}>Edit</Button>
              )}
            </div>
            {statusChip}
            {duplicateAlert}
          </div>
          {showForm && (
            <>
              <Input placeholder="Legal Name*" value={legalName} onChange={(e: any) => setLegalName(e.target.value)} disabled={duplicateState === 'enterprise' || step1Saved} />
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}><Input placeholder="Business Name*" value={businessName} onChange={(e: any) => setBusinessName(e.target.value)} disabled={step1Saved} /></div>
                <div style={{ flex: 1 }}><Input placeholder="Trade/DBA Name" value={tradeName} onChange={(e: any) => setTradeName(e.target.value)} disabled={step1Saved} /></div>
              </div>
              <Select placeholder="Relationship Tags*" options={RELATIONSHIP_TAG_OPTIONS} mode="multiple" value={relationshipTags} onChange={(val: string[]) => setRelationshipTags(val)} clearable={false} disabled={step1Saved} />
              {(hasShipper || hasTransporter) && (
                <>
                  <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
                  <div style={{ background: 'var(--theme-color-primary-2)', border: '1px solid var(--theme-color-primary-5)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>Relationship Details</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {hasShipper && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                          <span style={{ fontSize: 12, color: 'var(--theme-color-grey-50)' }}>Shipper Details</span>
                          <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ flex: 1 }}><Input placeholder="IEC code" value={iecCode} onChange={(e: any) => setIecCode(e.target.value)} disabled={step1Saved} /></div>
                            <div style={{ flex: 1 }}><Input placeholder="Exporter code" value={exporterCode} onChange={(e: any) => setExporterCode(e.target.value)} disabled={step1Saved} /></div>
                            <div style={{ flex: 1 }}><Input placeholder="AD code" value={adCode} onChange={(e: any) => setAdCode(e.target.value)} disabled={step1Saved} /></div>
                          </div>
                        </div>
                      )}
                      {hasShipper && hasTransporter && <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />}
                      {hasTransporter && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                          <span style={{ fontSize: 12, color: 'var(--theme-color-grey-50)' }}>Transporter Details</span>
                          <div style={{ display: 'flex', gap: 16 }}>
                            <div style={{ flex: 1 }}><Input placeholder="Transport License Number" value={transportLicense} onChange={(e: any) => setTransportLicense(e.target.value)} disabled={step1Saved} /></div>
                            <div style={{ flex: 1 }}><Select placeholder="Vehicle Types" options={VEHICLE_TYPE_OPTIONS} mode="multiple" value={vehicleTypes} onChange={(val: string[]) => setVehicleTypes(val)} clearable={false} disabled={step1Saved} /></div>
                            <div style={{ flex: 1 }}><Select placeholder="Service Regions" options={SERVICE_REGION_OPTIONS} mode="multiple" value={serviceRegions} onChange={(val: string[]) => setServiceRegions(val)} clearable={false} disabled={step1Saved} /></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {showForm && !step1Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => { resetForm(); setStep1Saved(false); setStep2Saved(false); setStep3Saved(false); setStep4Saved(false); setContactEmail(''); setContactDuplicateState('idle'); resetContactForm(); resetAddressForm(); setNotes(''); setActiveKeys(['1']); }}>Reset</Button>
              <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSubmit} onClick={() => { setStep1Saved(true); setActiveKeys(['2']); }}>Save</Button>
            </div>
          </>
        )}
      </div>
    );
  }, [country, taxNumber, duplicateState, legalName, businessName, tradeName, relationshipTags, iecCode, exporterCode, adCode, transportLicense, vehicleTypes, serviceRegions, step1Saved, handleCheck, handleEdit, resetForm, resetContactForm, resetAddressForm]);

  const contactSectionContent = useMemo(() => {
    const canContactCheck = isValidEmail(contactEmail) && contactDuplicateState === 'idle';
    const contactShowForm = contactDuplicateState === 'unique' || contactDuplicateState === 'enterprise';
    const isEnterpriseContact = contactDuplicateState === 'enterprise';
    const canContactSave = contactShowForm && contactName.trim() !== '' && phone.trim() !== '';

    const contactStatusChip = contactShowForm ? (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Success width={10} height={10} color="var(--theme-color-success-120)" />
        </div>
        <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
          {isEnterpriseContact ? 'Contact exists in enterprise directory, will be linked.' : 'Email ID is unique.'}
        </span>
      </div>
    ) : null;

    const contactDuplicateAlert = contactDuplicateState === 'duplicate' ? (
      <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ paddingTop: 2, flexShrink: 0 }}><InfoCircle width={14} height={14} color="var(--theme-color-error-120)" /></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>Contact already exists in this Trade Party.</div>
          <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>A contact with the same Email ID already exists and cannot be added again.</div>
        </div>
      </div>
    ) : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}><Input placeholder="Email ID*" value={contactEmail} onChange={(e: any) => setContactEmail(e.target.value)} helperText="Add Email ID to check duplicity" disabled={contactDuplicateState !== 'idle' || step2Saved} /></div>
              {!step2Saved && (contactDuplicateState === 'idle'
                ? <Button variant="primary" size="md" disabled={!canContactCheck} onClick={handleContactCheck}>Check</Button>
                : <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleContactEdit}>Edit</Button>
              )}
            </div>
            {contactStatusChip}
            {contactDuplicateAlert}
          </div>
          {contactShowForm && (
            <>
              <Input placeholder="Contact Name*" value={contactName} onChange={(e: any) => setContactName(e.target.value)} disabled={isEnterpriseContact || step2Saved} />
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                  <div style={{ width: 90, flexShrink: 0 }}><Select placeholder="Code" options={PHONE_CODE_OPTIONS} value={phoneCode} onChange={(val: string) => setPhoneCode(val)} clearable={false} disabled={isEnterpriseContact || step2Saved} /></div>
                  <div style={{ flex: 1 }}><Input placeholder="Phone*" value={phone} onChange={(e: any) => setPhone(e.target.value.replace(/\D/g, ''))} disabled={isEnterpriseContact || step2Saved} /></div>
                </div>
                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                  <div style={{ width: 90, flexShrink: 0 }}><Select placeholder="Code" options={PHONE_CODE_OPTIONS} value={altPhoneCode} onChange={(val: string) => setAltPhoneCode(val)} clearable={false} disabled={step2Saved} /></div>
                  <div style={{ flex: 1 }}><Input placeholder="Alt Phone" value={altPhone} onChange={(e: any) => setAltPhone(e.target.value.replace(/\D/g, ''))} disabled={step2Saved} /></div>
                </div>
              </div>
              <Input placeholder="Alt. Email ID" value={altEmail} onChange={(e: any) => setAltEmail(e.target.value)} error={altEmail.trim() !== '' && !isValidEmail(altEmail)} disabled={step2Saved} />
            </>
          )}
        </div>
        {contactShowForm && !step2Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => { resetContactForm(); setStep2Saved(false); }}>Reset</Button>
              <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canContactSave} onClick={() => { setStep2Saved(true); setActiveKeys(['3']); }}>Save</Button>
            </div>
          </>
        )}
      </div>
    );
  }, [contactEmail, contactDuplicateState, contactName, phoneCode, phone, altPhoneCode, altPhone, altEmail, step2Saved, handleContactCheck, handleContactEdit, resetContactForm]);

  const addressSectionContent = useMemo(() => {
    const canSave = addrName.trim() !== '' && addrCountry !== '' && addrLine1.trim() !== '' && addrCity !== '';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Input placeholder="Address Name*" value={addrName} onChange={(e: any) => setAddrName(e.target.value)} disabled={step3Saved} />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}><Select placeholder="Country*" options={COUNTRY_OPTIONS} value={addrCountry} onChange={(val: string) => setAddrCountry(val)} clearable={false} disabled={step3Saved} /></div>
            <div style={{ flex: 1 }}><Select placeholder="Address Type" options={ADDRESS_TYPE_OPTIONS} mode="multiple" value={addrType} onChange={(val: string[]) => setAddrType(val)} clearable={false} disabled={step3Saved} /></div>
          </div>
          <Checkbox checked={isSEZ} onChange={(e: any) => setIsSEZ(e.target.checked)} disabled={step3Saved}>Is the address in SEZ?</Checkbox>
          {isSEZ && <FileUpload variant="default" placeholder="SEZ Proof" description="Drag & Drop files here or, click to Browse" helperText="Supported file types: PDF, JPEG, JPG" accept=".pdf,.jpeg,.jpg" value={sezFiles} onChange={(files: any[]) => setSezFiles(files)} disabled={step3Saved} />}
          <Input placeholder="Address Line 1*" value={addrLine1} onChange={(e: any) => setAddrLine1(e.target.value)} disabled={step3Saved} />
          <Input placeholder="Address Line 2" value={addrLine2} onChange={(e: any) => setAddrLine2(e.target.value)} disabled={step3Saved} />
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}><Select placeholder="State" options={STATE_OPTIONS} value={addrState} onChange={(val: string) => setAddrState(val)} clearable={false} disabled={step3Saved} /></div>
            <div style={{ flex: 1 }}><Select placeholder="City*" options={CITY_OPTIONS} value={addrCity} onChange={(val: string) => setAddrCity(val)} clearable={false} disabled={step3Saved} /></div>
          </div>
        </div>
        {!step3Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => { resetAddressForm(); setStep3Saved(false); setStep4Saved(false); setNotes(''); }}>Reset</Button>
              <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => { setStep3Saved(true); setActiveKeys(['4']); }}>Save</Button>
            </div>
          </>
        )}
      </div>
    );
  }, [addrName, addrCountry, addrType, isSEZ, sezFiles, addrLine1, addrLine2, addrState, addrCity, step3Saved, resetAddressForm]);

  const notesSectionContent = useMemo(() => {
    const canSave = notes.trim() !== '';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Input type="textarea" placeholder="Notes*" rows={4} value={notes} onChange={(e: any) => setNotes(e.target.value)} disabled={step4Saved} />
        {!step4Saved && (
          <>
            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => { setNotes(''); setStep4Saved(false); }}>Reset</Button>
              <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => { setStep4Saved(true); setActiveKeys([]); }}>Save</Button>
            </div>
          </>
        )}
      </div>
    );
  }, [notes, step4Saved]);

  const collapseItems = useMemo(() => [
    { key: '1', label: 'Trade Party Details', subLabel: 'Details about the trade party and its relationship with this organisation.', completed: step1Saved, suffix: step1Saved ? <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep1Edit}>Edit</Button> : null, children: tradePartyDetailsContent },
    { key: '2', label: 'Contact', subLabel: 'Contact details for this trade party.', disabled: !step1Saved, completed: step2Saved, suffix: step2Saved ? <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep2Edit}>Edit</Button> : null, children: contactSectionContent },
    { key: '3', label: 'Address', subLabel: 'Address details for the trade party.', disabled: !step2Saved, completed: step3Saved, suffix: step3Saved ? <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep3Edit}>Edit</Button> : null, children: addressSectionContent },
    { key: '4', label: 'Notes', subLabel: 'Internal notes for your team.', disabled: !step3Saved, completed: step4Saved, suffix: step4Saved ? <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep4Edit}>Edit</Button> : null, children: notesSectionContent },
  ], [step1Saved, step2Saved, step3Saved, step4Saved, tradePartyDetailsContent, contactSectionContent, addressSectionContent, notesSectionContent, onStep1Edit, onStep2Edit, onStep3Edit, onStep4Edit]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--theme-color-grey-5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <NavBar />

      {/* Main container */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 12,
          right: 12,
          bottom: 12,
          display: 'flex',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            borderRadius: '12px 0 0 12px',
            overflow: 'hidden',
          }}
        >
          <AccountHeader />

          {/* Body: sidebar + content */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <SidebarTabs activeTab="Trade Parties" />

            {/* Trade parties content */}
            <div
              style={{
                flex: 1,
                background: 'var(--theme-color-pure-100)',
                borderTop: '1px solid var(--theme-color-grey-10)',
                padding: '32px 32px 0',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Building width={16} height={16} color="var(--theme-color-grey-100)" />
                  <Text variant="body" size="lg" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
                    {TRADE_PARTIES.length} Trade Parties
                  </Text>
                </div>
                <Button variant="primary" size="md" icon={<Add width={10} height={10} />} onClick={() => setDrawerOpen(true)}>
                  Add Trade Party
                </Button>
              </div>

              {/* Accordion list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 32 }}>
                {TRADE_PARTIES.map((party) => (
                  <TradePartyAccordion
                    key={party.id}
                    party={party}
                    expanded={expandedPartyId === party.id}
                    onToggle={() => handleToggle(party.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: Contacts */}
        <div
          style={{
            width: 360,
            background: '#EBEFF4',
            borderRadius: '0 12px 12px 0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}
        >
          {/* Panel collapse button (floating on left edge) */}
          <button
            style={{
              position: 'absolute',
              left: -14,
              top: 20,
              width: 28,
              height: 28,
              background: 'var(--theme-color-pure-100)',
              border: '1px solid var(--theme-color-grey-10)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '-2px 0 8px rgba(136,136,136,0.06)',
              zIndex: 5,
            }}
          >
            <ChevronRight width={10} height={10} color="var(--theme-color-grey-70)" />
          </button>

          {/* Contacts section */}
          <div
            style={{
              padding: '32px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text
                variant="body"
                size="md"
                weight="medium"
                style={{
                  color: 'var(--theme-color-grey-100)',
                  textTransform: 'uppercase',
                }}
              >
                Contacts ({CONTACTS.length + 9})
              </Text>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  style={{
                    width: 18,
                    height: 18,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    borderRadius: 4,
                  }}
                >
                  <Add width={10} height={10} color="var(--theme-color-grey-70)" />
                </button>
                <button
                  style={{
                    width: 18,
                    height: 18,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    borderRadius: 4,
                  }}
                >
                  <Chevrondown width={12} height={12} color="var(--theme-color-grey-70)" style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            </div>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CONTACTS.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>

            {/* View all */}
            <Button variant="link" size="sm">
              View All Contacts
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={handleClose}
        width={720}
        title="Add Trade Party"
        subtitle="Add details to create a new trade party"
        icon={Building}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="md" style={{ width: 140 }} onClick={handleClose}>Cancel</Button>
            <Button variant="primary" size="md" style={{ width: 140 }} disabled={!(step1Saved && step2Saved && step3Saved && step4Saved)}>Add Trade Party</Button>
          </div>
        }
      >
        <Collapse
          type="numbered"
          items={collapseItems}
          activeKey={activeKeys}
          onChange={(keys: string[]) => setActiveKeys(Array.isArray(keys) ? keys : [keys])}
        />
      </Drawer>
    </div>
  );
}

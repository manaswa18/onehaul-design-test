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
      children: null,
    },
    {
      key: 'other',
      label: 'Other',
      children: null,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Accordion Header */}
      <div style={headerStyle} onClick={onToggle}>
        {/* Left: name + legal name + chips */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text variant="body" size="lg" weight="medium" style={{ color: 'var(--theme-color-grey-100)' }}>
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
            <MoreVert width={12} height={12} color="var(--theme-color-grey-50)" />
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
              color="var(--theme-color-grey-50)"
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
        padding: 16,
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
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                borderRadius: 4,
              }}
            >
              <EditPencil width={10} height={10} color="var(--theme-color-grey-50)" />
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                borderRadius: 4,
              }}
            >
              <MoreVert width={10} height={10} color="var(--theme-color-grey-50)" />
            </button>
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
        background: 'var(--theme-color-pure-100)',
        zIndex: 10,
      }}
    >
      {/* Left: mode selector + company */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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
          <Building width={16} height={16} color="var(--theme-color-grey-100)" />
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'var(--theme-color-primary-10)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-primary-60)' }}>
              EI
            </Text>
          </div>
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
          <div
            style={{
              width: 36,
              height: 36,
              background: 'var(--theme-color-primary-10)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-primary-60)' }}>
              V
            </Text>
          </div>
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
            <Pill color="success" theme="line" showIcon={false}>
              KYC Verified: Activated
            </Pill>
            <Pill color="orange" theme="line" showIcon={false}>
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
        borderRight: '2px solid var(--theme-color-grey-10)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Spacer tab at top */}
      <div
        style={{
          height: 27,
          borderRight: '2px solid var(--theme-color-grey-10)',
          borderTop: '1px solid var(--theme-color-grey-10)',
          background: 'var(--theme-color-pure-100)',
        }}
      />
      {SIDEBAR_TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <div
            key={tab}
            style={{
              height: 48,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 32,
              paddingRight: 12,
              borderRight: isActive
                ? '2px solid var(--theme-color-primary-60)'
                : '2px solid var(--theme-color-grey-10)',
              cursor: 'pointer',
              background: 'var(--theme-color-pure-100)',
              boxSizing: 'border-box',
            }}
          >
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
                  <Text variant="body" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
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

'use client';

import { useState, useMemo, useCallback } from 'react';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import Input from '@/components/Input';
import SelectComponent from '@/components/Select';
import ButtonComponent from '@/components/Button';
import CheckboxComponent from '@/components/Checkbox';
import FileUploadComponent from '@/components/FileUpload';
import { Building, EditPencil, Success, InfoCircle } from '@/icons';

const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Select = SelectComponent as React.ComponentType<any>;
const Checkbox = CheckboxComponent as React.ComponentType<any>;
const FileUpload = FileUploadComponent as React.ComponentType<any>;

type DuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';
type ContactDuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';

// ─── test fixtures ────────────────────────────────────────────────────────────

const BLOCKED_COMBINATIONS = new Set([
    'IN|27AAECS4821M1Z7',
    'US|12-3456789',
    'SG|201234567K',
]);

interface EnterpriseEntry {
    legalName: string;
    businessName: string;
    tradeName: string;
    relationshipTags: string[];
    iecCode?: string;
    exporterCode?: string;
    adCode?: string;
    transportLicense?: string;
    vehicleTypes?: string[];
    serviceRegions?: string[];
}

const ENTERPRISE_DIRECTORY: Record<string, EnterpriseEntry> = {
    'IN|27BBFCS1234M2Z8': {
        legalName: 'Sapphire Global Logistics Private Limited',
        businessName: 'Sapphire Global Logistics',
        tradeName: 'Sapphire Logistics',
        relationshipTags: ['shipper', 'transporter'],
        iecCode: '0516908743',
        exporterCode: 'EXP-MUM-4821',
        adCode: '1234567',
        transportLicense: 'MH14/TRP/2021/45872',
        vehicleTypes: ['trailer', 'lcv'],
        serviceRegions: ['west', 'north'],
    },
    'GB|GB987654321': {
        legalName: 'Sapphire Global Logistics Ltd',
        businessName: 'Sapphire Global',
        tradeName: '',
        relationshipTags: ['shipper'],
        iecCode: 'UK-IEC-4400821',
        exporterCode: 'EXP-LON-0099',
        adCode: '9087654',
    },
    'AE|AE1234567890': {
        legalName: 'Sapphire Middle East FZE',
        businessName: 'Sapphire Middle East',
        tradeName: 'Sapphire ME',
        relationshipTags: ['transporter'],
        transportLicense: 'DXB/TRP/2022/88103',
        vehicleTypes: ['hcv', 'container'],
        serviceRegions: ['west'],
    },
};

// ─── contact test fixtures ────────────────────────────────────────────────────

const CONTACT_BLOCKED = new Set([
    'existing@sapphirelogistics.com',
    'duplicate@testcorp.com',
    'blocked@tradeorg.com',
]);

interface ContactEnterpriseEntry {
    name: string;
    phoneCode: string;
    phone: string;
}

const CONTACT_ENTERPRISE: Record<string, ContactEnterpriseEntry> = {
    'rahul.mehta@sapphirelogistics.com': { name: 'Rahul Mehta', phoneCode: '+91', phone: '9876543210' },
    'priya.sharma@globalfreight.com': { name: 'Priya Sharma', phoneCode: '+91', phone: '9123456789' },
    'john.doe@maritime.co.uk': { name: 'John Doe', phoneCode: '+44', phone: '7700900123' },
};

// ─── dropdown options ─────────────────────────────────────────────────────────

const COUNTRY_OPTIONS = [
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'China', value: 'CN' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Japan', value: 'JP' },
    { label: 'Australia', value: 'AU' },
    { label: 'Canada', value: 'CA' },
    { label: 'France', value: 'FR' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'Hong Kong', value: 'HK' },
    { label: 'South Korea', value: 'KR' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Bangladesh', value: 'BD' },
    { label: 'Sri Lanka', value: 'LK' },
];

const RELATIONSHIP_TAG_OPTIONS = [
    { label: 'Shipper', value: 'shipper' },
    { label: 'Consignee', value: 'consignee' },
    { label: 'Notify Party', value: 'notify_party' },
    { label: 'Transporter', value: 'transporter' },
    { label: 'Customs Broker', value: 'customs_broker' },
    { label: 'Freight Forwarder', value: 'freight_forwarder' },
    { label: 'Bank', value: 'bank' },
    { label: 'Port Agent', value: 'port_agent' },
];

const VEHICLE_TYPE_OPTIONS = [
    { label: 'Trailer', value: 'trailer' },
    { label: 'LCV', value: 'lcv' },
    { label: 'HCV', value: 'hcv' },
    { label: 'Container', value: 'container' },
    { label: 'Refrigerated', value: 'refrigerated' },
];

const PHONE_CODE_OPTIONS = [
    { label: '+91', value: '+91' },
    { label: '+1', value: '+1' },
    { label: '+44', value: '+44' },
    { label: '+65', value: '+65' },
    { label: '+971', value: '+971' },
    { label: '+49', value: '+49' },
    { label: '+81', value: '+81' },
    { label: '+61', value: '+61' },
    { label: '+86', value: '+86' },
    { label: '+33', value: '+33' },
];

const SERVICE_REGION_OPTIONS = [
    { label: 'North India', value: 'north' },
    { label: 'South India', value: 'south' },
    { label: 'East India', value: 'east' },
    { label: 'West India', value: 'west' },
    { label: 'Pan India', value: 'pan' },
];

const ADDRESS_TYPE_OPTIONS = [
    { label: 'Registered Office', value: 'registered_office' },
    { label: 'Branch Office', value: 'branch_office' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Factory', value: 'factory' },
    { label: 'Port', value: 'port' },
];

const STATE_OPTIONS = [
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Gujarat', value: 'gujarat' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'Tamil Nadu', value: 'tamil_nadu' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'West Bengal', value: 'west_bengal' },
    { label: 'Rajasthan', value: 'rajasthan' },
    { label: 'Uttar Pradesh', value: 'uttar_pradesh' },
];

const CITY_OPTIONS = [
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Pune', value: 'pune' },
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Bengaluru', value: 'bengaluru' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Kolkata', value: 'kolkata' },
    { label: 'Jaipur', value: 'jaipur' },
    { label: 'Surat', value: 'surat' },
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// ─── component ────────────────────────────────────────────────────────────────

export default function TradePartyCreate() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    const [country, setCountry] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [duplicateState, setDuplicateState] = useState<DuplicateState>('idle');

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
    const [step2Saved, setStep2Saved] = useState(false);
    const [step3Saved, setStep3Saved] = useState(false);
    const [step4Saved, setStep4Saved] = useState(false);

    // Notes (step 4)
    const [notes, setNotes] = useState('');

    // Address (step 3)
    const [addrName, setAddrName] = useState('');
    const [addrCountry, setAddrCountry] = useState('');
    const [addrType, setAddrType] = useState<string[]>([]);
    const [isSEZ, setIsSEZ] = useState(false);
    const [sezFiles, setSezFiles] = useState<any[]>([]);
    const [addrLine1, setAddrLine1] = useState('');
    const [addrLine2, setAddrLine2] = useState('');
    const [addrState, setAddrState] = useState('');
    const [addrCity, setAddrCity] = useState('');

    // Contact (step 2)
    const [contactEmail, setContactEmail] = useState('');
    const [contactDuplicateState, setContactDuplicateState] = useState<ContactDuplicateState>('idle');
    const [contactName, setContactName] = useState('');
    const [phoneCode, setPhoneCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [altPhoneCode, setAltPhoneCode] = useState('+91');
    const [altPhone, setAltPhone] = useState('');
    const [altEmail, setAltEmail] = useState('');

    const resetForm = useCallback(() => {
        setLegalName('');
        setBusinessName('');
        setTradeName('');
        setRelationshipTags([]);
        setIecCode('');
        setExporterCode('');
        setAdCode('');
        setTransportLicense('');
        setVehicleTypes([]);
        setServiceRegions([]);
    }, []);

    const resetContactForm = useCallback(() => {
        setContactName('');
        setPhoneCode('+91');
        setPhone('');
        setAltPhoneCode('+91');
        setAltPhone('');
        setAltEmail('');
    }, []);

    const handleCheck = useCallback(() => {
        const key = `${country}|${taxNumber.trim()}`;
        if (BLOCKED_COMBINATIONS.has(key)) {
            setDuplicateState('duplicate');
            return;
        }
        const entry = ENTERPRISE_DIRECTORY[key];
        if (entry) {
            setDuplicateState('enterprise');
            setLegalName(entry.legalName);
            return;
        }
        setDuplicateState('unique');
    }, [country, taxNumber]);

    const handleEdit = useCallback(() => {
        setDuplicateState('idle');
        resetForm();
    }, [resetForm]);

    const handleContactCheck = useCallback(() => {
        const email = contactEmail.trim();
        if (CONTACT_BLOCKED.has(email)) {
            setContactDuplicateState('duplicate');
            return;
        }
        const entry = CONTACT_ENTERPRISE[email];
        if (entry) {
            setContactDuplicateState('enterprise');
            setContactName(entry.name);
            setPhoneCode(entry.phoneCode);
            setPhone(entry.phone);
            return;
        }
        setContactDuplicateState('unique');
    }, [contactEmail]);

    const handleContactEdit = useCallback(() => {
        setContactDuplicateState('idle');
        resetContactForm();
    }, [resetContactForm]);

    const resetAddressForm = useCallback(() => {
        setAddrName('');
        setAddrCountry('');
        setAddrType([]);
        setIsSEZ(false);
        setSezFiles([]);
        setAddrLine1('');
        setAddrLine2('');
        setAddrState('');
        setAddrCity('');
    }, []);

    const handleClose = useCallback(() => {
        setDrawerOpen(false);
        setCountry('');
        setTaxNumber('');
        setDuplicateState('idle');
        resetForm();
        setStep1Saved(false);
        setStep2Saved(false);
        setStep3Saved(false);
        setStep4Saved(false);
        setContactEmail('');
        setContactDuplicateState('idle');
        resetContactForm();
        resetAddressForm();
        setNotes('');
        setActiveKeys(['1']);
    }, [resetForm, resetContactForm, resetAddressForm]);

    const onStep1Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep1Saved(false);
        setStep2Saved(false);
        setStep3Saved(false);
        setStep4Saved(false);
        setActiveKeys(['1']);
    }, []);

    const onStep2Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep2Saved(false);
        setStep3Saved(false);
        setStep4Saved(false);
        setActiveKeys(['2']);
    }, []);

    const onStep3Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep3Saved(false);
        setStep4Saved(false);
        setActiveKeys(['3']);
    }, []);

    const onStep4Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep4Saved(false);
        setActiveKeys(['4']);
    }, []);

    const tradePartyDetailsContent = useMemo(() => {
        const canCheck = !!country && !!taxNumber.trim();
        const showForm = duplicateState === 'unique' || duplicateState === 'enterprise';
        const hasShipper = relationshipTags.includes('shipper');
        const hasTransporter = relationshipTags.includes('transporter');
        const showRelationshipDetails = hasShipper || hasTransporter;
        const canSubmit =
            showForm &&
            legalName.trim() !== '' &&
            businessName.trim() !== '' &&
            relationshipTags.length > 0;

        const statusChip = duplicateState === 'unique' ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Success width={10} height={10} color="var(--theme-color-success-120)" />
                </div>
                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
                    Country of Registration and Tax Number is unique.
                </span>
            </div>
        ) : duplicateState === 'enterprise' ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Success width={10} height={10} color="var(--theme-color-success-120)" />
                </div>
                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
                    Trade Party exists in enterprise trade party directory, will be linked to this organization.
                </span>
            </div>
        ) : null;

        const duplicateAlert = duplicateState === 'duplicate' ? (
            <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ paddingTop: 2, flexShrink: 0 }}>
                    <InfoCircle width={14} height={14} color="var(--theme-color-error-120)" />
                </div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>
                        Trade Party already added in this organization
                    </div>
                    <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>
                        A trade party with the same Country of Registration and Tax Number already exists for this organisation and cannot be added again. To proceed, edit the details to add a different Trade Party.
                    </div>
                </div>
            </div>
        ) : null;

        const relationshipDetailsCard = showRelationshipDetails ? (
            <>
                <div style={{ borderTop: '1px dashed var(--theme-color-grey-10)' }} />
                <div style={{ background: 'var(--theme-color-primary-2)', border: '1px solid var(--theme-color-primary-5)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--theme-color-grey-100)', textTransform: 'uppercase' }}>
                        Relationship Details
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {hasShipper && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)' }}>Shipper Details</span>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ flex: 1 }}>
                                        <Input placeholder="IEC code" value={iecCode} onChange={(e: any) => setIecCode(e.target.value)} disabled={step1Saved} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Input placeholder="Exporter code" value={exporterCode} onChange={(e: any) => setExporterCode(e.target.value)} disabled={step1Saved} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Input placeholder="AD code" value={adCode} onChange={(e: any) => setAdCode(e.target.value)} disabled={step1Saved} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {hasShipper && hasTransporter && (
                            <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
                        )}
                        {hasTransporter && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)' }}>Transporter Details</span>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ flex: 1 }}>
                                        <Input placeholder="Transport License Number" value={transportLicense} onChange={(e: any) => setTransportLicense(e.target.value)} disabled={step1Saved} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            placeholder="Vehicle Types"
                                            options={VEHICLE_TYPE_OPTIONS}
                                            mode="multiple"
                                            value={vehicleTypes}
                                            onChange={(val: string[]) => setVehicleTypes(val)}
                                            clearable={false}
                                            disabled={step1Saved}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            placeholder="Service Regions"
                                            options={SERVICE_REGION_OPTIONS}
                                            mode="multiple"
                                            value={serviceRegions}
                                            onChange={(val: string[]) => setServiceRegions(val)}
                                            clearable={false}
                                            disabled={step1Saved}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        ) : null;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <Select
                                    placeholder="Country of Reg.*"
                                    options={COUNTRY_OPTIONS}
                                    value={country}
                                    onChange={(val: string) => setCountry(val)}
                                    helperText="Add country & tax no. to check duplicity"
                                    clearable={false}
                                    disabled={duplicateState !== 'idle' || step1Saved}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Tax Identification Number*"
                                    value={taxNumber}
                                    onChange={(e: any) => setTaxNumber(e.target.value)}
                                    disabled={duplicateState !== 'idle' || step1Saved}
                                />
                            </div>
                            {!step1Saved && (duplicateState === 'idle' ? (
                                <Button variant="primary" size="md" disabled={!canCheck} onClick={handleCheck}>
                                    Check
                                </Button>
                            ) : (
                                <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleEdit}>
                                    Edit
                                </Button>
                            ))}
                        </div>
                        {statusChip}
                        {duplicateAlert}
                    </div>

                    {showForm && (
                        <>
                            <Input
                                placeholder="Legal Name*"
                                value={legalName}
                                onChange={(e: any) => setLegalName(e.target.value)}
                                disabled={duplicateState === 'enterprise' || step1Saved}
                            />
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Business Name*"
                                        value={businessName}
                                        onChange={(e: any) => setBusinessName(e.target.value)}
                                        disabled={step1Saved}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Trade/DBA Name"
                                        value={tradeName}
                                        onChange={(e: any) => setTradeName(e.target.value)}
                                        disabled={step1Saved}
                                    />
                                </div>
                            </div>
                            <Select
                                placeholder="Relationship Tags*"
                                options={RELATIONSHIP_TAG_OPTIONS}
                                mode="multiple"
                                value={relationshipTags}
                                onChange={(val: string[]) => setRelationshipTags(val)}
                                clearable={false}
                                disabled={step1Saved}
                            />
                            {relationshipDetailsCard}
                        </>
                    )}
                </div>

                {showForm && !step1Saved && (
                    <>
                        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                resetForm();
                                setStep1Saved(false);
                                setStep2Saved(false);
                                setStep3Saved(false);
                                setStep4Saved(false);
                                setContactEmail('');
                                setContactDuplicateState('idle');
                                resetContactForm();
                                resetAddressForm();
                                setNotes('');
                                setActiveKeys(['1']);
                            }}>
                                Reset
                            </Button>
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSubmit} onClick={() => {
                                setStep1Saved(true);
                                setActiveKeys(['2']);
                            }}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }, [
        country, taxNumber, duplicateState, legalName, businessName, tradeName, relationshipTags,
        iecCode, exporterCode, adCode, transportLicense, vehicleTypes, serviceRegions,
        step1Saved,
        handleCheck, handleEdit, resetForm, resetContactForm, resetAddressForm,
    ]);

    const contactSectionContent = useMemo(() => {
        const canContactCheck = isValidEmail(contactEmail) && contactDuplicateState === 'idle';
        const contactShowForm = contactDuplicateState === 'unique' || contactDuplicateState === 'enterprise';
        const isEnterpriseContact = contactDuplicateState === 'enterprise';
        const canContactSave = contactShowForm && contactName.trim() !== '' && phone.trim() !== '';

        const contactStatusChip = (contactDuplicateState === 'unique' || contactDuplicateState === 'enterprise') ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Success width={10} height={10} color="var(--theme-color-success-120)" />
                </div>
                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
                    {contactDuplicateState === 'enterprise'
                        ? 'Contact exists in enterprise contact directory, will be linked to this organization.'
                        : 'Email ID is unique.'}
                </span>
            </div>
        ) : null;

        const contactDuplicateAlert = contactDuplicateState === 'duplicate' ? (
            <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ paddingTop: 2, flexShrink: 0 }}>
                    <InfoCircle width={14} height={14} color="var(--theme-color-error-120)" />
                </div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>
                        Contact already exists in this Trade Party.
                    </div>
                    <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>
                        A contact with the same Email ID already exists for this Trade Party and cannot be added again. Edit the Email ID to add a different contact.
                    </div>
                </div>
            </div>
        ) : null;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Email ID*"
                                    value={contactEmail}
                                    onChange={(e: any) => setContactEmail(e.target.value)}
                                    helperText="Add Email ID to check duplicity"
                                    disabled={contactDuplicateState !== 'idle' || step2Saved}
                                />
                            </div>
                            {!step2Saved && (contactDuplicateState === 'idle' ? (
                                <Button variant="primary" size="md" disabled={!canContactCheck} onClick={handleContactCheck}>
                                    Check
                                </Button>
                            ) : (
                                <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleContactEdit}>
                                    Edit
                                </Button>
                            ))}
                        </div>
                        {contactStatusChip}
                        {contactDuplicateAlert}
                    </div>

                    {contactShowForm && (
                        <>
                            <Input
                                placeholder="Contact Name*"
                                value={contactName}
                                onChange={(e: any) => setContactName(e.target.value)}
                                disabled={isEnterpriseContact || step2Saved}
                            />
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                                    <div style={{ width: 90, flexShrink: 0 }}>
                                        <Select
                                            placeholder="Code"
                                            options={PHONE_CODE_OPTIONS}
                                            value={phoneCode}
                                            onChange={(val: string) => setPhoneCode(val)}
                                            clearable={false}
                                            disabled={isEnterpriseContact || step2Saved}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Input
                                            placeholder="Phone*"
                                            value={phone}
                                            onChange={(e: any) => {
                                                const v = e.target.value.replace(/\D/g, '');
                                                setPhone(v);
                                            }}
                                            disabled={isEnterpriseContact || step2Saved}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', gap: 8 }}>
                                    <div style={{ width: 90, flexShrink: 0 }}>
                                        <Select
                                            placeholder="Code"
                                            options={PHONE_CODE_OPTIONS}
                                            value={altPhoneCode}
                                            onChange={(val: string) => setAltPhoneCode(val)}
                                            clearable={false}
                                            disabled={step2Saved}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <Input
                                            placeholder="Alt Phone"
                                            value={altPhone}
                                            onChange={(e: any) => {
                                                const v = e.target.value.replace(/\D/g, '');
                                                setAltPhone(v);
                                            }}
                                            disabled={step2Saved}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Input
                                placeholder="Alt. Email ID"
                                value={altEmail}
                                onChange={(e: any) => setAltEmail(e.target.value)}
                                error={altEmail.trim() !== '' && !isValidEmail(altEmail)}
                                disabled={step2Saved}
                            />
                        </>
                    )}
                </div>

                {contactShowForm && !step2Saved && (
                    <>
                        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                resetContactForm();
                                setStep2Saved(false);
                            }}>
                                Reset
                            </Button>
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canContactSave} onClick={() => {
                                setStep2Saved(true);
                                setActiveKeys(['3']);
                            }}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }, [
        contactEmail, contactDuplicateState, contactName, phoneCode, phone,
        altPhoneCode, altPhone, altEmail,
        step2Saved,
        handleContactCheck, handleContactEdit, resetContactForm,
    ]);

    const addressSectionContent = useMemo(() => {
        const canSave =
            addrName.trim() !== '' &&
            addrCountry !== '' &&
            addrLine1.trim() !== '' &&
            addrCity !== '';

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <Input
                        placeholder="Address Name*"
                        value={addrName}
                        onChange={(e: any) => setAddrName(e.target.value)}
                        disabled={step3Saved}
                    />
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                            <Select
                                placeholder="Country*"
                                options={COUNTRY_OPTIONS}
                                value={addrCountry}
                                onChange={(val: string) => setAddrCountry(val)}
                                clearable={false}
                                disabled={step3Saved}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Select
                                placeholder="Address Type"
                                options={ADDRESS_TYPE_OPTIONS}
                                mode="multiple"
                                value={addrType}
                                onChange={(val: string[]) => setAddrType(val)}
                                clearable={false}
                                disabled={step3Saved}
                            />
                        </div>
                    </div>
                    <Checkbox
                        checked={isSEZ}
                        onChange={(e: any) => setIsSEZ(e.target.checked)}
                        disabled={step3Saved}
                    >
                        Is the address in SEZ?
                    </Checkbox>
                    {isSEZ && (
                        <FileUpload
                            variant="default"
                            placeholder="SEZ Proof"
                            description="Drag & Drop files here or, click to Browse"
                            helperText="Supported file types: PDF, JPEG, JPG"
                            accept=".pdf,.jpeg,.jpg"
                            value={sezFiles}
                            onChange={(files: any[]) => setSezFiles(files)}
                            disabled={step3Saved}
                        />
                    )}
                    <Input
                        placeholder="Address Line 1*"
                        value={addrLine1}
                        onChange={(e: any) => setAddrLine1(e.target.value)}
                        disabled={step3Saved}
                    />
                    <Input
                        placeholder="Address Line 2"
                        value={addrLine2}
                        onChange={(e: any) => setAddrLine2(e.target.value)}
                        disabled={step3Saved}
                    />
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                            <Select
                                placeholder="State"
                                options={STATE_OPTIONS}
                                value={addrState}
                                onChange={(val: string) => setAddrState(val)}
                                clearable={false}
                                disabled={step3Saved}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <Select
                                placeholder="City*"
                                options={CITY_OPTIONS}
                                value={addrCity}
                                onChange={(val: string) => setAddrCity(val)}
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
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                resetAddressForm();
                                setStep3Saved(false);
                                setStep4Saved(false);
                                setNotes('');
                            }}>
                                Reset
                            </Button>
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => {
                                setStep3Saved(true);
                                setActiveKeys(['4']);
                            }}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }, [
        addrName, addrCountry, addrType, isSEZ, sezFiles,
        addrLine1, addrLine2, addrState, addrCity,
        step3Saved,
        resetAddressForm,
    ]);

    const notesSectionContent = useMemo(() => {
        const canSave = notes.trim() !== '';

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
                <Input
                    type="textarea"
                    placeholder="Notes*"
                    rows={4}
                    value={notes}
                    onChange={(e: any) => setNotes(e.target.value)}
                    disabled={step4Saved}
                />
                {!step4Saved && (
                    <>
                        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                setNotes('');
                                setStep4Saved(false);
                            }}>
                                Reset
                            </Button>
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => {
                                setStep4Saved(true);
                                setActiveKeys([]);
                            }}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }, [notes, step4Saved]);

    const collapseItems = useMemo(() => [
        {
            key: '1',
            label: 'Trade Party Details',
            subLabel: 'Details about the trade party and its relationship with this organisation.',
            completed: step1Saved,
            suffix: step1Saved ? (
                <Button
                    variant="link"
                    size="md"
                    icon={<EditPencil width={14} height={14} />}
                    onClick={onStep1Edit}
                >
                    Edit
                </Button>
            ) : null,
            children: tradePartyDetailsContent,
        },
        {
            key: '2',
            label: 'Contact',
            subLabel: 'Contact details for this trade party. It will be mapped to the address as POC. Can be added later. Once started, complete required fields to save.',
            disabled: !step1Saved,
            completed: step2Saved,
            suffix: step2Saved ? (
                <Button
                    variant="link"
                    size="md"
                    icon={<EditPencil width={14} height={14} />}
                    onClick={onStep2Edit}
                >
                    Edit
                </Button>
            ) : null,
            children: contactSectionContent,
        },
        {
            key: '3',
            label: 'Address',
            subLabel: 'Address details for the trade party. Can be added later. Once started, complete required fields to save.',
            disabled: !step2Saved,
            completed: step3Saved,
            suffix: step3Saved ? (
                <Button
                    variant="link"
                    size="md"
                    icon={<EditPencil width={14} height={14} />}
                    onClick={onStep3Edit}
                >
                    Edit
                </Button>
            ) : null,
            children: addressSectionContent,
        },
        {
            key: '4',
            label: 'Notes',
            subLabel: 'Internal notes for your team. Can be added later. Once started, complete required fields to save.',
            disabled: !step3Saved,
            completed: step4Saved,
            suffix: step4Saved ? (
                <Button
                    variant="link"
                    size="md"
                    icon={<EditPencil width={14} height={14} />}
                    onClick={onStep4Edit}
                >
                    Edit
                </Button>
            ) : null,
            children: notesSectionContent,
        },
    ], [step1Saved, step2Saved, step3Saved, step4Saved, tradePartyDetailsContent, contactSectionContent, addressSectionContent, notesSectionContent, onStep1Edit, onStep2Edit, onStep3Edit, onStep4Edit]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>Add Trade Party</Button>

            {/* Test reference card */}
            <div style={{ background: 'white', border: '1px solid var(--theme-color-grey-10)', borderRadius: 8, padding: 16, width: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Test Credentials</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--theme-color-error-120)' }}>Blocked — duplicate in same org</div>
                    {[
                        { country: 'India (IN)', tax: '27AAECS4821M1Z7' },
                        { country: 'United States (US)', tax: '12-3456789' },
                        { country: 'Singapore (SG)', tax: '201234567K' },
                    ].map(r => (
                        <div key={r.tax} style={{ fontSize: 12, color: 'var(--theme-color-grey-60)', fontFamily: 'monospace', paddingLeft: 8 }}>
                            {r.country} · {r.tax}
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--theme-color-success-120)' }}>Enterprise directory match</div>
                    {[
                        { country: 'India (IN)', tax: '27BBFCS1234M2Z8', tags: 'Shipper + Transporter' },
                        { country: 'United Kingdom (GB)', tax: 'GB987654321', tags: 'Shipper' },
                        { country: 'UAE (AE)', tax: 'AE1234567890', tags: 'Transporter' },
                    ].map(r => (
                        <div key={r.tax} style={{ fontSize: 12, color: 'var(--theme-color-grey-60)', fontFamily: 'monospace', paddingLeft: 8 }}>
                            {r.country} · {r.tax} <span style={{ fontFamily: 'inherit', color: 'var(--theme-color-grey-40)' }}>({r.tags})</span>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid var(--theme-color-grey-10)' }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--theme-color-grey-100)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Contact — Step 2</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--theme-color-error-120)' }}>Blocked — duplicate in same trade party</div>
                    {['existing@sapphirelogistics.com', 'duplicate@testcorp.com', 'blocked@tradeorg.com'].map(e => (
                        <div key={e} style={{ fontSize: 12, color: 'var(--theme-color-grey-60)', fontFamily: 'monospace', paddingLeft: 8 }}>{e}</div>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--theme-color-success-120)' }}>Enterprise contact directory</div>
                    {['rahul.mehta@sapphirelogistics.com', 'priya.sharma@globalfreight.com', 'john.doe@maritime.co.uk'].map(e => (
                        <div key={e} style={{ fontSize: 12, color: 'var(--theme-color-grey-60)', fontFamily: 'monospace', paddingLeft: 8 }}>{e}</div>
                    ))}
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" disabled={!(step1Saved && step2Saved && step3Saved && step4Saved)}>Add Trade Party</Button>
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
                            // single-open: if multiple keys, keep only the newly added one
                            setActiveKeys(next.length > 1 ? [next[next.length - 1]] : next);
                        }}
                    />
                </div>
            </Drawer>
        </div>
    );
}

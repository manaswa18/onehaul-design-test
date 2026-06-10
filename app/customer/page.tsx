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

type OrgDuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';
type ContactDuplicateState = 'idle' | 'unique' | 'enterprise' | 'duplicate';

// ─── test fixtures ────────────────────────────────────────────────────────────

const ORG_BLOCKED = new Set([
    'IN|27AAECS4821M1Z7',
    'US|12-3456789',
    'SG|201234567K',
]);

const ORG_ENTERPRISE: Record<string, { legalName: string }> = {
    'IN|27BBFCS1234M2Z8': { legalName: 'Sapphire Global Logistics Private Limited' },
    'GB|GB987654321': { legalName: 'Sapphire Global Logistics Ltd' },
    'AE|AE1234567890': { legalName: 'Sapphire Middle East FZE' },
};

const CONTACT_BLOCKED = new Set([
    'existing@sapphire.com',
    'duplicate@customer.com',
    'blocked@testorg.com',
]);

const CONTACT_ENTERPRISE: Record<string, { name: string; phoneCode: string; phone: string }> = {
    'rahul@sapphire.com': { name: 'Rahul Mehta', phoneCode: '+91', phone: '9876543210' },
    'john@maritime.co.uk': { name: 'John Doe', phoneCode: '+44', phone: '7700900123' },
};

// ─── options ──────────────────────────────────────────────────────────────────

const COUNTRY_OPTIONS = [
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Japan', value: 'JP' },
    { label: 'Australia', value: 'AU' },
    { label: 'Canada', value: 'CA' },
    { label: 'France', value: 'FR' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'China', value: 'CN' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Thailand', value: 'TH' },
];

const BUSINESS_TYPE_OPTIONS = [
    { label: 'Private Limited', value: 'private_limited' },
    { label: 'Public Limited', value: 'public_limited' },
    { label: 'Partnership', value: 'partnership' },
    { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
    { label: 'LLP', value: 'llp' },
    { label: 'Others', value: 'others' },
];

const NATURE_OF_BUSINESS_OPTIONS = [
    { label: 'Manufacturer', value: 'manufacturer' },
    { label: 'Trader', value: 'trader' },
    { label: 'Service Provider', value: 'service_provider' },
    { label: 'Retailer', value: 'retailer' },
    { label: 'Wholesaler', value: 'wholesaler' },
    { label: 'Others', value: 'others' },
];

const TRADE_TYPE_OPTIONS = [
    { label: 'Domestic', value: 'domestic' },
    { label: 'Import', value: 'import' },
    { label: 'Export', value: 'export' },
    { label: 'Import + Export', value: 'import_export' },
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

const WORK_SCOPE_OPTIONS = [
    { label: 'Finance', value: 'finance' },
    { label: 'Operations', value: 'operations' },
    { label: 'Procurement', value: 'procurement' },
    { label: 'Sales', value: 'sales' },
    { label: 'Technical', value: 'technical' },
    { label: 'Management', value: 'management' },
];

const CONTACT_TAGS_OPTIONS = [
    { label: 'Decision Maker', value: 'decision_maker' },
    { label: 'Finance', value: 'finance' },
    { label: 'Operations', value: 'operations' },
    { label: 'Procurement', value: 'procurement' },
    { label: 'Sales', value: 'sales' },
    { label: 'Technical', value: 'technical' },
];

const ADDRESS_TYPE_OPTIONS = [
    { label: 'Registered Office', value: 'registered_office' },
    { label: 'Branch Office', value: 'branch_office' },
    { label: 'Billing Address', value: 'billing_address' },
    { label: 'Warehouse', value: 'warehouse' },
    { label: 'Factory', value: 'factory' },
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
    { label: 'Telangana', value: 'telangana' },
    { label: 'Madhya Pradesh', value: 'madhya_pradesh' },
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
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Surat', value: 'surat' },
];

const TIMEZONE_OPTIONS = [
    { label: 'IST — UTC+5:30', value: 'Asia/Kolkata' },
    { label: 'GMT — UTC+0', value: 'UTC' },
    { label: 'EST — UTC−5', value: 'America/New_York' },
    { label: 'PST — UTC−8', value: 'America/Los_Angeles' },
    { label: 'UAE — UTC+4', value: 'Asia/Dubai' },
    { label: 'SGT — UTC+8', value: 'Asia/Singapore' },
    { label: 'CST — UTC+8', value: 'Asia/Shanghai' },
    { label: 'JST — UTC+9', value: 'Asia/Tokyo' },
    { label: 'CET — UTC+1', value: 'Europe/Berlin' },
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

// ─── component ────────────────────────────────────────────────────────────────

export default function CreateCustomer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    // step saved states
    const [step1Saved, setStep1Saved] = useState(false);
    const [step2Saved, setStep2Saved] = useState(false);
    const [step3Saved, setStep3Saved] = useState(false);

    // step 1 — org details
    const [country, setCountry] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [orgDuplicateState, setOrgDuplicateState] = useState<OrgDuplicateState>('idle');
    const [legalName, setLegalName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [natureOfBusiness, setNatureOfBusiness] = useState('');
    const [tradeType, setTradeType] = useState('');
    const [proofFiles, setProofFiles] = useState<any[]>([]);

    // step 2 — contact
    const [contactEmail, setContactEmail] = useState('');
    const [contactDuplicateState, setContactDuplicateState] = useState<ContactDuplicateState>('idle');
    const [contactName, setContactName] = useState('');
    const [workScope, setWorkScope] = useState('');
    const [phoneCode, setPhoneCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [altPhoneCode, setAltPhoneCode] = useState('+91');
    const [altPhone, setAltPhone] = useState('');
    const [altEmail, setAltEmail] = useState('');
    const [contactTags, setContactTags] = useState<string[]>([]);

    // step 3 — billing address
    const [addrName, setAddrName] = useState('');
    const [addrCountry, setAddrCountry] = useState('');
    const [addrType, setAddrType] = useState<string[]>([]);
    const [gstNumber, setGstNumber] = useState('');
    const [addrLine1, setAddrLine1] = useState('');
    const [addrLine2, setAddrLine2] = useState('');
    const [addrState, setAddrState] = useState('');
    const [addrCity, setAddrCity] = useState('');
    const [timezone, setTimezone] = useState('');
    const [isSEZ, setIsSEZ] = useState(false);
    const [sezFiles, setSezFiles] = useState<any[]>([]);

    // ─── reset callbacks ──────────────────────────────────────────────────────

    const resetOrgForm = useCallback(() => {
        setLegalName('');
        setBusinessName('');
        setBusinessType('');
        setNatureOfBusiness('');
        setTradeType('');
        setProofFiles([]);
    }, []);

    const resetContactForm = useCallback(() => {
        setContactName('');
        setWorkScope('');
        setPhoneCode('+91');
        setPhone('');
        setAltPhoneCode('+91');
        setAltPhone('');
        setAltEmail('');
        setContactTags([]);
    }, []);

    const resetAddressForm = useCallback(() => {
        setAddrName('');
        setAddrCountry('');
        setAddrType([]);
        setGstNumber('');
        setAddrLine1('');
        setAddrLine2('');
        setAddrState('');
        setAddrCity('');
        setTimezone('');
        setIsSEZ(false);
        setSezFiles([]);
    }, []);

    // ─── duplicate check handlers ─────────────────────────────────────────────

    const handleOrgCheck = useCallback(() => {
        const key = `${country}|${taxNumber.trim()}`;
        if (ORG_BLOCKED.has(key)) { setOrgDuplicateState('duplicate'); return; }
        const entry = ORG_ENTERPRISE[key];
        if (entry) { setOrgDuplicateState('enterprise'); setLegalName(entry.legalName); return; }
        setOrgDuplicateState('unique');
    }, [country, taxNumber]);

    const handleOrgEdit = useCallback(() => {
        setOrgDuplicateState('idle');
        resetOrgForm();
    }, [resetOrgForm]);

    const handleContactCheck = useCallback(() => {
        const email = contactEmail.trim();
        if (CONTACT_BLOCKED.has(email)) { setContactDuplicateState('duplicate'); return; }
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

    // ─── accordion edit / close handlers ─────────────────────────────────────

    const handleClose = useCallback(() => {
        setDrawerOpen(false);
        setCountry(''); setTaxNumber(''); setOrgDuplicateState('idle');
        resetOrgForm();
        setStep1Saved(false); setStep2Saved(false); setStep3Saved(false);
        setContactEmail(''); setContactDuplicateState('idle');
        resetContactForm();
        resetAddressForm();
        setActiveKeys(['1']);
    }, [resetOrgForm, resetContactForm, resetAddressForm]);

    const onStep1Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep1Saved(false); setStep2Saved(false); setStep3Saved(false);
        setActiveKeys(['1']);
    }, []);

    const onStep2Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep2Saved(false); setStep3Saved(false);
        setActiveKeys(['2']);
    }, []);

    const onStep3Edit = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setStep3Saved(false);
        setActiveKeys(['3']);
    }, []);

    // ─── step content memos ───────────────────────────────────────────────────

    const orgDetailsContent = useMemo(() => {
        const canCheck = !!country && !!taxNumber.trim();
        const showForm = orgDuplicateState === 'unique' || orgDuplicateState === 'enterprise';
        const canSubmit =
            showForm &&
            legalName.trim() !== '' &&
            natureOfBusiness !== '' &&
            tradeType !== '' &&
            proofFiles.length > 0;

        const statusChip = (orgDuplicateState === 'unique' || orgDuplicateState === 'enterprise') ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Success width={10} height={10} color="var(--theme-color-success-120)" />
                </div>
                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
                    {orgDuplicateState === 'enterprise'
                        ? 'Customer exists in enterprise directory, will be linked to this organisation.'
                        : 'Country of Registration and Tax Number is unique.'}
                </span>
            </div>
        ) : null;

        const duplicateAlert = orgDuplicateState === 'duplicate' ? (
            <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ paddingTop: 2, flexShrink: 0 }}>
                    <InfoCircle width={14} height={14} color="var(--theme-color-error-120)" />
                </div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>
                        Customer already added in this organisation
                    </div>
                    <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>
                        A customer with the same Country of Registration and Tax Number already exists and cannot be added again. Update the details to add a different customer.
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
                                <Select
                                    placeholder="Country of Registration*"
                                    options={COUNTRY_OPTIONS}
                                    value={country}
                                    onChange={(val: string) => setCountry(val)}
                                    helperText="Add country & tax no. to check duplicity"
                                    clearable={false}
                                    disabled={orgDuplicateState !== 'idle' || step1Saved}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Tax Identification Number*"
                                    value={taxNumber}
                                    onChange={(e: any) => setTaxNumber(e.target.value)}
                                    disabled={orgDuplicateState !== 'idle' || step1Saved}
                                />
                            </div>
                            {!step1Saved && (orgDuplicateState === 'idle' ? (
                                <Button variant="primary" size="md" disabled={!canCheck} onClick={handleOrgCheck}>
                                    Check
                                </Button>
                            ) : (
                                <Button variant="secondary" size="md" icon={<EditPencil width={14} height={14} />} onClick={handleOrgEdit}>
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
                                disabled={orgDuplicateState === 'enterprise' || step1Saved}
                            />
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Business Name"
                                        value={businessName}
                                        onChange={(e: any) => setBusinessName(e.target.value)}
                                        disabled={step1Saved}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Business Type"
                                        options={BUSINESS_TYPE_OPTIONS}
                                        value={businessType}
                                        onChange={(val: string) => setBusinessType(val)}
                                        clearable={false}
                                        disabled={step1Saved}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Nature of Business*"
                                        options={NATURE_OF_BUSINESS_OPTIONS}
                                        value={natureOfBusiness}
                                        onChange={(val: string) => setNatureOfBusiness(val)}
                                        clearable={false}
                                        disabled={step1Saved}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Trade Type*"
                                        options={TRADE_TYPE_OPTIONS}
                                        value={tradeType}
                                        onChange={(val: string) => setTradeType(val)}
                                        clearable={false}
                                        disabled={step1Saved}
                                    />
                                </div>
                            </div>
                            <FileUpload
                                variant="default"
                                placeholder="Proof of Legal Account*"
                                description="Drag & Drop files here or, click to Browse"
                                helperText="Supported file types: PDF, JPEG, JPG"
                                accept=".pdf,.jpeg,.jpg"
                                value={proofFiles}
                                onChange={(files: any[]) => setProofFiles(files)}
                                disabled={step1Saved}
                            />
                        </>
                    )}
                </div>

                {showForm && !step1Saved && (
                    <>
                        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                resetOrgForm();
                                setStep1Saved(false); setStep2Saved(false); setStep3Saved(false);
                                setContactEmail(''); setContactDuplicateState('idle');
                                resetContactForm();
                                resetAddressForm();
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
        country, taxNumber, orgDuplicateState,
        legalName, businessName, businessType, natureOfBusiness, tradeType, proofFiles,
        step1Saved,
        handleOrgCheck, handleOrgEdit, resetOrgForm, resetContactForm, resetAddressForm,
    ]);

    const contactContent = useMemo(() => {
        const canContactCheck = isValidEmail(contactEmail) && contactDuplicateState === 'idle';
        const contactShowForm = contactDuplicateState === 'unique' || contactDuplicateState === 'enterprise';
        const isEnterpriseContact = contactDuplicateState === 'enterprise';
        const canSave = contactShowForm && contactName.trim() !== '' && phone.trim() !== '';

        const statusChip = contactShowForm ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 12px 4px 4px', borderRadius: 32, background: 'var(--theme-color-success-20)', alignSelf: 'flex-start' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--theme-color-success-40)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Success width={10} height={10} color="var(--theme-color-success-120)" />
                </div>
                <span style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-success-120)', whiteSpace: 'nowrap' }}>
                    {isEnterpriseContact
                        ? 'Contact exists in enterprise directory, will be linked to this organisation.'
                        : 'Email ID is unique.'}
                </span>
            </div>
        ) : null;

        const duplicateAlert = contactDuplicateState === 'duplicate' ? (
            <div style={{ background: 'var(--theme-color-pure-100)', border: '1px solid var(--theme-color-error-40)', borderRadius: 8, padding: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ paddingTop: 2, flexShrink: 0 }}>
                    <InfoCircle width={14} height={14} color="var(--theme-color-error-120)" />
                </div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--theme-color-error-120)' }}>
                        Contact already added for this customer
                    </div>
                    <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--theme-color-grey-50)', marginTop: 2 }}>
                        A contact with the same Email ID already exists for this customer and cannot be added again. Update the Email ID to add a different contact.
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
                        {statusChip}
                        {duplicateAlert}
                    </div>

                    {contactShowForm && (
                        <>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Contact Name*"
                                        value={contactName}
                                        onChange={(e: any) => setContactName(e.target.value)}
                                        disabled={isEnterpriseContact || step2Saved}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Work Scope"
                                        options={WORK_SCOPE_OPTIONS}
                                        value={workScope}
                                        onChange={(val: string) => setWorkScope(val)}
                                        clearable={false}
                                        disabled={step2Saved}
                                    />
                                </div>
                            </div>
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
                                            placeholder="Phone Number*"
                                            value={phone}
                                            onChange={(e: any) => setPhone(e.target.value.replace(/\D/g, ''))}
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
                                            placeholder="Alternate Phone"
                                            value={altPhone}
                                            onChange={(e: any) => setAltPhone(e.target.value.replace(/\D/g, ''))}
                                            disabled={step2Saved}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Alternate Email ID"
                                        value={altEmail}
                                        onChange={(e: any) => setAltEmail(e.target.value)}
                                        error={altEmail.trim() !== '' && !isValidEmail(altEmail)}
                                        disabled={step2Saved}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Tags"
                                        options={CONTACT_TAGS_OPTIONS}
                                        mode="multiple"
                                        value={contactTags}
                                        onChange={(val: string[]) => setContactTags(val)}
                                        clearable={false}
                                        disabled={step2Saved}
                                    />
                                </div>
                            </div>
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
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => {
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
        contactEmail, contactDuplicateState,
        contactName, workScope, phoneCode, phone, altPhoneCode, altPhone, altEmail, contactTags,
        step2Saved,
        handleContactCheck, handleContactEdit, resetContactForm,
    ]);

    const billingAddressContent = useMemo(() => {
        const canSave =
            addrName.trim() !== '' &&
            addrCountry !== '' &&
            addrType.length > 0 &&
            gstNumber.trim() !== '' &&
            addrLine1.trim() !== '' &&
            addrState !== '' &&
            addrCity !== '' &&
            timezone !== '' &&
            (!isSEZ || sezFiles.length > 0);

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
                                placeholder="Address Type*"
                                options={ADDRESS_TYPE_OPTIONS}
                                mode="multiple"
                                value={addrType}
                                onChange={(val: string[]) => setAddrType(val)}
                                clearable={false}
                                disabled={step3Saved}
                            />
                        </div>
                    </div>
                    <Input
                        placeholder="GST Number*"
                        value={gstNumber}
                        onChange={(e: any) => setGstNumber(e.target.value)}
                        disabled={step3Saved}
                    />
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
                            placeholder="SEZ Proof*"
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
                                placeholder="State*"
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
                    <Select
                        placeholder="Timezone*"
                        options={TIMEZONE_OPTIONS}
                        value={timezone}
                        onChange={(val: string) => setTimezone(val)}
                        clearable={false}
                        disabled={step3Saved}
                    />
                </div>

                {!step3Saved && (
                    <>
                        <div style={{ borderTop: '1px solid var(--theme-color-grey-10)', width: '100%' }} />
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <Button variant="secondary" size="md" style={{ width: 120 }} onClick={() => {
                                resetAddressForm();
                                setStep3Saved(false);
                            }}>
                                Reset
                            </Button>
                            <Button variant="primary" size="md" style={{ width: 120 }} disabled={!canSave} onClick={() => {
                                setStep3Saved(true);
                                setActiveKeys([]);
                            }}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }, [
        addrName, addrCountry, addrType, gstNumber,
        addrLine1, addrLine2, addrState, addrCity, timezone,
        isSEZ, sezFiles,
        step3Saved,
        resetAddressForm,
    ]);

    const collapseItems = useMemo(() => [
        {
            key: '1',
            label: 'Customer Organisation Details',
            subLabel: 'Organisation identity, tax registration, and legal documentation.',
            completed: step1Saved,
            suffix: step1Saved ? (
                <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep1Edit}>
                    Edit
                </Button>
            ) : null,
            children: orgDetailsContent,
        },
        {
            key: '2',
            label: 'Contact',
            subLabel: 'Primary contact for this customer. Will act as the default POC.',
            disabled: !step1Saved,
            completed: step2Saved,
            suffix: step2Saved ? (
                <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep2Edit}>
                    Edit
                </Button>
            ) : null,
            children: contactContent,
        },
        {
            key: '3',
            label: 'Billing Address',
            subLabel: 'Billing address used for invoicing and tax purposes.',
            disabled: !step2Saved,
            completed: step3Saved,
            suffix: step3Saved ? (
                <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={onStep3Edit}>
                    Edit
                </Button>
            ) : null,
            children: billingAddressContent,
        },
    ], [
        step1Saved, step2Saved, step3Saved,
        orgDetailsContent, contactContent, billingAddressContent,
        onStep1Edit, onStep2Edit, onStep3Edit,
    ]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>Add Customer</Button>

            <Drawer
                open={drawerOpen}
                onClose={handleClose}
                width={720}
                title="Add Customer"
                subtitle="Add details to create a new customer"
                icon={Building}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" disabled={!(step1Saved && step2Saved && step3Saved)}>
                            Create Customer
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
        </div>
    );
}

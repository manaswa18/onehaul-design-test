'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Text from '@/components/Text';
import ButtonComponent from '@/components/Button';
import InputComponent from '@/components/Input';
import Avatar from '@/components/Avatar';
import TabsComponent from '@/components/Tabs';
import TableComponent from '@/components/Table';
import ChipsComponent from '@/components/Chips';
import { Search, Add, HelpIcon, NotificationIcon, DocIcon, Chevrondown, FilterIcon, ListIcon } from '@/icons';
import CreateShipmentDrawer from './CreateShipmentDrawer';
import './shipments.css';

const Tabs = TabsComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;
const Table = TableComponent as React.ComponentType<any>;
const Input = InputComponent as React.ComponentType<any>;
const Chips = ChipsComponent as React.ComponentType<any>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TaskMeta {
  count: number;
  urgency: 'overdue' | 'due-today' | 'due-week';
}

interface NextEvent {
  label: string;
  urgency: 'overdue' | 'due-today' | null;
}

interface Shipment {
  id: string;
  shipmentNo: string;
  client: string;
  poc: string;
  carrier: string;
  carrierRef: string;
  origin: string;
  destination: string;
  pol: string;
  pod: string;
  originPin: string;
  etd: string;
  eta: string;
  transitDays: number;
  containers: string;
  commodity: string;
  weight: string;
  stage: string;
  bookingStatus: string;
  lastMilestone: string;
  nextEvent: NextEvent | null;
  tasks: TaskMeta | null;
  isMyShipment: boolean;
  lastUpdated: string;
  lastUpdatedBy: string;
  dateCreated: string;
  dateCreatedBy: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    shipmentNo: 'ONH-2026-04821',
    client: 'Techno Exports Ltd',
    poc: 'Daniel Hughes',
    carrier: 'MSC',
    carrierRef: 'MSCUUK987654',
    origin: 'Shanghai, CN',
    destination: 'Rotterdam, NL',
    pol: 'CNSHA',
    pod: 'NLRTM',
    originPin: '200000',
    etd: '15 May 2026',
    eta: '20 Jun 2026',
    transitDays: 36,
    containers: '3 × 40GP',
    commodity: 'Electronics & Consumer Goods',
    weight: '24MT',
    stage: 'In Transit',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Departed POL • 15 May',
    nextEvent: { label: 'ETA in 10 days', urgency: null },
    tasks: null,
    isMyShipment: true,
    lastUpdated: '15/05/26',
    lastUpdatedBy: 'Sahil Kala',
    dateCreated: '10/04/26',
    dateCreatedBy: 'Priya Sharma',
  },
  {
    id: '2',
    shipmentNo: 'ONH-2026-04820',
    client: 'Global Traders Inc',
    poc: 'Sarah Johnson',
    carrier: 'Maersk',
    carrierRef: 'PENDING',
    origin: 'Dubai, AE',
    destination: 'Hamburg, DE',
    pol: 'AEDXB',
    pod: 'DEHAM',
    originPin: '00000',
    etd: '02 Jun 2026',
    eta: '18 Jul 2026',
    transitDays: 46,
    containers: '1 × 20GP',
    commodity: 'Textiles & Apparel',
    weight: '8MT',
    stage: 'Pre-Shipment',
    bookingStatus: 'RECEIVED',
    lastMilestone: 'Booking Confirmed • 28 May',
    nextEvent: { label: 'SI Cutoff — Today', urgency: 'due-today' },
    tasks: { count: 2, urgency: 'overdue' },
    isMyShipment: false,
    lastUpdated: '02/06/26',
    lastUpdatedBy: 'Rahul Menon',
    dateCreated: '15/05/26',
    dateCreatedBy: 'Rahul Menon',
  },
  {
    id: '3',
    shipmentNo: 'ONH-2026-04819',
    client: 'Sunrise Manufacturing',
    poc: 'Ahmed Khan',
    carrier: 'Hapag-Lloyd',
    carrierRef: 'HLCUBN2026041',
    origin: 'Karachi, PK',
    destination: 'Felixstowe, GB',
    pol: 'PKKAR',
    pod: 'GBFXT',
    originPin: '74000',
    etd: '08 Jun 2026',
    eta: '25 Jul 2026',
    transitDays: 47,
    containers: '2 × 40GP, 1 × 20GP',
    commodity: 'Surgical Instruments',
    weight: '18MT',
    stage: 'Booking Confirmed',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'VGM Submitted • 03 Jun',
    nextEvent: { label: 'VGM Cutoff Overdue', urgency: 'overdue' },
    tasks: { count: 1, urgency: 'overdue' },
    isMyShipment: true,
    lastUpdated: '08/06/26',
    lastUpdatedBy: 'Priya Sharma',
    dateCreated: '20/05/26',
    dateCreatedBy: 'Priya Sharma',
  },
  {
    id: '4',
    shipmentNo: 'ONH-2026-04818',
    client: 'Prime Commodities LLC',
    poc: 'Nihal Perera',
    carrier: 'CMA CGM',
    carrierRef: 'CMADUB0049182',
    origin: 'Colombo, LK',
    destination: 'Los Angeles, US',
    pol: 'LKCMB',
    pod: 'USLAX',
    originPin: '10000',
    etd: '12 Jun 2026',
    eta: '05 Jul 2026',
    transitDays: 23,
    containers: '5 × 40HC',
    commodity: 'Tea & Spices',
    weight: '45MT',
    stage: 'Cargo Ready',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Cargo Arrived at CFS • 10 Jun',
    nextEvent: { label: 'Gate Cutoff in 2 days', urgency: null },
    tasks: { count: 1, urgency: 'due-week' },
    isMyShipment: true,
    lastUpdated: '10/06/26',
    lastUpdatedBy: 'Aisha Malik',
    dateCreated: '28/05/26',
    dateCreatedBy: 'Aisha Malik',
  },
  {
    id: '5',
    shipmentNo: 'ONH-2026-04817',
    client: 'Heritage Exports Pvt Ltd',
    poc: 'Kavya Nair',
    carrier: 'COSCO',
    carrierRef: 'COSU6042817340',
    origin: 'Mumbai, IN',
    destination: 'Antwerp, BE',
    pol: 'INBOM',
    pod: 'BEANR',
    originPin: '400001',
    etd: '20 Jun 2026',
    eta: '10 Aug 2026',
    transitDays: 51,
    containers: '2 × 40GP',
    commodity: 'Pharmaceuticals',
    weight: '12MT',
    stage: 'Booking Requested',
    bookingStatus: 'PENDING_UPDATE',
    lastMilestone: 'Booking Requested • 05 Jun',
    nextEvent: { label: 'Awaiting Confirmation', urgency: null },
    tasks: null,
    isMyShipment: false,
    lastUpdated: '05/06/26',
    lastUpdatedBy: 'Sahil Kala',
    dateCreated: '18/05/26',
    dateCreatedBy: 'Sahil Kala',
  },
  {
    id: '6',
    shipmentNo: 'ONH-2026-04816',
    client: 'BlueStar Trading Co',
    poc: 'Wei Zhang',
    carrier: 'MSC',
    carrierRef: 'MSCYYZ662233',
    origin: 'Guangzhou, CN',
    destination: 'Jebel Ali, AE',
    pol: 'CNGZH',
    pod: 'AEJEA',
    originPin: '510000',
    etd: '01 Jun 2026',
    eta: '22 Jun 2026',
    transitDays: 21,
    containers: '1 × 40HC',
    commodity: 'Machinery Parts',
    weight: '10MT',
    stage: 'On the Water',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Transshipment at Colombo • 12 Jun',
    nextEvent: { label: 'ETA in 10 days', urgency: null },
    tasks: null,
    isMyShipment: false,
    lastUpdated: '12/06/26',
    lastUpdatedBy: 'Rahul Menon',
    dateCreated: '22/05/26',
    dateCreatedBy: 'Priya Sharma',
  },
  {
    id: '7',
    shipmentNo: 'ONH-2026-04815',
    client: 'Summit Industries',
    poc: 'Rajan Pillai',
    carrier: 'Maersk',
    carrierRef: 'MAEU9987001',
    origin: 'Chennai, IN',
    destination: 'Sydney, AU',
    pol: 'INMAA',
    pod: 'AUSYD',
    originPin: '600001',
    etd: '28 May 2026',
    eta: '30 Jun 2026',
    transitDays: 33,
    containers: '3 × 20GP',
    commodity: 'Auto Components',
    weight: '22MT',
    stage: 'In Transit',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Departed Colombo • 05 Jun',
    nextEvent: { label: 'ETA in 24 days', urgency: null },
    tasks: { count: 1, urgency: 'due-week' },
    isMyShipment: true,
    lastUpdated: '05/06/26',
    lastUpdatedBy: 'Priya Sharma',
    dateCreated: '15/05/26',
    dateCreatedBy: 'Aisha Malik',
  },
  {
    id: '8',
    shipmentNo: 'ONH-2026-04814',
    client: 'Nexus Global Freight',
    poc: 'Lisa Tan',
    carrier: 'Hapag-Lloyd',
    carrierRef: 'HLCUSYD220814',
    origin: 'Singapore, SG',
    destination: 'Durban, ZA',
    pol: 'SGSIN',
    pod: 'ZADUR',
    originPin: '018920',
    etd: '25 May 2026',
    eta: '28 Jun 2026',
    transitDays: 34,
    containers: '2 × 40GP',
    commodity: 'Plastic Resins',
    weight: '18MT',
    stage: 'Arrived at POD',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Vessel Arrived Durban • 28 Jun',
    nextEvent: { label: 'Customs Filing Due', urgency: 'due-today' },
    tasks: { count: 2, urgency: 'due-today' },
    isMyShipment: true,
    lastUpdated: '28/06/26',
    lastUpdatedBy: 'Aisha Malik',
    dateCreated: '20/05/26',
    dateCreatedBy: 'Aisha Malik',
  },
  {
    id: '9',
    shipmentNo: 'ONH-2026-04813',
    client: 'Falcon Freight Solutions',
    poc: 'James Wu',
    carrier: 'CMA CGM',
    carrierRef: 'CMAXXI009813',
    origin: 'Qingdao, CN',
    destination: 'Valencia, ES',
    pol: 'CNTAO',
    pod: 'ESVLC',
    originPin: '266000',
    etd: '18 May 2026',
    eta: '20 Jun 2026',
    transitDays: 33,
    containers: '4 × 40HC',
    commodity: 'Steel Pipes & Tubes',
    weight: '36MT',
    stage: 'Clearance & Delivery',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Customs Cleared • 22 Jun',
    nextEvent: { label: 'Final Delivery Today', urgency: 'due-today' },
    tasks: null,
    isMyShipment: false,
    lastUpdated: '22/06/26',
    lastUpdatedBy: 'Rahul Menon',
    dateCreated: '10/05/26',
    dateCreatedBy: 'Sahil Kala',
  },
  {
    id: '10',
    shipmentNo: 'ONH-2026-04812',
    client: 'TechNova Supplies',
    poc: 'Park Ji-won',
    carrier: 'COSCO',
    carrierRef: 'COSUQD88120291',
    origin: 'Busan, KR',
    destination: 'Genoa, IT',
    pol: 'KRPUS',
    pod: 'ITGOA',
    originPin: '46051',
    etd: '10 Jun 2026',
    eta: '08 Jul 2026',
    transitDays: 28,
    containers: '1 × 40GP',
    commodity: 'Semiconductor Equipment',
    weight: '5MT',
    stage: 'Booking Confirmed',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'BL Issued • 09 Jun',
    nextEvent: { label: 'ETD in 0 days', urgency: null },
    tasks: null,
    isMyShipment: true,
    lastUpdated: '09/06/26',
    lastUpdatedBy: 'Priya Sharma',
    dateCreated: '25/05/26',
    dateCreatedBy: 'Priya Sharma',
  },
  {
    id: '11',
    shipmentNo: 'ONH-2026-04811',
    client: 'Eastern Logistics Pvt',
    poc: 'Fahad Mirza',
    carrier: 'MSC',
    carrierRef: 'MSCPAK441200',
    origin: 'Port Qasim, PK',
    destination: 'Rotterdam, NL',
    pol: 'PKPQZ',
    pod: 'NLRTM',
    originPin: '75010',
    etd: '05 Jun 2026',
    eta: '20 Jul 2026',
    transitDays: 45,
    containers: '2 × 20GP, 1 × 40HC',
    commodity: 'Sporting Goods',
    weight: '16MT',
    stage: 'Pre-Shipment',
    bookingStatus: 'PENDING_AMENDMENT',
    lastMilestone: 'Amendment Requested • 03 Jun',
    nextEvent: { label: 'BL Draft Due Tomorrow', urgency: null },
    tasks: { count: 1, urgency: 'due-week' },
    isMyShipment: false,
    lastUpdated: '03/06/26',
    lastUpdatedBy: 'Sahil Kala',
    dateCreated: '12/05/26',
    dateCreatedBy: 'Rahul Menon',
  },
  {
    id: '12',
    shipmentNo: 'ONH-2026-04810',
    client: 'Archway Distributors',
    poc: 'Ananya Roy',
    carrier: 'Maersk',
    carrierRef: 'PENDING',
    origin: 'Nhava Sheva, IN',
    destination: 'New York, US',
    pol: 'INNSA',
    pod: 'USNYC',
    originPin: '400707',
    etd: '22 Jun 2026',
    eta: '25 Jul 2026',
    transitDays: 33,
    containers: '6 × 40HC',
    commodity: 'Home Furnishings',
    weight: '52MT',
    stage: 'Booking Initiated',
    bookingStatus: 'RECEIVED',
    lastMilestone: 'Booking Initiated • 04 Jun',
    nextEvent: { label: 'Confirmation Pending', urgency: null },
    tasks: null,
    isMyShipment: true,
    lastUpdated: '04/06/26',
    lastUpdatedBy: 'Aisha Malik',
    dateCreated: '28/05/26',
    dateCreatedBy: 'Aisha Malik',
  },
  {
    id: '13',
    shipmentNo: 'ONH-2026-04809',
    client: 'Global Traders Inc',
    poc: 'Emma Fischer',
    carrier: 'Hapag-Lloyd',
    carrierRef: 'HLCUHAM220809',
    origin: 'Hamburg, DE',
    destination: 'Auckland, NZ',
    pol: 'DEHAM',
    pod: 'NZAKL',
    originPin: '20457',
    etd: '14 May 2026',
    eta: '18 Jun 2026',
    transitDays: 35,
    containers: '1 × 20GP',
    commodity: 'Chemical Compounds',
    weight: '6MT',
    stage: 'Completed',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Delivery Confirmed • 19 Jun',
    nextEvent: null,
    tasks: null,
    isMyShipment: false,
    lastUpdated: '19/06/26',
    lastUpdatedBy: 'Rahul Menon',
    dateCreated: '05/05/26',
    dateCreatedBy: 'Priya Sharma',
  },
  {
    id: '14',
    shipmentNo: 'ONH-2026-04808',
    client: 'Coastal Cargo Ltd',
    poc: 'Omar Al-Rashid',
    carrier: 'CMA CGM',
    carrierRef: 'CMADXB1120808',
    origin: 'Jebel Ali, AE',
    destination: 'Mombasa, KE',
    pol: 'AEJEA',
    pod: 'KEMBA',
    originPin: '00000',
    etd: '30 May 2026',
    eta: '15 Jun 2026',
    transitDays: 16,
    containers: '2 × 40GP',
    commodity: 'FMCG Products',
    weight: '14MT',
    stage: 'In Transit',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Departed Jebel Ali • 30 May',
    nextEvent: { label: 'ETA in 15 days', urgency: null },
    tasks: null,
    isMyShipment: true,
    lastUpdated: '30/05/26',
    lastUpdatedBy: 'Sahil Kala',
    dateCreated: '18/05/26',
    dateCreatedBy: 'Sahil Kala',
  },
  {
    id: '15',
    shipmentNo: 'ONH-2026-04807',
    client: 'Prime Commodities LLC',
    poc: 'Chen Mei',
    carrier: 'COSCO',
    carrierRef: 'COSUSHA980807',
    origin: 'Shanghai, CN',
    destination: 'Chittagong, BD',
    pol: 'CNSHA',
    pod: 'BDCGP',
    originPin: '200000',
    etd: '07 Jun 2026',
    eta: '28 Jun 2026',
    transitDays: 21,
    containers: '3 × 40GP, 2 × 20GP',
    commodity: 'Raw Cotton',
    weight: '28MT',
    stage: 'Cargo Ready',
    bookingStatus: 'CONFIRMED',
    lastMilestone: 'Cargo Stuffed at Depot • 05 Jun',
    nextEvent: { label: 'Gate Cutoff Tomorrow', urgency: null },
    tasks: { count: 1, urgency: 'due-week' },
    isMyShipment: false,
    lastUpdated: '05/06/26',
    lastUpdatedBy: 'Priya Sharma',
    dateCreated: '22/05/26',
    dateCreatedBy: 'Aisha Malik',
  },
];

// ─── Needs Attention items ────────────────────────────────────────────────────

const ATTENTION_ITEMS = [
  { shipmentNo: 'ONH-2026-04820', client: 'Global Traders Inc', route: 'Dubai → Hamburg', task: 'SI Cutoff — Due Today', urgency: 'due-today' as const },
  { shipmentNo: 'ONH-2026-04819', client: 'Sunrise Manufacturing', route: 'Karachi → Felixstowe', task: 'VGM Cutoff Overdue by 1 day', urgency: 'overdue' as const },
  { shipmentNo: 'ONH-2026-04814', client: 'Nexus Global Freight', route: 'Singapore → Durban', task: 'Customs Filing Due Today', urgency: 'due-today' as const },
];

// ─── Tabulator formatters (return HTML strings) ───────────────────────────────

const CARRIER_COLORS: Record<string, string> = {
  MSC: '#0080C9',
  Maersk: '#00243D',
  'Hapag-Lloyd': '#E84A0C',
  'CMA CGM': '#C8102E',
  COSCO: '#B22234',
};

const STAGE_STYLES: Record<string, { bg: string; color: string }> = {
  'Booking Initiated':    { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' },
  'Booking Requested':    { bg: 'var(--theme-color-yellow-20)', color: 'var(--theme-color-yellow-120)' },
  'Booking Confirmed':    { bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)' },
  'Pre-Shipment':         { bg: 'var(--theme-color-orange-20)', color: 'var(--theme-color-orange-120)' },
  'Cargo Ready':          { bg: 'var(--theme-color-orange-20)', color: 'var(--theme-color-orange-120)' },
  'On the Water':         { bg: 'var(--theme-color-primary-10)', color: 'var(--theme-color-primary-60)' },
  'In Transit':           { bg: 'var(--theme-color-primary-10)', color: 'var(--theme-color-primary-60)' },
  'Arrived at POD':       { bg: 'var(--theme-color-success-40)', color: 'var(--theme-color-success-120)' },
  'Clearance & Delivery': { bg: 'var(--theme-color-purple-20)', color: 'var(--theme-color-purple-100)' },
  'Completed':            { bg: 'var(--theme-color-success-40)', color: 'var(--theme-color-success-120)' },
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  RECEIVED:          { bg: 'var(--theme-color-yellow-20)', color: 'var(--theme-color-yellow-120)' },
  CONFIRMED:         { bg: 'var(--theme-color-success-20)', color: 'var(--theme-color-success-120)' },
  PENDING_UPDATE:    { bg: 'var(--theme-color-orange-20)', color: 'var(--theme-color-orange-120)' },
  PENDING_AMENDMENT: { bg: 'var(--theme-color-orange-20)', color: 'var(--theme-color-orange-120)' },
  DECLINED:          { bg: 'var(--theme-color-error-20)', color: 'var(--theme-color-error-100)' },
  CANCELLED:         { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' },
};

// SeaFclFreight icon — SVG paths extracted from @onehaul/ui/dist/icons/dual-tone
const SHIP_SVG = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.951 2.38446H3.3958C3.28534 2.38446 3.1958 2.474 3.1958 2.58446V3.46435C3.1958 3.57481 3.28534 3.66435 3.3958 3.66435H3.951C4.06145 3.66435 4.151 3.57481 4.151 3.46435V2.58446C4.151 2.474 4.06145 2.38446 3.951 2.38446Z" fill="var(--theme-color-grey-30)"/><path d="M6.28645 2.38446H5.73125C5.62079 2.38446 5.53125 2.474 5.53125 2.58446V3.46435C5.53125 3.57481 5.62079 3.66435 5.73125 3.66435H6.28645C6.3969 3.66435 6.48645 3.57481 6.48645 3.46435V2.58446C6.48645 2.474 6.3969 2.38446 6.28645 2.38446Z" fill="var(--theme-color-grey-30)"/><path d="M7.80556 1.97095C7.88378 1.97095 7.94719 1.90754 7.94719 1.82932C7.94719 1.7511 7.88378 1.68769 7.80556 1.68769H6.60201C6.49155 1.68769 6.40201 1.59814 6.40201 1.48769V1.2C6.40201 1.08954 6.31246 1 6.20201 1H5.81552C5.70507 1 5.61552 1.08954 5.61552 1.2V1.48769C5.61552 1.59814 5.52598 1.68769 5.41552 1.68769H4.21195C4.13372 1.68769 4.07031 1.7511 4.07031 1.82932C4.07031 1.90754 4.13372 1.97095 4.21194 1.97095H4.32192C4.43238 1.97095 4.52192 2.06049 4.52192 2.17095V2.30507C4.52192 2.34881 4.48646 2.38426 4.44273 2.38426C4.39899 2.38426 4.36353 2.41972 4.36353 2.46346V3.46415C4.36353 3.57461 4.45307 3.66415 4.56353 3.66415H5.11873C5.22918 3.66415 5.31873 3.57461 5.31873 3.46415V2.58426C5.31873 2.47381 5.22918 2.38426 5.11873 2.38426H4.95972C4.87314 2.38426 4.80295 2.31407 4.80295 2.22749C4.80295 2.14091 4.87314 2.07072 4.95972 2.07072H7.05781C7.1444 2.07072 7.21459 2.14091 7.21459 2.22749C7.21459 2.31407 7.1444 2.38426 7.05781 2.38426H6.89881C6.78835 2.38426 6.69881 2.47381 6.69881 2.58426V3.46415C6.69881 3.57461 6.78835 3.66415 6.89881 3.66415H7.454C7.56446 3.66415 7.654 3.57461 7.654 3.46415V2.46345C7.654 2.41972 7.61855 2.38426 7.57482 2.38426C7.53109 2.38426 7.49563 2.34881 7.49563 2.30508V2.17095C7.49563 2.06049 7.58518 1.97095 7.69563 1.97095H7.80556Z" fill="var(--theme-color-grey-30)"/><path d="M8.6219 2.38446H8.0667C7.95624 2.38446 7.8667 2.474 7.8667 2.58446V3.46435C7.8667 3.57481 7.95624 3.66435 8.0667 3.66435H8.6219C8.73235 3.66435 8.8219 3.57481 8.8219 3.46435V2.58446C8.8219 2.474 8.73235 2.38446 8.6219 2.38446Z" fill="var(--theme-color-grey-30)"/><path d="M7.8846 5.07507C8.13035 5.15705 8.34946 5.23825 8.54099 5.31455C8.67458 5.36778 8.82194 5.27068 8.82194 5.12687V4.04573C8.82194 3.93528 8.7324 3.84573 8.62194 3.84573H8.0667C7.95624 3.84573 7.8667 3.93528 7.8667 4.04573V5.05039C7.8667 5.06161 7.87397 5.07146 7.8846 5.07507Z" fill="var(--theme-color-grey-30)"/><path d="M6.54577 8.66549C6.97873 8.5297 7.1095 8.52025 7.57143 8.66549C8.02917 8.81063 8.20865 8.81063 8.66036 8.66549C8.67753 8.65995 8.68961 8.64481 8.6907 8.6268C8.7052 8.38722 8.74461 7.91733 8.84767 7.37998C8.92976 6.95189 9.03724 6.55586 9.11933 6.28045C9.1869 6.05376 9.09653 5.8082 8.88361 5.70515C8.63126 5.58301 8.24943 5.41535 7.74967 5.2444C7.39813 5.12412 7.01841 5.02956 6.70443 4.96151C6.40211 4.896 6.12402 5.13135 6.12402 5.44068V8.33239C6.12402 8.56373 6.32516 8.73517 6.54577 8.66549ZM6.69489 5.94386C6.76431 5.78198 6.89167 5.67403 6.97941 5.70286C7.06707 5.7316 7.08191 5.88612 7.01243 6.048C6.94311 6.20987 6.81565 6.31788 6.72801 6.28905C6.6403 6.26031 6.62555 6.10578 6.69489 5.94386Z" fill="var(--theme-color-primary-100)"/><path d="M9.68544 10.2155C9.24635 10.075 9.09903 10.075 8.66043 10.2155C8.2087 10.3608 8.02923 10.3608 7.57151 10.2155C7.10958 10.0704 6.9788 10.0798 6.54584 10.2155C6.08614 10.3608 5.90825 10.3608 5.45688 10.2155C5.01725 10.075 4.87086 10.075 4.43131 10.2155C3.97974 10.3608 3.80041 10.3608 3.34239 10.2155C3.11931 10.1453 2.94502 10.1094 2.82436 10.1094C2.71071 10.1094 2.54008 10.1453 2.31651 10.2155C2.27137 10.2299 2.22821 10.2426 2.18697 10.2538C1.98092 10.3099 1.81201 10.4879 1.81201 10.7014V10.9741C1.8128 10.9863 1.82594 10.9937 1.83717 10.989C1.92288 10.9525 2.08492 10.9171 2.28831 10.8533C2.75876 10.7042 2.92619 10.7125 3.37145 10.8533C3.80532 10.9896 3.93713 10.9991 4.39747 10.8533C4.85467 10.708 5.03181 10.708 5.49189 10.8533C5.95169 10.9985 6.08331 10.9896 6.51795 10.8533C6.9623 10.7112 7.12875 10.7037 7.60067 10.8533C8.03234 10.9896 8.16435 10.9985 8.62664 10.8533C9.08454 10.708 9.26385 10.708 9.71537 10.8533C9.77529 10.8726 9.83174 10.8893 9.88461 10.9033C10.0449 10.9458 10.1854 10.8182 10.1864 10.6523C10.1874 10.477 10.0312 10.3168 9.8624 10.2695C9.80757 10.2541 9.74836 10.2359 9.68544 10.2155Z" fill="var(--theme-color-primary-100)"/><path d="M9.68544 9.11068C9.24635 8.97022 9.09903 8.97022 8.66043 9.11068C8.2087 9.25591 8.02923 9.25591 7.57151 9.11068C7.10958 8.96544 6.9788 8.97494 6.54585 9.11068C6.08614 9.25591 5.90825 9.25591 5.45688 9.11068C5.01725 8.97022 4.87086 8.97022 4.43131 9.11068C3.97975 9.25591 3.80041 9.25591 3.34239 9.11068C3.11931 9.04045 2.94502 9.00455 2.82436 9.00455C2.71071 9.00455 2.54008 9.04045 2.31651 9.11068C2.27137 9.12503 2.22821 9.13778 2.18697 9.14901C1.98092 9.2051 1.81201 9.38303 1.81201 9.59657V9.86927C1.8128 9.88144 1.82594 9.88891 1.83716 9.88414C1.92288 9.84766 2.08492 9.81227 2.28831 9.74845C2.75876 9.59937 2.92619 9.60763 3.37145 9.74845C3.80532 9.88479 3.93713 9.89424 4.39747 9.74845C4.85467 9.60323 5.03181 9.60323 5.49189 9.74845C5.95169 9.89359 6.08331 9.88479 6.51795 9.74845C6.9623 9.60635 7.12875 9.59883 7.60067 9.74845C8.03234 9.88479 8.16435 9.89359 8.62664 9.74845C9.08454 9.60323 9.26385 9.60323 9.71537 9.74845C9.76982 9.76602 9.82139 9.78139 9.87003 9.79458C10.0377 9.84003 10.1846 9.7062 10.1846 9.53249C10.1846 9.36612 10.0496 9.22038 9.88982 9.1741C9.82831 9.15628 9.76028 9.13487 9.68544 9.11068Z" fill="var(--theme-color-primary-100)"/><path d="M7.39558 4.92941C7.5249 4.96404 7.65393 4.86784 7.65393 4.73397V4.04573C7.65393 3.93528 7.56438 3.84573 7.45393 3.84573H6.89873C6.78827 3.84573 6.69873 3.93528 6.69873 4.04573V4.60249C6.69873 4.69732 6.76535 4.77896 6.85799 4.79925C7.02685 4.83624 7.2098 4.87967 7.39558 4.92941Z" fill="var(--theme-color-grey-30)"/><path d="M5.98943 4.64608C6.00862 4.64311 6.02794 4.64312 6.04713 4.64609C6.0837 4.65176 6.1536 4.6629 6.24839 4.67941C6.37207 4.70097 6.48645 4.60658 6.48645 4.48104V4.04573C6.48645 3.93528 6.3969 3.84573 6.28645 3.84573H5.73125C5.62079 3.84573 5.53125 3.93528 5.53125 4.04573V4.48428C5.53125 4.60996 5.64584 4.70438 5.76963 4.68263C5.87387 4.66431 5.9505 4.6521 5.98943 4.64608Z" fill="var(--theme-color-grey-30)"/><path d="M5.16 4.80336C5.2525 4.78296 5.31897 4.70139 5.31897 4.60666V4.04573C5.31897 3.93528 5.22942 3.84573 5.11897 3.84573H4.56377C4.45331 3.84573 4.36377 3.93528 4.36377 4.04573V4.739C4.36377 4.87307 4.49315 4.9693 4.62259 4.93439C4.80789 4.88441 4.99072 4.8407 5.16 4.80336Z" fill="var(--theme-color-grey-30)"/><path d="M4.01455 5.12173C4.09587 5.09358 4.151 5.01732 4.151 4.93126V4.04573C4.151 3.93528 4.06145 3.84573 3.951 3.84573H3.3958C3.28534 3.84573 3.1958 3.93528 3.1958 4.04573V5.13432C3.1958 5.27829 3.34348 5.37539 3.47714 5.32188C3.63691 5.25792 3.81626 5.19037 4.01455 5.12173Z" fill="var(--theme-color-grey-30)"/><path d="M3.32211 8.32256C3.34153 8.52968 3.47755 8.71803 3.68233 8.75468C3.92641 8.79838 4.10998 8.76865 4.43118 8.66539C4.87073 8.52488 5.01714 8.52488 5.45675 8.66539C5.68615 8.7392 5.89364 8.5599 5.89364 8.31892V5.44493C5.89364 5.1352 5.61484 4.89966 5.31224 4.96573C5.00211 5.03345 4.63088 5.12656 4.28678 5.2443C3.78702 5.41525 3.4052 5.5829 3.15284 5.70504C2.9399 5.8081 2.84954 6.05366 2.91711 6.28037C2.9992 6.55578 3.10669 6.95181 3.18878 7.37988C3.2581 7.74118 3.29861 8.07185 3.32211 8.32256ZM5.03814 5.70273C5.1259 5.6739 5.25323 5.78186 5.32265 5.94373C5.39197 6.10566 5.37729 6.26018 5.28951 6.28892C5.20186 6.31775 5.07446 6.20975 5.00514 6.04788C4.93563 5.88598 4.95047 5.73147 5.03814 5.70273Z" fill="var(--theme-color-primary-100)"/></svg>`;

// Trailer icon — SVG paths extracted from @onehaul/ui/dist/icons/dual-tone
const TRUCK_SVG = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7651 6.88276H10.9878C10.9692 6.62641 10.9302 6.37006 10.874 6.11908H10.7666L10.7651 6.88276Z" fill="#102B46"/><path d="M1 6.11882V7.23993C1 7.29364 1.04493 7.33856 1.1001 7.33856H1.40736C1.60456 7.33856 1.76586 7.19023 1.85111 7.0124C2.04057 6.61723 2.44414 6.34344 2.91261 6.34344C3.37915 6.34344 3.78295 6.61725 3.97257 7.01244C4.05788 7.19023 4.21919 7.33856 4.41639 7.33856H6.91252C7.13343 7.33856 7.31252 7.15948 7.31252 6.93856V6.1558C7.31252 6.13266 7.28829 6.11687 7.26515 6.11687L1.00146 6.11736C1.00066 6.11736 1 6.11801 1 6.11882ZM6.7364 7.00115H4.44152C4.36046 7.00115 4.29405 6.93474 4.29405 6.85223C4.29405 6.77117 4.36046 6.70476 4.44152 6.70476H6.7364C6.81746 6.70476 6.88387 6.77117 6.88387 6.85223C6.8824 6.93475 6.81648 7.00115 6.7364 7.00115Z" fill="#102B46"/><path d="M11 7.24023C11 7.20574 10.9706 7.1778 10.9361 7.1778H10.7662C10.6036 7.1778 10.4712 7.04547 10.4712 6.88287V6.12016C10.4712 5.95756 10.6036 5.82524 10.7662 5.82524C10.7825 5.82524 10.7943 5.80954 10.7897 5.79384C10.6143 5.20191 10.3362 4.64168 9.96245 4.14647L9.57866 3.63768C9.5601 3.61278 9.53129 3.59911 9.49858 3.59911H8.00645C7.78553 3.59911 7.60645 3.77819 7.60645 3.99911V7.16562C7.60645 7.26076 7.68357 7.33789 7.77871 7.33789C7.86363 7.33789 7.93456 7.27546 7.95808 7.19386C8.09952 6.7032 8.55258 6.34277 9.08741 6.34277C9.55473 6.34277 9.95901 6.61658 10.1488 7.01177C10.2341 7.18954 10.3955 7.33789 10.5927 7.33789H10.9014C10.9551 7.33789 11 7.29296 11 7.24023ZM8.4727 6.03424H8.19388C8.11283 6.03424 8.04642 5.96783 8.04642 5.88677C8.04642 5.80425 8.11283 5.73785 8.19388 5.73785H8.4727C8.55375 5.73785 8.62016 5.80425 8.62016 5.88677C8.6187 5.96783 8.55278 6.03424 8.4727 6.03424ZM8.69023 5.02544C8.47409 5.02544 8.29887 4.85022 8.29887 4.63408C8.29887 4.41794 8.47409 4.24272 8.69023 4.24272H8.90143C9.02714 4.24272 9.1452 4.30311 9.21877 4.40504C9.40558 4.66387 9.22064 5.02544 8.90143 5.02544H8.69023Z" fill="#102B46"/><path d="M2.9126 6.63756C2.4253 6.63756 2.03027 7.03405 2.03027 7.51989C2.03027 8.00622 2.42676 8.40125 2.9126 8.40125C3.39893 8.40125 3.79396 8.00476 3.79396 7.51989C3.79396 7.03259 3.39747 6.63756 2.9126 6.63756ZM2.9126 7.66638C2.83008 7.66638 2.76514 7.59997 2.76514 7.51891C2.76514 7.43786 2.83008 7.37145 2.9126 7.37145C2.99366 7.37145 3.06007 7.43786 3.06007 7.51891C3.0586 7.60144 2.99268 7.66638 2.9126 7.66638Z" fill="#D1D1D1"/><path d="M9.08741 6.63756C8.60108 6.63756 8.20605 7.03405 8.20605 7.51989C8.20605 8.00622 8.60254 8.40125 9.08741 8.40125C9.57471 8.40125 9.96974 8.00476 9.96974 7.51989C9.97023 7.03259 9.57521 6.63756 9.08741 6.63756ZM9.08741 7.66638C9.00635 7.66638 8.93995 7.59997 8.93995 7.51891C8.93995 7.43786 9.00635 7.37145 9.08741 7.37145C9.16993 7.37145 9.23487 7.43786 9.23487 7.51891C9.23487 7.60144 9.16993 7.66638 9.08741 7.66638Z" fill="#D1D1D1"/></svg>`;

function countryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '';
  const pts = [...countryCode.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...pts);
}

function shipmentNoFormatter(cell: any) {
  const val = cell.getValue();
  return `<span class="oh-cell-shipment-no">${val}</span>`;
}

function customerPocFormatter(cell: any) {
  const row = cell.getRow().getData();
  return `<div class="oh-cell-stack">
    <span class="primary">${row.client}</span>
    <span class="secondary">${row.poc}</span>
  </div>`;
}

function operatorFormatter(cell: any) {
  const carrier = cell.getValue();
  const bg = CARRIER_COLORS[carrier] || 'var(--theme-color-primary-60)';
  const abbr = carrier.substring(0, 3).toUpperCase();
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;">
    <div style="min-width:36px;height:22px;background:${bg};border-radius:3px;display:inline-flex;align-items:center;justify-content:center;padding:0 6px;">
      <span style="font-size:9px;font-weight:700;color:white;letter-spacing:0.5px;">${abbr}</span>
    </div>
    <span style="font-size:12px;color:var(--theme-color-grey-100);white-space:nowrap;">${carrier}</span>
  </div>`;
}

function routeDetailsFormatter(cell: any) {
  const row = cell.getRow().getData();
  const { origin, destination, pol, pod, originPin, weight, containers, commodity, transitDays } = row;
  const originCC = (origin as string).split(', ')[1] || '';
  const destCC = (destination as string).split(', ')[1] || '';
  const sep = `<span style="display:inline-block;width:10px;height:1px;background:var(--theme-color-grey-30);margin:0 1px;vertical-align:middle;flex-shrink:0;"></span>`;
  const shipMode = `<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:white;border:1px solid var(--theme-color-grey-30);border-radius:50%;flex-shrink:0;">${SHIP_SVG}</span>`;
  const truckMode = `<span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:var(--theme-color-grey-10);border-radius:50%;flex-shrink:0;">${TRUCK_SVG}</span>`;
  const pipe = `<span style="color:var(--theme-color-grey-40);margin:0 4px;">|</span>`;
  return `<div style="display:flex;flex-direction:column;gap:8px;padding:2px 0;min-width:0;">
    <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;white-space:nowrap;">
      <span style="font-size:18px;flex-shrink:0;">${countryFlag(originCC)}</span>
      <span style="font-size:16px;color:var(--theme-color-grey-70);flex-shrink:0;">${originPin}</span>
      ${sep}
      <span style="font-size:18px;font-weight:600;color:var(--theme-color-orange-120);flex-shrink:0;">${pol}</span>
      ${sep}${shipMode}${sep}
      <span style="font-size:18px;font-weight:600;color:var(--theme-color-orange-120);flex-shrink:0;">${pod}</span>
      ${truckMode}
      <span style="font-size:18px;flex-shrink:0;">${countryFlag(destCC)}</span>
    </div>
    <div style="border-top:1px dashed var(--theme-color-grey-30);width:100%;"></div>
    <div style="display:flex;align-items:center;flex-wrap:wrap;font-size:12px;color:var(--theme-color-grey-70);white-space:nowrap;">
      <span>${weight}; ${commodity}</span>${pipe}<span>${containers}</span>${pipe}<span>Direct shipment</span>${pipe}<span>${transitDays} days est. transit</span>
    </div>
  </div>`;
}

function carrierRefFormatter(cell: any) {
  const val = cell.getValue();
  if (val === 'PENDING') {
    return `<span class="oh-cell-muted">Pending</span>`;
  }
  return `<span class="oh-cell-text">${val}</span>`;
}

function estTransitTimeFormatter(cell: any) {
  const row = cell.getRow().getData();
  const { etd, eta, transitDays } = row;
  const months: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  };
  function fmtDate(d: string) {
    const parts = d.split(' ');
    if (parts.length === 3) {
      const [day, mon, year] = parts;
      return `${day.padStart(2, '0')}/${months[mon] || '??'}/${year.slice(2)}`;
    }
    return d;
  }
  return `<div class="oh-cell-stack">
    <span class="primary" style="font-weight:500;">${fmtDate(etd)} - ${fmtDate(eta)}</span>
    <span class="secondary">${transitDays} days</span>
  </div>`;
}

function lastUpdatedFormatter(cell: any) {
  const row = cell.getRow().getData();
  return `<div class="oh-cell-stack">
    <span class="primary">${row.lastUpdated}</span>
    <span class="secondary">by ${row.lastUpdatedBy}</span>
  </div>`;
}

function dateCreatedFormatter(cell: any) {
  const row = cell.getRow().getData();
  return `<div class="oh-cell-stack">
    <span class="primary">${row.dateCreated}</span>
    <span class="secondary">by ${row.dateCreatedBy}</span>
  </div>`;
}

function stageFormatter(cell: any) {
  const stage: string = cell.getValue();
  const s = STAGE_STYLES[stage] || { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' };
  return `<span class="oh-badge" style="background:${s.bg};color:${s.color};">${stage}</span>`;
}

function bookingStatusFormatter(cell: any) {
  const status: string = cell.getValue();
  const s = STATUS_STYLES[status] || { bg: 'var(--theme-color-grey-10)', color: 'var(--theme-color-grey-60)' };
  const label = status.replace(/_/g, ' ');
  return `<span class="oh-badge" style="background:${s.bg};color:${s.color};">${label}</span>`;
}

function milestoneFormatter(cell: any) {
  const val: string = cell.getValue();
  if (!val) return '<span style="color:var(--theme-color-grey-30);">—</span>';
  const [event, ts] = val.split(' • ');
  if (!ts) return `<span class="oh-cell-text">${val}</span>`;
  return `<div class="oh-cell-stack">
    <span class="primary">${event}</span>
    <span class="secondary">${ts}</span>
  </div>`;
}

function nextEventFormatter(cell: any) {
  const event = cell.getValue() as NextEvent | null;
  if (!event) return '<span style="color:var(--theme-color-grey-30);">—</span>';
  const color = event.urgency === 'overdue'
    ? 'var(--theme-color-error-100)'
    : event.urgency === 'due-today'
    ? 'var(--theme-color-orange-120)'
    : 'var(--theme-color-grey-100)';
  return `<span class="oh-cell-text" style="color:${color};font-weight:${event.urgency ? 500 : 400};">${event.label}</span>`;
}

function actionsFormatter() {
  return `<span class="oh-cell-center">
    <button type="button" class="ant-btn ant-btn-link onehaul-button onehaul-button-sm onehaul-button-link onehaul-icon-button" onclick="event.stopPropagation()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 12 12">
        <path fill="currentColor" d="M5.996 11q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881-.368.366-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881t.886-.365q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365m0-3.75q-.516 0-.881-.368a1.21 1.21 0 0 1-.365-.886q0-.516.368-.881T6.004 1q.516 0 .881.368t.365.886q0 .516-.368.881t-.886.365"/>
      </svg>
    </button>
  </span>`;
}

// ─── Checkbox helpers (design system Checkbox HTML for Tabulator formatters) ──

function checkboxHTML(checked: boolean, indeterminate = false) {
  const stateClass = checked ? ' checked' : indeterminate ? ' indeterminate' : '';
  return `<span class="oh-checkbox-cell"><span class="oh-cb${stateClass}"></span></span>`;
}

function updateHeaderCheckbox(table: any) {
  const rows = table.getRows();
  const sel = table.getSelectedRows();
  const allSelected = rows.length > 0 && sel.length === rows.length;
  const indeterminate = sel.length > 0 && sel.length < rows.length;
  const col = table.getColumns()[0];
  if (!col) return;
  const titleEl = col.getElement()?.querySelector('.tabulator-col-title');
  if (titleEl) titleEl.innerHTML = checkboxHTML(allSelected, indeterminate);
}

// ─── Column definitions ───────────────────────────────────────────────────────

const COLUMNS = [
  {
    formatter: (cell: any) => checkboxHTML(cell.getRow().isSelected()),
    titleFormatter: (cell: any) => {
      const rows = cell.getTable().getRows();
      const sel = cell.getTable().getSelectedRows();
      return checkboxHTML(sel.length === rows.length && rows.length > 0, sel.length > 0 && sel.length < rows.length);
    },
    cellClick: (e: any, cell: any) => {
      e.stopPropagation();
      const row = cell.getRow();
      row.isSelected() ? row.deselect() : row.select();
      const cb = cell.getElement()?.querySelector('.oh-cb');
      if (cb) cb.className = `oh-cb${row.isSelected() ? ' checked' : ''}`;
      updateHeaderCheckbox(cell.getTable());
    },
    headerClick: (e: any, column: any) => {
      const table = column.getTable();
      const allSelected = table.getSelectedRows().length === table.getRows().length && table.getRows().length > 0;
      allSelected ? table.deselectRow() : table.selectRow();
      column.getCells().forEach((c: any) => {
        const cb = c.getElement()?.querySelector('.oh-cb');
        if (cb) cb.className = `oh-cb${c.getRow().isSelected() ? ' checked' : ''}`;
      });
      updateHeaderCheckbox(table);
    },
    cssClass: 'oh-col-checkbox',
    hozAlign: 'center',
    headerHozAlign: 'center',
    width: 48,
    minWidth: 48,
    headerSort: false,
    resizable: false,
    frozen: true,
  },
  { title: 'SHIPMENT NO.', field: 'shipmentNo', width: 190, minWidth: 170, headerSort: false, formatter: shipmentNoFormatter },
  { title: 'STAGE', field: 'stage', width: 170, minWidth: 150, headerSort: false, formatter: stageFormatter },
  { title: 'CUSTOMER & POC', field: 'client', width: 200, minWidth: 170, headerSort: false, formatter: customerPocFormatter },
  { title: 'ROUTE DETAILS', field: 'origin', width: 440, minWidth: 380, headerSort: false, formatter: routeDetailsFormatter },
  { title: 'OPERATOR', field: 'carrier', width: 120, minWidth: 100, headerSort: false, formatter: operatorFormatter, hozAlign: 'center', headerHozAlign: 'center' },
  { title: 'BOOKING REF', field: 'carrierRef', width: 160, minWidth: 140, headerSort: false, formatter: carrierRefFormatter },
  { title: 'EST. TRANSIT TIME', field: 'etd', width: 210, minWidth: 190, headerSort: false, formatter: estTransitTimeFormatter },
  { title: 'BOOKING STATUS', field: 'bookingStatus', width: 180, minWidth: 160, headerSort: false, formatter: bookingStatusFormatter },
  { title: 'LAST MILESTONE', field: 'lastMilestone', width: 220, minWidth: 190, headerSort: false, formatter: milestoneFormatter },
  { title: 'NEXT EVENT', field: 'nextEvent', width: 210, minWidth: 180, headerSort: false, formatter: nextEventFormatter },
  { title: 'LAST UPDATED', field: 'lastUpdated', width: 175, minWidth: 155, headerSort: false, formatter: lastUpdatedFormatter },
  { title: 'DATE CREATED', field: 'dateCreated', width: 175, minWidth: 155, headerSort: false, formatter: dateCreatedFormatter },
  {
    title: '',
    field: 'id',
    width: 52,
    minWidth: 52,
    headerSort: false,
    resizable: false,
    formatter: actionsFormatter,
    hozAlign: 'center',
    frozen: true,
    cssClass: 'oh-col-actions',
  },
];

// ─── Nav Bar (matches trade-party-listing exactly) ────────────────────────────

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

      {/* Right: actions + avatar */}
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

interface AttentionCardProps {
  shipmentNo: string;
  client: string;
  route: string;
  task: string;
  urgency: 'overdue' | 'due-today';
}

function AttentionCard({ shipmentNo, client, route, task, urgency }: AttentionCardProps) {
  const taskColor = urgency === 'overdue' ? 'var(--theme-color-error-100)' : 'var(--theme-color-orange-120)';
  return (
    <div className="shipments-attention-card">
      <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-primary-60)' }}>
        {shipmentNo}
      </Text>
      <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-60)' }}>{client}</Text>
      <div className="shipments-attention-card-route">
        <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)', fontSize: 12 }}>{route}</Text>
      </div>
      <div className="shipments-attention-card-task">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: taskColor, flexShrink: 0 }} />
        <Text variant="body" size="sm" weight="medium" style={{ color: taskColor, fontSize: 12 }}>
          {task}
        </Text>
      </div>
    </div>
  );
}

// ─── Secondary tab filters ────────────────────────────────────────────────────

const SECONDARY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'needs_attention', label: 'Needs Attention' },
  { key: 'completed', label: 'Completed' },
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ShipmentsPage() {
  const router = useRouter();
  const [attentionExpanded, setAttentionExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('fcl');
  const [shipmentView, setShipmentView] = useState('my');
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [statusTab, setStatusTab] = useState('all');

  useEffect(() => {
    let holder: HTMLElement | null = null;
    const onScroll = () => {
      const wrapper = document.querySelector('.onehaul-table-wrapper') as HTMLElement | null;
      if (wrapper && holder) wrapper.classList.toggle('is-scrolled-x', holder.scrollLeft > 0);
    };
    const timer = setTimeout(() => {
      holder = document.querySelector('.tabulator-tableholder');
      holder?.addEventListener('scroll', onScroll, { passive: true });
    }, 300);
    return () => {
      clearTimeout(timer);
      holder?.removeEventListener('scroll', onScroll);
    };
  }, []);

  const filteredShipments = MOCK_SHIPMENTS.filter(s => {
    if (shipmentView === 'my' && !s.isMyShipment) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.shipmentNo.toLowerCase().includes(q) ||
        s.client.toLowerCase().includes(q) ||
        s.carrier.toLowerCase().includes(q);
    }
    return true;
  });

  const handleRowClick = (data: Shipment) => {
    router.push(`/shipments/${data.id}`);
  };

  const filteredByStatus = filteredShipments.filter(s => {
    if (statusTab === 'all') return true;
    if (statusTab === 'active') return s.stage !== 'Completed';
    if (statusTab === 'needs_attention') return s.nextEvent?.urgency != null || s.tasks != null;
    if (statusTab === 'completed') return s.stage === 'Completed';
    return true;
  });

  const tableContent = (
    <div style={{ paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Secondary tabs */}
      <Tabs
        type="secondary"
        activeKey={statusTab}
        onChange={(key: string) => setStatusTab(key)}
        className="sh-status-tabs"
        items={SECONDARY_TABS.map(t => ({ key: t.key, label: t.label }))}
      />
      {/* Count + Actions row */}
      <div className="shipments-table-toolbar">
        <div className="shipments-toolbar-left">
          <Text variant="body" size="sm" weight="medium" style={{ color: 'var(--theme-color-grey-70)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {filteredByStatus.length} shipments
          </Text>
        </div>
        <div className="shipments-toolbar-right">
          <Chips
            items={[
              { key: 'my', label: 'My Shipments' },
              { key: 'team', label: 'Team' },
            ]}
            selected={shipmentView}
            setSelected={(val: string) => setShipmentView(val)}
            mandatory
            size="md"
            theme="line"
          />
          <div className="shipments-toolbar-search-group">
            <Input
              floated={false}
              placeholder="Search by shipment, client, carrier…"
              suffix={<Search width={14} height={14} color="var(--theme-color-grey-100)" />}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              style={{ width: 280 }}
            />
            <Button
              variant="secondary"
              size="md"
              icon={<FilterIcon width={14} height={14} />}
            >
              Filters
            </Button>
          </div>
          <Button
            variant="secondary"
            size="md"
            icon={<ListIcon width={14} height={14} />}
            onClick={() => router.push('/tasks')}
            style={{ marginLeft: 8 }}
          >
            All Tasks
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table
        data={filteredByStatus}
        columns={COLUMNS}
        onRowClick={handleRowClick}
        options={{ rowHeight: 104 }}
      />
    </div>
  );

  const tabItems = [
    {
      key: 'fcl',
      label: 'Sea FCL',
      children: tableContent,
    },
    { key: 'lcl', label: 'Sea LCL', children: (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)' }}>LCL shipments coming soon</Text>
      </div>
    )},
    { key: 'air', label: 'Air', children: (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Text variant="body" size="md" style={{ color: 'var(--theme-color-grey-40)' }}>Air freight coming soon</Text>
      </div>
    )},
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', position: 'relative', overflow: 'hidden' }}>
      <NavBar />

      {/* White content card */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 12,
          right: 12,
          bottom: 12,
          background: 'var(--theme-color-pure-100)',
          borderRadius: 16,
          boxShadow: '-2px 0px 16px 0px rgba(136, 136, 136, 0.06)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Page header */}
          <div className="shipments-header">
            <div className="shipments-header-left">
              <Text variant="heading" size="lg" weight="semibold" style={{ color: 'var(--theme-color-grey-100)' }}>
                Shipments
              </Text>
              <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                Track and manage all active FCL, LCL, and Air shipments
              </Text>
            </div>
            <div className="shipments-header-actions">
              <Button variant="tertiary" size="md" style={{ visibility: 'hidden' }}>Export CSV</Button>
              <Button variant="secondary" size="md" style={{ visibility: 'hidden' }}>Assign Team</Button>
              <Button variant="primary" size="md" icon={<Add width={14} height={14} />} onClick={() => setCreateDrawerOpen(true)}>
                New Shipment
              </Button>
            </div>
          </div>

          {/* Needs Attention tray */}
          <div className="shipments-attention-tray">
            <div className="shipments-attention-header" onClick={() => setAttentionExpanded(v => !v)}>
              <div className="shipments-attention-header-left">
                <div className="shipments-attention-dot" />
                <Text variant="body" size="sm" weight="semibold" style={{ color: 'var(--theme-color-orange-120)' }}>
                  Needs Attention — {ATTENTION_ITEMS.length} shipments require action today
                </Text>
              </div>
              <span className={`shipments-attention-chevron${attentionExpanded ? ' expanded' : ''}`}>
                <Chevrondown width={16} height={16} />
              </span>
            </div>
            {attentionExpanded && (
              <div className="shipments-attention-cards">
                {ATTENTION_ITEMS.map(item => (
                  <AttentionCard key={item.shipmentNo} {...item} />
                ))}
              </div>
            )}
          </div>

          {/* Tabs + Table */}
          <Tabs
            items={tabItems}
            defaultActiveKey="fcl"
            activeKey={activeTab}
            onChange={setActiveTab}
            type="primary"
            className="shipments-primary-tabs"
          />

        </div>
      </div>

      <CreateShipmentDrawer open={createDrawerOpen} onClose={() => setCreateDrawerOpen(false)} />
    </div>
  );
}

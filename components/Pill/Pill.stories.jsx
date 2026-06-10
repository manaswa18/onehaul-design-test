import React from 'react';
import Pill from './index';
import { Home } from '@/icons';

export default {
    title: 'Components/Pill',
    component: Pill,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Pill component that wraps the Ant Design Tag component with OneHaul styling.',
            },
        },
    },
    argTypes: {
        color: {
            control: 'select',
            options: [
                'default',
                'blue',
                'orange',
                'purple',
                'yellow',
                'magenta',
                'teal',
                'error',
                'success',
            ],
            description: 'Style variant of the pill',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
            description: 'Size of the pill',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        theme: {
            control: 'select',
            options: ['light', 'dark', 'line'],
            description: 'Theme of the pill',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'dark' },
            },
        },
        icon: {
            control: 'ReactNode',
            description: 'Icon to display at the start of the pill',
            table: {
                type: { summary: 'React.ReactNode' },
                defaultValue: { summary: '' },
            },
        },
        showIcon: {
            control: 'boolean',
            description: 'Whether to show the icon',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        children: {
            control: 'text',
            description: 'Content of the pill',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS class for the pill',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};

export const Default = {
    args: {
        children: 'Default Pill',
    },
};

export const Variants = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <Pill color="default">Default</Pill>
        <Pill color="blue">Blue</Pill>
        <Pill color="orange">Orange</Pill>
        <Pill color="purple">Purple</Pill>
        <Pill color="yellow">Yellow</Pill>
        <Pill color="magenta">Magenta</Pill>
        <Pill color="teal">Teal</Pill>
        <Pill color="error">Error</Pill>
        <Pill color="success">Success</Pill>
    </div>
);

export const WithIcons = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <Pill color="default" icon={Home}>
            Default
        </Pill>

        <Pill color="blue" icon={Home}>
            Blue
        </Pill>
    </div>
);

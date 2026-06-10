import React from 'react';
import { Fail, Home, Tick } from '@/icons';
import Alert from './index';
import Button from '../Button';

export default {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ['default', 'success', 'info', 'warning', 'error'],
            control: { type: 'select' },
            description: 'Type of the alert',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'info' },
            },
        },
        icon: {
            control: 'ReactNode',
            description: 'Icon of the alert',
            table: {
                type: { summary: 'React.ReactNode' },
                defaultValue: { summary: null },
            },
        },
        theme: {
            options: ['light', 'filled', 'line'],
            control: { type: 'select' },
            description: 'Theme of the alert',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'light' },
            },
        },
        message: {
            control: 'text',
            description: 'Alert message',
            table: {
                type: { summary: 'string | ReactNode' },
            },
        },
        description: {
            control: 'text',
            description: 'Alert description',
            table: {
                type: { summary: 'string | ReactNode' },
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
        closable: {
            control: 'boolean',
            description: 'Whether the alert can be closed',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS class for the alert',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            control: 'text',
            description: 'Content of the alert (used as description if no description is provided)',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        closeIcon: {
            control: 'ReactNode',
            description: 'Close icon of the alert',
            table: {
                type: { summary: 'React.ReactNode' },
                defaultValue: { summary: '<Fail width={20} height={20} />' },
            },
        },
        action: {
            control: 'ReactNode',
            description: 'Action of the alert',
            table: {
                type: { summary: 'React.ReactNode' },
                defaultValue: { summary: null },
            },
        },
    },
};

export const Info = {
    args: {
        type: 'info',
        message: 'Info Alert',
        description: 'This is an informational alert for the user.',
        icon: <Home width={20} height={20} />,
    },
};

export const Success = {
    args: {
        type: 'success',
        message: 'Success Alert',
        description: 'This is a success alert for the user.',
        icon: <Tick width={20} height={20} />,
    },
};

export const Warning = {
    args: {
        type: 'warning',
        message: 'Warning Alert',
        description: 'This is a warning alert for the user.',
    },
};

export const Error = {
    args: {
        type: 'error',
        message: 'Error Alert',
        description: 'This is an error alert for the user.',
        icon: <Fail width={20} height={20} />,
    },
};

export const WithoutIcon = {
    args: {
        type: 'info',
        message: 'Alert without icon',
        description: 'This alert does not display an icon.',
        showIcon: false,
    },
};

export const Closable = {
    args: {
        type: 'info',
        message: 'Closable Alert',
        description: 'This alert can be closed by clicking the close button.',
        closable: true,
    },
};

export const WithAction = {
    args: {
        type: 'info',
        message: 'Alert with action',
        description: 'This alert displays an action.',
        action: <Button variant="tertiary">Action</Button>,
    },
};

import React from 'react';
import Notification from './index';
import Button from '../Button';
import { Info, Success, Error, Fail, Tick } from '@/icons';

export default {
    title: 'Components/Notification',
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ['default', 'success', 'info', 'warning', 'error'],
            control: { type: 'select' },
            description: 'Type of the notification',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
        theme: {
            options: ['light', 'filled', 'line'],
            control: { type: 'select' },
            description: 'Theme of the notification',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'filled' },
            },
        },
        placement: {
            options: ['top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
            control: { type: 'select' },
            description: 'Placement of the notification',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottomLeft' },
            },
        },
        message: {
            control: 'text',
            description: 'Message of the notification',
            table: {
                type: { summary: 'string' },
            },
        },
        description: {
            control: 'text',
            description: 'Description of the notification',
            table: {
                type: { summary: 'string' },
            },
        },
        duration: {
            control: 'number',
            description: 'Duration of the notification',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 5 },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'Notification component that uses Alert for its body',
            },
        },
    },
};

const Template = (args) => (
    <Button onClick={() => Notification.open(args)} variant="primary">
        Show Notification
    </Button>
);

export const Default = {
    render: Template,
    args: {
        type: 'default',
        message: 'Default Notification',
        description: 'This is a default notification with an Alert component',
        icon: <Info width={20} height={20} />,
    },
};

export const SuccessNotification = {
    render: Template,
    args: {
        type: 'success',
        message: 'Success Notification',
        description: 'This is a success notification with an Alert component',
        icon: <Success width={20} height={20} />,
    },
};

export const Infomation = {
    render: Template,
    args: {
        type: 'info',
        message: 'Info Notification',
        description: 'This is an info notification with an Alert component',
        icon: <Info width={20} height={20} />,
    },
};

export const WarningNotification = {
    render: Template,
    args: {
        type: 'warning',
        message: 'Warning Notification',
        description: 'This is a warning notification with an Alert component',
        icon: <Error width={20} height={20} />,
    },
};

export const ErrorNotification = {
    render: Template,
    args: {
        type: 'error',
        message: 'Error Notification',
        description: 'This is an error notification with an Alert component',
        icon: <Fail width={20} height={20} />,
    },
};

export const WithDifferentTheme = {
    render: Template,
    args: {
        type: 'info',
        message: 'Line Theme Notification',
        description: 'This notification uses the line theme',
        theme: 'line',
        icon: <Info width={20} height={20} />,
    },
};

export const WithDifferentPlacement = {
    render: Template,
    args: {
        type: 'success',
        message: 'Bottom Right Notification',
        description: 'This notification appears at the bottom right',
        placement: 'bottomRight',
        icon: <Tick width={20} height={20} />,
    },
};

export const WithLongDuration = {
    render: Template,
    args: {
        type: 'info',
        message: 'Long Duration',
        description: 'This notification stays visible for 10 seconds',
        duration: 10,
        icon: <Info width={20} height={20} />,
    },
};

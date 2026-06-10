import React from 'react';
import { Home } from '@/icons';
import Button from './index';

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'tertiary', 'link'],
            control: { type: 'select' },
            description: 'Type of the button',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
        },
        size: {
            options: ['lg', 'md', 'sm'],
            control: { type: 'select' },
            description: 'Size of the button',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            control: 'text',
            description: 'Content of the button',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        className: {
            control: 'text',
            description: 'Class name of the button',
            table: {
                type: { summary: 'string' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state of the button',
            table: {
                type: { summary: 'boolean' },
            },
        },
        loading: {
            control: 'boolean',
            description: 'Loading state of the button',
            table: {
                type: { summary: 'boolean' },
            },
        },
        error: {
            control: 'boolean',
            description: 'Error state of the button',
            table: {
                type: { summary: 'boolean' },
            },
        },
        success: {
            control: 'boolean',
            description: 'Success state of the button',
            table: {
                type: { summary: 'boolean' },
            },
        },
    },
};

export const Primary = {
    args: {
        variant: 'primary',
        children: 'Button',
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        children: 'Secondary Button',
    },
};

export const Tertiary = {
    args: {
        variant: 'tertiary',
        children: 'Tertiary Button',
    },
};

export const Link = {
    args: {
        variant: 'link',
        children: 'Link Button',
    },
};

export const IconButton = {
    args: {
        variant: 'primary',
        icon: <Home width={18} height={18} />,
    },
};

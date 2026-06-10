import React from 'react';
import Badge from './index';
import Button from '../Button';

export default {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Class name of the badge',
            table: {
                type: { summary: 'string' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the badge is disabled',
            table: {
                type: { summary: 'boolean' },
            },
        },
        count: {
            control: { type: 'number' },
            description: 'Number to show in badge',
            table: {
                type: { summary: 'number' },
            },
        },
        overflowCount: {
            control: { type: 'number' },
            description: 'Max count to show',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 999 },
            },
        },
        showZero: {
            control: 'boolean',
            description: 'Whether to show badge when count is zero',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        dot: {
            control: 'boolean',
            description: 'Whether to display a small dot instead of count',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        // size: {
        //     options: ['small', 'default', 'large'],
        //     control: { type: 'select' },
        //     description: 'Size of the badge',
        //     table: {
        //         type: { summary: 'string' },
        //         defaultValue: { summary: 'default' },
        //     },
        // },
        status: {
            options: ['success', 'processing', 'default', 'error', 'warning'],
            control: { type: 'select' },
            description: 'Status of the badge',
            table: {
                type: { summary: 'string' },
            },
        },
        color: {
            control: { type: 'color' },
            description: 'Custom background color of the badge',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            control: 'node',
            description: 'Content of the badge',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
    },
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
    count: 5,
    children: <Button>Badge</Button>,
};

export const Dot = Template.bind({});
Dot.args = {
    dot: true,
    children: <Button>Badge with dot</Button>,
};

export const WithStatus = Template.bind({});
WithStatus.args = {
    status: 'success',
    text: 'Success',
};

export const WithCustomColor = Template.bind({});
WithCustomColor.args = {
    count: 5,
    color: '#1890ff',
    children: <Button>Badge</Button>,
};

const RibbonTemplate = (args) => (
    <Badge.Ribbon {...args}>
        <div
            style={{
                width: 300,
                height: 100,
                background: '#f0f0f0',
                borderRadius: 4,
                padding: 24,
            }}
        >
            Card content with ribbon
        </div>
    </Badge.Ribbon>
);

export const WithRibbon = RibbonTemplate.bind({});
WithRibbon.args = {
    text: 'Ribbon',
    color: 'red',
};

import React from 'react';
import Toggle from './index';

export default {
    title: 'Components/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['md', 'lg'],
            control: { type: 'select' },
            description: 'Size of the toggle switch',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        offLabel: {
            control: 'text',
            description: 'Label to show when the toggle is off',
            table: {
                type: { summary: 'string' },
            },
        },
        onLabel: {
            control: 'text',
            description: 'Label to show when the toggle is on',
            table: {
                type: { summary: 'string' },
            },
        },
        className: {
            control: 'text',
            description: 'Custom CSS class for the toggle',
            table: {
                type: { summary: 'string' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        checked: {
            control: 'boolean',
            description: 'Whether the toggle is checked (controlled)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        defaultChecked: {
            control: 'boolean',
            description: 'Whether the toggle is checked by default (uncontrolled)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback function triggered when the state changes',
            table: {
                type: { summary: '(checked: boolean, event: Event) => void' },
            },
        },
        loading: {
            control: 'boolean',
            description: 'Show loading state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        checkedChildren: {
            control: 'text',
            description: 'Content to show when checked',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        unCheckedChildren: {
            control: 'text',
            description: 'Content to show when unchecked',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
    },
};

const Template = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    offLabel: 'Off',
    onLabel: 'On',
};

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
};

export const Loading = Template.bind({});
Loading.args = {
    loading: true,
    checked: true,
};

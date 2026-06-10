import React from 'react';
import Checkbox from './index';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['md', 'lg'],
            control: { type: 'select' },
            description: 'Size of the checkbox',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        checked: {
            control: 'boolean',
            defaultValue: false,
            description: 'Whether the checkbox is checked',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        disabled: {
            control: 'boolean',
            defaultValue: false,
            description: 'Whether the checkbox is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        indeterminate: {
            control: 'boolean',
            defaultValue: false,
            description: 'Whether the checkbox is indeterminate',
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
        className: {
            control: 'text',
            description: 'Additional CSS class for custom styling',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Default Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
    children: 'Checked Checkbox',
    checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Disabled Checkbox',
    disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
    children: 'Disabled Checked Checkbox',
    disabled: true,
    checked: true,
};

export const CheckboxGroup = {
    render: (args) => (
        <Checkbox.Group
            options={[
                { label: 'Apple', value: 'Apple', className: 'label-1' },
                { label: 'Pear', value: 'Pear', className: 'label-2' },
                { label: 'Orange', value: 'Orange', className: 'label-3', disabled: false },
            ]}
            {...args}
        />
    ),
    args: {
        defaultValue: 'option1',
    },
};

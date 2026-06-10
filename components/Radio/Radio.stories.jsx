import Radio from './index';
import React from 'react';

export default {
    title: 'Components/Radio',
    component: Radio,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['lg', 'md'],
            control: { type: 'select' },
            description: 'Size of the radio',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        children: {
            control: 'text',
            description: 'Content of the radio',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        className: {
            control: 'text',
            description: 'Class name of the radio',
            table: {
                type: { summary: 'string' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state of the radio',
            table: {
                type: { summary: 'boolean' },
            },
        },
        checked: {
            control: 'boolean',
            description: 'Checked state of the radio',
            table: {
                type: { summary: 'boolean' },
            },
        },
        value: {
            control: 'text',
            description: 'Value of the radio',
            table: {
                type: { summary: 'any' },
            },
        },
    },
};

export const Default = {
    args: {
        children: 'Radio Option',
        value: 'option1',
    },
};

export const Disabled = {
    args: {
        children: 'Disabled Radio',
        value: 'option3',
        disabled: true,
    },
};

const RadioGroupTemplate = (args) => {
    const [value, setValue] = React.useState(args.defaultValue);

    return <Radio.Group {...args} value={value} onChange={setValue} />;
};

export const RadioGroup = {
    render: RadioGroupTemplate,
    args: {
        defaultValue: 'option1',
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ],
    },
};

export const RadioGroupWithOptions = {
    render: RadioGroupTemplate,
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3', disabled: true },
        ],
        defaultValue: 'option1',
        size: 'md',
    },
};

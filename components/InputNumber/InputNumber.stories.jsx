import React from 'react';
import InputNumber from './index';

export default {
    title: 'Components/InputNumber',
    component: InputNumber,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'InputNumber component that wraps the Ant Design InputNumber component with OneHaul styling.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['md', 'lg'],
            description: 'Size of the input number',
            table: {
                type: { summary: 'string' },
            },
        },
        value: {
            control: 'number',
            description: 'Value of the input number',
            table: {
                type: { summary: 'number' },
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback function that is called when the value changes',
            table: {
                type: { summary: 'function' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input number is disabled',
            table: {
                type: { summary: 'boolean' },
            },
        },
        max: {
            control: 'number',
            description: 'Maximum value of the input number',
            table: {
                type: { summary: 'number' },
            },
        },
        min: {
            control: 'number',
            description: 'Minimum value of the input number',
            table: {
                type: { summary: 'number' },
            },
        },
        floated: {
            control: 'boolean',
            description: 'Whether the input number is floated',
            table: {
                type: { summary: 'boolean' },
            },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder of the input number',
            table: {
                type: { summary: 'string' },
            },
        },
        type: {
            control: 'select',
            options: ['number', 'text', 'email', 'tel', 'url'],
            description: 'Type of the HTML input',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'number' },
            },
        },
        error: {
            control: 'boolean',
            description: 'Whether the input number is in error state',
            table: {
                type: { summary: 'boolean' },
            },
        },
        helperText: {
            control: 'text',
            description: 'Helper text of the input number',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};

const Template = (args) => {
    const [value, setValue] = React.useState(args.value);

    return <InputNumber {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Enter a number',
};

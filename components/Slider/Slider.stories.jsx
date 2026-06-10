import React, { useState } from 'react';
import Slider from './index';

export default {
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Whether the slider is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        range: {
            control: 'boolean',
            description: 'Enable range selection (dual handles)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        getRangeLabel: {
            control: 'function',
            description: 'Function to get the range label',
            table: {
                type: { summary: 'function' },
            },
        },
        showRange: {
            control: 'boolean',
            description: 'Show the range label',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        min: {
            control: 'number',
            description: 'Minimum value',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 0 },
            },
        },
        max: {
            control: 'number',
            description: 'Maximum value',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 100 },
            },
        },
        step: {
            control: 'number',
            description: 'Step value for increments',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 1 },
            },
        },
        dots: {
            control: 'boolean',
            description: 'Show dots on the slider track',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        marks: {
            control: 'object',
            description: 'Marks to show on the slider',
            table: {
                type: { summary: 'object' },
            },
        },
        value: {
            control: 'number',
            description: 'Value of the slider',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 0 },
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback function triggered when the value changes',
            table: {
                type: { summary: '(value: number | [number, number]) => void' },
            },
        },
        onChangeComplete: {
            action: 'change complete',
            description: 'Callback function triggered when user releases the handle',
            table: {
                type: { summary: '(value: number | [number, number]) => void' },
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

const Template = (args) => {
    const [value, setValue] = useState(args.range ? [20, 50] : 30);

    return (
        <div style={{ padding: '20px', width: args.vertical ? 'auto' : '400px' }}>
            <Slider
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    args.onChange?.(newValue);
                }}
                onChangeComplete={args.onChangeComplete}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    min: 0,
    max: 100,
    step: 1,
};

export const WithMarks = Template.bind({});
WithMarks.args = {
    min: 0,
    max: 100,
    showRange: false,
    marks: {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: '100°C',
    },
};

export const WithDots = Template.bind({});
WithDots.args = {
    min: 0,
    max: 100,
    step: 10,
    dots: true,
};

export const Range = Template.bind({});
Range.args = {
    range: true,
    min: 0,
    max: 100,
};

export const RangeWithMarks = Template.bind({});
RangeWithMarks.args = {
    range: true,
    min: 0,
    max: 100,
    showRange: false,
    marks: {
        0: '0°C',
        26: '26°C',
        37: '37°C',
        100: '100°C',
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    min: 0,
    max: 100,
};

export const CustomStep = Template.bind({});
CustomStep.args = {
    min: 0,
    max: 100,
    step: 5,
    showRange: false,
    marks: {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100',
    },
};

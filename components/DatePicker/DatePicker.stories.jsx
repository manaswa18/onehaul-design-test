import React from 'react';
import DatePicker from './index';
import { CalendarOutlined } from '@ant-design/icons';

export default {
    title: 'Components/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['outlined', 'borderless', 'filled', 'underlined'],
            control: { type: 'select' },
            description: 'Variant of the date picker',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'outlined' },
            },
        },
        className: {
            control: 'text',
            description: 'Class name',
            table: {
                type: { summary: 'string' },
            },
        },
        suffix: {
            control: 'object',
            description: 'Suffix Element',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        picker: {
            options: ['date', 'week', 'month', 'quarter', 'year'],
            control: { type: 'select' },
            description: 'Picker type',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'date' },
            },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Select date' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        error: {
            control: 'boolean',
            description: 'Error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        showTime: {
            control: 'boolean',
            description: 'Show time picker',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        clearable: {
            control: 'boolean',
            description: 'Allow clear selection',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        showToday: {
            control: 'boolean',
            description: 'Show today button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        floated: {
            control: 'boolean',
            description: 'Enable floating labels',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        helperText: {
            control: 'text',
            description: 'Helper text below the input',
            table: {
                type: { summary: 'string' },
            },
        },
        format: {
            control: 'text',
            description: 'Date format',
            table: {
                type: { summary: 'string' },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'A wrapper around Ant Design DatePicker with consistent styling and behavior.',
            },
        },
    },
};

const Template = (args) => {
    const [value, setValue] = React.useState();

    return <DatePicker {...args} value={value} onChange={setValue} style={{ width: 300 }} />;
};

export const Default = {
    render: Template,
    args: {
        placeholder: 'Select date',
    },
};

export const WithTime = {
    render: Template,
    args: {
        placeholder: 'Select date and time',
        showTime: true,
    },
};

export const MonthPicker = {
    render: Template,
    args: {
        picker: 'month',
        placeholder: 'Select month',
    },
};

export const YearPicker = {
    render: Template,
    args: {
        picker: 'year',
        placeholder: 'Select year',
    },
};

export const WeekPicker = {
    render: Template,
    args: {
        picker: 'week',
        placeholder: 'Select week',
    },
};

export const QuarterPicker = {
    render: Template,
    args: {
        picker: 'quarter',
        placeholder: 'Select quarter',
    },
};

export const WithPrefix = {
    render: Template,
    args: {
        placeholder: 'Select date',
        prefix: <CalendarOutlined />,
    },
};

export const Disabled = {
    render: Template,
    args: {
        placeholder: 'Select date',
        disabled: true,
    },
};

export const CustomFormat = {
    render: Template,
    args: {
        placeholder: 'Select date',
        format: 'DD/MM/YYYY',
    },
};

export const WithoutFloatingLabel = {
    render: Template,
    args: {
        placeholder: 'Select date',
        floated: false,
    },
};

export const WithoutClear = {
    render: Template,
    args: {
        placeholder: 'Select date',
        clearable: false,
    },
};

export const WithoutTodayButton = {
    render: Template,
    args: {
        placeholder: 'Select date',
        showToday: false,
    },
};

export const Error = {
    render: Template,
    args: {
        placeholder: 'Select date',
        error: true,
    },
};

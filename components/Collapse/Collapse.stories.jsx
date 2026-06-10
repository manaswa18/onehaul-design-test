import React from 'react';
import Collapse from './index';

const text1 =
    'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.';
const text2 =
    'Cats are similar to dragons in that they are cute, magical, and will set your house on fire if they feel their demands are not being adequately met.';
const text3 =
    'The guinea pig or domestic guinea pig, also known as the cavy or domestic cavy, is a species of rodent belonging to the genus Cavia in the family Caviidae.';

export default {
    title: 'Components/Collapse',
    component: Collapse,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Collapse component that wraps the Ant Design Collapse component with OneHaul styling.',
            },
        },
    },
    argTypes: {
        bordered: {
            control: 'boolean',
            description: 'Whether to show border around the collapse',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        ghost: {
            control: 'boolean',
            description: 'Make the collapse borderless and transparent background',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        expandIconPosition: {
            control: 'select',
            options: ['start', 'end'],
            description: 'Position of the expand icon',
            defaultValue: 'end',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'end' },
            },
        },
        accordion: {
            control: 'boolean',
            description: 'If true, only one panel can be expanded at a time',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        expandIcon: {
            control: 'object',
            description: 'Custom expand icon configuration',
            table: {
                type: { summary: 'object' },
            },
        },
        items: {
            control: 'array',
            description: 'Array of collapse panel items',
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: '[]' },
            },
        },
        className: {
            control: 'text',
            description: 'Custom class name for the collapse',
            table: {
                type: { summary: 'string' },
            },
        },
        suffix: {
            control: 'node',
            description: 'Custom suffix for the collapse',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        completed: {
            control: 'boolean',
            description: 'Whether the collapse is in completed state',
            table: {
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the collapse is disabled',
            table: {
                type: { summary: 'boolean' },
            },
        },
        defaultActiveKey: {
            control: 'array',
            description: 'Initial active key',
            table: {
                type: { summary: 'array' },
            },
        },
    },
};

const defaultItems = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text1}</p>,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text2}</p>,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text3}</p>,
    },
];

export const Default = () => <Collapse items={defaultItems} defaultActiveKey={['1']} />;

export const Accordion = () => <Collapse items={defaultItems} accordion />;

export const GhostMode = () => <Collapse items={defaultItems} defaultActiveKey={['1']} ghost />;

export const WithSuffix = () => {
    const itemsWithSuffix = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: <p>{text1}</p>,
            suffix: <span style={{ color: '#176EB2' }}>More info</span>,
            subLabel: 'This is a sub label',
        },
        {
            key: '2',
            label: 'This is panel header 2',
            children: <p>{text2}</p>,
            suffix: <span style={{ color: '#176EB2' }}>More info</span>,
        },
    ];

    return <Collapse items={itemsWithSuffix} defaultActiveKey={['1']} />;
};

const ControlledTemplate = (args) => {
    const [activeKey, setActiveKey] = React.useState(['1']);

    const onChange = (keys) => {
        setActiveKey(keys);
    };

    return <Collapse items={defaultItems} activeKey={activeKey} onChange={onChange} {...args} />;
};

export const Disabled = () => {
    const itemsWithDisabled = [
        {
            key: '5',
            label: 'This is panel header 5',
            children: <p>{text1}</p>,
            disabled: true,
        },
    ];

    return <Collapse items={[...defaultItems, ...itemsWithDisabled]} defaultActiveKey={['1']} />;
};

export const Controlled = ControlledTemplate.bind({});
Controlled.args = {
    defaultActiveKey: ['1'],
};

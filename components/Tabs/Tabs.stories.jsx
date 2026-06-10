import React from 'react';
import Tabs from './index';
import { Home } from '@/icons';

export default {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {
        position: {
            options: ['horizontal', 'vertical'],
            control: {
                type: 'select',
            },
            defaultValue: 'horizontal',
            description: 'The position of the tabs',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' },
            },
        },
        defaultActiveKey: {
            control: 'text',
            defaultValue: '1',
            description: 'The key of the default active tab',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '1' },
            },
        },
        fullWidth: {
            control: 'boolean',
            defaultValue: false,
            description: 'Whether the tabs should be full width',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        type: {
            options: ['primary', 'secondary'],
            control: { type: 'select' },
            defaultValue: 'primary',
            description: 'The type of the tabs',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
        },
        items: {
            control: 'object',
            description: 'The items of the tabs',
            table: {
                type: { summary: 'array' },
            },
        },
    },
};

const Template = (args) => <Tabs {...args} />;

export const PrimaryTabs = Template.bind({});
PrimaryTabs.args = {
    type: 'primary',
    items: [
        {
            key: 'tab1',
            prefix: <Home />,
            suffix: 1,
            label: 'Tab',
            children: <div>Primary Tab Content</div>,
        },
        {
            key: 'tab2',
            prefix: <Home />,
            suffix: 2,
            label: 'Tab',
            children: <div>Primary Tab Content</div>,
        },
        {
            key: 'tab3',
            prefix: <Home />,
            suffix: 3,
            label: 'Tab',
            children: <div>Primary Tab Content</div>,
        },
    ],
};

export const SecondaryTabs = Template.bind({});
SecondaryTabs.args = {
    type: 'secondary',
    items: [
        {
            key: 'tab1',
            prefix: <Home />,
            suffix: 1,
            label: 'Tab',
            children: <div>Secondary Tab Content</div>,
        },
        {
            key: 'tab2',
            prefix: <Home />,
            suffix: 2,
            label: 'Tab',
            children: <div>Secondary Tab Content</div>,
        },
        {
            key: 'tab3',
            prefix: <Home />,
            suffix: 3,
            label: 'Tab',
            children: <div>Secondary Tab Content</div>,
        },
    ],
};

export const FullWidthTabs = Template.bind({});
FullWidthTabs.args = {
    fullWidth: true,
    items: [
        {
            key: 'tab1',
            prefix: <Home />,
            suffix: 1,
            label: 'Tab',
            children: <div>Full Width Tab Content</div>,
        },
        {
            key: 'tab2',
            prefix: <Home />,
            suffix: 2,
            label: 'Tab',
            children: <div>Full Width Tab Content</div>,
        },
        {
            key: 'tab3',
            prefix: <Home />,
            suffix: 3,
            label: 'Tab',
            children: <div>Full Width Tab Content</div>,
        },
    ],
};

export const VerticalTabs = Template.bind({});
VerticalTabs.args = {
    position: 'vertical',
    items: [
        {
            key: 'tab1',
            prefix: <Home />,
            suffix: 1,
            label: 'Tab',
            children: <div>Vertical Tab Content</div>,
        },
        {
            key: 'tab2',
            prefix: <Home />,
            suffix: 2,
            label: 'Tab',
            children: <div>Vertical Tab Content</div>,
        },
        {
            key: 'tab3',
            prefix: <Home />,
            suffix: 3,
            label: 'Tab',
            children: <div>Vertical Tab Content</div>,
        },
    ],
};

export const HorizontalTabs = Template.bind({});
HorizontalTabs.args = {
    position: 'horizontal',
    items: [
        {
            key: 'tab1',
            prefix: <Home />,
            suffix: 1,
            label: 'Tab',
            children: <div>Horizontal Tab Content</div>,
        },
        {
            key: 'tab2',
            prefix: <Home />,
            suffix: 2,
            label: 'Tab',
            children: <div>Horizontal Tab Content</div>,
        },
        {
            key: 'tab3',
            prefix: <Home />,
            suffix: 3,
            label: 'Tab',
            children: <div>Horizontal Tab Content</div>,
        },
    ],
};

export const TestTab = Template.bind({});
TestTab.args = {
    position: 'horizontal',
    items: [
        {
            prefix: <Home />,
            key: 'tab1',
            label: 'Tab',
            children: <div>Horizontal Tab Content</div>,
        },
    ],
};

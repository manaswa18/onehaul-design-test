import React from 'react';
import { useState } from 'react';
import Chips from './index';

export default {
    title: 'Components/Chips',
    component: Chips,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Chips component that wraps the Ant Design Tag component with OneHaul styling.',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md'],
            description: 'Size of the chips',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        theme: {
            control: 'select',
            options: ['light', 'line'],
            description: 'Theme of the chips',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'light' },
            },
        },
        multiple: {
            control: 'boolean',
            description: 'Whether the chips are multiple selectable',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        items: {
            control: 'object',
            description: 'Items to display in the chips',
            table: {
                type: { summary: 'array' },
            },
        },
        selectedItems: {
            control: 'object',
            description: 'Selected items in the chips',
            table: {
                type: { summary: 'array' },
            },
        },
        showCross: {
            control: 'boolean',
            description: 'Whether to show the cross icon',
            table: {
                type: { summary: 'boolean' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the chips are disabled',
            table: {
                type: { summary: 'boolean' },
            },
        },
        mandatory: {
            control: 'boolean',
            description: 'Atleast one chip must be selected',
            table: {
                type: { summary: 'boolean' },
            },
        },
        selected: {
            control: 'object',
            description: 'Selected items in the chips',
            table: {
                type: { summary: 'array' },
            },
        },
        setSelected: {
            control: 'function',
            description: 'Function to set the selected items',
            table: {
                type: { summary: 'function' },
            },
        },
    },
};

const Template = (args) => {
    const [selected, setSelected] = useState([]);

    return <Chips {...args} selected={selected} setSelected={setSelected} mandatory />;
};

export const Light = Template.bind({});
Light.args = {
    items: [
        { key: '1', label: 'Item 1', icon: 'Home' },
        { key: '2', label: 'Item 2' },
        { key: '3', label: 'Item 3' },
        { key: '4', label: 'Item 4' },
        { key: '5', label: 'Item 5', icon: 'Home' },
        { key: '6', label: 'Item 6', icon: 'Home' },
        { key: '7', label: 'Item 7', icon: 'Home' },
    ],
};

export const Line = Template.bind({});
Line.args = {
    items: [
        { key: '1', label: 'Item 1' },
        { key: '2', label: 'Item 2' },
        { key: '3', label: 'Item 3' },
        { key: '4', label: 'Item 4' },
        { key: '5', label: 'Item 5' },
        { key: '6', label: 'Item 6' },
        { key: '7', label: 'Item 7' },
    ],
    theme: 'line',
};

export const Disabled = Template.bind({});
Disabled.args = {
    items: [
        { key: '1', label: 'Item 1', disabled: true },
        { key: '2', label: 'Item 2' },
        { key: '3', label: 'Item 3' },
        { key: '4', label: 'Item 4' },
        { key: '5', label: 'Item 5', disabled: true },
        { key: '6', label: 'Item 6', disabled: true },
        { key: '7', label: 'Item 7', disabled: true },
    ],
};

export const Multiple = Template.bind({});
Multiple.args = {
    items: [
        { key: '1', label: 'Item 1' },
        { key: '2', label: 'Item 2' },
        { key: '3', label: 'Item 3' },
        { key: '4', label: 'Item 4' },
        { key: '5', label: 'Item 5' },
        { key: '6', label: 'Item 6' },
        { key: '7', label: 'Item 7' },
    ],
    multiple: true,
};

export const WithCross = Template.bind({});
WithCross.args = {
    items: [
        { key: '1', label: 'Item 1' },
        { key: '2', label: 'Item 2' },
        { key: '3', label: 'Item 3' },
        { key: '4', label: 'Item 4' },
        { key: '5', label: 'Item 5' },
        { key: '6', label: 'Item 6' },
        { key: '7', label: 'Item 7' },
    ],
    showCross: true,
};

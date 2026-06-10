import React, { useState } from 'react';
import Navigation from './index';
import Button from '../Button';
import { Home } from '@/icons';

export default {
    title: 'Components/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    argTypes: {
        defaultSelectedKeys: {
            control: 'array',
            description: 'Initially selected keys',
            table: { type: { summary: 'string[]' } },
        },
        items: {
            control: 'object',
            description: 'Menu items config',
            table: { type: { summary: 'ItemType[]' } },
        },
        defaultOpenKeys: {
            control: 'array',
            description: 'Initially open keys',
            table: { type: { summary: 'string[]' } },
        },
        showSearch: {
            control: 'boolean',
            description: 'Show search input',
            table: { type: { summary: 'boolean' } },
        },
        searchPlaceholder: {
            control: 'text',
            description: 'Placeholder text for search input',
            table: { type: { summary: 'string' } },
        },
        emptyMessage: {
            control: 'text',
            description: 'Message to display when no items are found',
            table: { type: { summary: 'string' } },
        },
        inlineCollapsed: {
            control: 'boolean',
            description: 'Whether the navigation is collapsed',
            table: { type: { summary: 'boolean' } },
        },
        setInlineCollapsed: {
            control: 'function',
            description: 'Function to set the collapsed state',
            table: { type: { summary: 'function' } },
        },
        showCollapsedMenu: {
            control: 'boolean',
            description: 'Show collapsed menu',
            table: { type: { summary: 'boolean' } },
        },
        headerNode: {
            control: 'node',
            description: 'Custom header node',
            table: { type: { summary: 'ReactNode' } },
        },
        footerNode: {
            control: 'node',
            description: 'Custom footer node',
            table: { type: { summary: 'ReactNode' } },
        },
    },
};

const defaultItems = [
    {
        key: 'home',
        label: 'Home',
        icon: Home,
    },
    {
        key: 'products',
        label: 'Products',
        icon: Home,
        children: [
            {
                key: 'product1',
                label: 'Product 1',
                icon: Home,
                children: [
                    {
                        key: 'product11',
                        label: 'Product 11',
                        icon: Home,
                    },
                    {
                        key: 'product12',
                        label: 'Product 12',
                        icon: Home,
                    },
                ],
            },
            {
                key: 'product2',
                label: 'Product 2',
                icon: Home,
            },
        ],
    },
    {
        key: 'about',
        label: 'About Us',
        icon: Home,
    },
    {
        key: 'contact',
        label: 'Contact',
        icon: Home,
    },
];

const Template = (args) => {
    const [current, setCurrent] = useState(args.defaultSelectedKeys?.[0] || 'home');

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Navigation {...args} onClick={handleClick} selectedKeys={[current]} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    theme: 'light',
    defaultSelectedKeys: ['home'],
    items: defaultItems,
};

const CollapsedTemplate = (args) => {
    const [current, setCurrent] = useState(args.defaultSelectedKeys?.[0] || 'home');
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => setCollapsed(!collapsed)} style={{ marginBottom: 16 }}>
                {collapsed ? 'Expand' : 'Collapse'}
            </Button>

            <Navigation
                {...args}
                onClick={handleClick}
                selectedKeys={[current]}
                inlineCollapsed={collapsed}
                setInlineCollapsed={setCollapsed}
            />
        </div>
    );
};

export const Collapsed = CollapsedTemplate.bind({});
Collapsed.args = {
    defaultSelectedKeys: ['home'],
    items: defaultItems,
};

export const NoCollapsedMenu = CollapsedTemplate.bind({});
NoCollapsedMenu.args = {
    defaultSelectedKeys: ['home'],
    items: defaultItems,
    showCollapsedMenu: false,
};

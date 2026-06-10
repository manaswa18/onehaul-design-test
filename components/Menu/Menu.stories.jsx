import React, { useState } from 'react';
import Menu from './index';
import ProfileMenuDemo from './ProfileMenuDemo';
import { Home, Settings, Facility, Analytics } from '@/icons';
import { ConfigProvider, message } from 'antd';

export default {
    title: 'Components/Menu',
    component: Menu,

    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Menu component with support for various item types, including regular menu items, account items, and action items. Selected items have a primary-5 background and primary-3 text color. Auto-generates initials from user names.',
            },
        },
    },
    argTypes: {
        mode: {
            control: { type: 'select' },
            options: ['vertical', 'horizontal', 'inline'],
            defaultValue: 'vertical',
        },
        showTick: {
            control: 'boolean',
            defaultValue: true,
        },
    },
};

// Interactive template with state
const InteractiveTemplate = (args) => {
    const [selectedKeys, setSelectedKeys] = useState(['1']);

    const handleChange = (newKeys) => {
        setSelectedKeys(newKeys);
    };

    const handleAction = (key) => {
        message.info(`Action triggered: ${key}`);
    };

    return (
        <Menu
            {...args}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onAction={handleAction}
        />
    );
};

// Profile menu example like in the design
export const ProfileMenu = InteractiveTemplate.bind({});
ProfileMenu.args = {
    items: [
        {
            label: 'Profile',
            key: 'profile',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Preferences',
            key: 'preferences',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <Settings />,
            type: 'action',
        },
        {
            type: 'divider',
        },
        {
            label: 'Aastha Pareek',
            key: '1',
            email: 'aastha.pareek@eagleinbrit.com',
            description: 'aastha.pareek@eagleinbrit.com',
            type: 'account',
        },
        {
            label: 'Test Account',
            key: '2',
            email: 'test@eagleinbrit.com',
            type: 'account',
        },
        {
            label: 'John Doe',
            key: '3',
            email: 'john.doe@example.com',
            type: 'account',
        },
        {
            label: 'Admin',
            key: '4',
            email: 'admin@company.com',
            type: 'account',
        },
        {
            label: 'Add Another Account',
            key: 'add-account',
            type: 'action',
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Reset Password',
            key: 'reset-password',
            icon: <Home />,
            type: 'action',
        },
    ],
};
ProfileMenu.parameters = {
    docs: {
        description: {
            story: 'A profile menu example with account selection, showing auto-generated initials for avatars. Email addresses are truncated if too long. Action items like "Add Another Account" trigger an action instead of being selected.',
        },
    },
};

// Profile menu with custom avatars and images
export const ProfileMenuWithImages = InteractiveTemplate.bind({});
ProfileMenuWithImages.args = {
    items: [
        {
            label: 'Profile',
            key: 'profile',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: <Settings />,
            type: 'action',
        },
        {
            type: 'divider',
        },
        {
            label: 'Aastha Pareek',
            key: '1',
            email: 'aastha.pareek@eagleinbrit.com',
            avatar: 'https://i.pravatar.cc/150?img=1',
            type: 'account',
        },
        {
            label: 'John Smith',
            key: '2',
            email: 'john.smith@example.com',
            // Auto-generated initials: JS
            type: 'account',
        },
        {
            label: 'Test',
            key: '3',
            email: 'test@example.com',
            // Auto-generated initials: TE (first 2 characters of single word)
            type: 'account',
        },
        {
            label: 'Add Another Account',
            key: 'add-account',
            type: 'action',
            centered: true,
        },
        {
            type: 'divider',
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: <Home />,
            type: 'action',
        },
    ],
};
ProfileMenuWithImages.parameters = {
    docs: {
        description: {
            story: 'Profile menu showing different avatar types: image avatar, auto-generated initials for multiple words (first letter of each), and auto-generated initials for single words (first 2 characters).',
        },
    },
};

export const Default = InteractiveTemplate.bind({});
Default.args = {
    items: [
        {
            label: 'Admin Centre',
            key: '1',
            icon: <Home />,
            description: 'manage your organization',
        },
        {
            label: 'Logistics Mode',
            key: '2',
            icon: <Facility />,
            description: 'streamline your logistics business',
        },
        {
            label: 'Analytics Mode',
            key: '3',
            icon: <Analytics />,
            description: 'strategic intelligence with reporting',
        },
    ],
};
Default.parameters = {
    docs: {
        description: {
            story: 'Default menu with icons and descriptions. Selected item has primary-5 background and primary-3 text color.',
        },
    },
};

export const WithoutDescription = InteractiveTemplate.bind({});
WithoutDescription.args = {
    items: [
        {
            label: 'Navigation One',
            key: 'mail',
            icon: <Home />,
        },
        {
            label: 'Navigation Two',
            key: 'app',
            icon: <Settings />,
            disabled: true,
        },
    ],
};

export const Horizontal = InteractiveTemplate.bind({});
Horizontal.args = {
    items: [
        {
            label: 'Admin Centre',
            key: '1',
            icon: <Home />,
        },
        {
            label: 'Logistics Mode',
            key: '2',
            icon: <Facility />,
        },
        {
            label: 'Analytics Mode',
            key: '3',
            icon: <Analytics />,
        },
    ],
    mode: 'horizontal',
};

export const WithoutTick = InteractiveTemplate.bind({});
WithoutTick.args = {
    items: [
        {
            key: 'sub1',
            icon: <Home />,
            label: 'Navigation One',
            children: [
                {
                    key: '1-1',
                    label: 'Item 1',
                    type: 'group',
                    children: [
                        { key: '1', label: 'Option 1' },
                        { key: '2', label: 'Option 2' },
                    ],
                },
                {
                    key: '1-2',
                    label: 'Item 2',
                    type: 'group',
                    children: [
                        { key: '3', label: 'Option 3' },
                        { key: '4', label: 'Option 4' },
                    ],
                },
            ],
        },
        {
            key: 'sub2',
            icon: <Settings />,
            label: 'Navigation Two',
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '7', label: 'Option 7' },
                        { key: '8', label: 'Option 8' },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <Analytics />,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                { key: '11', label: 'Option 11' },
                { key: '12', label: 'Option 12' },
            ],
        },
    ],
    showTick: false,
};

export const WithoutRightIndicator = InteractiveTemplate.bind({});
WithoutRightIndicator.args = {
    items: [
        {
            label: 'Navigation One',
            key: 'mail',
            icon: <Home />,
        },
        {
            label: 'Navigation Two',
            key: 'app',
            icon: <Settings />,
        },
        {
            label: 'Navigation Three',
            key: 'SubMenu',
            icon: <Analytics />,
        },
    ],
    showRightIndicator: false,
};
WithoutRightIndicator.parameters = {
    docs: {
        description: {
            story: 'Menu with the right indicator line hidden for selected items.',
        },
    },
};

// Dual-icon menu demo
export const DualIconDemo = () => <ProfileMenuDemo />;
DualIconDemo.parameters = {
    docs: {
        description: {
            story: 'Interactive demo with two separate dropdown menus:\n\n**Account Switcher (Left Icon):**\n- Grid-style icon with 3x3 dots\n- Shows list of accounts with selection capability\n- Displays tick marks for selected account\n- Includes "Add Another Account" action with grey background\n- Account switching functionality\n\n**Profile Menu (Right Avatar):**\n- Current user avatar (image or initials)\n- Profile-related actions (Profile, Preferences, Settings)\n- Logout and Reset Password options\n- No selection - pure action menu\n- No tick marks',
        },
    },
};

// Account switcher focus
export const AccountSwitcherDemo = () => {
    return (
        <div>
            <ProfileMenuDemo />
            <div
                style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '2px solid #1890ff',
                }}
            >
                <h3 style={{ color: '#1890ff', marginTop: 0 }}>🔄 Account Switcher Demo</h3>
                <p>
                    <strong>Click the grid icon (left)</strong> to see:
                </p>
                <ul>
                    <li>List of available accounts with names and emails</li>
                    <li>Tick marks showing which account is currently selected</li>
                    <li>"Add Another Account" button with grey background and centered text</li>
                    <li>Account switching that updates the avatar on the right</li>
                </ul>
            </div>
        </div>
    );
};
AccountSwitcherDemo.parameters = {
    docs: {
        description: {
            story: 'Focus on the account switcher functionality. Click the grid icon to switch between different user accounts.',
        },
    },
};

// Profile menu focus
export const ProfileMenuFocusDemo = () => {
    return (
        <div>
            <ProfileMenuDemo />
            <div
                style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '2px solid #52c41a',
                }}
            >
                <h3 style={{ color: '#52c41a', marginTop: 0 }}>👤 Profile Menu Demo</h3>
                <p>
                    <strong>Click the avatar (right)</strong> to see:
                </p>
                <ul>
                    <li>Profile management actions (Profile, Preferences, Settings)</li>
                    <li>Account actions (Logout, Reset Password)</li>
                    <li>No selection or tick marks - pure action menu</li>
                    <li>Icons for each menu item</li>
                </ul>
            </div>
        </div>
    );
};
ProfileMenuFocusDemo.parameters = {
    docs: {
        description: {
            story: 'Focus on the profile menu functionality. Click the user avatar to access profile-related actions.',
        },
    },
};

// Dual menu interaction
export const DualMenuInteraction = () => {
    return (
        <div>
            <ProfileMenuDemo />
            <div
                style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '2px solid #722ed1',
                }}
            >
                <h3 style={{ color: '#722ed1', marginTop: 0 }}>🔄👤 Dual Menu Interaction</h3>
                <p>
                    <strong>Try this sequence:</strong>
                </p>
                <ol>
                    <li>
                        Click the <strong>grid icon</strong> to open account switcher
                    </li>
                    <li>Select a different account to see the avatar change</li>
                    <li>
                        Click the <strong>avatar</strong> to open profile menu
                    </li>
                    <li>Notice how profile actions work independently of account selection</li>
                </ol>
                <div
                    style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: '#f6f6f6',
                        borderRadius: '4px',
                        fontSize: '14px',
                    }}
                >
                    <strong>Key Features:</strong>
                    <br />
                    • Independent dropdown states
                    <br />
                    • Different menu purposes (selection vs actions)
                    <br />
                    • Proper state management for each component
                    <br />• Consistent styling with theme colors
                </div>
            </div>
        </div>
    );
};
DualMenuInteraction.parameters = {
    docs: {
        description: {
            story: 'Demonstrates the interaction between both menus and how they work together to provide account switching and profile management.',
        },
    },
};

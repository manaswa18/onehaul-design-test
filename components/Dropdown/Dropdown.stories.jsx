import React, { useState } from "react";
import { Button, Avatar } from 'antd';
import Dropdown from "./index";
import { Home, Settings, Analytics } from '@/icons';

export default {
    title: "Components/Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
# Dropdown Component

A versatile dropdown component that integrates with our custom Menu component. The Dropdown provides a convenient way to display contextual menus with support for:

- **Icons and descriptions** - Rich menu items with visual indicators
- **Account switching** - Special account type with avatars and emails
- **Action items** - Non-selectable menu items that trigger actions
- **Custom styling** - Individual item styling with CSS
- **Selection state** - Visual feedback for selected items with tick marks
- **Fixed width** - Consistent 280px width for all dropdown menus

## Usage Patterns

### 1. Items Prop (Recommended)
Pass menu items directly to the dropdown for automatic Menu generation:
\`\`\`jsx
<Dropdown items={menuItems} selectedKeys={selected} onChange={handleChange}>
  <Button>Click me</Button>
</Dropdown>
\`\`\`

### 2. Overlay Prop (Advanced)
Pass a custom Menu component for full control:
\`\`\`jsx
<Dropdown overlay={<Menu items={items} />}>
  <Button>Click me</Button>
</Dropdown>
\`\`\`

## Item Types

### Default Items
Standard menu items with optional icons and descriptions.

### Account Items
Special items for user account switching with avatars and email addresses.

### Action Items
Non-selectable items that trigger actions when clicked.
                `
            }
        }
    },
    argTypes: {
        items: {
            description: "Array of menu items to display",
            control: false,
        },
        selectedKeys: {
            description: "Array of selected item keys",
            control: false,
        },
        onChange: {
            description: "Callback when selection changes",
            control: false,
        },
        onAction: {
            description: "Callback when action items are clicked",
            control: false,
        },
        showTick: {
            control: { type: "boolean" },
            description: "Show tick marks for selected items",
            table: {
                defaultValue: { summary: 'true' }
            }
        },
        placement: {
            options: ["bottomLeft", "bottomCenter", "bottomRight", "topLeft", "topCenter", "topRight"],
            control: { type: "select" },
            description: "Placement of the dropdown menu",
            table: {
                defaultValue: { summary: 'bottomLeft' }
            }
        },
        trigger: {
            options: ["click", "hover"],
            control: { type: "select" },
            description: "How the dropdown is triggered",
            table: {
                defaultValue: { summary: 'click' }
            }
        },
    },
};

// ===== BASIC EXAMPLES =====

const Template = (args) => {
    const [selectedKeys, setSelectedKeys] = useState(args.selectedKeys || []);
    
    return (
        <div style={{ padding: '24px' }}>
            <Dropdown
                {...args}
                selectedKeys={selectedKeys}
                onChange={setSelectedKeys}
                onAction={(key) => alert(`Action: ${key}`)}
            >
                <Button>{args.buttonText || 'Open Dropdown'}</Button>
            </Dropdown>
            
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                <strong>Selected:</strong> {selectedKeys.join(', ') || 'None'}
            </div>
        </div>
    );
};

export const BasicMenu = Template.bind({});
BasicMenu.args = {
    items: [
        { 
            key: '1', 
            label: 'Dashboard',
            icon: <Home />,
            description: 'View your main dashboard and analytics'
        },
        { 
            key: '2', 
            label: 'Settings',
            icon: <Settings />,
            description: 'Configure your preferences'
        },
        { 
            key: '3', 
            label: 'Analytics',
            icon: <Analytics />,
            description: 'View detailed reports'
        },
    ],
    selectedKeys: ['1'],
    showTick: true,
    buttonText: 'Basic Menu',
    placement: "bottomLeft",
    trigger: ["click"],
};
BasicMenu.parameters = {
    docs: {
        description: {
            story: 'Basic dropdown menu with icons, descriptions, and selection state. Selected items show primary-5 background and primary-3 text color with tick marks.'
        }
    }
};

export const SimpleMenu = Template.bind({});
SimpleMenu.args = {
    items: [
        { key: '1', label: 'Home', icon: <Home /> },
        { key: '2', label: 'Settings', icon: <Settings /> },
        { key: '3', label: 'Analytics', icon: <Analytics /> },
    ],
    selectedKeys: ['2'],
    showTick: true,
    buttonText: 'Simple Menu',
    placement: "bottomLeft",
    trigger: ["click"],
};
SimpleMenu.parameters = {
    docs: {
        description: {
            story: 'Simplified menu items without descriptions - perfect for navigation menus where space is limited.'
        }
    }
};

export const NoTickMarks = Template.bind({});
NoTickMarks.args = {
    items: [
        { key: '1', label: 'Option 1', icon: <Home /> },
        { key: '2', label: 'Option 2', icon: <Settings /> },
        { key: '3', label: 'Option 3', icon: <Analytics /> },
    ],
    selectedKeys: [],
    showTick: false,
    buttonText: 'No Tick Marks',
    placement: "bottomLeft",
    trigger: ["hover"],
};
NoTickMarks.parameters = {
    docs: {
        description: {
            story: 'Menu without selection indicators - useful for action-only menus or when selection state is not relevant.'
        }
    }
};

// ===== TRIGGER EXAMPLES =====

export const HoverTrigger = Template.bind({});
HoverTrigger.args = {
    items: [
        { key: '1', label: 'Quick Action 1', icon: <Home /> },
        { key: '2', label: 'Quick Action 2', icon: <Settings /> },
        { key: '3', label: 'Quick Action 3', icon: <Analytics /> },
    ],
    selectedKeys: ['1'],
    showTick: true,
    buttonText: 'Hover to Open',
    placement: "bottomLeft",
    trigger: ["hover"],
};
HoverTrigger.parameters = {
    docs: {
        description: {
            story: 'Hover trigger for quick access menus - ideal for toolbar actions and navigation shortcuts.'
        }
    }
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
    items: [
        { key: '1', label: 'Click Option 1', icon: <Home /> },
        { key: '2', label: 'Click Option 2', icon: <Settings /> },
        { key: '3', label: 'Click Option 3', icon: <Analytics /> },
    ],
    selectedKeys: ['2'],
    showTick: true,
    buttonText: 'Click to Open',
    placement: "bottomLeft",
    trigger: ["click"],
};
ClickTrigger.parameters = {
    docs: {
        description: {
            story: 'Click trigger for primary interactions - recommended for most use cases as it provides better control.'
        }
    }
};

// ===== ACTION ITEMS =====

export const ActionMenu = () => {
    const actionItems = [
        {
            label: 'View Profile',
            key: 'profile',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Account Settings',
            key: 'settings',
            icon: <Settings />,
            type: 'action',
        },
        {
            label: 'Analytics Dashboard',
            key: 'analytics',
            icon: <Analytics />,
            type: 'action',
        },
        {
            type: 'divider',
        },
        {
            label: 'Help & Support',
            key: 'help',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Sign Out',
            key: 'logout',
            icon: <Settings />,
            type: 'action',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h3>Action Menu Example</h3>
            <p>All items are actions - no selection state, only triggering callbacks</p>
            
            <Dropdown
                items={actionItems}
                selectedKeys={[]}
                onChange={() => {}}
                onAction={(key) => {
                    alert(`Action triggered: ${key.charAt(0).toUpperCase() + key.slice(1)}`);
                }}
                showTick={false}
                placement="bottomRight"
                trigger={['click']}
            >
                <Avatar 
                    size={40} 
                    style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                >
                    JP
                </Avatar>
            </Dropdown>
            
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#e6f7ff', borderRadius: '6px' }}>
                <strong>💡 Tip:</strong> Action items don't show tick marks and trigger onAction callback instead of onChange
            </div>
        </div>
    );
};
ActionMenu.parameters = {
    docs: {
        description: {
            story: 'Pure action menu - all items trigger actions without selection state. Perfect for user profiles, context menus, and toolbars.'
        }
    }
};

export const MixedMenu = () => {
    const [selectedView, setSelectedView] = useState('dashboard');
    
    const mixedItems = [
        // Selectable view options
        {
            label: 'Dashboard View',
            key: 'dashboard',
            icon: <Home />,
            description: 'Main dashboard overview'
        },
        {
            label: 'Analytics View',
            key: 'analytics',
            icon: <Analytics />,
            description: 'Detailed analytics and reports'
        },
        {
            label: 'Settings View',
            key: 'settings',
            icon: <Settings />,
            description: 'Configuration panel'
        },
        {
            type: 'divider',
        },
        // Action items
        {
            label: 'Export Data',
            key: 'export',
            icon: <Analytics />,
            type: 'action',
        },
        {
            label: 'Import Data',
            key: 'import',
            icon: <Analytics />,
            type: 'action',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h3>Mixed Menu (Selection + Actions)</h3>
            <p>Combines selectable items with action items in the same menu</p>
            
            <Dropdown
                items={mixedItems}
                selectedKeys={[selectedView]}
                onChange={(keys) => setSelectedView(keys[0])}
                onAction={(key) => alert(`${key} action executed!`)}
                showTick={true}
                placement="bottomLeft"
                trigger={['click']}
            >
                <Button type="primary">View & Actions</Button>
            </Dropdown>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                <strong>Current View:</strong> {selectedView}
                <br />
                <small style={{ color: '#666' }}>
                    Selectable items update the view, action items trigger operations
                </small>
            </div>
        </div>
    );
};
MixedMenu.parameters = {
    docs: {
        description: {
            story: 'Advanced pattern combining selectable items (for state) with action items (for operations) in a single menu.'
        }
    }
};

// ===== ACCOUNT SWITCHING =====

export const AccountSwitcher = () => {
    const [selectedAccount, setSelectedAccount] = useState('1');
    
    const accountItems = [
        {
            label: 'Aastha Pareek',
            key: '1',
            email: 'aastha.pareek@eagleinbrit.com',
            avatar: 'https://i.pravatar.cc/150?img=1',
            type: 'account',
        },
        {
            label: 'Test Account',
            key: '2',
            email: 'test.user@company.com',
            type: 'account', // Auto-generates initials: TE
        },
        {
            label: 'John Smith',
            key: '3',
            email: 'john.smith@example.com',
            avatar: 'https://i.pravatar.cc/150?img=3',
            type: 'account',
        },
        {
            label: 'Admin User',
            key: '4',
            email: 'admin@company.com',
            type: 'account', // Auto-generates initials: AD
        },
        {
            type: 'divider',
        },
        {
            label: 'Add Another Account',
            key: 'add-account',
            type: 'action',
            centered: true,
            style: { backgroundColor: 'var(--theme-color-grey-2)' }
        },
    ];

    const currentAccount = accountItems.find(item => item.key === selectedAccount);

    return (
        <div style={{ padding: '24px' }}>
            <h3>Account Switcher</h3>
            <p>Special account type with avatars, emails, and auto-generated initials</p>
            
            <Dropdown
                items={accountItems}
                selectedKeys={[selectedAccount]}
                onChange={(keys) => {
                    if (keys[0] !== 'add-account') {
                        setSelectedAccount(keys[0]);
                    }
                }}
                onAction={(key) => {
                    if (key === 'add-account') {
                        alert('Add another account clicked!');
                    }
                }}
                showTick={true}
                placement="bottomRight"
                trigger={['click']}
            >
                <Button style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '40px' }}>
                    {currentAccount?.avatar ? (
                        <img 
                            src={currentAccount.avatar} 
                            alt={currentAccount.label}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#4285F4',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {currentAccount?.label ? 
                                (currentAccount.label.split(' ').length > 1 ? 
                                    currentAccount.label.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase() :
                                    currentAccount.label.substring(0, 2).toUpperCase()
                                ) : 'U'
                            }
                        </div>
                    )}
                    {currentAccount?.label || 'Select Account'}
                </Button>
            </Dropdown>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                <strong>Current Account:</strong> {currentAccount?.label} ({currentAccount?.email})
                <br />
                <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
                    Account items automatically generate initials when no avatar is provided
                </small>
            </div>
        </div>
    );
};
AccountSwitcher.parameters = {
    docs: {
        description: {
            story: 'Account switching pattern with specialized account items that display user avatars, emails, and auto-generated initials. Perfect for multi-tenant applications.'
        }
    }
};

// ===== CUSTOM STYLING =====

export const MenuPadding = () => {
    const [selectedKeys, setSelectedKeys] = useState(['option-1']);
    
    const menuItems = [
        {
            label: 'Dashboard',
            key: 'option-1',
            icon: <Home />,
            description: 'Main dashboard view'
        },
        {
            label: 'Settings',
            key: 'option-2',
            icon: <Settings />,
            description: 'Application settings'
        },
        {
            label: 'Analytics',
            key: 'option-3',
            icon: <Analytics />,
            description: 'Data analytics'
        },
        {
            type: 'divider',
        },
        {
            label: 'Help',
            key: 'help',
            icon: <Home />,
            type: 'action',
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h3>Menu Container Padding</h3>
            <p>Demonstrates different padding values for the menu container</p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Default Padding */}
                <div>
                    <h4>Default (16px)</h4>
                    <Dropdown
                        items={menuItems}
                        selectedKeys={selectedKeys}
                        onChange={setSelectedKeys}
                        onAction={(key) => alert(`${key} action!`)}
                        showTick={true}
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <Button>Default Padding</Button>
                    </Dropdown>
                </div>

                {/* Compact Padding */}
                <div>
                    <h4>Compact (8px)</h4>
                    <Dropdown
                        items={menuItems}
                        selectedKeys={selectedKeys}
                        onChange={setSelectedKeys}
                        onAction={(key) => alert(`${key} action!`)}
                        showTick={true}
                        padding="8px"
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <Button>Compact Menu</Button>
                    </Dropdown>
                </div>

                {/* Spacious Padding */}
                <div>
                    <h4>Spacious (24px)</h4>
                    <Dropdown
                        items={menuItems}
                        selectedKeys={selectedKeys}
                        onChange={setSelectedKeys}
                        onAction={(key) => alert(`${key} action!`)}
                        showTick={true}
                        padding="24px"
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <Button>Spacious Menu</Button>
                    </Dropdown>
                </div>
            </div>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#e6f7ff', borderRadius: '6px' }}>
                <strong>Selected:</strong> {selectedKeys.join(', ')}
                <br />
                <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
                    The <code>padding</code> prop controls the spacing around the entire menu container
                </small>
            </div>
        </div>
    );
};
MenuPadding.parameters = {
    docs: {
        description: {
            story: 'Control the padding around the entire menu container. Default is 16px. Use this to create more compact or spacious menu layouts.'
        }
    }
};

export const CustomStyling = () => {
    const [selectedKeys, setSelectedKeys] = useState(['option-1']);
    
    const styledItems = [
        {
            label: 'Default Item',
            key: 'option-1',
            icon: <Home />,
            description: 'Normal styling'
        },
        {
            label: 'Warning Item',
            key: 'option-2',
            icon: <Settings />,
            description: 'Custom warning background',
            style: { 
                backgroundColor: 'var(--theme-color-warning-5)', 
                borderLeft: '3px solid var(--theme-color-warning-100)',
                borderRadius: '6px'
            }
        },
        {
            label: 'Success Item',
            key: 'option-3',
            icon: <Analytics />,
            description: 'Custom success styling',
            style: { 
                backgroundColor: 'var(--theme-color-success-5)',
                border: '1px solid var(--theme-color-success-100)',
                borderRadius: '6px'
            }
        },
        {
            type: 'divider',
        },
        {
            label: 'Custom Action',
            key: 'custom-action',
            type: 'action',
            icon: <Settings />,
            style: { 
                backgroundColor: 'var(--theme-color-grey-2)', 
                border: '1px dashed var(--theme-color-grey-40)',
                borderRadius: '4px',
                fontStyle: 'italic'
            }
        },
        {
            label: 'Highlighted Action',
            key: 'highlighted',
            type: 'action',
            centered: true,
            style: { 
                backgroundColor: 'var(--theme-color-primary-5)', 
                color: 'var(--theme-color-primary-100)',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <h3>Custom Item Styling</h3>
            <p>Apply custom CSS styles to individual menu items using the style prop</p>
            
            <Dropdown
                items={styledItems}
                selectedKeys={selectedKeys}
                onChange={setSelectedKeys}
                onAction={(key) => alert(`${key} action triggered!`)}
                showTick={true}
                placement="bottomLeft"
                trigger={['click']}
            >
                <Button type="primary">Custom Styled Menu</Button>
            </Dropdown>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#e6f7ff', borderRadius: '6px' }}>
                <strong>Selected:</strong> {selectedKeys.join(', ')}
                <br />
                <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>
                    Use the <code>style</code> prop on any item to apply custom CSS styling
                </small>
            </div>

            <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fff2e8', borderRadius: '6px' }}>
                <strong>💡 Style Examples:</strong>
                <ul style={{ margin: '8px 0 0 20px', fontSize: '14px' }}>
                    <li>Background colors and borders</li>
                    <li>Typography (weight, transform, spacing)</li>
                    <li>Border radius and shadows</li>
                    <li>Any valid CSS properties</li>
                </ul>
            </div>
        </div>
    );
};
CustomStyling.parameters = {
    docs: {
        description: {
            story: 'Comprehensive example showing how to apply custom styles to individual menu items. Any valid CSS can be applied via the style prop.'
        }
    }
};

// ===== REAL-WORLD EXAMPLES =====

export const HeaderExample = () => {
    const [selectedAccount, setSelectedAccount] = useState('1');
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const accountItems = [
        {
            label: 'Profile Settings',
            key: 'profile',
            icon: <Home />,
            type: 'action',
        },
        {
            label: 'Account Preferences',
            key: 'preferences',
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
            type: 'account',
        },
        {
            label: 'Test User',
            key: '3',
            email: 'test@example.com',
            type: 'account',
        },
        {
            label: 'Add Another Account',
            key: 'add-account',
            type: 'action',
            centered: true,
            style: { backgroundColor: 'var(--theme-color-grey-2)' }
        },
        {
            type: 'divider',
        },
        {
            label: 'Sign Out',
            key: 'logout',
            icon: <Home />,
            type: 'action',
        },
    ];

    const profileItems = [
        { label: 'My Profile', key: 'profile', icon: <Home />, type: 'action' },
        { label: 'Settings', key: 'settings', icon: <Settings />, type: 'action' },
        { type: 'divider' },
        { label: 'Help Center', key: 'help', icon: <Analytics />, type: 'action' },
        { label: 'Sign Out', key: 'logout', icon: <Home />, type: 'action' },
    ];

    const currentAccount = accountItems.find(item => item.key === selectedAccount);

    return (
        <div style={{ padding: '24px' }}>
            <h3>Real-World Header Example</h3>
            <p>Complete header implementation with account switcher and profile menu</p>
            
            {/* Mock Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e8e8e8',
                borderRadius: '8px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1890ff' }}>
                    🚀 Your Application
                </div>
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Account Switcher */}
                    <Dropdown
                        items={accountItems}
                        selectedKeys={[selectedAccount]}
                        onChange={(keys) => {
                            if (keys[0] !== 'add-account') {
                                setSelectedAccount(keys[0]);
                            }
                        }}
                        onAction={(key) => {
                            if (key === 'add-account') {
                                alert('Add account functionality');
                            } else {
                                alert(`${key} action`);
                            }
                        }}
                        showTick={true}
                        open={isAccountOpen}
                        onOpenChange={setIsAccountOpen}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Button 
                            style={{ 
                                border: 'none',
                                background: 'transparent',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '36px',
                                height: '36px',
                                borderRadius: '6px'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                display: 'grid',
                                gridTemplate: '1fr 1fr 1fr / 1fr 1fr 1fr',
                                gap: '2px',
                            }}>
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#666',
                                            borderRadius: '1px'
                                        }}
                                    />
                                ))}
                            </div>
                        </Button>
                    </Dropdown>

                    {/* Profile Menu */}
                    <Dropdown
                        items={profileItems}
                        selectedKeys={[]}
                        onChange={() => {}}
                        onAction={(key) => alert(`Profile action: ${key}`)}
                        showTick={false}
                        trigger={['click']}
                        open={isProfileOpen}
                        onOpenChange={setIsProfileOpen}
                        placement="bottomRight"
                    >
                        {currentAccount?.avatar ? (
                            <img 
                                src={currentAccount.avatar} 
                                alt={currentAccount.label}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    border: '2px solid #e8e8e8'
                                }}
                            />
                        ) : (
                            <Avatar 
                                size={36} 
                                style={{ 
                                    backgroundColor: '#87d068', 
                                    cursor: 'pointer',
                                    border: '2px solid #e8e8e8'
                                }}
                            >
                                {currentAccount?.label?.substring(0, 2).toUpperCase()}
                            </Avatar>
                        )}
                    </Dropdown>
                </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <strong>🏢 Active Account:</strong> {currentAccount?.label} ({currentAccount?.email})
                <br />
                <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                    Left icon: Account switcher with selection • Right avatar: Profile menu with actions
                </small>
            </div>
        </div>
    );
};
HeaderExample.parameters = {
    docs: {
        description: {
            story: 'Production-ready header implementation showing how to combine account switching and profile menus in a realistic application layout.'
        }
    }
};

// ===== PLAYGROUND =====

export const Playground = Template.bind({});
Playground.args = {
    items: [
        { 
            key: '1', 
            label: 'Dashboard',
            icon: <Home />,
            description: 'Main dashboard view'
        },
        { 
            key: '2', 
            label: 'Settings',
            icon: <Settings />,
            description: 'Application settings'
        },
        { 
            key: '3', 
            label: 'Analytics',
            icon: <Analytics />,
            description: 'Data analytics'
        },
        {
            type: 'divider',
        },
        {
            label: 'Help',
            key: 'help',
            icon: <Home />,
            type: 'action',
        },
    ],
    selectedKeys: ['1'],
    showTick: true,
    buttonText: 'Interactive Playground',
    placement: "bottomLeft",
    trigger: ["click"],
};
Playground.parameters = {
    docs: {
        description: {
            story: 'Interactive playground to experiment with different dropdown configurations. Use the controls panel to modify properties.'
        }
    }
};
import React, { useState } from 'react';
import { Button, message } from 'antd';
import Dropdown from '../Dropdown';
import { Home, Settings } from '@/icons';

const ProfileMenuDemo = () => {
    const [selectedAccount, setSelectedAccount] = useState('1');
    const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleAccountChange = (newKeys) => {
        if (newKeys[0] === '1' || newKeys[0] === '2' || newKeys[0] === '3' || newKeys[0] === '4') {
            setSelectedAccount(newKeys[0]);
        }
        setIsAccountSwitcherOpen(false);
    };

    const handleAccountAction = (key) => {
        if (key === 'add-account') {
            message.info('Add another account action triggered');
        }

        setIsAccountSwitcherOpen(false);
    };

    const handleProfileAction = (key) => {
        if (key === 'profile') {
            message.info('Profile action triggered');
        } else if (key === 'preferences') {
            message.info('Preferences action triggered');
        } else if (key === 'settings') {
            message.info('Settings action triggered');
        } else if (key === 'logout') {
            message.info('Logout action triggered');
        } else if (key === 'reset-password') {
            message.info('Reset password action triggered');
        }

        setIsProfileMenuOpen(false);
    };

    // Account switcher menu items
    const accountSwitcherItems = [
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
            email: 'test@eagleinbrit.com',
            type: 'account',
        },
        {
            label: 'John Smith',
            key: '3',
            email: 'john.smith@example.com',
            type: 'account',
        },
        {
            label: 'Admin User',
            key: '4',
            email: 'admin@company.com',
            type: 'account',
        },
        {
            type: 'divider',
        },
        {
            label: 'Add Another Account',
            key: 'add-account',
            type: 'action',
            centered: true,
        },
    ];

    // Profile menu items
    const profileMenuItems = [
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
    ];

    const currentAccount = accountSwitcherItems.find((item) => item.key === selectedAccount);

    // Switcher icon (grid/app switcher style)
    const SwitcherIcon = () => (
        <div
            style={{
                width: '24px',
                height: '24px',
                display: 'grid',
                gridTemplate: '1fr 1fr 1fr / 1fr 1fr 1fr',
                gap: '2px',
                cursor: 'pointer',
            }}
        >
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#666',
                        borderRadius: '1px',
                    }}
                />
            ))}
        </div>
    );

    return (
        <div style={{ padding: '24px', background: '#f5f5f5' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '12px',
                    alignItems: 'center',
                }}
            >
                {/* Account Switcher */}
                <Dropdown
                    items={accountSwitcherItems}
                    selectedKeys={[selectedAccount]}
                    onChange={handleAccountChange}
                    onAction={handleAccountAction}
                    showTick={true}
                    open={isAccountSwitcherOpen}
                    onOpenChange={setIsAccountSwitcherOpen}
                    placement="bottomRight"
                >
                    <Button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            borderRadius: '8px',
                        }}
                        onClick={() => setIsAccountSwitcherOpen(!isAccountSwitcherOpen)}
                    >
                        <SwitcherIcon />
                    </Button>
                </Dropdown>

                {/* User Profile Avatar */}
                <Dropdown
                    items={profileMenuItems}
                    selectedKeys={[]}
                    onChange={() => {}}
                    onAction={handleProfileAction}
                    showTick={false}
                    open={isProfileMenuOpen}
                    onOpenChange={setIsProfileMenuOpen}
                    placement="bottomRight"
                >
                    <Button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '0',
                        }}
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        {currentAccount?.avatar && typeof currentAccount.avatar === 'string' ? (
                            <img
                                src={currentAccount.avatar}
                                alt={currentAccount.label}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    backgroundColor: '#4285F4',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            >
                                {currentAccount?.label
                                    ? currentAccount.label.split(' ').length > 1
                                        ? currentAccount.label
                                              .split(' ')
                                              .slice(0, 2)
                                              .map((word) => word.charAt(0))
                                              .join('')
                                              .toUpperCase()
                                        : currentAccount.label.substring(0, 2).toUpperCase()
                                    : 'A'}
                            </div>
                        )}
                    </Button>
                </Dropdown>
            </div>

            <div
                style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                }}
            >
                <h3>Demo Information:</h3>
                <p>
                    <strong>Current Account:</strong> {currentAccount?.label} (
                    {currentAccount?.email})
                </p>
                <p>
                    <strong>Left Icon:</strong> Account Switcher (shows account list with selection)
                </p>
                <p>
                    <strong>Right Avatar:</strong> Profile Menu (shows profile actions without
                    selection)
                </p>
            </div>
        </div>
    );
};

export default ProfileMenuDemo;

import React, { useState } from 'react';
import { Menu as AntdMenu, Divider, Avatar } from 'antd';
import './Menu.css';
import { Tick } from '@/icons';
import Text from '../Text';

const Menu = ({
    items,
    selectedKeys: propSelectedKeys = [],
    mode = 'vertical',
    className = '',
    showTick = true,
    showStroke = false,
    padding = '16px', // Default padding for menu container
    onChange,
    onAction,
    style,
    ...props
}) => {
    const [selectedKeys, setSelectedKeys] = useState(propSelectedKeys);

    const handleClick = (e) => {
        // Check if it's an action item
        const clickedItem = items.find((item) => item.key === e.key);

        if (clickedItem && clickedItem.type === 'action') {
            // For action items, call the onAction callback but don't update selection
            if (onAction) {
                onAction(e.key);
            }
            return;
        }

        // For selectable items, update selection
        const newSelectedKeys = [e.key];
        setSelectedKeys(newSelectedKeys);
        if (onChange) {
            onChange(newSelectedKeys);
        }
    };

    // Function to generate initials from name
    const generateInitials = (name) => {
        if (!name) return 'U';

        const words = name.trim().split(' ');
        if (words.length === 1) {
            // For single word, return first 2 characters or 1 if only 1 character
            return words[0].length > 1
                ? words[0].substring(0, 2).toUpperCase()
                : words[0].charAt(0).toUpperCase();
        } else {
            // For multiple words, return first character of first two words
            return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
        }
    };

    // Function to render avatar
    const renderAvatar = (item) => {
        if (item.avatar) {
            // If user provided an image URL or custom avatar component
            if (typeof item.avatar === 'string') {
                return (
                    <Avatar
                        src={item.avatar}
                        alt={item.label}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                        }}
                    />
                );
            } else {
                // Custom avatar component
                return item.avatar;
            }
        } else {
            // Generate initials from the label
            const initials = generateInitials(item.label);
            return <span>{initials}</span>;
        }
    };

    const transformedItems = items?.map((item) => {
        const isSelected = selectedKeys.includes(item.key);

        if (item.type === 'divider') {
            return {
                type: 'divider',
            };
        }

        if (item.type === 'account') {
            return {
                ...item,
                icon: <div className="onehaul-menu-avatar">{renderAvatar(item)}</div>,
                className: 'onehaul-menu-item',
                label: (
                    <div className="onehaul-menu-account-content">
                        <div className="onehaul-menu-account-info">
                            <Text
                                variant="body"
                                size="sm"
                                weight="semibold"
                                style={
                                    isSelected
                                        ? { color: 'var(--theme-color-primary-3)' }
                                        : { color: 'var(--theme-color-grey-70)', fontWeight: 400 }
                                }
                            >
                                {item.label}
                            </Text>
                            {item.email && (
                                <Text
                                    variant="caption"
                                    size="sm"
                                    type="secondary"
                                    className="onehaul-menu-account-email"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '200px',
                                    }}
                                >
                                    {item.email}
                                </Text>
                            )}
                        </div>
                        {showTick && isSelected && <Tick className="onehaul-menu-item-tick" />}
                    </div>
                ),
            };
        }

        if (item.type === 'action') {
            const isCentered =
                item.centered ||
                item.label.toLowerCase().includes('add another account') ||
                item.label.toLowerCase().includes('add account');
            const isAddAccount =
                item.label.toLowerCase().includes('add another account') ||
                item.label.toLowerCase().includes('add account');

            return {
                ...item,
                className: `onehaul-menu-item ${isAddAccount ? 'add-account-item' : ''}`, // Add class for styling
                icon: item.icon ? (
                    <div className="onehaul-menu-action-icon">{item.icon}</div>
                ) : null,
                label: (
                    <div className={`onehaul-menu-item-action ${isCentered ? 'centered' : ''}`}>
                        <Text
                            variant="body"
                            size="sm"
                            weight="secondary"
                            className={`onehaul-menu-action-label ${isCentered ? 'centered' : ''}`}
                        >
                            {item.label}
                        </Text>
                        {item.description && (
                            <Text
                                variant="caption"
                                size="sm"
                                type="secondary"
                                className="onehaul-menu-item-description"
                            >
                                {item.description}
                            </Text>
                        )}
                    </div>
                ),
            };
        }

        // Default menu items
        return {
            ...item,
            icon: item.icon ? (
                <div className="onehaul-menu-item-icon-wrapper">{item.icon}</div>
            ) : null,
            className: 'onehaul-menu-item',
            label: (
                <div
                    className={`onehaul-menu-item-content ${showStroke ? 'right-stroke' : ''} ${
                        showStroke && isSelected ? 'right-stroke-selected' : ''
                    }`}
                >
                    <div className="onehaul-menu-item-label">
                        <Text
                            variant="body"
                            size="sm"
                            weight="semibold"
                            style={
                                isSelected
                                    ? { color: 'var(--theme-color-primary-60)' }
                                    : { color: 'var(--theme-color-grey-70)', fontWeight: 400 }
                            }
                        >
                            {item.label}
                        </Text>
                        {item.description && (
                            <Text
                                variant="caption"
                                size="sm"
                                type="secondary"
                                className="onehaul-menu-item-description"
                            >
                                {item.description}
                            </Text>
                        )}
                    </div>
                    {showTick && isSelected && <Tick className="onehaul-menu-item-tick" />}
                </div>
            ),
        };
    });

    return (
        <AntdMenu
            className={`onehaul-menu ${className}`}
            items={transformedItems}
            selectedKeys={selectedKeys}
            mode={mode}
            onClick={handleClick}
            style={{ padding: padding, ...style }}
            {...props}
        />
    );
};

export default Menu;

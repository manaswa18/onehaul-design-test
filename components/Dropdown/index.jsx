import React from 'react';
import { Dropdown as AntDropdown } from 'antd';
import './Dropdown.css';
import Menu from '../Menu';

const Dropdown = ({
    children,
    className = '',
    overlay,
    items,
    selectedKeys,
    onChange,
    onAction,
    showTick,
    showStroke,
    menuStyle,
    ...props
}) => {
    // Priority order:
    // 1. Use overlay prop if provided
    // 2. Auto-generate Menu from items if provided
    // 3. Pass through other props to AntDropdown

    let dropdownRender;

    if (overlay) {
        // Direct overlay prop (preferred method)
        // Wrap in a div to prevent Ant Design from interfering with Menu styles
        dropdownRender = () => <div className="onehaul-dropdown-content">{overlay}</div>;
    } else if (items) {
        // Auto-generate Menu from items (convenience method)
        dropdownRender = () => (
            <div className="onehaul-dropdown-content">
                <Menu
                    items={items}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onAction={onAction}
                    showTick={showTick}
                    showStroke={showStroke}
                    style={menuStyle}
                />
            </div>
        );
    }

    return (
        <AntDropdown
            className={`onehaul-dropdown ${className}`}
            dropdownRender={dropdownRender}
            {...props}
        >
            {children}
        </AntDropdown>
    );
};

export default Dropdown;

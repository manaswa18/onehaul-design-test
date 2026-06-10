import React from 'react';
import { Drawer as AntDrawer } from 'antd';
import './Drawer.css';
import Text from '../Text';

const SIZE_WIDTH_MAPPING = {
    sm: 320,
    md: 440,
    lg: 560,
};

const Drawer = ({
    children,
    className = '',
    closable = false,
    placement = 'right',
    size = 'md',
    title,
    subtitle,
    icon: HeaderIcon = null,
    maskClosable = false,
    ...props
}) => {
    const drawerTitle = (
        <div className="onehaul-drawer-header">
            {HeaderIcon ? (
                <div className="onehaul-drawer-header-icon-container">
                    <HeaderIcon className="onehaul-drawer-header-icon" />
                </div>
            ) : null}

            {title ? (
                <div className="onehaul-drawer-header-content">
                    <Text
                        className="onehaul-drawer-title"
                        size="sm"
                        variant="heading"
                        weight="semibold"
                    >
                        {title}
                    </Text>

                    {subtitle && (
                        <Text size="sm" className="onehaul-drawer-subtitle">
                            {subtitle}
                        </Text>
                    )}
                </div>
            ) : null}
        </div>
    );

    return (
        <AntDrawer
            className={`onehaul-drawer onehaul-drawer-${placement} ${className}`.trim()}
            closable={closable}
            placement={placement}
            width={SIZE_WIDTH_MAPPING[size]}
            {...props}
            maskClosable={maskClosable}
            title={drawerTitle}
        >
            <div className="onehaul-drawer-body">
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </div>
        </AntDrawer>
    );
};

export default Drawer;

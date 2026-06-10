import React from 'react';
import { Badge as AntBadge } from 'antd';
import './Badge.css';

const Badge = ({
    children,
    className = '',
    overflowCount = 999,
    color = 'var(--theme-color-primary-60)',
    ...props
}) => {
    return (
        <AntBadge
            className={`onehaul-badge ${className}`.trim()}
            overflowCount={overflowCount}
            color={color}
            {...props}
        >
            {children}
        </AntBadge>
    );
};

Badge.Ribbon = ({ children, className = '', ...props }) => {
    return (
        <AntBadge.Ribbon className={`onehaul-badge-ribbon ${className}`.trim()} {...props}>
            {children}
        </AntBadge.Ribbon>
    );
};

export default Badge;

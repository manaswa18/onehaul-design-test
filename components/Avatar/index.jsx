import React from 'react';
import { Avatar as AntAvatar } from 'antd';
import './Avatar.css';

const SIZE_MAPPING = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 64,
    xxl: 80,
};

const Avatar = ({ children, className = '', size = 'md', shape = 'circle', ...props }) => {
    return (
        <AntAvatar
            className={`onehaul-avatar ${className}`.trim()}
            size={SIZE_MAPPING[size] || size}
            shape={shape}
            {...props}
        >
            {children}
        </AntAvatar>
    );
};

Avatar.Group = ({ children, className = '', ...props }) => {
    return (
        <AntAvatar.Group className={`onehaul-avatar-group ${className}`.trim()} {...props}>
            {children}
        </AntAvatar.Group>
    );
};

export default Avatar;

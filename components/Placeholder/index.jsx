import React from 'react';
import { Skeleton } from 'antd';
import './Placeholder.css';

const SIZE_MAPPING = {
    md: 'default',
    sm: 'small',
    lg: 'large',
};

const Placeholder = ({
    className = '',
    loading = true,
    children = null,
    size = 'md',
    width = '100%',
    active = true,
    ...props
}) => {
    if (!loading) return children;

    return (
        <Skeleton.Input
            className={`onehaul-placeholder ${className} onehaul-placeholder-${size}`}
            size={SIZE_MAPPING[size]}
            style={{ width }}
            active={active}
            {...props}
        />
    );
};

Placeholder.Button = ({ className = '', size = 'md', active = true, ...props }) => (
    <Skeleton.Button
        className={`onehaul-placeholder-button ${className} onehaul-placeholder-button-${size}`}
        size={SIZE_MAPPING[size]}
        active={active}
        {...props}
    />
);

Placeholder.Avatar = ({ className = '', size = 'md', active = true, ...props }) => (
    <Skeleton.Avatar
        className={`onehaul-placeholder-avatar ${className} onehaul-placeholder-avatar-${size}`}
        size={SIZE_MAPPING[size]}
        active={active}
        {...props}
    />
);

Placeholder.Input = ({ className = '', size = 'md', width = '100%', active = true, ...props }) => (
    <Skeleton.Input
        className={`onehaul-placeholder-input ${className} onehaul-placeholder-input-${size}`}
        size={SIZE_MAPPING[size]}
        style={{ width }}
        active={active}
        {...props}
    />
);

Placeholder.Image = ({ className = '', active = true, ...props }) => (
    <Skeleton.Image
        className={`onehaul-placeholder-image ${className}`}
        active={active}
        {...props}
    />
);

Placeholder.Paragraph = ({
    className = '',
    size = 'md',
    title = { width: '40%' },
    paragraph = { rows: 3, width: '100%' },
    active = true,
    style = {},
    ...props
}) => (
    <div
        className={`onehaul-placeholder-paragraph onehaul-placeholder-paragraph-${size} ${className}`}
        style={style}
    >
        <Skeleton.Input
            className="onehaul-placeholder-paragraph-title"
            size={SIZE_MAPPING[size]}
            style={{ width: title?.width || '100%' }}
            active={active}
            {...props}
        />

        {paragraph &&
            Array.from({ length: paragraph.rows || 1 }).map((_, index) => (
                <Skeleton.Input
                    key={index}
                    className="onehaul-placeholder-paragraph-paragraph"
                    size={SIZE_MAPPING[size]}
                    style={{ width: paragraph?.width || '100%' }}
                    active={active}
                    {...props}
                />
            ))}
    </div>
);

export default Placeholder;

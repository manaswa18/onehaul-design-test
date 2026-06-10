import React from 'react';
import { Button as AntButton } from 'antd';
import './Button.css';
import Text from '../Text';
// import { Error, Success } from '@/icons';

// const DEFAULT_PREFIX = {
//     error: Error,
//     success: Success,
// };

const BUTTON_TYPES = {
    primary: 'primary',
    secondary: 'default',
    tertiary: 'text',
    link: 'link',
};

const BUTTON_SIZES = {
    lg: 'large',
    md: 'middle',
    sm: 'small',
};

// const getIconSize = (size) => {
//     if (size === 'lg') {
//         return 22;
//     } else if (size === 'md') {
//         return 18;
//     } else if (size === 'sm') {
//         return 14;
//     }

//     return 18;
// };

const Button = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    error = false,
    success = false,
    icon = null,
    ...props
}) => {
    const { disabled, loading } = props;

    let extraProps = {};

    if (variant === 'tertiary') {
        extraProps = {
            color: 'default',
            variant: 'filled',
        };
    }

    const isIconButton = icon && !children;

    const buttonClasses = [
        'onehaul-button',
        `onehaul-button-${size}`,
        `onehaul-button-${variant}`,
        isIconButton ? 'onehaul-icon-button' : '',
        disabled ? 'onehaul-button-disabled' : '',
        error ? 'onehaul-button-error' : '',
        success ? 'onehaul-button-success' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AntButton
            className={buttonClasses}
            type={BUTTON_TYPES[variant]}
            size={BUTTON_SIZES[size]}
            {...extraProps}
            {...props}
        >
            {icon && !loading ? icon : null}

            {typeof children === 'string' ? (
                <Text
                    disabled={disabled}
                    weight="medium"
                    size={size}
                    className={`onehaul-button-text ${variant}`.trim()}
                >
                    {children}
                </Text>
            ) : (
                children
            )}
        </AntButton>
    );
};

export default Button;

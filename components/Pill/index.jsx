import React from 'react';
import { Tag } from 'antd';
import './Pill.css';
import Text from '../Text';
import colors from './color-config.js';
import { Fail, Success } from '@/icons';

const DEFAULT_ICONS = {
    error: {
        dark: Fail,
        light: Fail,
        line: Fail,
    },
    success: {
        dark: Success,
        light: Success,
        line: Success,
    },
};

const Pill = ({
    children,
    className = '',
    color = 'default',
    theme = 'dark',
    size = 'md',
    icon = null,
    showIcon = true,
    textProps = {},
    ...props
}) => {
    const iconSize = size === 'sm' ? 12 : 16;

    const colorConfig = colors[color][theme] || colors.default.dark;

    const PillIcon = icon || DEFAULT_ICONS[color]?.[theme];

    const Icon =
        showIcon && PillIcon ? (
            <div
                className="onehaul-pill-icon-container"
                style={{
                    width: size === 'sm' ? 16 : 24,
                    height: size === 'sm' ? 16 : 24,
                    backgroundColor: colorConfig.iconBgColor,
                }}
            >
                <PillIcon width={iconSize} height={iconSize} />
            </div>
        ) : null;

    const classes = ['onehaul-pill', `onehaul-pill-${size}`, `onehaul-pill-${theme}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <Tag
            className={classes}
            color={colorConfig.color}
            style={{
                color: colorConfig.textColor,
                borderColor: colorConfig.borderColor,
                ...(Icon ? { paddingLeft: 4 } : {}),
            }}
            closable={false}
            icon={Icon}
            {...props}
        >
            <Text
                {...(textProps || {})}
                size={size}
                className="onehaul-pill-text"
                style={{ color: colorConfig.textColor, ...(textProps?.style || {}) }}
            >
                {children}
            </Text>
        </Tag>
    );
};

export default Pill;

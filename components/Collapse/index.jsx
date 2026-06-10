import React, { useMemo } from 'react';
import { Collapse as AntCollapse } from 'antd';
import './Collapse.css';
import Text from '../Text';
import { Chevrondown, Tick } from '@/icons';

const CHILD_PADDING_MAPPING = {
    sm: 16,
    md: 20,
    lg: 24,
};

const Collapse = ({
    children,
    className = '',
    expandIconPosition = 'end',
    expandIcon: ExpandIcon = Chevrondown,
    ghost = false,
    items = [],
    suffix = null,
    disabled = false,
    defaultActiveKey = [],
    prefixSize = 'md',
    type = 'default', // 'default', 'icon-ordered', 'numbered'
    ...props
}) => {
    const customExpandIcon = ({ isActive }) => (
        <ExpandIcon
            width={16}
            height={16}
            style={{
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
            }}
        />
    );

    const renderPrefix = (item, type, index) => {
        const { completed: itemCompleted = false, prefix, disabled: itemDisabled } = item;

        if (type === 'numbered') {
            return (
                <div
                    className={`onehaul-collapse-item-label-completed-icon ${
                        itemCompleted ? 'numbered-completed' : 'numbered-incomplete'
                    }`}
                >
                    {itemCompleted ? (
                        <Tick width={12} height={12} color="var(--theme-color-pure-100)" />
                    ) : (
                        <Text
                            size="sm"
                            weight="medium"
                            variant="caption"
                            style={{ color: itemDisabled && 'var(--theme-color-grey-40)' }}
                        >
                            {index + 1}
                        </Text>
                    )}
                </div>
            );
        } else if (type === 'icon-ordered') {
            return itemCompleted ? (
                <div className={`onehaul-collapse-item-label-completed-icon icon-completed`}>
                    <Tick width={12} height={12} color="var(--theme-color-pure-100)" />
                </div>
            ) : (
                <div>{prefix}</div>
            );
        }

        return prefix && <div>{prefix}</div>;
    };

    const processedItems = items.map((item, index) => {
        const {
            prefix,
            suffix,
            label,
            subLabel,
            children,
            disabled: itemDisabled = false,
            completed: itemCompleted = false,
            ...rest
        } = item;

        const isPrefixPresent = ['numbered', 'icon-ordered'].includes(type) || prefix;

        const isDisabled = disabled || itemDisabled;

        return {
            extra: suffix,
            ...(isDisabled ? { collapsible: 'disabled' } : {}),
            label: (
                <div className={`onehaul-collapse-item-label-container`}>
                    {isPrefixPresent ? <div>{renderPrefix(item, type, index)}</div> : null}

                    <div className="onehaul-collapse-item-label-content">
                        <Text
                            className={`onehaul-collapse-item-label ${
                                isDisabled ? 'onehaul-collapse-item-label-disabled' : ''
                            } ${
                                itemCompleted ? 'onehaul-collapse-item-label-completed' : ''
                            }`.trim()}
                            weight={itemCompleted ? 'semibold' : 'medium'}
                        >
                            {label}
                        </Text>

                        {subLabel && (
                            <Text
                                className={`onehaul-collapse-item-sublabel ${
                                    isDisabled ? 'onehaul-collapse-item-sublabel-disabled' : ''
                                }`.trim()}
                                size="sm"
                            >
                                {subLabel}
                            </Text>
                        )}
                    </div>
                </div>
            ),
            children: (
                <div
                    className="onehaul-collapse-item-content"
                    style={{
                        paddingLeft: isPrefixPresent
                            ? `calc(${CHILD_PADDING_MAPPING[prefixSize]}px + var(--label-gap))`
                            : 0,
                    }}
                >
                    {typeof children === 'string' ? <Text>{children}</Text> : children}
                </div>
            ),
            ...rest,
            className: `onehaul-collapse-item 
            ${item.className || ''} 
            ${itemCompleted ? 'onehaul-collapse-item-completed' : ''}
            `.trim(),
        };
    });

    const activeKeys = useMemo(() => {
        if (disabled) {
            return [];
        }

        return defaultActiveKey.filter((key) => {
            const item = processedItems.find((item) => item.key === key);
            return !item?.disabled;
        });
    }, [defaultActiveKey, disabled]);

    return (
        <AntCollapse
            className={`onehaul-collapse ${className}`.trim()}
            expandIconPosition={expandIconPosition}
            expandIcon={customExpandIcon}
            bordered={false}
            ghost={ghost}
            items={processedItems.length > 0 ? processedItems : undefined}
            defaultActiveKey={activeKeys}
            {...props}
        >
            {items.length === 0 && children}
        </AntCollapse>
    );
};

export default Collapse;

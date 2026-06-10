import { Tag } from 'antd';
import React from 'react';
import './Chips.css';
import Text from '../Text';
import { Fail, Tick } from '@/icons';

const ICON_SIZE = {
    sm: 12,
    md: 16,
};

const Chips = ({
    size = 'md',
    items = [],
    selected = [],
    setSelected = () => {},
    theme = 'light',
    multiple = false,
    disabled = false,
    showCross = false,
    mandatory = false,
}) => {
    return (
        <div className="onehaul-chip-group">
            {items.map((item) => {
                const { key, disabled: itemDisabled, label, icon = '' } = item;

                const chipDisabled = disabled || itemDisabled;

                const isSelected = multiple ? selected.includes(key) : selected === key;

                const classes = [
                    'onehaul-chip',
                    `onehaul-chip-${size}`,
                    theme === 'light' ? 'onehaul-chip-light' : 'onehaul-chip-line',
                    isSelected ? 'onehaul-chip-selected' : '',
                    chipDisabled ? 'onehaul-chip-disabled' : '',
                    mandatory ? 'onehaul-chip-mandatory' : '',
                ]
                    .filter(Boolean)
                    .join(' ');

                return (
                    <Tag
                        checked={isSelected}
                        disabled={chipDisabled}
                        onClick={() => {
                            if (chipDisabled) return;

                            if (multiple) {
                                setSelected(
                                    isSelected && (selected?.length > 1 || !mandatory)
                                        ? selected.filter((item) => item !== key)
                                        : Array.from(new Set([...selected, key])),
                                    key
                                );
                            } else {
                                setSelected(isSelected && !mandatory ? null : key, key);
                            }
                        }}
                        key={key}
                        className={classes}
                    >
                        {isSelected && !showCross && (
                            <Tick
                                width={ICON_SIZE[size]}
                                height={ICON_SIZE[size]}
                                color={isSelected && chipDisabled && 'var(--theme-color-grey-40)'}
                            />
                        )}

                        <Text
                            size={size}
                            className={`onehaul-chip-label ${
                                isSelected ? 'onehaul-chip-label-selected' : ''
                            } ${
                                isSelected && chipDisabled
                                    ? 'onehaul-chip-label-selected-disabled'
                                    : ''
                            }`}
                            disabled={chipDisabled}
                        >
                            {label}
                        </Text>

                        {isSelected && showCross && (
                            <Fail width={ICON_SIZE[size]} height={ICON_SIZE[size]} />
                        )}
                    </Tag>
                );
            })}
        </div>
    );
};

export default Chips;

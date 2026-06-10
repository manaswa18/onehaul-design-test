import React, { useState } from 'react';
import { Switch } from 'antd';
import './Toggle.css';
import Text from '../Text';

const TOGGLE_SIZES = {
    lg: 'large',
    md: 'small',
};

const Toggle = ({
    className = '',
    size = 'md',
    offLabel = '',
    onLabel = '',
    disabled = false,
    ...props
}) => {
    const { onChange, ...rest } = props;

    const [checked, setChecked] = useState(props.checked);

    const handleChange = (checked) => {
        setChecked(checked);
        onChange?.(checked);
    };

    return (
        <div className="onehaul-toggle-container">
            {offLabel && (
                <Text size={size} className="onehaul-toggle-label" disabled={disabled}>
                    {offLabel}
                </Text>
            )}

            <Switch
                className={`onehaul-toggle ${className} onehaul-toggle-${size}`.trim()}
                size={TOGGLE_SIZES[size]}
                value={checked}
                onChange={handleChange}
                disabled={disabled}
                {...rest}
            />

            {onLabel && (
                <Text
                    size={size}
                    className={`onehaul-toggle-label ${checked ? 'checked' : ''}`}
                    disabled={disabled}
                >
                    {onLabel}
                </Text>
            )}
        </div>
    );
};

export default Toggle;

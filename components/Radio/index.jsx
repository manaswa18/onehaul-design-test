import React from 'react';
import { Radio as AntRadio } from 'antd';
import './Radio.css';

import Text from '../Text';

const RADIO_SIZES = {
    lg: 'large',
    md: 'middle',
};

const Radio = ({ children, className = '', size = 'md', ...props }) => {
    const classes = ['onehaul-radio', `onehaul-radio-${size}`, className].filter(Boolean).join(' ');

    return (
        <AntRadio className={classes} size={RADIO_SIZES[size]} {...props}>
            <Text size={size} className="onehaul-radio-label">
                {children}
            </Text>
        </AntRadio>
    );
};

Radio.Group = ({
    children,
    options,
    className = '',
    size = 'md',
    onChange = () => {},
    ...props
}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    if (options) {
        return (
            <AntRadio.Group
                className={`onehaul-radio-group ${className}`}
                size={RADIO_SIZES[size]}
                onChange={handleChange}
                {...props}
            >
                {options.map((option) => {
                    if (typeof option === 'string') {
                        return (
                            <Radio key={option} value={option} size={size}>
                                <Text size={size} className="onehaul-radio-label">
                                    {option}
                                </Text>
                            </Radio>
                        );
                    }

                    const {
                        label,
                        value,
                        disabled,
                        className: optionClassName,
                        ...optionProps
                    } = option;

                    return (
                        <Radio
                            key={value}
                            value={value}
                            disabled={disabled}
                            className={optionClassName}
                            size={size}
                            {...optionProps}
                        >
                            <Text disabled={disabled} size={size} className="onehaul-radio-label">
                                {label}
                            </Text>
                        </Radio>
                    );
                })}
            </AntRadio.Group>
        );
    }

    return (
        <AntRadio.Group
            className={`onehaul-radio-group ${className}`}
            size={RADIO_SIZES[size]}
            onChange={handleChange}
            {...props}
        >
            {children}
        </AntRadio.Group>
    );
};

// Radio.Button = (props) => {
//     return <Button {...props} />;
// };

export default Radio;

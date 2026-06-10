import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import './Checkbox.css';
import Text from '../Text';

const Checkbox = ({ children, size = 'md', className = '', disabled = false, ...props }) => {
    const classes = [
        'onehaul-checkbox',
        `onehaul-checkbox-${size}`,
        disabled && 'onehaul-checkbox-disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AntCheckbox className={classes} disabled={disabled} {...props}>
            {React.isValidElement(children) ? (
                children
            ) : (
                <Text disabled={disabled} size={size}>
                    {children}
                </Text>
            )}
        </AntCheckbox>
    );
};

Checkbox.Group = ({ children, options, className = '', size = 'md', ...props }) => {
    if (options) {
        return (
            <AntCheckbox.Group className={`onehaul-checkbox-group ${className}`.trim()} {...props}>
                {options.map((option) => {
                    if (typeof option === 'string') {
                        return (
                            <Checkbox key={option} value={option} size={size}>
                                <Text size={size}>{option}</Text>
                            </Checkbox>
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
                        <Checkbox
                            key={value}
                            value={value}
                            disabled={disabled}
                            className={optionClassName}
                            size={size}
                            {...optionProps}
                        >
                            <Text disabled={disabled} size={size}>
                                {label}
                            </Text>
                        </Checkbox>
                    );
                })}
            </AntCheckbox.Group>
        );
    }

    return (
        <AntCheckbox.Group className={`onehaul-checkbox-group ${className}`.trim()} {...props}>
            {children}
        </AntCheckbox.Group>
    );
};

export default Checkbox;

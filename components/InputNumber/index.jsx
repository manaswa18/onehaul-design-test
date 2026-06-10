import React, { useLayoutEffect, useRef, forwardRef } from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import './InputNumber.css';

const SIZE_MAPPING = {
    md: 'middle',
    lg: 'large',
};

const InputNumber = (
    {
        size = 'md',
        placeholder = '',
        floated = true,
        className,
        prefix,
        type = 'number',
        error = false,
        helperText = '',
        ...props
    },
    ref
) => {
    const prefixRef = useRef(null);
    const labelRef = useRef(null);

    const sizeMapping = SIZE_MAPPING[size] || SIZE_MAPPING.md;

    const classes = ['onehaul-input-number', className].filter(Boolean).join(' ');

    useLayoutEffect(() => {
        if (prefixRef.current && labelRef.current) {
            let offeset = prefixRef.current.offsetWidth + 16;

            if (size === 'lg') {
                offeset += 4;
            }

            labelRef.current.style.left = `${offeset}px`;
        }
    }, []);

    const wrapperClasses = [
        'onehaul-input-number-wrapper',
        `onehaul-input-number-${size}`,
        error ? 'onehaul-input-number-error' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClasses}>
            <div className="onehaul-input-number-container">
                <AntInputNumber
                    ref={ref}
                    {...props}
                    className={classes}
                    size={sizeMapping}
                    placeholder={floated ? '' : placeholder}
                    prefix={prefix ? <span ref={prefixRef}>{prefix}</span> : undefined}
                    variant="outlined"
                    type={type}
                    status={error ? 'error' : undefined}
                />

                {floated && placeholder && (
                    <label ref={labelRef} className="onehaul-input-number-label">
                        {placeholder}
                    </label>
                )}
            </div>

            {helperText && <div className="onehaul-input-number-helper-text">{helperText}</div>}
        </div>
    );
};

export default forwardRef(InputNumber);

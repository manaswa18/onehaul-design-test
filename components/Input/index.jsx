import React, { useState, useRef, forwardRef } from 'react';
import { Input as AntInput } from 'antd';
import Text from '../Text';
import './Input.css';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
const { TextArea, OTP } = AntInput;

const Input = forwardRef(
    (
        {
            placeholder,
            className = '',
            prefix,
            suffix,
            helperText,
            showCount = false,
            maxLength,
            error = false,
            showErrorIcon = true,
            size = 'md', // new prop: md, lg, (default: md)
            variant = 'primary', // new prop: primary, secondary
            style = {},
            disabled = false,
            type = 'text',
            addonBefore,
            addonAfter,
            rows = 10, // for textarea
            floated = true,
            otpLength = 6, // Number of OTP digits
            otpTitle, // Title for OTP input
            value,
            ...rest
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [passwordVisible, setPasswordVisible] = useState(false);
        const [internalValue, setInternalValue] = useState('');
        const internalRef = useRef(null);

        const isControlled = value !== undefined;
        const inputValue = isControlled ? value : internalValue;

        // Use the forwarded ref if provided, otherwise use our internal ref
        const inputRef = ref || internalRef;

        const handleFocus = (e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
        };

        const handleBlur = (e) => {
            setIsFocused(false);
            rest?.onBlur?.(e);
        };

        const handleChange = (e) => {
            const newValue = typeof e === 'object' ? e.target.value : e;
            if (!isControlled) {
                setInternalValue(newValue);
            }
            rest.onChange?.(e);
        };

        const togglePasswordVisibility = () => {
            // Store current cursor position before toggling
            const inputElement = inputRef.current?.input;
            const cursorPosition = inputElement?.selectionStart || 0;

            setPasswordVisible(!passwordVisible);

            // Use setTimeout to ensure the DOM has updated before trying to set cursor position
            setTimeout(() => {
                if (inputElement) {
                    inputElement.focus();
                    inputElement.setSelectionRange(cursorPosition, cursorPosition);
                }
            }, 0);
        };

        const renderSuffix = () => {
            // For password type, add visibility toggle
            if (type === 'password') {
                return (
                    <span className="onehaul-input-suffix">
                        {suffix && <span className="onehaul-input-custom-suffix">{suffix}</span>}
                        <span
                            onClick={togglePasswordVisibility}
                            className="onehaul-password-toggle"
                        >
                            {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                        {error && showErrorIcon && (
                            <ClockCircleOutlined className="onehaul-error" />
                        )}
                    </span>
                );
            }

            if (error && showErrorIcon) {
                return (
                    <span className="onehaul-input-suffix">
                        {suffix && <span className="onehaul-input-custom-suffix">{suffix}</span>}
                        <ClockCircleOutlined className="onehaul-error" />
                    </span>
                );
            }

            return suffix ? <span className="onehaul-input-custom-suffix">{suffix}</span> : null;
        };

        const sizeValidation = (size) => {
            if (size === 'md' && variant === 'primary') {
                return 'onehaul-input-md';
            }
            if (size === 'lg' && variant === 'primary') {
                return 'onehaul-input-lg';
            }
            if (size === 'md' && variant === 'secondary') {
                return 'onehaul-input-lg';
            }
            if (size === 'lg' && variant === 'secondary') {
                return 'onehaul-input-lg';
            }
        };

        // Compose class names for size and variant
        const sizeClass = size ? sizeValidation(size) : '';
        const variantValidation =
            type === 'textarea'
                ? 'primary'
                : variant === 'secondary' && (addonBefore || addonAfter)
                ? 'primary'
                : variant;
        const variantClass = variant
            ? variant === 'secondary' && (addonBefore || addonAfter)
                ? 'onehaul-input-primary'
                : `onehaul-input-${variant}`
            : '';

        const hasAddonClass = addonBefore || addonAfter ? 'has-addon' : '';

        const prefixSuffixBothClass =
            prefix && suffix
                ? 'onehaul-input-has-prefix-suffix'
                : prefix
                ? 'onehaul-input-has-prefix'
                : suffix
                ? 'onehaul-input-has-suffix'
                : '';

        const hasTextHelperClass = helperText || showCount ? 'has-text-helper' : '';

        // Add specific classes for different addon combinations
        const addonBeforeOnlyClass = addonBefore && !addonAfter ? 'addon-before-only' : '';
        const addonAfterOnlyClass = !addonBefore && addonAfter ? 'addon-after-only' : '';

        const baseClassName = [
            'onehaul-input',
            error ? 'onehaul-input-error' : '',
            variantClass,
            sizeClass,
            prefixSuffixBothClass,
            addonBeforeOnlyClass,
            addonAfterOnlyClass,
            className,
        ]
            .filter(Boolean)
            .join(' ');
        const wrapperClassName = [
            'onehaul-input-wrapper',
            isFocused ? 'focused' : '',
            !!inputValue ? 'has-value' : '',
            error ? 'has-error' : '',
            `onehaul-input-wrapper-${variantValidation}`,
            disabled ? 'onehaul-input-wrapper-disabled' : '',
            hasAddonClass,
        ]
            .filter(Boolean)
            .join(' ');

        // Handle placeholder behavior based on floated flag
        // When floated is false, we should show the placeholder in the input
        // When floated is true, we hide the input placeholder and use our custom label
        const actualPlaceholder = !floated ? placeholder : undefined;

        // Render the appropriate input type
        const renderInput = () => {
            const commonProps = {
                ...rest,
                style: { ...style },
                onFocus: handleFocus,
                onBlur: handleBlur,
                onChange: handleChange,
                value: inputValue,
                disabled,
                className: baseClassName,
                maxLength,
                placeholder: actualPlaceholder,
            };

            if (type === 'textarea') {
                return (
                    <TextArea
                        {...commonProps}
                        rows={rows}
                        style={{
                            ...style,
                            resize: 'vertical',
                            height: 'auto',
                        }}
                        prefix={prefix}
                        suffix={renderSuffix()}
                        className={[
                            baseClassName,
                            'onehaul-input-textarea',
                            isFocused || inputValue ? 'floated' : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        ref={inputRef}
                    />
                );
            }
            if (type === 'otp' && !(addonBefore || addonAfter)) {
                return (
                    <div className="onehaul-otp-container">
                        {placeholder && (
                            <Text
                                variant="body"
                                size={size}
                                weight="medium"
                                className="onehaul-otp-title-text"
                            >
                                {' '}
                                {placeholder}
                            </Text>
                        )}
                        <OTP
                            {...commonProps}
                            length={otpLength}
                            type="number"
                            className={[baseClassName, 'onehaul-input-otp']
                                .filter(Boolean)
                                .join(' ')}
                            inputCount={otpLength}
                            placeholder=""
                            ref={inputRef}
                        />
                    </div>
                );
            }

            if (type === 'password') {
                return (
                    <AntInput
                        {...commonProps}
                        type={passwordVisible ? 'text' : 'password'}
                        className={[baseClassName, 'onehaul-input-password']
                            .filter(Boolean)
                            .join(' ')}
                        prefix={prefix}
                        suffix={renderSuffix()}
                        ref={inputRef}
                    />
                );
            } else {
                return (
                    <AntInput
                        {...commonProps}
                        type={type}
                        prefix={prefix}
                        suffix={renderSuffix()}
                        className={[baseClassName, 'onehaul-input-text'].filter(Boolean).join(' ')}
                        ref={inputRef}
                    />
                );
            }
        };

        // Render addon container if needed
        const renderWithAddons = () => {
            if (addonBefore || addonAfter) {
                return (
                    <div className="onehaul-input-addon-container">
                        {addonBefore && (
                            <div className="onehaul-input-addon onehaul-input-addon-before">
                                {addonBefore}
                            </div>
                        )}
                        <div
                            className={[
                                'onehaul-input-with-addon',
                                addonBefore && !addonAfter ? 'with-addon-before-only' : '',
                                !addonBefore && addonAfter ? 'with-addon-after-only' : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        >
                            {renderInput()}
                            {floated && placeholder && (
                                <label
                                    className={[
                                        'onehaul-input-label',
                                        `onehaul-input-label-${variantValidation}`,
                                        sizeClass,
                                        isFocused || inputValue ? 'floated' : '',
                                        prefixSuffixBothClass,
                                        hasAddonClass,
                                        hasTextHelperClass,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                >
                                    {placeholder}
                                </label>
                            )}
                        </div>
                        {addonAfter && (
                            <div className="onehaul-input-addon onehaul-input-addon-after">
                                {addonAfter}
                            </div>
                        )}
                    </div>
                );
            }

            return renderInput();
        };

        return (
            <div className={wrapperClassName}>
                {renderWithAddons()}

                {floated && placeholder && !addonBefore && !addonAfter && type !== 'otp' && (
                    <label
                        className={[
                            'onehaul-input-label',
                            `onehaul-input-label-${variantValidation}`,
                            sizeClass,
                            isFocused || inputValue ? 'floated' : '',
                            prefixSuffixBothClass,
                            hasAddonClass,
                            hasTextHelperClass,
                            `text-${type}`,
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        {placeholder}
                    </label>
                )}

                {(helperText || showCount) && (
                    <div
                        className={[
                            'onehaul-input-bottom-container',
                            type === 'otp' ? 'onehaul-otp-helper' : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        {helperText && (
                            <Text
                                className={[
                                    'onehaul-input-helper-text',
                                    error ? 'onehaul-error' : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                {helperText}
                            </Text>
                        )}

                        {showCount && (
                            <span className="onehaul-input-count">
                                {inputValue.length}
                                {maxLength ? `/${maxLength}` : ''}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

// Add display name for better debugging
Input.displayName = 'Input';

export default Input;

import React from 'react';

export interface InputNumberProps {
    placeholder?: string;
    className?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    max?: number;
    min?: number;
    size?: 'md' | 'lg';
    style?: React.CSSProperties;
    disabled?: boolean;
    type?: 'text' | 'password' | 'textarea' | 'otp' | 'email' | 'number' | 'tel' | 'url';
    floated?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPressEnter?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: number;
    defaultValue?: number;
    error?: boolean;
    helperText?: string;
}

interface InputNumberComponent extends React.FC<InputNumberProps> {
    /**
     * OneHaul InputNumber component
     *
     * @example
     * ```jsx
     * <InputNumber
     *   placeholder="Enter a number"
     *   onChange={handleChange}
     * />
     * ```
     */
}

declare const InputNumber: InputNumberComponent;
export default InputNumber;

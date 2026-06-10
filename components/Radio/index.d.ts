import React from 'react';

export interface RadioProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    value?: any;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    size?: 'md' | 'lg';
}

export interface RadioGroupProps {
    value?: any;
    defaultValue?: any;
    disabled?: boolean;
    name?: string;
    options?: Array<{ label: React.ReactNode; value: any; disabled?: boolean }>;
    optionType?: 'default' | 'button';
    buttonStyle?: 'outline' | 'solid';
    size?: 'md' | 'lg';
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

interface RadioComponent extends React.FC<RadioProps> {
    /**
     * OneHaul Radio component
     *
     * @example
     * ```jsx
     * <Radio.Group value={value} onChange={onChange}>
     *   <Radio value="option1">Option 1</Radio>
     *   <Radio value="option2">Option 2</Radio>
     * </Radio.Group>
     * ```
     */
    Group: React.FC<RadioGroupProps>;
    Button: React.FC<RadioProps>;
}

declare const Radio: RadioComponent;
export default Radio;

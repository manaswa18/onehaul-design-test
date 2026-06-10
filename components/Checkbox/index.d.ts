import React from 'react';

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    size?: 'md' | 'lg';
}

export interface CheckboxGroupProps {
    value?: any[];
    defaultValue?: any[];
    disabled?: boolean;
    name?: string;
    options?: Array<{ label: React.ReactNode; value: any; disabled?: boolean; className?: string }>;
    onChange?: (checkedValues: any[]) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface CheckboxComponent extends React.FC<CheckboxProps> {
    /**
     * OneHaul Checkbox component
     *
     * @example
     * ```jsx
     * <Checkbox.Group value={checkedList} onChange={onChange}>
     *   <Checkbox value="option1">Option 1</Checkbox>
     *   <Checkbox value="option2">Option 2</Checkbox>
     * </Checkbox.Group>
     * ```
     */
    Group: React.FC<CheckboxGroupProps>;
}

declare const Checkbox: CheckboxComponent;
export default Checkbox;

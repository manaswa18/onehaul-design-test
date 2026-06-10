import React from 'react';
import { DropdownProps as AntDropdownProps } from 'antd';

export interface DropdownProps extends Omit<AntDropdownProps, 'className'> {
    children?: React.ReactNode;
    className?: string;
}

interface DropdownComponent extends React.FC<DropdownProps> {
    /**
     * OneHaul Dropdown component
     *
     * @example
     * ```jsx
     * <Dropdown menu={{ items }}>
     *   <Button>Click me</Button>
     * </Dropdown>
     * ```
     */
}

declare const Dropdown: DropdownComponent;
export default Dropdown;

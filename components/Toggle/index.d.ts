import React from 'react';

export interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    size?: 'md' | 'lg';
    onChange?: (checked: boolean, event: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    loading?: boolean;
    offLabel?: string;
    onLabel?: string;
}

interface ToggleComponent extends React.FC<ToggleProps> {
    /**
     * OneHaul Toggle component
     *
     * @example
     * ```jsx
     * <Toggle
     *   checked={isEnabled}
     *   onChange={handleToggle}
     * />
     * ```
     */
}

declare const Toggle: ToggleComponent;
export default Toggle;

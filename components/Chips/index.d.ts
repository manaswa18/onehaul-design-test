import React from 'react';

export interface ChipItem {
    key: string;
    label: string;
    icon?: string;
    disabled?: boolean;
}

export interface ChipsProps {
    size?: 'sm' | 'md';
    theme?: 'light' | 'line';
    multiple?: boolean;
    items?: ChipItem[];
    selected?: string[];
    setSelected?: (selected: string[]) => void;
    showCross?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

interface ChipsComponent extends React.FC<ChipsProps> {
    /**
     * OneHaul Chips component
     *
     * @example
     * ```jsx
     * <Chips
     *   theme="light"
     *   size="md"
     *   items={chipItems}
     *   selected={selected}
     *   setSelected={setSelected}
     * />
     * ```
     */
}

declare const Chips: ChipsComponent;
export default Chips;

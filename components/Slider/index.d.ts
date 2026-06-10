import React from 'react';

export interface SliderMarks {
    [key: number]: React.ReactNode | { style?: React.CSSProperties; label?: React.ReactNode };
}

export interface SliderProps {
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number | null;
    marks?: SliderMarks;
    dots?: boolean;
    included?: boolean;
    range?: boolean;
    reverse?: boolean;
    tooltip?: {
        open?: boolean;
        placement?: 'top' | 'left' | 'right' | 'bottom';
        getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
        formatter?: ((value?: number) => React.ReactNode) | null;
    };
    onChange?: (value: number | [number, number]) => void;
    onChangeComplete?: (value: number | [number, number]) => void;
    className?: string;
    style?: React.CSSProperties;
    size?: 'md' | 'lg';
    id?: string;
    autoFocus?: boolean;
    keyboard?: boolean;
}

interface SliderComponent extends React.FC<SliderProps> {
    /**
     * OneHaul Slider component
     *
     * @example
     * ```jsx
     * <Slider
     *   min={0}
     *   max={100}
     *   value={value}
     *   onChange={handleChange}
     * />
     * ```
     *
     * @example Range Slider
     * ```jsx
     * <Slider
     *   range
     *   min={0}
     *   max={100}
     *   value={[20, 50]}
     *   onChange={handleChange}
     * />
     * ```
     */
}

declare const Slider: SliderComponent;
export default Slider;

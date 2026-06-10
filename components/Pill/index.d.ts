import React from 'react';
import { TextProps } from '../Text';

export interface PillProps {
    color?:
        | 'default'
        | 'blue'
        | 'orange'
        | 'purple'
        | 'yellow'
        | 'magenta'
        | 'teal'
        | 'error'
        | 'success';
    size?: 'sm' | 'md';
    theme?: 'light' | 'dark' | 'line';
    icon?: React.ReactNode;
    showIcon?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    textProps?: TextProps;
}

interface PillComponent extends React.FC<PillProps> {
    /**
     * OneHaul Pill component
     *
     * @example
     * ```jsx
     * <Pill
     *   color="blue"
     *   size="md"
     *   theme="dark"
     *   icon="Home"
     * >
     *   Pill content
     * </Pill>
     * ```
     */
}

declare const Pill: PillComponent;
export default Pill;

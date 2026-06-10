import React from 'react';
import { TooltipProps } from '../Tooltip';

export interface TextProps {
    variant?: 'display' | 'heading' | 'body' | 'caption' | 'OVERLINE' | 'link' | 'abc';
    size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
    weight?: 'regular' | 'medium' | 'semibold';
    className?: string;
    level?: '1' | '2' | '3' | '4' | '5';
    style?: React.CSSProperties;
    children?: React.ReactNode;
    type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
    onClick?: (e: React.MouseEvent) => void;
    ellipsis?: boolean;
    tooltipProps?: TooltipProps;
}

interface TextComponent extends React.FC<TextProps> {
    /**
     * OneHaul Text component
     *
     * @example
     * ```jsx
     * <Text variant="heading" size="lg" weight="semibold">
     *   Heading Text
     * </Text>
     * ```
     */
}

declare const Text: TextComponent;
export default Text;

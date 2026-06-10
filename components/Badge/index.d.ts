import React from 'react';
import { BadgeProps as AntBadgeProps } from 'antd';

export interface BadgeProps extends Omit<AntBadgeProps, 'className' | 'color'> {
    children?: React.ReactNode;
    className?: string;
    overflowCount?: number;
    color?: string;
}

export interface BadgeRibbonProps {
    children?: React.ReactNode;
    className?: string;
    text?: string;
    color?: string;
    placement?: 'start' | 'end';
}

interface BadgeComponent extends React.FC<BadgeProps> {
    /**
     * OneHaul Badge component
     *
     * @example
     * ```jsx
     * <Badge count={5}>
     *   <Button>Notifications</Button>
     * </Badge>
     * ```
     */
    Ribbon: React.FC<BadgeRibbonProps>;
}

declare const Badge: BadgeComponent;
export default Badge;

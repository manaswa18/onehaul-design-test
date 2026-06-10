import React from 'react';

export interface TooltipProps {
    title?: React.ReactNode;
    placement?:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom';
    trigger?:
        | 'hover'
        | 'focus'
        | 'click'
        | 'contextMenu'
        | Array<'hover' | 'focus' | 'click' | 'contextMenu'>;
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    className?: string;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    color?: string;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    children?: React.ReactNode;
}

interface TooltipComponent extends React.FC<TooltipProps> {
    /**
     * OneHaul Tooltip component
     *
     * @example
     * ```jsx
     * <Tooltip title="Tooltip text" placement="top">
     *   <Button>Hover me</Button>
     * </Tooltip>
     * ```
     */
}

declare const Tooltip: TooltipComponent;
export default Tooltip;

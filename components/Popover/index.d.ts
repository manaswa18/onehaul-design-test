import React from 'react';

export interface PopoverProps {
    content?: React.ReactNode;
    title?: React.ReactNode;
    trigger?:
        | 'hover'
        | 'focus'
        | 'click'
        | 'contextMenu'
        | Array<'hover' | 'focus' | 'click' | 'contextMenu'>;
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
    visible?: boolean;
    defaultVisible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    className?: string;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
    children?: React.ReactNode;
}

interface PopoverComponent extends React.FC<PopoverProps> {
    /**
     * OneHaul Popover component
     *
     * @example
     * ```jsx
     * <Popover
     *   content="Popover content"
     *   title="Popover Title"
     *   trigger="click"
     * >
     *   <Button>Click me</Button>
     * </Popover>
     * ```
     */
}

declare const Popover: PopoverComponent;
export default Popover;

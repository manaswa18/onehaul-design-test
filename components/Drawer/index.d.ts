import React from 'react';

export interface DrawerProps {
    open?: boolean;
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    placement?: 'top' | 'right' | 'bottom' | 'left';
    width?: string | number;
    height?: string | number;
    mask?: boolean;
    maskClosable?: boolean;
    closable?: boolean;
    destroyOnClose?: boolean;
    className?: string;
    bodyStyle?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    extra?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
}

interface DrawerComponent extends React.FC<DrawerProps> {
    /**
     * OneHaul Drawer component
     *
     * @example
     * ```jsx
     * <Drawer
     *   open={visible}
     *   onClose={handleClose}
     *   title="Drawer Title"
     * >
     *   Content goes here
     * </Drawer>
     * ```
     */
}

declare const Drawer: DrawerComponent;
export default Drawer;

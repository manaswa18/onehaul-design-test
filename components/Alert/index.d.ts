import React from 'react';

export interface AlertProps {
    type?: 'default' | 'success' | 'info' | 'warning' | 'error';
    message?: React.ReactNode;
    description?: React.ReactNode;
    closable?: boolean;
    closeText?: React.ReactNode;
    icon?: React.ReactNode;
    showIcon?: boolean;
    banner?: boolean;
    onClose?: (e: React.MouseEvent) => void;
    afterClose?: () => void;
    className?: string;
    style?: React.CSSProperties;
    action?: React.ReactNode;
    theme?: 'light' | 'filled' | 'line';
    children?: React.ReactNode;
}

interface AlertComponent extends React.FC<AlertProps> {
    /**
     * OneHaul Alert component
     *
     * @example
     * ```jsx
     * <Alert
     *   type="success"
     *   message="Success message"
     *   showIcon
     * />
     * ```
     */
}

declare const Alert: AlertComponent;
export default Alert;

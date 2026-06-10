import React from 'react';

export interface NotificationConfig {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
    placement?: 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    type?: 'default' | 'success' | 'info' | 'warning' | 'error';
    theme?: 'light' | 'filled' | 'line';
}

export interface NotificationApi {
    success: (config: NotificationConfig) => void;
    error: (config: NotificationConfig) => void;
    info: (config: NotificationConfig) => void;
    warning: (config: NotificationConfig) => void;
    warn: (config: NotificationConfig) => void;
    open: (config: NotificationConfig) => void;
    close: (key: string) => void;
    destroy: () => void;
}

interface NotificationComponent extends NotificationApi {
    /**
     * OneHaul Notification component
     *
     * @example
     * ```jsx
     * notification.success({
     *   message: 'Success!',
     *   description: 'This is a success message'
     * });
     * ```
     */
}

declare const notification: NotificationComponent;
export default notification;

import React from 'react';
import { notification } from 'antd';
import Alert from '../Alert';
import './Notification.css';
import { Fail } from '@/icons';

const NotificationPlacement = {
    TOP_LEFT: 'topLeft',
    TOP_RIGHT: 'topRight',
    BOTTOM_LEFT: 'bottomLeft',
    BOTTOM_RIGHT: 'bottomRight',
};

const Notification = {
    ...NotificationPlacement,
    open: ({
        type = 'default',
        message,
        description,
        duration = 4,
        placement = 'bottomLeft',
        icon,
        theme = 'filled',
        closable = true,
        action = null,
        closeIcon = <Fail width={20} height={20} />,
    }) => {
        const key = `notification-${Date.now()}-${Math.random()}`;

        const Component = () => {
            return (
                <Alert
                    type={type}
                    message={message}
                    description={description}
                    showIcon={!!icon}
                    icon={icon}
                    theme={theme}
                    closable={closable}
                    onClose={() => Notification.close(key)}
                    action={action}
                    closeIcon={closeIcon}
                />
            );
        };

        notification.open({
            key,
            message: null,
            description: <Component />,
            duration,
            placement,
            className: `onehaul-notification onehaul-notification-${type} onehaul-notification-${theme}`,
        });

        return key;
    },

    default: (props) => Notification.open({ ...props, type: 'default' }),
    success: (props) => Notification.open({ ...props, type: 'success' }),
    info: (props) => Notification.open({ ...props, type: 'info' }),
    warning: (props) => Notification.open({ ...props, type: 'warning' }),
    error: (props) => Notification.open({ ...props, type: 'error' }),

    closeAll: () => {
        notification.destroy();
    },

    close: (key) => {
        notification.close(key);
    },
};

export default Notification;

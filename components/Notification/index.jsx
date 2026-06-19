import React from 'react';
import { notification, App } from 'antd';
import Alert from '../Alert';
import './Notification.css';
import { Fail } from '@/icons';

// Populated by NotificationProvider (rendered inside antd App context).
// Falls back to static notification if context isn't available yet.
let _api = null;

export const NotificationProvider = () => {
    const { notification: api } = App.useApp();
    React.useEffect(() => { _api = api; }, [api]);
    return null;
};

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

        (_api ?? notification).open({
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
        (_api ?? notification).destroy();
    },

    close: (key) => {
        if (_api) {
            _api.destroy(key);
        } else {
            notification.close(key);
        }
    },
};

export default Notification;

import React from 'react';
import { Alert as AntAlert } from 'antd';
import './Alert.css';
import Text from '../Text';
import { Fail } from '@/icons';

const ALERT_TYPES = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};

const Alert = ({
    className = '',
    type = 'default',
    message,
    description,
    closable = false,
    theme = 'light',
    icon = null,
    action = null,
    closeIcon = <Fail width={20} height={20} />,
    ...props
}) => {
    const alertClasses = [
        'onehaul-alert',
        className,
        `onehaul-alert-${type}`,
        `onehaul-alert-${theme}`,
    ].join(' ');

    return (
        <AntAlert
            className={alertClasses}
            type={ALERT_TYPES[type]}
            message={
                <Text weight="medium" className="onehaul-alert-message">
                    {message}
                </Text>
            }
            description={
                description ? (
                    <div className="onehaul-alert-description-container">
                        <Text className="onehaul-alert-description" size="sm">
                            {description}
                        </Text>

                        {action ? (
                            <div className="onehaul-alert-action-container">{action}</div>
                        ) : null}
                    </div>
                ) : null
            }
            showIcon={!!icon}
            closable={closable}
            icon={icon}
            closeIcon={closeIcon}
            action={null}
            // {...(!description && action ? { action } : {})}
            {...props}
        />
    );
};

export default Alert;

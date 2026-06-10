import React from 'react';
import { Tooltip as AntTooltip } from 'antd';
import './Tooltip.css';
import Text from '../Text';

const Tooltip = ({ children, className = '', title, placement = 'top', ...props }) => {
    if (!title) return children;

    let newTitle = title;

    if (typeof title === 'string') {
        newTitle = <Text className="onehaul-tooltip-content">{title}</Text>;
    }

    return (
        <AntTooltip
            className={`onehaul-tooltip ${className}`}
            title={newTitle}
            placement={placement}
            {...props}
        >
            {children}
        </AntTooltip>
    );
};

export default Tooltip;

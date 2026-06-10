import React from 'react';
import { Popover as AntPopover } from 'antd';
import './Popover.css';
import Text from '../Text';

const Popover = ({
    children,
    className = '',
    content,
    title,
    placement = 'top',
    trigger = 'hover',
    ...props
}) => (
    <AntPopover
        className={`onehaul-popover ${className}`}
        {...(content
            ? { content: <Text className="onehaul-popover-content">{content}</Text> }
            : {})}
        {...(title ? { title: <Text className="onehaul-popover-title">{title}</Text> } : {})}
        placement={placement}
        trigger={trigger}
        {...props}
    >
        {children}
    </AntPopover>
);

export default Popover;

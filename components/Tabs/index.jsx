import React from 'react';
import { Tabs as AntTabs } from 'antd';
import './Tabs.css';
import Label from './Label';

const positionMap = {
    horizontal: 'top',
    vertical: 'left',
};

const Tabs = ({
    position = 'horizontal',
    className,
    items = [],
    defaultActiveKey = '1',
    type = 'primary',
    fullWidth = false,
    ...props
}) => {
    const getTabItems = () => {
        return items.map((item) => ({
            key: item.key,
            label: (
                <Label prefix={item.prefix} suffix={item.suffix}>
                    {item.label}
                </Label>
            ),
            children: item.children,
        }));
    };

    const tabPosition = positionMap[position] || position;

    const classes = [
        'onehaul-tabs',
        `onehaul-tabs-${type}`,
        fullWidth ? 'full-width-tabs' : '',
        className || '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AntTabs
            {...props}
            className={classes}
            tabPosition={tabPosition}
            defaultActiveKey={defaultActiveKey}
            items={getTabItems()}
            type={type}
        />
    );
};
export default Tabs;

import React from 'react';
import { Slider as AntSlider } from 'antd';
import './Slider.css';
import { useMemo } from 'react';
import Text from '../Text';

const DEFAULT_MIN_VALUE = 0;

const Slider = ({
    className = '',
    disabled = false,
    getRangeLabel,
    showRange = true,
    ...props
}) => {
    const classes = ['onehaul-slider', disabled && 'onehaul-slider-disabled', className]
        .filter(Boolean)
        .join(' ');

    const rangeLabel = useMemo(() => {
        if (getRangeLabel && typeof getRangeLabel === 'function') {
            return getRangeLabel(props.value);
        }

        if (Array.isArray(props.value)) {
            return `${props.value[0]} - ${props.value[1]}`;
        }

        return `${props.min || DEFAULT_MIN_VALUE} - ${props.value}`;
    }, [getRangeLabel, props.value]);

    return (
        <div className="onehaul-slider-container">
            <AntSlider className={classes} disabled={disabled} {...props} />

            {showRange && rangeLabel && (
                <Text className="onehaul-slider-range-label">{rangeLabel}</Text>
            )}
        </div>
    );
};

export default Slider;

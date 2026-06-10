import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import './DatePicker.css';
import { Calendar } from '@/icons';
import dayjs from '../utils/dayjs';

const getDefaultFormat = ({ format, picker, showTime }) => {
    if (format) return format;

    if (picker === 'year') return 'YYYY';
    if (picker === 'month') return 'YYYY-MM';
    if (picker === 'quarter') return 'YYYY-[Q]Q';
    if (picker === 'week') return 'YYYY-wo';

    if (showTime) {
        return 'YYYY-MM-DD HH:mm:ss';
    }

    return 'YYYY-MM-DD';
};

const toDayjs = (val) => {
    if (!val) return null;
    const d = dayjs.isDayjs(val) ? val : dayjs(val);
    return d.isValid() ? d : null;
};

const toDate = (val) => {
    if (!val) return null;
    const d = dayjs(val);
    return d.isValid() ? d.toDate() : null;
};

const toStableKey = (val) => {
    if (val == null) return null;
    if (dayjs.isDayjs(val)) return val.valueOf();
    if (val instanceof Date) return val.getTime();
    if (typeof val === 'number') return val;
    return String(val);
};

const DatePicker = ({
    placeholder = 'Select date',
    variant = 'outlined',
    disabled = false,
    floated = true,
    format,
    showTime = false,
    picker = 'date',
    className = '',
    suffix = <Calendar width={16} height={16} />,
    prefix,
    clearable = true,
    error = false,
    value,
    minDate,
    maxDate,
    onChange,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const valueKey = toStableKey(value);
    const minKey = toStableKey(minDate);
    const maxKey = toStableKey(maxDate);

    const antValue = React.useMemo(() => toDayjs(value), [valueKey]);
    const antMinDate = React.useMemo(() => toDayjs(minDate), [minKey]);
    const antMaxDate = React.useMemo(() => toDayjs(maxDate), [maxKey]);

    const classes = [
        'onehaul-datepicker',
        `onehaul-datepicker-${variant}`,
        disabled && 'onehaul-datepicker-disabled',
        error && 'onehaul-datepicker-error',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const labelClasses = [
        'onehaul-datepicker-label',
        `onehaul-datepicker-label-${variant}`,
        isFocused && 'onehaul-datepicker-label-focused',
        value && 'onehaul-datepicker-label-has-value',
        prefix && 'onehaul-datepicker-label-has-prefix',
        error && 'onehaul-datepicker-label-error',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="onehaul-datepicker-container">
            <AntDatePicker
                {...props}
                disabled={disabled}
                placeholder={floated ? '' : placeholder}
                picker={picker}
                format={getDefaultFormat({ format, picker, showTime })}
                variant={variant}
                showTime={showTime && picker === 'date'}
                className={classes}
                onFocus={(date) => {
                    setIsFocused(true);
                    onFocus?.(toDate(date));
                }}
                onBlur={(date) => {
                    setIsFocused(false);
                    onBlur?.(toDate(date));
                }}
                suffixIcon={suffix}
                onChange={(date) => onChange?.(toDate(date))}
                prefix={prefix}
                allowClear={clearable}
                value={antValue}
                {...(antMinDate ? { minDate: antMinDate } : {})}
                {...(antMaxDate ? { maxDate: antMaxDate } : {})}
            />

            {floated && placeholder && <label className={labelClasses}>{placeholder}</label>}
        </div>
    );
};

export default DatePicker;

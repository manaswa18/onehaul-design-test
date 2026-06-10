import React from 'react';
import { DatePickerProps as AntDatePickerProps, RangePickerProps } from 'antd';

export type DatePickerVariant = 'outlined' | 'borderless' | 'filled' | 'underlined';
export type DatePickerPicker = 'date' | 'week' | 'month' | 'quarter' | 'year';

export const DatePickerVariants = ['outlined', 'borderless', 'filled', 'underlined'] as const;
export const DatePickerPickers = ['date', 'week', 'month', 'quarter', 'year'] as const;

export interface DatePickerProps extends Omit<AntDatePickerProps, 'size' | 'variant' | 'picker'> {
    clearable?: boolean;
    suffixIcon?: React.ReactNode;
    prefix?: React.ReactNode;
    format?: string;
    showTime?: boolean;
    picker?: DatePickerPicker;
    className?: string;
    variant?: DatePickerVariant;
    disabled?: boolean;
    floated?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    onToday?: () => void;
    onCalendarChange?: (date: moment.Moment | null) => void;
    showToday?: boolean;
    showTime?: boolean;
    error?: boolean;
}

interface DatePickerComponent extends React.FC<DatePickerProps> {
    /**
     * OneHaul DatePicker component - A wrapper around Ant Design DatePicker
     *
     * @example
     * ```jsx
     * <DatePicker
     *   size="lg"
     *   variant="primary"
     *   placeholder="Select date"
     *   onChange={handleDateChange}
     * />
     * ```
     *
     * @example Range picker
     * ```jsx
     * <DatePicker
     *   mode="range"
     *   placeholder={['Start date', 'End date']}
     *   onChange={handleRangeChange}
     * />
     * ```
     *
     * @example With time picker
     * ```jsx
     * <DatePicker
     *   showTime
     *   placeholder="Select date and time"
     *   onChange={handleDateTimeChange}
     * />
     * ```
     *
     * @example Month picker
     * ```jsx
     * <DatePicker
     *   picker="month"
     *   placeholder="Select month"
     *   onChange={handleMonthChange}
     * />
     * ```
     */
}

declare const DatePicker: DatePickerComponent;

export default DatePicker;

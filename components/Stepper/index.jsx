import React from 'react';
import { Steps } from 'antd';
import Text from '../Text';
import './Stepper.css';
import { Tick, Error } from '@/icons';

const Stepper = ({
    items = [],
    direction = 'horizontal',
    type = 'default',
    className = '',
    status = '',
    labelPlacement = 'horizontal',
    current = 0,
    onChange = () => {},
    ...props
}) => {
    const getStepperClassName = () => {
        const classes = [
            'onehaul-stepper',
            `onehaul-stepper-${direction}`,
            `onehaul-stepper-${type}`,
            direction === 'vertical' && labelPlacement === 'vertical'
                ? `onehaul-stepper-vertical-label`
                : '',
            className,
        ];
        return classes.filter(Boolean).join(' ');
    };

    const getTextColor = (style, stepStatus) => {
        if (style === 'default') {
            return stepStatus === 'error'
                ? 'var(--theme-color-error-100)'
                : stepStatus === 'finish'
                ? 'var(--theme-color-grey-100)'
                : stepStatus === 'process'
                ? 'var(--theme-color-primary-60)'
                : 'var(--theme-color-grey-40)';
        } else {
            return stepStatus === 'error'
                ? 'var(--theme-color-error-100)'
                : stepStatus === 'finish'
                ? 'var(--theme-color-success-1)'
                : stepStatus === 'process'
                ? 'var(--theme-color-grey-100)'
                : 'var(--theme-color-grey-40)';
        }
    };

    // Custom click handler that only allows clicking on steps before the current step
    const handleStepClick = (index) => {
        if (index <= current && !status) {
            onChange(index);
        }
    };

    const ITEMS = items.map((step, index) => {
        let stepStatus;
        let icon;
        // Determine if step should be disabled (steps after current are disabled)
        const isDisabled = index > current || step.disabled || status === 'error';

        if (status === 'error' && index === current) {
            stepStatus = 'error';

            icon = (
                <div className={`step-icon onehaul-stepper-icon-error-${type}`}>
                    <Error
                        className={`onehaul-stepper-icon-tick ${`onehaul-stepper-icon-tick-${type}-error`} error-icon`}
                    />
                </div>
            );
        } else if (index < current) {
            stepStatus = 'finish';
            icon = (
                <div className={`step-icon completed ${`onehaul-stepper-icon-completed-${type}`}`}>
                    <Tick
                        className={`onehaul-stepper-icon-tick ${`onehaul-stepper-icon-tick-${type}-completed`}`}
                    />
                </div>
            );
        } else if (index === current) {
            stepStatus = 'process';
            if (type === 'default') {
                icon = (
                    <div className="step-icon current">
                        <div className="step-icon-dot" />
                    </div>
                );
            } else {
                icon = <div className="step-number">{index + 1}</div>;
            }
        } else {
            stepStatus = 'wait';
            if (type === 'default') {
                icon = (
                    <div className="step-icon disabled">
                        <div className="step-icon-dot" />
                    </div>
                );
            } else {
                icon = <div className="step-number disabled">{index + 1}</div>;
            }
        }

        return {
            title: (
                <Text
                    style={{
                        color: getTextColor(type, stepStatus, status),
                        cursor: isDisabled ? 'default' : 'pointer',
                    }}
                    variant="body"
                    weight={stepStatus === 'wait' ? 'regular' : 'medium'}
                    size="md"
                >
                    {step.title}
                </Text>
            ),
            description: (
                <Text style={{ color: 'var(--theme-color-grey-40)' }} size="sm" variant="body">
                    {step.description}
                </Text>
            ),
            status: stepStatus,
            disabled: isDisabled,
            icon: icon,
        };
    });

    return (
        <Steps
            className={getStepperClassName()}
            progressDot={false}
            labelPlacement={labelPlacement}
            direction={direction}
            current={current}
            status={status}
            items={ITEMS}
            onChange={handleStepClick}
            {...props}
        />
    );
};

export default Stepper;

import React from 'react';

export interface StepProps {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    description?: React.ReactNode;
    status?: 'wait' | 'process' | 'finish' | 'error';
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export interface StepperProps {
    current?: number;
    direction?: 'horizontal' | 'vertical';
    labelPlacement?: 'horizontal' | 'vertical';
    progressDot?:
        | boolean
        | ((
              iconDot: React.ReactNode,
              { index, status, title, description }: any
          ) => React.ReactNode);
    size?: 'default' | 'small';
    status?: 'wait' | 'process' | 'finish' | 'error' | '';
    type?: 'default' | 'number';
    /**
     * Callback when a step is clicked
     * Note: Only steps before or equal to the current step are clickable
     * @param current The index of the clicked step
     */
    onChange?: (current: number) => void;
    className?: string;
    style?: React.CSSProperties;
    items?: StepProps[];
    children?: React.ReactNode;
}

interface StepperComponent extends React.FC<StepperProps> {
    /**
     * OneHaul Stepper component
     *
     * @example
     * ```jsx
     * <Stepper current={currentStep} onChange={handleStepChange}>
     *   <Stepper.Step title="Step 1" description="Description 1" />
     *   <Stepper.Step title="Step 2" description="Description 2" />
     *   <Stepper.Step title="Step 3" description="Description 3" />
     * </Stepper>
     * ```
     */
    Step: React.FC<StepProps>;
}

declare const Stepper: StepperComponent;
export default Stepper;

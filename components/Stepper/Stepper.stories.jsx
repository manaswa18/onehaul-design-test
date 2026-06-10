import React, { useState } from 'react';
import Stepper from './index';

export default {
    title: 'Components/Stepper',
    component: Stepper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'radio',
            options: ['default', 'number'],
            description: 'Type of step indicator',
        },
        direction: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'Direction of the step bar',
        },
        labelPlacement: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'Placement of the step label',
        },
        status: {
            control: 'radio',
            options: ['', 'error'],
            description: 'Status of the current step',
        },
        current: {
            control: { type: 'number', min: 0, max: 3 },
            description: 'Current step index',
        },
        onChange: { action: 'changed' },
    },
};

// Default stepper items
const defaultItems = [
    {
        title: 'Step 1',
        description: 'This is step 1',
    },
    {
        title: 'Step 2',
        description: 'This is step 2',
    },
    {
        title: 'Step 3',
        description: 'This is step 3',
    },
    {
        title: 'Step 4',
        description: 'This is step 4',
    },
];

const Template = (args) => <Stepper {...args} />;

// Basic Stepper
export const Default = Template.bind({});
Default.args = {
    items: defaultItems,
    type: 'default',
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    current: 1,
    status: '',
};

// Type Variations
export const DefaultType = Template.bind({});
DefaultType.args = {
    ...Default.args,
    type: 'default',
};

export const NumberType = Template.bind({});
NumberType.args = {
    ...Default.args,
    type: 'number',
};

// Direction Variations
export const HorizontalDirection = Template.bind({});
HorizontalDirection.args = {
    ...Default.args,
    direction: 'horizontal',
};

export const VerticalDirection = Template.bind({});
VerticalDirection.args = {
    ...Default.args,
    direction: 'vertical',
};

// Label Placement Variations
export const HorizontalLabelPlacement = Template.bind({});
HorizontalLabelPlacement.args = {
    ...Default.args,
    labelPlacement: 'horizontal',
};

export const VerticalLabelPlacement = Template.bind({});
VerticalLabelPlacement.args = {
    ...Default.args,
    labelPlacement: 'vertical',
};

// Status Variations
export const FinishStatus = Template.bind({});
FinishStatus.args = {
    ...Default.args,
    status: '',
};

export const ErrorStatus = Template.bind({});
ErrorStatus.args = {
    ...Default.args,
    status: 'error',
};

// Combined Variations
export const VerticalWithVerticalLabel = Template.bind({});
VerticalWithVerticalLabel.args = {
    ...Default.args,
    direction: 'vertical',
    labelPlacement: 'vertical',
};

export const NumberWithError = Template.bind({});
NumberWithError.args = {
    ...Default.args,
    type: 'number',
    status: 'error',
};

export const VerticalNumberWithError = Template.bind({});
VerticalNumberWithError.args = {
    ...Default.args,
    type: 'number',
    direction: 'vertical',
    status: 'error',
};

// Interactive Stepper with click handling
export const InteractiveStepper = () => {
    const [currentStep, setCurrentStep] = useState(2);

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    return (
        <div>
            <h3>Interactive Stepper (Current Step: {currentStep})</h3>
            <p>You can click on steps before or equal to the current step</p>
            <Stepper
                items={defaultItems}
                type="default"
                direction="horizontal"
                labelPlacement="horizontal"
                current={currentStep}
                onChange={handleStepChange}
            />
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() =>
                        setCurrentStep(Math.min(currentStep + 1, defaultItems.length - 1))
                    }
                >
                    Next Step
                </button>
                <button
                    onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
                    style={{ marginLeft: '10px' }}
                >
                    Previous Step
                </button>
            </div>
        </div>
    );
};

// Complete Variations Grid
export const AllCombinations = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
            <h3>Horizontal Direction, Horizontal Label Placement</h3>
            <div style={{ marginBottom: '20px' }}>
                <h4>Default Type</h4>
                <Stepper
                    items={defaultItems}
                    type="default"
                    direction="horizontal"
                    labelPlacement="horizontal"
                    current={1}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Default Type with Error</h4>
                <Stepper
                    items={defaultItems}
                    type="default"
                    direction="horizontal"
                    labelPlacement="horizontal"
                    current={1}
                    status="error"
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Number Type</h4>
                <Stepper
                    items={defaultItems}
                    type="number"
                    direction="horizontal"
                    labelPlacement="horizontal"
                    current={1}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Number Type with Error</h4>
                <Stepper
                    items={defaultItems}
                    type="number"
                    direction="horizontal"
                    labelPlacement="horizontal"
                    current={1}
                    status="error"
                />
            </div>
        </div>

        <div>
            <h3>Horizontal Direction, Vertical Label Placement</h3>
            <div style={{ marginBottom: '20px' }}>
                <h4>Default Type</h4>
                <Stepper
                    items={defaultItems}
                    type="default"
                    direction="horizontal"
                    labelPlacement="vertical"
                    current={1}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Default Type with Error</h4>
                <Stepper
                    items={defaultItems}
                    type="default"
                    direction="horizontal"
                    labelPlacement="vertical"
                    current={1}
                    status="error"
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Number Type</h4>
                <Stepper
                    items={defaultItems}
                    type="number"
                    direction="horizontal"
                    labelPlacement="vertical"
                    current={1}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <h4>Number Type with Error</h4>
                <Stepper
                    items={defaultItems}
                    type="number"
                    direction="horizontal"
                    labelPlacement="vertical"
                    current={1}
                    status="error"
                />
            </div>
        </div>

        <div>
            <h3>Vertical Direction, Horizontal Label Placement</h3>
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div>
                    <h4>Default Type</h4>
                    <Stepper
                        items={defaultItems}
                        type="default"
                        direction="vertical"
                        labelPlacement="horizontal"
                        current={1}
                    />
                </div>
                <div>
                    <h4>Default Type with Error</h4>
                    <Stepper
                        items={defaultItems}
                        type="default"
                        direction="vertical"
                        labelPlacement="horizontal"
                        current={1}
                        status="error"
                    />
                </div>
                <div>
                    <h4>Number Type</h4>
                    <Stepper
                        items={defaultItems}
                        type="number"
                        direction="vertical"
                        labelPlacement="horizontal"
                        current={1}
                    />
                </div>
                <div>
                    <h4>Number Type with Error</h4>
                    <Stepper
                        items={defaultItems}
                        type="number"
                        direction="vertical"
                        labelPlacement="horizontal"
                        current={1}
                        status="error"
                    />
                </div>
            </div>
        </div>

        <div>
            <h3>Vertical Direction, Vertical Label Placement</h3>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div>
                    <h4>Default Type</h4>
                    <Stepper
                        items={defaultItems}
                        type="default"
                        direction="vertical"
                        labelPlacement="vertical"
                        current={1}
                    />
                </div>
                <div>
                    <h4>Default Type with Error</h4>
                    <Stepper
                        items={defaultItems}
                        type="default"
                        direction="vertical"
                        labelPlacement="vertical"
                        current={1}
                        status="error"
                    />
                </div>
                <div>
                    <h4>Number Type</h4>
                    <Stepper
                        items={defaultItems}
                        type="number"
                        direction="vertical"
                        labelPlacement="vertical"
                        current={1}
                    />
                </div>
                <div>
                    <h4>Number Type with Error</h4>
                    <Stepper
                        items={defaultItems}
                        type="number"
                        direction="vertical"
                        labelPlacement="vertical"
                        current={1}
                        status="error"
                    />
                </div>
            </div>
        </div>
    </div>
);

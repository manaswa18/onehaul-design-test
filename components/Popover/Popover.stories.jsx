import React from 'react';
import Popover from './index';
import Button from '../Button';

export default {
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: 'text',
            description: 'The content of the popover',
            table: { type: { summary: 'ReactNode' } },
        },
        title: {
            control: 'text',
            description: 'The title of the popover',
            table: { type: { summary: 'ReactNode' } },
        },
        placement: {
            control: 'select',
            description: 'The placement of the popover',
            options: [
                'top',
                'left',
                'right',
                'bottom',
                'topLeft',
                'topRight',
                'bottomLeft',
                'bottomRight',
                'leftTop',
                'leftBottom',
                'rightTop',
                'rightBottom',
            ],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' },
            },
        },
        className: {
            control: 'text',
            description: 'The class name of the popover',
            table: { type: { summary: 'string' } },
        },
        trigger: {
            control: 'select',
            description: 'The trigger of the popover',
            options: ['hover', 'click', 'focus'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'hover' },
            },
        },
    },
};

const Template = (args) => (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
        <Popover {...args}>
            <Button variant="primary">Click me</Button>
        </Popover>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    content: 'This is the content of the popover',
    title: 'Popover Title',
    placement: 'top',
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
    content: 'This is a popover without a title',
    placement: 'right',
};

export const ClickTrigger = Template.bind({});
ClickTrigger.args = {
    content: 'This popover appears on click',
    title: 'Click Triggered',
    placement: 'bottom',
    trigger: 'click',
};

export const ComplexContent = Template.bind({});
ComplexContent.args = {
    content: (
        <div>
            <p>You can include more complex content in popovers:</p>
            <ul>
                <li>Like bullet points</li>
                <li>Multiple paragraphs</li>
                <li>Or even other components</li>
            </ul>
        </div>
    ),
    title: 'Complex Content',
    placement: 'top',
};

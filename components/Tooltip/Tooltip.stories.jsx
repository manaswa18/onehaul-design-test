import React from 'react';
import Tooltip from './index';
import Button from '../Button';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the tooltip',
            table: { type: { summary: 'string' } },
        },
        placement: {
            control: 'select',
            description: 'The placement of the tooltip',
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
            description: 'The class name of the tooltip',
            table: { type: { summary: 'string' } },
        },
        trigger: {
            control: 'select',
            description: 'The trigger of the tooltip',
            options: ['hover', 'click', 'focus', 'contextMenu'],
            table: { type: { summary: 'string' }, defaultValue: { summary: 'hover' } },
        },
    },
};

const Template = (args) => (
    <div style={{ padding: '50px', display: 'flex', justifyContent: 'center' }}>
        <Tooltip {...args}>
            <Button variant="primary">Hover me</Button>
        </Tooltip>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    title: 'This is a tooltip',
    placement: 'top',
};

export const BottomPlacement = Template.bind({});
BottomPlacement.args = {
    title: 'Tooltip at the bottom',
    placement: 'bottom',
};

export const CustomTrigger = Template.bind({});
CustomTrigger.args = {
    title: 'Tooltip with click trigger',
    placement: 'top',
    trigger: 'click',
};

export const LongContent = Template.bind({});
LongContent.args = {
    title: 'This is a tooltip with a lot of content. It can span multiple lines and provide detailed information to the user.',
    placement: 'top',
};

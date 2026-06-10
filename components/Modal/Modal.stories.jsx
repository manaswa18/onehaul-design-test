import React, { useState } from 'react';
import Modal from './index';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import { Nav } from '@/icons';

export default {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title of the modal',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        subtitle: {
            control: 'text',
            description: 'Subtitle of the modal',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        open: {
            control: 'boolean',
            description: 'Whether the modal is visible or not',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        width: {
            control: 'number',
            description: 'Width of the modal',
            table: {
                type: { summary: 'string | number' },
                defaultValue: { summary: 520 },
            },
        },
        centered: {
            control: 'boolean',
            description: 'Whether to center the modal vertically',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        closable: {
            control: 'boolean',
            description: 'Whether the modal can be closed by clicking the close button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        maskClosable: {
            control: 'boolean',
            description: 'Whether to close the modal when the mask is clicked',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        footer: {
            control: 'object',
            description: 'Footer content of the modal',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        okText: {
            control: 'text',
            description: 'Text of the OK button',
            table: {
                type: { summary: 'ReactNode' },
                defaultValue: { summary: 'OK' },
            },
        },
        cancelText: {
            control: 'text',
            description: 'Text of the Cancel button',
            table: {
                type: { summary: 'ReactNode' },
                defaultValue: { summary: 'Cancel' },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Modal component to display content in a floating layer. Uses custom components from OneHaul UI library.',
            },
        },
    },
};

export const Template = (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal {...args} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        </>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    title: 'Basic Modal',
    children: 'This is a basic modal with custom OneHaul buttons',
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
    ...Basic.args,
    icon: <Nav />,
    subtitle: 'This is a subtitle',
};

export const FullScreen = Basic.bind({});
FullScreen.args = {
    ...Basic.args,
    placement: 'fullscreen',
};

export const WithSubtitle = Basic.bind({});
WithSubtitle.args = {
    title: 'Basic Modal',
    children: 'This is a basic modal with custom OneHaul buttons',
    subtitle: 'This is a subtitle',
};

export const WithCustomComponents = Template.bind({});
WithCustomComponents.args = {
    title: 'Modal with Custom Components',
    children: (
        <div>
            <p>This modal contains custom OneHaul components:</p>
            <div style={{ marginBottom: 16 }}>
                <Checkbox>I agree to terms and conditions</Checkbox>
            </div>
            <div>
                <Radio.Group defaultValue="a">
                    <Radio value="a">Option A</Radio>
                    <Radio value="b">Option B</Radio>
                    <Radio value="c">Option C</Radio>
                </Radio.Group>
            </div>
        </div>
    ),
};

export const CustomFooter = Template.bind({});
CustomFooter.args = {
    title: 'Custom Footer Modal',
    children: 'This modal has a custom footer with OneHaul buttons',
    footer: (
        <>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary" loading>
                Submit
            </Button>
        </>
    ),
};

export const PlacementTransitions = (args) => {
    const [placement, setPlacement] = useState('center');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const placements = ['center', 'top', 'bottom', 'left', 'right', 'fullscreen'];

    const showModal = (selectedPlacement) => {
        setPlacement(selectedPlacement);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {placements.map((p) => (
                    <Button
                        key={p}
                        type="primary"
                        onClick={() => showModal(p)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        Open {p} Modal
                    </Button>
                ))}
            </div>
            <Modal
                {...args}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                placement={placement}
                title={`${placement.charAt(0).toUpperCase() + placement.slice(1)} Placement Modal`}
                subtitle={`This modal appears from the ${placement} with smooth transitions`}
            />
        </>
    );
};

PlacementTransitions.args = {
    children:
        'This modal demonstrates different placement transitions. Notice how the modal slides in from different directions based on its placement.',
    width: 520,
};

PlacementTransitions.parameters = {
    docs: {
        description: {
            story: 'Demonstrates all available modal placements with their respective entrance and exit transitions. Each placement has unique animation effects that enhance the user experience.',
        },
    },
};

export const DestructiveModal = (args) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal.Destructive {...args} open={isModalOpen} onCancel={onCancel} onOk={onCancel} />
        </>
    );
};

DestructiveModal.args = {
    title: 'Destructive Action',
    children: 'This is a destructive action and cannot be undone',
};

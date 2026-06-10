import React, { useState } from 'react';
import Drawer from './index';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import { Home } from '@/icons';

export default {
    title: 'Components/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title of the drawer',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the drawer',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        open: {
            control: 'boolean',
            description: 'Whether the drawer is visible or not',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        placement: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left'],
            description: 'The placement of the drawer',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'right' },
            },
        },
        width: {
            control: 'number',
            description: 'Width of the drawer (when placement is right or left)',
            table: {
                type: { summary: 'string | number' },
                defaultValue: { summary: 378 },
            },
        },
        height: {
            control: 'number',
            description: 'Height of the drawer (when placement is top or bottom)',
            table: {
                type: { summary: 'string | number' },
                defaultValue: { summary: 378 },
            },
        },
        closable: {
            control: 'boolean',
            description: 'Whether a close button is visible on top right of the drawer',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        footer: {
            control: 'object',
            description: 'Footer content of the drawer',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        className: {
            control: 'text',
            description: 'Custom class name for the drawer',
            table: {
                type: { summary: 'string' },
            },
        },
        icon: {
            control: 'ReactNode',
            description: 'Icon for the header',
            table: {
                type: { summary: 'ReactNode' },
                defaultValue: { summary: null },
            },
        },
        maskClosable: {
            control: 'boolean',
            description: 'Whether clicking on the overlay should close the drawer',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'Drawer component to display content in a sliding panel. Wraps Ant Design Drawer with OneHaul styling.',
            },
        },
    },
};

export const Basic = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

Basic.args = {
    title: 'Basic Drawer',
    children: 'This is a basic drawer with custom OneHaul styling',
};

export const WithHeaderIcon = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

WithHeaderIcon.args = {
    title: 'Drawer with Header Icon',
    icon: Home,
};

export const RightPlacement = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

RightPlacement.args = {
    title: 'Right Drawer',
    placement: 'right',
    children: 'This drawer slides in from the right side',
};

export const LeftPlacement = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

LeftPlacement.args = {
    title: 'Left Drawer',
    placement: 'left',
    children: 'This drawer slides in from the left side',
};

export const TopPlacement = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

TopPlacement.args = {
    title: 'Top Drawer',
    placement: 'top',
    children: 'This drawer slides down from the top',
};

export const BottomPlacement = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

BottomPlacement.args = {
    title: 'Bottom Drawer',
    placement: 'bottom',
    children: 'This drawer slides up from the bottom',
};

export const WithCustomComponents = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

WithCustomComponents.args = {
    title: 'Drawer with Custom Components',
    children: (
        <div>
            <p>This drawer contains custom OneHaul components:</p>
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

export const WithSubtitle = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

WithSubtitle.args = {
    title: 'Title',
    children: 'This drawer has a custom footer with OneHaul buttons',
    subtitle: 'Subtitle',
    footer: (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <Button variant="secondary" onClick={() => {}} style={{ width: '100%' }}>
                Cancel
            </Button>

            <Button variant="primary" onClick={() => {}} style={{ width: '100%' }}>
                Save
            </Button>
        </div>
    ),
};

export const WithFooter = (args) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={onClose} />
        </>
    );
};

WithFooter.args = {
    title: 'Drawer with Footer',
    children: 'This drawer has a custom footer with OneHaul buttons',
    footer: (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
            <Button variant="secondary" onClick={() => {}} style={{ width: '100%' }}>
                Cancel
            </Button>

            <Button variant="primary" onClick={() => {}} style={{ width: '100%' }}>
                Save
            </Button>
        </div>
    ),
};

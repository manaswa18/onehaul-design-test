import React, { useState } from 'react';
import Button from '../Button';
import Placeholder from './index';
import Toggle from '../Toggle';

export default {
    title: 'Components/Placeholder',
    component: Placeholder,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Placeholder component that wraps the Ant Design Skeleton component with OneHaul styling.',
            },
        },
    },
    args: {
        active: true,
        size: 'md',
        loading: true,
    },
    argTypes: {
        active: {
            control: 'boolean',
            description: 'Show animation effect',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        loading: {
            control: 'boolean',
            description: 'Show animation effect',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        className: {
            control: 'text',
            description: 'Class name of the placeholder',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            control: 'text',
            description: 'Content of the placeholder',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        width: {
            control: 'text',
            description: 'Width of the placeholder',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '100%' },
            },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the placeholder',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
    },
};

export const Default = (args) => <Placeholder.Paragraph {...args} />;

export const Avatar = () => <Placeholder.Avatar size="lg" />;

export const Sizes = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h4>Small</h4>
        <Placeholder size="sm" />

        <h4>Default</h4>
        <Placeholder size="md" />

        <h4>Large</h4>
        <Placeholder size="lg" />
    </div>
);

export const WithContent = () => {
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexDirection: 'column' }}>
                <Toggle checked={loading} onChange={setLoading} />

                <Button
                    variant="primary"
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 2000);
                    }}
                >
                    Show content after 2 seconds
                </Button>
            </div>

            <Placeholder loading={loading} width="50%">
                <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 4 }}>
                    <h3>Content is loaded!</h3>
                    <p>This content appears when loading is false.</p>
                </div>
            </Placeholder>
        </div>
    );
};

export const ImagePlaceholder = () => <Placeholder.Image />;

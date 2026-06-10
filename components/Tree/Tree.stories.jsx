import React from 'react';
import Tree from './index';
import { Doc, Menu, Settings } from '@/icons';

export default {
    title: 'Components/Tree',
    component: Tree,
    tags: ['autodocs'],
    argTypes: {
        treeData: {
            control: 'object',
            description: 'Tree data',
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: [] },
            },
        },
        defaultExpandedKeys: {
            control: 'object',
            description: 'Default expanded keys',
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: [] },
            },
        },
        value: {
            control: 'object',
            description: 'Checked keys',
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: [] },
            },
        },
        onChange: {
            control: 'function',
            description: 'Change handler',
            table: {
                type: { summary: 'function' },
            },
        },
        onLoadData: {
            control: 'function',
            description: 'Async data loading function',
            table: {
                type: { summary: 'function' },
            },
        },
        size: {
            options: ['sm', 'md', 'lg'],
            control: { type: 'select' },
            description: 'Size of the tree',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
            },
        },
        checkable: {
            control: 'boolean',
            description: 'Whether tree nodes are checkable',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        selectable: {
            control: 'boolean',
            description: 'Whether tree nodes are selectable',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        showLine: {
            control: 'boolean',
            description: 'Whether to show connecting lines',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        showIcon: {
            control: 'boolean',
            description: 'Whether to show node icons',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        draggable: {
            control: 'boolean',
            description: 'Whether tree nodes are draggable',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        multiple: {
            control: 'boolean',
            description: 'Whether multiple nodes can be selected',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the tree is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};

const basicTreeData = [
    {
        label: 'Parent Node 1',
        value: 'parent-1',

        children: [
            {
                label: 'Child Node 1-1',
                value: 'child-1-1',
                children: [
                    {
                        label: 'Grandchild 1-1-1',
                        value: 'grandchild-1-1-1',
                    },
                    {
                        label: 'Grandchild 1-1-2',
                        value: 'grandchild-1-1-2',
                    },
                ],
            },
            {
                label: 'Child Node 1-2',
                value: 'child-1-2',
            },
        ],
    },
    {
        label: 'Parent Node 2',
        value: 'parent-2',
    },
    {
        label: 'Parent Node 3',
        value: 'parent-3',
    },
];

const iconTreeData = [
    {
        label: 'Documents',
        value: 'documents',
        icon: <Menu width={16} height={16} />,
        children: [
            {
                label: 'Project Files',
                value: 'project-files',
                icon: <Menu width={16} height={16} />,
                children: [
                    {
                        label: 'README.md',
                        value: 'readme',
                        icon: <Doc width={16} height={16} />,
                        isLeaf: true,
                    },
                    {
                        label: 'package.json',
                        value: 'package',
                        icon: <Doc width={16} height={16} />,
                        isLeaf: true,
                    },
                ],
            },
            {
                label: 'Settings',
                value: 'settings',
                icon: <Settings width={16} height={16} />,
                children: [
                    {
                        label: 'config.json',
                        value: 'config',
                        icon: <Doc width={16} height={16} />,
                        isLeaf: true,
                    },
                ],
            },
        ],
    },
];

const Template = (args) => {
    const [value, setValue] = React.useState(args.value);

    return <Tree {...args} value={value} onChange={setValue} />;
};

export const Basic = {
    render: Template,
    args: {
        treeData: basicTreeData,
        defaultExpandedKeys: ['parent-1'],
        value: ['child-2-2'],
        checkable: true,
    },
};

export const WithIcons = {
    render: Template,
    args: {
        treeData: iconTreeData,
        showIcon: true,
        defaultExpandedKeys: ['documents', 'project-files'],
    },
};

export const WithLines = {
    render: Template,
    args: {
        treeData: basicTreeData,
        showLine: true,
        defaultExpandedKeys: ['parent-1', 'child-1-1'],
    },
};

export const Draggable = {
    render: Template,
    args: {
        treeData: basicTreeData,
        draggable: true,
        defaultExpandedKeys: ['parent-1'],
    },
};

export const SmallSize = {
    render: Template,
    args: {
        treeData: basicTreeData,
        size: 'sm',
        defaultExpandedKeys: ['parent-1'],
    },
};

export const LargeSize = {
    render: Template,
    args: {
        treeData: basicTreeData,
        size: 'lg',
        checkable: true,
        showIcon: false,
        showLine: true,
        defaultExpandedKeys: ['parent-1'],
    },
};

export const Disabled = {
    render: Template,
    args: {
        treeData: basicTreeData,
        disabled: true,
        defaultExpandedKeys: ['parent-1'],
    },
};

export const Multiple = {
    render: Template,
    args: {
        treeData: basicTreeData,
        multiple: true,
        defaultExpandedKeys: ['parent-1', 'parent-2'],
    },
};

// New story for async loading
export const AsyncLoading = {
    render: () => {
        const [treeData, setTreeData] = React.useState([
            {
                label: 'Root Node 1',
                value: 'root-1',
                isLeaf: false,
            },
            {
                label: 'Root Node 2',
                value: 'root-2',
                isLeaf: false,
            },
        ]);

        const loadData = async (node) => {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Return different data based on the node level
            if (node.key.startsWith('root-')) {
                return [
                    {
                        label: `Level 1 - ${node.key}`,
                        value: `level1-${node.key}`,
                        isLeaf: false,
                    },
                    {
                        label: `Level 1 - ${node.key} (Leaf)`,
                        value: `level1-leaf-${node.key}`,
                        isLeaf: true,
                    },
                ];
            } else if (node.key.startsWith('level1-') && !node.key.includes('leaf')) {
                return [
                    {
                        label: `Level 2 - ${node.key}`,
                        value: `level2-${node.key}`,
                        isLeaf: true,
                    },
                    {
                        label: `Level 2 - ${node.key} (Another)`,
                        value: `level2-another-${node.key}`,
                        isLeaf: true,
                    },
                ];
            }

            return [];
        };

        return (
            <Tree
                treeData={treeData}
                onLoadData={loadData}
                onTreeDataChange={setTreeData}
                showLine
                showIcon
                defaultExpandedKeys={[]}
            />
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Tree with asynchronous data loading. Click on nodes to expand and load their children.',
            },
        },
    },
};

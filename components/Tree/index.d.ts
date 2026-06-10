import React from 'react';
import { TreeProps as AntTreeProps, TreeNodeProps } from 'antd/es/tree';

export type TreeSize = 'sm' | 'md' | 'lg';

export const TreeSizes = ['sm', 'md', 'lg'] as const;

export interface TreeNodeData {
    label: string | React.ReactNode;
    value: string;
    icon?: React.ReactNode;
    children?: TreeNodeData[];
    disabled?: boolean;
    disableCheckbox?: boolean;
    selectable?: boolean;
    checkable?: boolean;
    isLeaf?: boolean;
    [key: string]: any;
}

export interface TreeProps extends Omit<AntTreeProps, 'size'> {
    className?: string;
    size?: TreeSize;
    disabled?: boolean;
    checkable?: boolean;
    selectable?: boolean;
    showLine?: boolean;
    showIcon?: boolean;
    draggable?: boolean;
    multiple?: boolean;
    children?: React.ReactNode;
    treeData?: TreeNodeData[];
    /**
     * Function to load data asynchronously when a node is expanded
     * @param node - The node that was expanded
     * @returns Promise that resolves to an array of child nodes
     */
    onLoadData?: (node: { key: string; title: string; [key: string]: any }) => Promise<TreeNodeData[]>;
    /**
     * Callback when tree data changes (useful for async loading)
     * @param newTreeData - The updated tree data
     */
    onTreeDataChange?: (newTreeData: TreeNodeData[]) => void;
}

interface TreeComponent extends React.FC<TreeProps> {
    TreeNode: typeof TreeNodeProps;
    DirectoryTree: any;
    /**
     * OneHaul Tree component with async loading support
     *
     * @example
     * ```jsx
     * <Tree
     *   size="md"
     *   checkable
     *   treeData={treeData}
     *   onLoadData={async (node) => {
     *     // Load children for the node
     *     const children = await fetchChildren(node.key);
     *     return children;
     *   }}
     *   onSelect={handleSelect}
     *   onCheck={handleCheck}
     * />
     * ```
     */
}

declare const Tree: TreeComponent;

export default Tree;

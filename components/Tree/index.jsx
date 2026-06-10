import React from 'react';
import { Tree as AntTree } from 'antd';
import './Tree.css';

const getOptions = (treeData) => {
    return treeData.map((item) => {
        const { label, value, icon, children, ...rest } = item;

        return {
            title: label,
            key: value,
            icon,
            ...rest,
            children: children ? getOptions(children) : [],
        };
    });
};

const Tree = ({
    children,
    className = '',
    size = 'md',
    disabled = false,
    checkable = false,
    selectable = true,
    showLine = false,
    showIcon = false,
    draggable = false,
    multiple = false,
    treeData = [],
    value = [],
    onChange = () => {},
    ...props
}) => {
    const classes = [
        'onehaul-tree',
        `onehaul-tree-${size}`,
        disabled && 'onehaul-tree-disabled',
        checkable && 'onehaul-tree-checkable',
        showLine && 'onehaul-tree-showline',
        showIcon && 'onehaul-tree-showicon',
        draggable && 'onehaul-tree-draggable',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <AntTree
            className={classes}
            disabled={disabled}
            checkable={checkable}
            selectable={selectable}
            showLine={showLine}
            showIcon={showIcon}
            draggable={draggable}
            multiple={multiple}
            treeData={getOptions(treeData)}
            checkedKeys={value}
            onCheck={onChange}
            {...props}
        >
            {children}
        </AntTree>
    );
};

Tree.TreeNode = AntTree.TreeNode;
Tree.DirectoryTree = AntTree.DirectoryTree;

export default Tree;

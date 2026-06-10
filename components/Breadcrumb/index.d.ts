import React from 'react';

export interface BreadcrumbItemProps {
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    children?: React.ReactNode;
}

export interface BreadcrumbProps {
    separator?: React.ReactNode;
    items?: Array<{
        title: React.ReactNode;
        href?: string;
        onClick?: (e: React.MouseEvent) => void;
    }>;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface BreadcrumbComponent extends React.FC<BreadcrumbProps> {
    /**
     * OneHaul Breadcrumb component
     *
     * @example
     * ```jsx
     * <Breadcrumb>
     *   <Breadcrumb.Item>Home</Breadcrumb.Item>
     *   <Breadcrumb.Item>Category</Breadcrumb.Item>
     *   <Breadcrumb.Item>Product</Breadcrumb.Item>
     * </Breadcrumb>
     * ```
     */
    Item: React.FC<BreadcrumbItemProps>;
}

declare const Breadcrumb: BreadcrumbComponent;
export default Breadcrumb;

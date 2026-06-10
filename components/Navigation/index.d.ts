import React from 'react';

export interface NavigationItem {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    children?: NavigationItem[];
}

export interface NavigationProps {
    items?: NavigationItem[];
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    openKeys?: string[];
    defaultOpenKeys?: string[];
    onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
    onOpenChange?: (openKeys: string[]) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    showSearch?: boolean;
    searchPlaceholder?: string;
    emptyMessage?: string;
    inlineCollapsed?: boolean;
    setInlineCollapsed?: (collapsed: boolean) => void;
    showCollapsedMenu?: boolean;
    headerNode?: React.ReactNode;
    footerNode?: React.ReactNode;
}

interface NavigationComponent extends React.FC<NavigationProps> {
    /**
     * OneHaul Navigation component
     *
     * @example
     * ```jsx
     * <Navigation
     *   selectedKeys={['1']}
     *   items={menuItems}
     *   onSelect={handleSelect}
     * />
     * ```
     */
}

declare const Navigation: NavigationComponent;
export default Navigation;

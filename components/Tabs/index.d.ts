import React from 'react';

export interface TabItem {
    key: string;
    label: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
    closable?: boolean;
    icon?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

export interface TabsProps {
    activeKey?: string;
    defaultActiveKey?: string;
    items?: TabItem[];
    onChange?: (key: string) => void;
    onEdit?: (key: string, action: 'add' | 'remove') => void;
    type?: 'primary' | 'secondary';
    size?: 'large' | 'middle' | 'small';
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    position?: 'horizontal' | 'vertical';
    fullWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export interface TabPaneProps {
    tab?: React.ReactNode;
    key?: string;
    disabled?: boolean;
    closable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface TabsComponent extends React.FC<TabsProps> {
    /**
     * OneHaul Tabs component
     *
     * @example
     * ```jsx
     * <Tabs activeKey={activeKey} onChange={handleChange}>
     *   <Tabs.TabPane tab="Tab 1" key="1">
     *     Content 1
     *   </Tabs.TabPane>
     *   <Tabs.TabPane tab="Tab 2" key="2">
     *     Content 2
     *   </Tabs.TabPane>
     * </Tabs>
     * ```
     */
    TabPane: React.FC<TabPaneProps>;
}

declare const Tabs: TabsComponent;
export default Tabs;

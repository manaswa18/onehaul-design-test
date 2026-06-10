import React from 'react';

export interface CollapsePanelProps {
    key: string | number;
    header?: React.ReactNode;
    disabled?: boolean;
    showArrow?: boolean;
    extra?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export interface CollapseProps {
    activeKey?: string | string[] | number | number[];
    defaultActiveKey?: string | string[] | number | number[];
    accordion?: boolean;
    bordered?: boolean;
    ghost?: boolean;
    size?: 'large' | 'middle' | 'small';
    expandIcon?: (panelProps: any) => React.ReactNode;
    expandIconPosition?: 'start' | 'end';
    onChange?: (key: string | string[]) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface CollapseComponent extends React.FC<CollapseProps> {
    /**
     * OneHaul Collapse component
     *
     * @example
     * ```jsx
     * <Collapse activeKey={activeKey} onChange={handleChange}>
     *   <Collapse.Panel header="Panel 1" key="1">
     *     Content 1
     *   </Collapse.Panel>
     *   <Collapse.Panel header="Panel 2" key="2">
     *     Content 2
     *   </Collapse.Panel>
     * </Collapse>
     * ```
     */
    Panel: React.FC<CollapsePanelProps>;
}

declare const Collapse: CollapseComponent;
export default Collapse;

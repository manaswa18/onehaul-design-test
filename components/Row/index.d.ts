import React from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type Gutter = number | Partial<Record<Breakpoint, number>>;

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Vertical alignment of flex layout
     * @default 'top'
     */
    align?: 'top' | 'middle' | 'bottom' | 'stretch';

    /**
     * Spacing between grids, could be a number or a object like { xs: 8, sm: 16, md: 24}
     * Or you can use array to make horizontal and vertical spacing work at the same time [horizontal, vertical]
     * @default 0
     */
    gutter?: Gutter | [Gutter, Gutter];

    /**
     * Horizontal arrangement of flex layout
     * @default 'start'
     */
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

    /**
     * Auto wrap line
     * @default true
     */
    wrap?: boolean;

    /**
     * Custom CSS class name
     */
    className?: string;

    /**
     * Inline style
     */
    style?: React.CSSProperties;

    /**
     * Children nodes
     */
    children?: React.ReactNode;
}

declare const Row: React.FC<RowProps>;

export default Row;

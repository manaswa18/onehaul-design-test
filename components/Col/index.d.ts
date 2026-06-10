import React from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface ColSize {
    /**
     * Raster number of cells to occupy, 0 corresponds to display: none
     */
    span?: number;

    /**
     * Raster order
     */
    order?: number;

    /**
     * The number of cells to offset Col from the left
     */
    offset?: number;

    /**
     * The number of cells that raster is moved to the left
     */
    pull?: number;

    /**
     * The number of cells that raster is moved to the right
     */
    push?: number;

    /**
     * Flex layout style
     */
    flex?: string | number;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Flex layout style
     */
    flex?: string | number;

    /**
     * Raster number of cells to occupy, 0 corresponds to display: none
     */
    span?: number;

    /**
     * Raster order
     * @default 0
     */
    order?: number;

    /**
     * The number of cells to offset Col from the left
     * @default 0
     */
    offset?: number;

    /**
     * The number of cells that raster is moved to the left
     * @default 0
     */
    pull?: number;

    /**
     * The number of cells that raster is moved to the right
     * @default 0
     */
    push?: number;

    /**
     * screen < 576px and also default setting, could be a span value or an object containing above props
     */
    xs?: number | ColSize;

    /**
     * screen ≥ 576px, could be a span value or an object containing above props
     */
    sm?: number | ColSize;

    /**
     * screen ≥ 768px, could be a span value or an object containing above props
     */
    md?: number | ColSize;

    /**
     * screen ≥ 992px, could be a span value or an object containing above props
     */
    lg?: number | ColSize;

    /**
     * screen ≥ 1200px, could be a span value or an object containing above props
     */
    xl?: number | ColSize;

    /**
     * screen ≥ 1600px, could be a span value or an object containing above props
     */
    xxl?: number | ColSize;

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

declare const Col: React.FC<ColProps>;

export default Col;

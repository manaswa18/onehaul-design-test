import React from 'react';

export interface PaginationProps {
    current?: number;
    defaultCurrent?: number;
    total?: number;
    defaultPageSize?: number;
    pageSize?: number;
    pageSizeOptions?: string[];
    showSizeChanger?: boolean;
    hideOnSinglePage?: boolean;
    showQuickJumper?: boolean | { goButton?: React.ReactNode };
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    size?: 'default' | 'small';
    simple?: boolean;
    disabled?: boolean;
    responsive?: boolean;
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
    className?: string;
    style?: React.CSSProperties;
}

interface PaginationComponent extends React.FC<PaginationProps> {
    /**
     * OneHaul Pagination component
     *
     * @example
     * ```jsx
     * <Pagination
     *   current={currentPage}
     *   total={totalItems}
     *   pageSize={itemsPerPage}
     *   onChange={handlePageChange}
     *   showSizeChanger
     * />
     * ```
     */
}

declare const Pagination: PaginationComponent;
export default Pagination;

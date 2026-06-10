import React from 'react';
import { Pagination as AntPagination } from 'antd';
import './Pagination.css';

const Pagination = ({
    className = '',
    current,
    pageSize,
    total,
    onChange,
    showSizeChanger = true,
    showQuickJumper = false,
    ...props
}) => (
    <AntPagination
        className={`onehaul-pagination ${className}`}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        {...props}
    />
);

export default Pagination;

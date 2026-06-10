import React from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import './Breadcrumb.css';

const Breadcrumb = ({ children, className = '', ...props }) => {
    return (
        <AntBreadcrumb className={`onehaul-breadcrumb ${className}`.trim()} {...props}>
            {children}
        </AntBreadcrumb>
    );
};

Breadcrumb.Item = ({ children, className = '', ...props }) => {
    return (
        <AntBreadcrumb.Item className={`onehaul-breadcrumb-item ${className}`.trim()} {...props}>
            {children}
        </AntBreadcrumb.Item>
    );
};

Breadcrumb.Separator = ({ children, className = '', ...props }) => {
    return (
        <AntBreadcrumb.Separator
            className={`onehaul-breadcrumb-separator ${className}`.trim()}
            {...props}
        >
            {children}
        </AntBreadcrumb.Separator>
    );
};

export default Breadcrumb;

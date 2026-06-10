import React from 'react';
import { Col as AntCol } from 'antd';

const Col = ({ className = '', ...props }) => {
    const classes = ['onehaul-grid-col', className].filter(Boolean).join(' ');

    return <AntCol className={classes} {...props} />;
};

export default Col;

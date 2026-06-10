import React from 'react';
import { Row as AntRow } from 'antd';

const Row = ({ className = '', ...props }) => {
    const classes = ['onehaul-grid-row', className].filter(Boolean).join(' ');

    return <AntRow className={classes} {...props} />;
};

export default Row;

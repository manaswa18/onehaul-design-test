'use client';

import React, { useEffect, useRef } from 'react';
import 'tabulator-tables/dist/css/tabulator.min.css';
import './Table.css';

const Table = ({
  data = [],
  columns = [],
  options = {},
  onRowClick,
  height,
  className = '',
}) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const onRowClickRef = useRef(onRowClick);
  onRowClickRef.current = onRowClick;

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    import('tabulator-tables').then(({ TabulatorFull }) => {
      if (cancelled || !containerRef.current) return;

      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }

      instanceRef.current = new TabulatorFull(containerRef.current, {
        data,
        columns,
        layout: 'fitData',
        height: height || undefined,
        rowHeight: 52,
        selectableRows: false,
        ...options,
      });

      instanceRef.current.on('rowClick', (e, row) => {
        if (onRowClickRef.current) onRowClickRef.current(row.getData());
      });
    });

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.setData(data);
    }
  }, [data]);

  return (
    <div className={`onehaul-table-wrapper${className ? ` ${className}` : ''}`}>
      <div ref={containerRef} />
    </div>
  );
};

export default Table;

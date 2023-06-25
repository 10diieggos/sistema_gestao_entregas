import React, { useEffect, useRef } from 'react';

export default function ColumnHeader({ column, headerGroup }) {
  const inputRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && measureRef.current) {
      inputRef.current.style.width = `${measureRef.current.offsetWidth + 2}px`;
    }
  }, [column.filterValue]);

  return (
    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
      {column.render('Header')}
      <input
        ref={inputRef}
        value={column.filterValue || ''}
        onChange={e => {
          column.setFilter(e.target.value || undefined);
        }}
        onClick={e => {
          e.stopPropagation();
        }}
      />
      <span
        style={{
          visibility: 'hidden',
          whiteSpace: 'pre',
          position: 'absolute',
        }}
        ref={measureRef}
      >
        {column.filterValue}
      </span>
      <span>
        {column.isSorted
          ? column.isSortedDesc
            ? ' 🔽'
            : ' 🔼'
          : ''}
      </span>
    </th>
  );
}
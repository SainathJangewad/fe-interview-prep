// Table.tsx
import React, { useState } from 'react';
import './Table.scss';

export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
}

type SortOrder = 'asc' | 'desc' | null;

function Table<T extends object>({ data, columns }: TableProps<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortOrder((prev) =>
                prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
            );
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];

            if (aVal === bVal) return 0;
            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }

            return sortOrder === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });
    }, [data, sortKey, sortOrder]);

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {columns.map((col) => {
                            const isSorted = sortKey === col.key;
                            const sortClass = isSorted ? sortOrder : '';
                            return (
                                <th
                                    key={String(col.key)}
                                    className={`${col.sortable ? 'sortable' : ''} ${sortClass || ''}`}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    {col.label}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col) => (
                                <td key={String(col.key)}>
                                    {col.render ? col.render(row) : String(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

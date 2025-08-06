import React from 'react';
import './Breadcrumb.scss';
import { Link } from 'react-router-dom'; // Optional, if you're using react-router
import { BreadcrumbItem } from './types';

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="breadcrumb-item">
                            {!isLast && item.path ? (
                                <Link to={item.path} className="breadcrumb-link">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="breadcrumb-current">{item.label}</span>
                            )}
                            {!isLast && <span className="breadcrumb-separator">›</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

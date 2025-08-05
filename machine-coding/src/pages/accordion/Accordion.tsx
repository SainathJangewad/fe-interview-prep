import React, { useState, ReactNode } from 'react';
import './Accordion.scss';

interface AccordionItemProps {
    id: string;
    title: string;
    content: ReactNode;
}

interface AccordionProps {
    items: AccordionItemProps[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="accordion">
            {items.map((item) => (
                <div key={item.id} className="accordion-item">
                    <button
                        className={`accordion-header ${openId === item.id ? 'open' : ''}`}
                        onClick={() => toggle(item.id)}
                    >
                        <span>{item.title}</span>
                        <span className="arrow">▼</span>
                    </button>
                    <div
                        className={`accordion-body ${openId === item.id ? 'open' : ''}`}
                    >
                        <div className="accordion-content">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;



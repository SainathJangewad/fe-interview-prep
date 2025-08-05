import React from 'react';
import Accordion from './Accordion';

const AccordionParent: React.FC = () => {
    const data = [
        {
            id: 'section1',
            title: 'What is React?',
            content: <p>React is a JavaScript library for building user interfaces.</p>,
        },
        {
            id: 'section2',
            title: 'What is TypeScript?',
            content: <p>TypeScript is a superset of JavaScript with static typing.</p>,
        },
        {
            id: 'section3',
            title: 'Why use Accordion?',
            content: <p>Accordions help to organize content in a collapsible form.</p>,
        },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <Accordion items={data} />
        </div>
    );
};

export default AccordionParent;

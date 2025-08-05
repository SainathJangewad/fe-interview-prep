import React from 'react';
import Chips from './Chips';

function ChipsParent() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Skills</h2>
            <Chips initialChips={['React', 'TypeScript']} placeholder="Add skill..." />
        </div>
    );
}

export default ChipsParent;

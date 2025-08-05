import React from 'react';
import { Player } from './types';

interface SquareProps {
    value: Player;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                width: '100px',
                height: '100px',
                fontSize: '2rem',
                cursor: 'pointer',
            }}
        >
            {value}
        </button>
    );
};

export default Square;

import React from 'react';
import Square from './Square';
import { Player } from './types';

interface BoardProps {
    squares: Player[];
    onSquareClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => {
    const renderSquare = (i: number) => (
        <Square key={i} value={squares[i]} onClick={() => onSquareClick(i)} />
    );

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)' }}>
            {squares.map((_, i) => renderSquare(i))}
        </div>
    );
};

export default Board;

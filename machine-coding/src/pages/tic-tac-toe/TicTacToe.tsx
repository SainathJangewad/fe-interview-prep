import React, { useState } from 'react';
import Board from './Board';
import { Player } from './types';

const TicTacToe: React.FC = () => {
    const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(squares);
    const isDraw = squares.every(Boolean) && !winner;
    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "It's a Draw!"
            : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const handleSquareClick = (index: number) => {
        if (squares[index] || winner) return;

        const newSquares = [...squares];
        newSquares[index] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h1>Tic Tac Toe</h1>
            <p>{status}</p>
            <Board squares={squares} onSquareClick={handleSquareClick} />
            <button onClick={resetGame} style={{ marginTop: '20px' }}>
                Reset Game
            </button>
        </div>
    );
};

// Helper function to determine the winner
function calculateWinner(squares: Player[]): Player {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6],            // diagonals
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default TicTacToe;

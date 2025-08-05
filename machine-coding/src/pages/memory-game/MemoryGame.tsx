import React, { useEffect, useState } from 'react';
import { CardType } from './types';
import Card from './Card';
import './styles.scss';

const generateCards = (): CardType[] => {
    const values = ['🐶', '🐱', '🐭', '🦊', '🐼', '🐸'];
    const cards = [...values, ...values].map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
    }));
    return shuffle(cards);
};

const shuffle = (array: CardType[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>(generateCards());
    const [flipped, setFlipped] = useState<CardType[]>([]);

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            if (first.value === second.value) {
                setCards(prev =>
                    prev.map(card =>
                        card.value === first.value ? { ...card, isMatched: true } : card
                    )
                );
                setFlipped([]);
            } else {
                setTimeout(() => {
                    setCards(prev =>
                        prev.map(card =>
                            card.id === first.id || card.id === second.id
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    setFlipped([]);
                }, 800);
            }
        }
    }, [flipped]);

    const handleCardClick = (card: CardType) => {
        if (flipped.length === 2) return;

        setCards(prev =>
            prev.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c))
        );
        setFlipped(prev => [...prev, card]);
    };

    const handleReset = () => {
        setCards(generateCards());
        setFlipped([]);
    };

    const isGameWon = cards.every(card => card.isMatched);

    return (
        <div className="game-container">
            <h1>Memory Game</h1>
            {isGameWon && <div className="win-message">🎉 You won! 🎉</div>}
            <div className="grid">
                {cards.map(card => (
                    <Card key={card.id} card={card} onClick={handleCardClick} />
                ))}
            </div>
            <button className="reset-btn" onClick={handleReset}>Restart</button>
        </div>
    );
};

export default MemoryGame;

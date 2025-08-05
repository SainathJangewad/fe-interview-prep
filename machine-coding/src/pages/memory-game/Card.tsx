import React from 'react';
import { CardType } from './types';
import './styles.scss';

interface CardProps {
    card: CardType;
    onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
        <div
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => !card.isFlipped && !card.isMatched && onClick(card)}
        >
            <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.value}</div>
            </div>
        </div>
    );
};

export default Card;

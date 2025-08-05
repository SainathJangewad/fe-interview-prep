import React, { useState, KeyboardEvent, FC } from 'react';
import './Chips.scss';

interface ChipsProps {
    initialChips?: string[];
    placeholder?: string;
    removable?: boolean;
}

const Chips: FC<ChipsProps> = ({
    initialChips = [],
    placeholder = 'Enter text...',
    removable = true,
}) => {
    const [chips, setChips] = useState<string[]>(initialChips);
    const [inputValue, setInputValue] = useState('');

    const addChip = (value: string) => {
        const trimmed = value.trim();
        if (trimmed && !chips.includes(trimmed)) {
            setChips([...chips, trimmed]);
        }
        setInputValue('');
    };

    const removeChip = (index: number) => {
        setChips(chips.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addChip(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
            removeChip(chips.length - 1);
        }
    };

    return (
        <div className="chips-container">
            {chips.map((chip, index) => (
                <div className="chip" key={chip}>
                    {chip}
                    {removable && (
                        <button
                            type="button"
                            className="chip-close"
                            onClick={() => removeChip(index)}
                            aria-label={`Remove ${chip}`}
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <input
                className="chip-input"
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Chips;

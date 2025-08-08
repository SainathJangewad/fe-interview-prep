import React, { useState } from "react";
import "./StarRating.scss";

interface StarRatingProps {
    totalStars?: number; // default 5
    initialRating?: number; // default 0
    onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
    totalStars = 5,
    initialRating = 0,
    onChange
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleClick = (star: number) => {
        setRating(star);
        onChange?.(star);
    };

    return (
        <div className="star-rating">
            {Array.from({ length: totalStars }, (_, i) => {
                const starValue = i + 1;
                return (
                    <span
                        key={starValue}
                        className={
                            starValue <= (hover || rating) ? "star filled" : "star"
                        }
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;

import React, { useState } from "react";
import StarRating from "./StarRating";

const StarRatingParent: React.FC = () => {
    const [rating, setRating] = useState(0);

    return (
        <div>
            <h1>Star Rating Example</h1>
            <StarRating
                totalStars={5}
                initialRating={rating}
                onChange={(value) => setRating(value)}
            />
            <p>Selected Rating: {rating}</p>
        </div>
    );
};

export default StarRatingParent;

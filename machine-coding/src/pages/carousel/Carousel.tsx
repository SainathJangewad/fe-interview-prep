import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Carousel.scss";

// note : Math.ceil is used to handle correct remaining items . for eg if total items are 6 and items to show are 4
// then without using ceil we would get 6/4 = 1 which is wrong .we need to show remaining next 2 items . so ceil gives us
// math.ceil(6/4) = 2

interface CarouselProps {
    items: React.ReactNode[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    showIndicators?: boolean;
    showArrows?: boolean;
    itemsToShow?: number;
    onChange?: (index: number) => void;
    prevArrow?: React.ReactElement;
    nextArrow?: React.ReactElement;
}

const Carousel: React.FC<CarouselProps> = ({
    items,
    autoPlay = false,
    autoPlayInterval = 3000,
    loop = true,
    showIndicators = true,
    showArrows = true,
    itemsToShow = 1,
    onChange,
    prevArrow,
    nextArrow,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<number | null>(null);

    // If the user sets itemsToShow higher than the available items, show 1 item per slide instead.  
    // This prevents incorrect calculations and ensures the carousel works properly.  
    const visibleItems = itemsToShow > items.length ? 1 : itemsToShow;
    const totalCarouselItemsLength = Math.ceil(items.length / visibleItems);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex % totalCarouselItemsLength;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const prevIndexNew = prevIndex - 1;
            return (prevIndexNew + totalCarouselItemsLength) % totalCarouselItemsLength;
        });
    };

    console.log('inf')

    useEffect(() => {
        if (onChange) onChange(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        if (autoPlay) {
            timerRef.current = setInterval(nextSlide, autoPlayInterval);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [autoPlay, autoPlayInterval]);

    return (
        <div className="carousel">
            <div
                className="carousel-track"
                // 100 / itemsToShow - use this formula to slide one item at a time .to slide the all visible items in one go use, 100% as translation value
                style={{ transform: `translateX(-${(100) * currentIndex}%)` }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="carousel-slide"
                        style={{ width: `${100 / visibleItems}%` }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${index + 1} of ${items.length}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {showArrows && (
                // Why React.cloneElement?
                // React.cloneElement(prevArrow, { onClick: prevSlide }) ensures that we preserve the existing properties of the user-defined component while adding an onClick handler.
                <>
                    {prevArrow ? (
                        React.cloneElement(prevArrow, {
                            onClick: prevSlide,
                            className: `${prevArrow.props.className || ""} custom-arrow left`
                        })
                    ) : (
                        <button onClick={prevSlide} className="carousel-arrow left">◀</button>
                    )}
                    {nextArrow ? (
                        React.cloneElement(nextArrow, {
                            onClick: nextSlide,
                            className: `${nextArrow.props.className || ""} custom-arrow left`
                        })
                    ) : (
                        <button onClick={nextSlide} className="carousel-arrow right">▶</button>
                    )}
                </>
            )}

            {showIndicators && (
                <div className="carousel-indicators">
                    {items?.slice(0, Math.ceil(items.length / visibleItems)).map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? "active" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;

import React, { useMemo } from "react";
import Carousel from "./Carousel"; // Adjust path based on your project structure
import "./Carousel.scss"; // Import styles

const images = [
    {
        src: 'https://picsum.photos/id/600/600/400',
        alt: 'Forest',
    },
    {
        src: 'https://picsum.photos/id/100/600/400',
        alt: 'Beach',
    },
    {
        src: 'https://picsum.photos/id/200/600/400',
        alt: 'Yak',
    },
    {
        src: 'https://picsum.photos/id/300/600/400',
        alt: 'Hay',
    },
    {
        src: 'https://picsum.photos/id/400/600/400',
        alt: 'Plants',
    },
    {
        src: 'https://picsum.photos/id/500/600/400',
        alt: 'Building',
    },
];

const CarouselParent: React.FC = () => {
    console.log('parent')

    // const customPrevArrow = <span style={{ fontSize: "24px", color: "red" }}>{"⬅️"}</span>;
    // const customNextArrow = <span style={{ fontSize: "24px", color: "blue" }}>{"➡️"}</span>;
    const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
        <div className="custom-arrow left" onClick={onClick}>
            ⬅️
        </div>
    );

    const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
        <div className="custom-arrow right" onClick={onClick}>
            ➡️
        </div>
    );



    return (
        <div style={{ width: '800px' }}>
            <h2>Image Carousel</h2>
            <Carousel
                items={images.map((img) => (
                    <img src={img.src} alt={img.alt} key={img.src} />
                ))}
                autoPlay={false}
                autoPlayInterval={3000}
                loop={false}
                showIndicators={true}
                showArrows={true}
                // prevArrow={<CustomPrevArrow />}
                // nextArrow={<CustomNextArrow />}
                itemsToShow={3}
                onChange={(index) => console.log("Current Slide:", index)}
            />
        </div>
    );
};

export default CarouselParent;

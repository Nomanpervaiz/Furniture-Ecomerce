import React, { useState } from 'react';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons'; // Import the icon
import img1 from "../assets/Image-living room.png";
import img2 from "../assets/Mask Group (1).png";
import img3 from "../assets/Mask Group.png";
// import img4 from "../assets/Rectangle 24.png";
import img5 from "../assets/Rectangle 25.png";

const cardsData = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    // { id: 4, img: img4 },
    { id: 5, img: img5 }
];

function CardCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
    };

    return (
        <section className='md:px-0 px-0 '>
            <div className='relative flex items-center space-x-0 xl:h-96 h-96 justify-center overflow-hidden'>
                {/* Render All Cards */}
                {cardsData.map((card, index) => {
                    // Render only the active card and the next one
                    if (index === activeIndex || index === (activeIndex + 1) % cardsData.length) {
                        return (
                            <div
                                key={card.id}
                                className={`py-6 md:h-96 h-96 w-full flex justify-center  object-cover bg-transparent rounded-lg transition-all duration-1000 ease-in-out 
                ${index === activeIndex ? 'transform scale-110 z-10' : 'opacity-20'}`}
                            >
                                <img className='border w-[300px] object-cover' src={card.img} alt="carousel item" />
                            </div>
                        );
                    }
                    return null; // Hide all other cards
                })}

                {/* Next Button with Absolute Position */}
                <Button
                    className="absolute right-4 z-20 bg-yellow-600 rounded-full h-12 w-12 text-white flex items-center justify-center"
                    onClick={handleNext}
                >
                    <RightOutlined />
                </Button>
            </div>
        </section>
    );
}

export default CardCarousel;

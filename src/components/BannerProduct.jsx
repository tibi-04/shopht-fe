import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";


import img1 from '../assest/banner/img_1.webp';
import img2 from '../assest/banner/img_2.webp';
import img3 from '../assest/banner/img_3.webp';
import img4 from '../assest/banner/img_4.webp';
import img5 from '../assest/banner/img_5.webp';
import img6 from '../assest/banner/img_6.webp';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const banners = [img1, img2, img3, img4, img5, img6];


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            setCurrentImage(0);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const nextImage = useCallback(() => {
        setCurrentImage(prev => (prev === banners.length - 1 ? 0 : prev + 1));
    }, [banners.length]);

    const prevImage = useCallback(() => {
        setCurrentImage(prev => (prev === 0 ? banners.length - 1 : prev - 1));
    }, [banners.length]);


    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [nextImage]);


    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextImage();
        }
        if (touchStartX.current - touchEndX.current < -50) {
            prevImage();
        }
    };

    return (
        <div
            className="relative w-full overflow-hidden bg-transparent"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                    transform: `translateX(-${currentImage * 100}%)`
                }}
            >
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0"
                    >
                        <img
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
            </div>

     
            {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                    <button
                        onClick={prevImage}
                        className="bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-md transition-all hover:scale-105"
                    >
                        <FaAngleLeft className="text-lg md:text-xl" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-md transition-all hover:scale-105"
                    >
                        <FaAngleRight className="text-lg md:text-xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BannerProduct;

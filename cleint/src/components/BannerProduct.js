import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
import image1Mobile from '../assest/1.webp';
import image2Mobile from '../assest/2.webp';
import image3Mobile from '../assest/3.webp';
import image4Mobile from '../assest/1.webp';
import image5Mobile from '../assest/2.webp';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image3, image4, image5];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % desktopImages.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-56 md:h-72 w-full bg-slate-200 relative rounded-2xl">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1"><FaAngleLeft /></button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1"><FaAngleRight /></button>
                    </div>
                </div>
                {/* Desktop and tablet version */}
                <div className="hidden md:flex h-full w-full overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        {desktopImages.map((imageUrl, index) => (
                            <div className="w-full h-full min-w-full min-h-full" key={index}>
                                <img src={imageUrl} className="w-full h-full object-cover" alt={`Banner ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile version */}
                <div className="flex md:hidden h-full w-full overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentImage * 100}%)` }}
                    >
                        {mobileImages.map((imageUrl, index) => (
                            <div className="w-full h-full min-w-full min-h-full" key={index}>
                                <img src={imageUrl} className="w-full h-full object-cover" alt={`Banner Mobile ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;

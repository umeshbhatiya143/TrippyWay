import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


const HeroSection = () => {

    const slideContent = [
        {
            image: 'slide1.jpg'
        },
        {
            image: 'slide2.jpg',
        },
        {
            image: 'slide3.jpg',
        }
    ]


    return (
        <div className="h-[84vh] relative overflow-hidden">
            <Swiper
                // install Swiper modules
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                    delay: 5000, // Delay between slides in milliseconds (3 seconds here)
                    disableOnInteraction: false, // Continue autoplay even after user interaction
                }}
                loop={true}
                className="relative"
            >

                {
                    slideContent.map((slide) => {
                        return (
                            <SwiperSlide>
                                {/* Your first slide content */}
                                <div className="w-full !important flex items-center justify-center">
                                    {/* Your content for the first slide */}
                                    <img src={slide.image} alt="" className='w-full !important' />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className="w-full h-full absolute top-0 z-10 flex justify-center overflow-hidden">
                <div className=" flex flex-col justify-center text-center text-black z-10">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-lg mb-8">Explore our unique features and services.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

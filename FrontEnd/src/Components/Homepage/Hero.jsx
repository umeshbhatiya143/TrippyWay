import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

SwiperCore.use([Navigation, Pagination]);

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
        <div className="relative">
            <Swiper
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className="h-screen"
            >

                {
                    slideContent.map((slide) => {
                        return (
                            <SwiperSlide>
                                {/* Your first slide content */}
                                <div className="bg-cover w-full bg-center h-96 !important flex items-center justify-center" style={{ backgroundImage: `url('/image1.jpg')` }}>
                                    {/* Your content for the first slide */}
                                    <img src={slide.image} alt=""  className='w-full h-full aspect-square !important'/>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-center text-white z-10">
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

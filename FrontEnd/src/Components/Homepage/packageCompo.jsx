import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const PackageComponent = () => {

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
    ];

    const packages = [
        {
            "photos": [
                "https://example.com/package1-photo1.jpg",
                "https://example.com/package1-photo2.jpg",
                "https://example.com/package1-photo3.jpg"
            ],
            "title": "Adventure Package",
            "description": "Explore the wilderness and discover hidden gems.",
            "pricing": 250,
            "duration": "5 Days",
            "rating": 4.8
        },
        {
            "photos": [
                "https://example.com/package2-photo1.jpg",
                "https://example.com/package2-photo2.jpg"
            ],
            "title": "Relaxation Retreat",
            "description": "Unwind and recharge in a tranquil setting.",
            "pricing": 180,
            "duration": "3 Days",
            "rating": 4.5
        },
        {
            "photos": [
                "https://example.com/package3-photo1.jpg",
                "https://example.com/package3-photo2.jpg",
                "https://example.com/package3-photo3.jpg",
                "https://example.com/package3-photo4.jpg"
            ],
            "title": "Cultural Exploration",
            "description": "Immerse yourself in local traditions and history.",
            "pricing": 320,
            "duration": "7 Days",
            "rating": 4.9
        },
        {
            "photos": [
                "https://example.com/package4-photo1.jpg",
                "https://example.com/package4-photo2.jpg"
            ],
            "title": "Family Fun Getaway",
            "description": "Create unforgettable memories with your loved ones.",
            "pricing": 220,
            "duration": "4 Days",
            "rating": 4.6
        }
    ];


    return (
        <div className="flex flex-col gap-6 p-20">
            <div className='flex'>
                {
                    packages.map((pack)=> {
                        return (
                            <div class="flex flex-col package-container rounded-lg shadow-md bg-white overflow-hidden">
                                <div class="package-photos overflow-hidden md:w-1/2 flex items-center justify-center rounded-md">
                                    <Swiper
                                        modules={[Autoplay]}
                                        slidesPerView={1}
                                        autoplay={{
                                            delay: 6000,
                                            disableOnInteraction: false,
                                        }}
                                        loop={true}
                                        className="relative"
                                    >

                                        {
                                            slideContent.map((slide) => {
                                                return (
                                                    <SwiperSlide>
                                                        <div className="w-full !important flex items-center justify-center">
                                                            <img src={slide.image} alt="" className='w-full !important' />
                                                        </div>

                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>

                                </div>
                                <div class="package-info flex flex-col p-8 md:w-1/2">
                                    <div class="package-details">
                                        <h2 class="text-2xl font-bold">{pack.title}</h2>
                                        <p class="text-gray-700 mb-4">{pack.description}</p>
                                        <div class="flex items-center justify-between">
                                            <div class="pricing font-bold text-blue-500">{pack.pricing}</div>
                                            <div class="star-rating flex items-center space-x-1">
                                                <span class="text-yellow-500">★</span>
                                                <span v-for="n in Math.floor(rating)" key="n" class="text-yellow-500">★</span>
                                                <span v-for="n in Math.round(rating) - Math.floor(rating)" key="n" class="text-gray-300">★</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* button for redirecting all packages page */}
            <button className="w-40 flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                Explore More
            </button>
        </div>
    );
}

export default PackageComponent;

import React, { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';


const HeroSection = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthOptions = Array.from({ length: 12 }, (_, i) => (
        <option key={i + 1} value={`${currentYear}-${i + 1}`}>
            {monthNames[i]} {currentYear}
        </option>
    ));

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
            <div className="w-full h-full absolute top-0 z-10 flex justify-center overflow-hidden">
                {/* TrippyAI Section */}
                <div className="flex flex-col gap-3 items-center justify-center w-1/2 text-white bg-glassy my-10 mx-28 px-28 rounded-lg shadow-md">
                    <h2 className="text-6xl font-black mb-4">Discover TrippyAI</h2>
                    <span className="text-1xl font-bold text-red-400" >
                        <Typewriter
                            words={['TrippyAI: Your personalized travel guru.',
                                'Dream up your perfect trip. Let TrippyAI plan it for you.',
                                'Explore hidden gems and adventures with TrippyAI.',
                                'AI-powered travel experiences that surprise and delight.',]}
                            loop={true}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                    <p className="text-lg mb-8">Explore the possibilities of AI-powered travel experiences.</p>
                    <div className="typewriter-container">
                        <span className="typewriter">Typing out some text about TrippyAI...</span>
                    </div>
                    <textarea className="w-[450px] p-4 mt-4 mb-4 bg-gray-800 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500" placeholder="Enter your text here..."></textarea>
                    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                       <span>Interact with TrippyAI</span> 
                       <FaArrowUpRightFromSquare />
                    </button>
                </div>

                {/* search bar for choosing package */}
                <div className="flex flex-col items-center justify-center w-1/2 rounded-lg shadow-md">
                    <div className="w-[60%] bg-gray-200 rounded-lg shadow-md p-10">
                        {/* Package Selection Form */}
                        <h2 className="text-2xl font-semibold mb-4 text-center">Customize & Book Amazing Holiday Packages</h2>
                        <div className="mb-4">
                            <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">Destination:</label>
                            <div className="relative">
                                <input type="text" id="destination" className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                                <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-md hidden" id="destination-options"></div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">Destination:</label>
                            <select name="duration" id="duration" className='bg-white w-full rounded-md p-2'>
                                <option value="">select duration</option>
                                <option value="1-3">1 to 3 days</option>
                                <option value="4-6">4 to 6 days</option>
                                <option value="7-9">7 to 9 days</option>
                                <option value="10-12">10 to 12 days</option>
                                <option value="ND">Not Decided</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="month" className="block text-gray-700 font-semibold mb-2">Month:</label>
                            <select name="month" id="month" className='bg-white w-full rounded-md p-2'>
                                <option value="">select month</option>
                                {monthOptions}
                                <option value="ND">Not Decided</option>
                            </select>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                            Explore Now
                            <FaArrowUpRightFromSquare />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HeroSection;

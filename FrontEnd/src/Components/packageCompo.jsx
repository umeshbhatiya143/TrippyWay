import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { PiBinoculars } from "react-icons/pi";
import { GiHotMeal } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { MdAirportShuttle } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { GiCruiser } from "react-icons/gi";
import { MdHouseboat } from "react-icons/md";
import { TbTrekking } from "react-icons/tb";
import { ImSafari } from "react-icons/im";
import { MdOutlineFlight } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const PackageCompo = ({pkg}) => {
    // ------------package component--------------
    

    const iSize = 25;
    const inclusionIcons = {
        'Sightseeing': <PiBinoculars size={iSize} />,
        'Meals': <GiHotMeal size={iSize} />,
        'Breakfast': <IoFastFoodOutline size={iSize} />,
        'Transfers': <MdOutlineTransferWithinAStation size={iSize} />,
        'Airport Pickup-Drop': <MdAirportShuttle size={iSize} />,
        'Private Cab': <FaCar size={iSize} />,
        'Cruise': <GiCruiser size={iSize} />,
        'Houseboat': <MdHouseboat size={iSize} />,
        'Adventure Activity': <TbTrekking />,
        'Safari': <ImSafari size={iSize} />,
        'Flights': <MdOutlineFlight size={iSize} />,
        'Stay': <FaHome size={iSize} />
    }

    const slideContent = [
        {
            image: '/slide1.jpg'
        },
        {
            image: '/slide2.jpg',
        },
        {
            image: '/slide3.jpg',
        }
    ]

    return (
        <div className="w-full mx-auto bg-white border-2 rounded-xl shadow-md overflow-hidden my-4">
            <div className="md:flex p-4 gap-6">
                <div>
                    <div className="md:flex-shrink-0 w-80 h-60 overflow-hidden">
                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            slidesPerView={1}
                            loop={true}
                            className="h-60 relative" // Ensure the Swiper itself has a fixed height
                        >
                            {slideContent.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200"> {/* Added bg-gray-200 as a placeholder background */}
                                        <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Icons representing various inclusions */}
                    <div className="flex p-4 gap-2 justify-between flex-wrap items-center mt-4">
                        {pkg.inclusions.map((inclusion) => (
                            <div key={inclusion} className="flex flex-col gap-2 justify-center items-center mr-2">
                                {/*<img className="h-6 w-6" src={`/icons/${inclusion.toLowerCase()}.png`} alt={inclusion} />*/}
                                {inclusionIcons[inclusion]}
                                <span className="ml-1 text-sm">{inclusion}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="">
                    <div className="uppercase tracking-wide text-lg text-dark-cyan font-semibold">{pkg.title}</div>
                    <p className="block mt-1 text-sm leading-tight font-medium text-black ">{pkg.duration}</p>
                    <p className="mt-2 text-sm text-gray-500">{pkg.shortDescription}</p>
                    <div className="mt-4">
                        <div className="text-teal-600">{pkg.discount}% Off</div>
                        <div className="text-lg font-bold text-gray-900">{pkg.price}</div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-gray-700 font-semibold">Hotel included in package:</h3>
                        {pkg.hotelRatings.map((rating) => (
                            <span key={rating} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>{rating}</span>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h3 className="text-gray-700 font-semibold">Cities:</h3>
                        <p className="text-gray-700">{pkg.cities.join(' ➜ ')}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex mt-4">
                        <button className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-l">
                            View Details
                        </button>
                        <button className="bg-dark-cyan hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r">
                            Customize & Get Quotes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCompo


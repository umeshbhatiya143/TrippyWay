import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, loginUser, logoutUser } from '@/store/slices'
import { toast } from 'react-toastify';

const PackageCompo = ({ pkg }) => {
    const router = useRouter()
    const [hotels, setHotels] = useState([])
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userData = useSelector((state) => state.auth.userData)

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

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const fetchHotel = async ({ hotelId }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/hotels/${hotelId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return data
            // return data.packages
        } catch (error) {
            console.log(error)
        }
    };

    const fetchHotels = async () => {
        const hotels = await Promise.all(pkg.hotels.map((hotelId) => {
            return fetchHotel(hotelId);
        }));
        setHotels(hotels)
    }

    const updateUserProfile = async (pkgId) => {
        // setIsLoading(true)

        try {
            const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`);
            const params = { fields: 'cart' }; // Define fields you want to fetch
            url.search = new URLSearchParams(params).toString();

            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(async res => {
                    res = await res.json();

                    const updatedCart = [...res.user.cart, pkgId];

                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cart: updatedCart }),
                    });
                    if (!response.ok) throw new Error('Failed to update profile');
                    toast.success('Package added in cart successfully', toastOptions);

                    const updatedData = {
                        userId: userData.userId,
                        token: userData.token,
                        cart: updatedCart
                    }
                    dispatch(loginUser(updatedData))
                })

        } catch (error) {
            console.error(error.message);
            toast.error('Failed to add package in cart', toastOptions);
        }
    };

    const addToCart = (pkgId) => {
        if (isLoggedIn) {
            updateUserProfile(pkgId)
        } else {
            dispatch(toggleLogin())
        }
    }

    useEffect(() => {
        fetchHotels()
    }, [])

    return (
        <div
            className="w-full mx-auto bg-white border-2 rounded-xl shadow-md overflow-hidden my-4">
            <div className="md:flex p-4 gap-6">
                <div onClick={() => router.push(`/package/${pkg._id}`)}>
                    <div className="md:flex-shrink-0 w-80 h-60 overflow-hidden">
                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            slidesPerView={1}
                            loop={true}
                            className="h-60 relative" // Ensure the Swiper itself has a fixed height
                        >
                            {pkg.images.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200"> {/* Added bg-gray-200 as a placeholder background */}
                                        <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
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
                    <p className="block mt-1 text-sm leading-tight font-medium text-black ">{pkg.duration} days</p>
                    <p className="mt-2 text-sm text-gray-500"> {pkg.description.substring(0, 200)}...</p>
                    <div onClick={() => router.push(`/package/${pkg._id}`)} className="mt-4">
                        <div className="text-teal-600">{pkg.discount}% Off</div>
                        <div className='flex items-center'>
                            <div className="text-lg font-bold text-gray-900">{Math.floor(pkg.price - (pkg.price * (pkg.discount) / 100))}</div>
                            <sup className='text-red-600 text-bold'>*</sup>
                            <div className="ml-4 relative inline-block">
                                <span className="relative z-10 text-deep-purple text-md">{pkg.price}</span>
                                <div className="absolute w-full h-0.5 bg-deep-purple top-1/2 transform -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => router.push(`/package/${pkg._id}`)} className="mt-4">
                        <h3 className="text-gray-700 font-semibold">Hotel included in package:</h3>
                        <div className="mb-5 mt-8">
                            {['2 star', '3 star', '4 star', '5 star'].map((rating) => (
                                <span key={rating} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>{rating}</span>
                            ))}
                        </div>
                    </div>
                    <div onClick={() => router.push(`/package/${pkg._id}`)} className="mt-4">
                        <h3 className="text-gray-700 font-semibold">Cities:</h3>
                        <p className="text-gray-700">{pkg.destinations.join(' ➜ ')}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex mt-4">
                        <button className="bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-l">
                            View Details
                        </button>
                        <button onClick={() => addToCart(pkg._id)}
                            className="bg-dark-cyan hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-r">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCompo


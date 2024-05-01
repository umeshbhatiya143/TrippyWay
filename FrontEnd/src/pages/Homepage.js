import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import pack from './package/pack.json'
import Card from '@/Components/card'
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Homepage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('')
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [month, setMonth] = useState('');
  const [cities, setCities] = useState([])

  const router = useRouter()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  // Simulated list of cities for the dropdown.
  // In a real application, you might fetch this from an API.
  const fetchAllDestinations = async () => {
    try {
      // const queryParams = new URLSearchParams(filter).toString();

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/destinations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  }

  useEffect(() => {
    fetchAllDestinations()
  }, [])

  const handleDestinationChange = (event) => {
    const input = event.target.value;
    setDestination(input);

    if (input) {
      const matchedCities = cities.filter((city) =>
        city.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredCities(matchedCities);
      setIsDropdownVisible(true);
    } else {
      setFilteredCities([]);
      setIsDropdownVisible(false);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };


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

  const handleSearchPackage = () => {
    const stateData = {
      destination: destination,
      month: month,
      duration: duration
    };
    const queryParams = new URLSearchParams(stateData).toString();
    router.push(`/holidays?${queryParams}`);
  }

  return (
    <section className="flex flex-col gap-20">

      {/* -----------------hero section------------ */}
      <div className="h-[88vh] relative overflow-hidden">
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
            <h2 className="text-6xl font-black mb-4">NextGen TourAI</h2>
            <span className="text-1xl font-bold text-red-400" >
              <Typewriter
                words={['TourAI: Your personalized travel guru.',
                  'Dream up your perfect trip. Let TourAI plan it for you.',
                  'Explore hidden gems and adventures with TourAI.',
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
              <span className="typewriter">Typing out some text about TourAI...</span>
            </div>
            <textarea className="w-[450px] resize-none p-4 mt-4 mb-4 bg-gray-800 rounded-lg border border-gray-600 text-white focus:outline-none focus:border-blue-500" placeholder="Enter your text here..."></textarea>
            <button className="flex items-center gap-2 bg-button-color hover:bg-button-color-hover transition-all duration-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
              <span>Interact with TourAI</span>
              <FaArrowUpRightFromSquare />
            </button>
          </div>

          {/* search bar for choosing package */}
          <div className="flex flex-col items-center justify-center w-1/2 rounded-lg shadow-md">
            <div className="w-[60%] flex flex-col gap-4 bg-gray-200 rounded-lg shadow-md p-10">
              {/* Package Selection Form */}
              <h2 className="text-2xl font-semibold mb-4 text-center">Customize & Book Amazing Holiday Packages</h2>
              <div className="">
                <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">Destination:</label>
                {/* Destination Input */}
                <div className="flex-grow relative">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md "
                    placeholder="Enter destination"
                    value={destination}
                    onChange={handleDestinationChange}
                  />
                  {isDropdownVisible && (
                    <div className="absolute left-0 right-0 top-full bg-white border border-t-0 rounded-b-md shadow-lg max-h-60 overflow-auto z-10">
                      {filteredCities.map((city) => (
                        <div
                          key={city}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDestination(city);
                            setIsDropdownVisible(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">Duration:</label>
                <select onChange={(e) => setDuration(e.target.value)} name="duration" id="duration" className='bg-white w-full rounded-md p-2'>
                  <option value="">select duration</option>
                  <option value="2-3">2 to 3 days</option>
                  <option value="4-5">4 to 5 days</option>
                  <option value="6-7">6 to 7 days</option>
                  <option value="7+">7+ days</option>
                  {/* <option value="ND">Not Decided</option> */}
                </select>
              </div>
              {/* Month Selector */}
              <div className="flex-grow">
                <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">Month:</label>
                <select
                  value={month}
                  onChange={handleMonthChange}
                  className="w-full p-2 border-2 bg-custom-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select month</option>
                  {months.map((monthName) => (
                    <option key={monthName} value={monthName}>
                      {monthName}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleSearchPackage}
                className="flex justify-center items-center gap-2 bg-dark-cyan hover:bg-opacity-75 transition-all duration-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                Search Packages
                <FaArrowUpRightFromSquare />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*------------ Recommended Packages Section ------------*/}
      <div className="w-full flex flex-col items-center gap-10 py-10">
        <h2 className="text-4xl font-bold text-dark-cyan mb-10">Top Packages</h2>
        <div className="w-full md:w-3/4 xl:w-2/3 relative">
          <button className="text-sm font-medium text-white bg-deep-purple hover:bg-dark-cyan transition-colors duration-300 py-2 px-4 rounded-full absolute right-0 -top-16 shadow-lg">
            View More
          </button>
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            loop={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="shadow-xl rounded-xl overflow-hidden"
          >
            {Array.from({ length: 5 }, (_, i) => i).map(index => (
              <SwiperSlide key={index} className="bg-white p-4 hover:scale-110 transition-transform duration-300 ease-in-out">
                <Card data={pack} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


      {/*------------ Recommended Packages Section ------------*/}
      <div className="w-full flex flex-col items-center gap-10 py-10">
        <h2 className="text-4xl font-bold text-dark-cyan mb-10">Top Packages</h2>
        <div className="w-full md:w-3/4 xl:w-2/3 relative">
          <button className="text-sm font-medium text-white bg-deep-purple hover:bg-dark-cyan transition-colors duration-300 py-2 px-4 rounded-full absolute right-0 -top-16 shadow-lg">
            View More
          </button>
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            loop={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="shadow-xl rounded-xl overflow-hidden"
          >
            {Array.from({ length: 5 }, (_, i) => i).map(index => (
              <SwiperSlide key={index} className="bg-white p-4 hover:scale-110 transition-transform duration-300 ease-in-out">
                <Card data={pack} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


      {/*------------ Recommended Packages Section ------------*/}
      <div className="w-full flex flex-col items-center gap-10">
        <h2 className="text-4xl font-bold text-dark-cyan mb-10">Top Packages</h2>
        <div className="w-full md:w-3/4 xl:w-2/3 relative">
          <button className="text-sm font-medium text-white bg-deep-purple hover:bg-dark-cyan transition-colors duration-300 py-2 px-4 rounded-full absolute right-0 -top-12 shadow-lg">
            View More
          </button>
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            loop={true}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 15 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="shadow-xl rounded-xl overflow-hidden"
          >
            {Array.from({ length: 5 }, (_, i) => i).map(index => (
              <SwiperSlide key={index} className="bg-white p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Card data={pack} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  )
}

export default Homepage
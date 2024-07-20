import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import FAQItem from '@/Components/faqItem';
import ReviewCard from '@/Components/reviewCard';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Loader from '@/assets/loader.gif'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


import Card from '@/Components/card';
import PackageCompo from '@/Components/packageCompo';

const Holidays = ({cities, packagesCount}) => {
  const [destination, setDestination] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [month, setMonth] = useState('');
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNoMore, setIsNoMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPackagesCount, setCurrentPackagesCount] = useState(10);

  const router = useRouter()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ----------filters-----------
  const [filters, setFilters] = useState({
    categories: {
      Honeymoon: false,
      Family: false,
    },
    duration: {
      '2-3': false,
      '4-5': false,
      '6-7': false,
      '7+': false,
    },
    budgetPerPerson: {
      'Less Than 10000': false,
      '10000-20000': false,
      '20000-40000': false,
      '40000-60000': false,
      '60000-80000': false,
      'Above 80000': false
    },
    hotelStarRating: {
      '5 Star': false,
      '4 Star': false,
      '3 Star': false,
      '2 Star': false
    },
    // activities: {
    //   'Adventure': false,
    //   'Nature': false,
    //   'Hill Station': false,
    //   'Religious': false,
    //   'Water Activities': false
    // },
    // destinations: Object.fromEntries(
    //   cities.map(city => [city, false])
    // ),
    inclusions: {
      'Sightseeing': false,
      'Breakfast': false,
      'Transfers': false,
      'Meals': false,
      'Airport Pickup-Drop': false,
      'Private Cab': false,
      'Cruise': false,
      'Houseboat': false,
      'Adventure Activity': false,
      'Safari': false,
      'Flights': false,
    }
  });


  useEffect(() => {
    // Get query parameters
    const { destination, month, duration } = router.query;
    setDestination(destination)
    setMonth(month)
    if (duration) {
      handleCheckboxChange('duration', duration)
    }


  }, [router.query]);

  const handleCheckboxChange = (category, value) => {
    // If category is an object (e.g., duration), handle its nested state
    if (typeof filters[category] === 'object') {
      setFilters({
        ...filters,
        [category]: { ...filters[category], [value]: !filters[category][value] },
      });
    } else {
      // If category is a boolean, toggle its state
      setFilters({ ...filters, [category]: !filters[category] });
    }
  };


  // ------faqs---------
  const faqs = [
    {
      question: 'How do I sign up?',
      answer: 'You can sign up by clicking the Sign Up button at the top of the page.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription from your profile settings at any time.',
    },
    {
      question: 'How do I sign up?',
      answer: 'You can sign up by clicking the Sign Up button at the top of the page.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription from your profile settings at any time.',
    },
    {
      question: 'How do I sign up?',
      answer: 'You can sign up by clicking the Sign Up button at the top of the page.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription from your profile settings at any time.',
    },
    // ... more FAQs
  ];

  //--------Reviews------
  const reviews = [
    // Dummy review data
    {
      id: 1,
      name: 'John Doe',
      date: 'Oct 22, 2023',
      rating: 5,
      comment: 'Amazing experience, our guide was knowledgeable and friendly!',
      avatar: 'https://i.pravatar.cc/300?img=1', // Placeholder avatar image URL
    },
    {
      id: 1,
      name: 'John Doe',
      date: 'Oct 22, 2023',
      rating: 5,
      comment: 'Amazing experience, our guide was knowledgeable and friendly!',
      avatar: 'https://i.pravatar.cc/300?img=1', // Placeholder avatar image URL
    },
    {
      id: 1,
      name: 'John Doe',
      date: 'Oct 22, 2023',
      rating: 5,
      comment: 'Amazing experience, our guide was knowledgeable and friendly!',
      avatar: 'https://i.pravatar.cc/300?img=1', // Placeholder avatar image URL
    },
    {
      id: 1,
      name: 'John Doe',
      date: 'Oct 22, 2023',
      rating: 5,
      comment: 'Amazing experience, our guide was knowledgeable and friendly!',
      avatar: 'https://i.pravatar.cc/300?img=1', // Placeholder avatar image URL
    },
    // More reviews...
  ];


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

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // const queryParams = new URLSearchParams(filter).toString();
      const searchQuery = {
        destination: destination,
        month: month
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages?limit=10&page=${currentPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery, filters }),
      });
      const data = await response.json();
      console.log(data)
      if (data.packages.length === 0) {
        setIsNoMore(true);
      }
      setPackages(data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchPackages = async (page, filters) => {
    setIsLoading(true);
    try {
      const searchQuery = {
        destination: destination,
        month: month
      }
      // const queryParams = new URLSearchParams(filter).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages?limit=10&page=${page}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters, searchQuery }),
      });
      const data = await response.json();
      console.log(data)
      if (data.packs.length <10 || data.packs.length === 0) {
        setIsNoMore(true);
      }
      setPackages(data.packs);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setCurrentPackagesCount(currentPackagesCount+packages.length)
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentPackagesCount(currentPackagesCount-packages.length)
    }
  };

  useEffect(() => {
    fetchPackages(currentPage, filters);

  }, [currentPage, filters]);

 //useEffect for whenever a user select any destination in searchbar it automatically search and render
  useEffect(() => {
    if (destination) {
      handleSearch()
    }
  }, [destination]);

  return (
    <div className='w-full'>

      {/* -------------------search bar---------------- */}
      <div className="h-60 w-full relative bg-cover bg-no-repeat bg-center flex gap-4 items-center justify-center" style={{ backgroundImage: "url('/bg-pkg.jpg')" }}>
        {/* Search container */}

        {/* <div className="bg-dark-cyan text-custom-white text-center py-10 px-4">
          <h1 className="text-4xl font-bold mb-2">Discover Your Perfect Getaway</h1>
          <p className="text-xl mb-4">Explore the best honeymoon packages, family vacations, and adventure tours.</p>
          <p className="text-lg">Start by choosing your dream destination or month of travel.</p>
        </div> */}

        <div className="bg-gray-200 rounded-lg  shadow-md p-4 flex w-full max-w-2xl">
          {/* Destination Input */}
          <div className="flex-grow relative">
            <input
              type="text"
              className="w-full p-2 rounded-l-md"
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

          {/* Month Selector */}
          {/* <div className="flex-grow">
            <select
              value={month}
              onChange={handleMonthChange}
              className="w-full p-2 border-2 bg-custom-white rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select month</option>
              {months.map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </div> */}

          {/* Explore Button */}
          <button className="bg-button-color transition-all duration-1000 hover:bg-button-color-hover text-white font-bold py-2 px-4 rounded-md ml-2"
            onClick={handleSearch}>
            Explore
          </button>
        </div>
      </div>


      {/* -----------below portion after searchbar--------- */}

      <div className="w-full flex justify-center bg-white">
        <div className="flex -mt-10 mb-20 z-1 relative bg-white rounded-2xl  gap-20 flex-col w-[70%]">


          {/* --------------filters and package components------------ */}

          <div className="flex rounded-xl shadow-2xl flex-row gap-6 border-1 p-6">

            {/* ---filters---- */}
            <aside >
              <h2 className="p-2 text-xl text-deep-purple font-medium border-b-2">Filters</h2>

              <div className="w-full md:w-64 p-4 bg-white shadow-md">
                <div className="mb-6">
                  {/* Honeymoon & Family checkboxes */}
                  <h4 className="font-semibold mb-2">Categories</h4>
                  {Object.keys(filters.categories).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.categories[key]}
                        onChange={() => handleCheckboxChange('categories', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>

                {/* Duration checkboxes */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Duration (Days)</h4>
                  {/* Map through durations or any similar category */}
                  {Object.keys(filters.duration).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.duration[key]}
                        onChange={() => handleCheckboxChange('duration', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>

                {/* Budget Per Person checkboxes */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Budget Per Person</h4>
                  {/* Map through durations or any similar category */}
                  {Object.keys(filters.budgetPerPerson).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.budgetPerPerson[key]}
                        onChange={() => handleCheckboxChange('budgetPerPerson', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>

                {/*hotelStarRating  checkboxes */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Hotel Star Rating</h4>
                  {/* Map through durations or any similar category */}
                  {Object.keys(filters.hotelStarRating).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.hotelStarRating[key]}
                        onChange={() => handleCheckboxChange('hotelStarRating', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>

                {/* activities checkboxes */}
                {/* <div className="mb-6">
                  <h4 className="font-semibold mb-2">Activities</h4>
            
                  {Object.keys(filters.activities).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.activities[key]}
                        onChange={() => handleCheckboxChange('activities', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div> */}

                {/* cities checkboxes */}
                {/* <div className="mb-6">
                  <h4 className="font-semibold mb-2">Cities</h4> */}
                {/* Map through durations or any similar category */}
                {/* {Object.keys(filters.destinations).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.destinations[key]}
                        onChange={() => handleCheckboxChange('destinations', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div> */}

                {/* inclusions checkboxes */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Inclusions</h4>
                  {/* Map through durations or any similar category */}
                  {Object.keys(filters.inclusions).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.inclusions[key]}
                        onChange={() => handleCheckboxChange('inclusions', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

            </aside>


            {/*------------ package components ------------*/}

            <div className="flex items-center w-full cursor-pointer flex-col gap-2">
              <h2 className="text-xl w-full border-b-2 text-left text-deep-purple font-medium">Showing {currentPackagesCount} out of {packagesCount} results...</h2>
              {packages.map((pkg) => (
                <PackageCompo key={pkg._id} pkg={pkg} />
              ))}


              {packages.length === 0 && <span className='text-black text-center mt-2'>Nothing to show...</span>}
              {isNoMore && packages.length > 0 && <span className='text-black text-center mt-2'>No more content...</span>}
              {isLoading && <div className="flex items-center w-24 h-24 relative">
                <Image
                  alt='loader'
                  src={Loader}
                  width={100}
                  height={100}
                />
                Loading...
              </div>}

              {/* navigation buttons */}
              <div className='mt-10 flex gap-6'>
                <button
                  onClick={() => prevPage()}
                  disabled={currentPage === 1}
                  className={`flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <FaArrowLeftLong />
                  prev
                </button>
                <span className='border rounded-full border-2 border-deep-purple flex justify-center items-center w-7 h-7'>{currentPage}</span>
                <button
                  disabled={isNoMore === true}
                  onClick={() => nextPage()}
                  className={`flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700 ${isNoMore === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}>next<FaArrowRightLong />
                </button>
              </div>
            </div>
          </div>


          {/* -----------Recommended Destinantions----------- */}
          <div className=" shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Destinations</h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay,]}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={4}
                  spaceBetween={20}
                  loop={true}
                  className="h-full relative" // Ensure the Swiper itself has a fixed height
                >
                  {[4, 2, 4, 5, 5].map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Card />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
            </div>
          </div>

          {/* -----------Recommended packages---------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Packages</h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay,]}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={4}
                  spaceBetween={20}
                  loop={true}
                  className="h-full relative" // Ensure the Swiper itself has a fixed height
                >
                  {[4, 2, 4, 5, 5].map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Card />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
            </div>
          </div>

          {/* -----------Recommended Hotels--------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Hotels</h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay,]}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={4}
                  spaceBetween={20}
                  loop={true}
                  className="h-full relative" // Ensure the Swiper itself has a fixed height
                >
                  {[4, 2, 4, 5, 5].map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Card />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
            </div>
          </div>

          {/*----------------- Recommended Blogs----------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Blogs</h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay,]}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  slidesPerView={4}
                  spaceBetween={20}
                  loop={true}
                  className="h-full relative" // Ensure the Swiper itself has a fixed height
                >
                  {[4, 2, 4, 5, 5].map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Card />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
            </div>
          </div>


          {/*----------------- Tour Reviews----------------- */}
          <div className="shadow-2xl rounded-xl p-6 bg-custom-white p-10">
            <div className="container flex flex-col items-center mx-auto  bg-dark-cyan gap-6 rounded-b-xl py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-10">Tour Reviews</h2>
              <div className=" -mx-4 justify-center max-w-2xl">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  slidesPerView={1}
                  navigation={true}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="relative"
                >
                  {
                    reviews.map((review, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <ReviewCard key={review.id} review={review} />
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </div>
            </div>
          </div>


          {/* ------------FAQS-------------- */}
          <div className="w-full shadow-2xl rounded-xl mx-auto p-5">
            <h2 className="text-3xl text-center font-semibold mb-14">Frequently Asked Questions</h2>
            <div className="space-y-2 md:space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Holidays

// Fetching static destinations
export async function getStaticProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/destinations`);
    const cities = await response.json();

    const response2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const packagesCount = await response2.json();

    return {
      props: {
        cities: cities || [],
        packagesCount: packagesCount || 0,
      },
      revalidate: 3600, // Revalidate every hour
    };

  } catch (error) {
    console.error('Error fetching destinations:', error);
    return {
      props: {
        cities: [],
        packagesCount: 0,
      },
    };
  }
}

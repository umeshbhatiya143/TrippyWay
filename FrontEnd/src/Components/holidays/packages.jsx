import React, { useState, useEffect } from 'react'
import FAQItem from '../faqItem';
import ReviewCard from '../reviewCard';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Loader from '@/assets/loader.gif'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import Card from '../card';
import PackageCompo from '../packageCompo';

const packages = () => {
  const [destination, setDestination] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [month, setMonth] = useState('');
  const [packages, setPackages] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isNoMore, setisNoMore] = useState(false)
  const [page, setPage] = useState(1)

  let currentPage = 1;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Simulated list of cities for the dropdown.
  // In a real application, you might fetch this from an API.
  const cities = [
    'Alappuzha',
    'Ernakulam',
    'Idukki',
    'Kannur',
    'Kochi',
    'Kollam',
    'Kottayam',
    'Kozhikode',
    'Palakkad',
    'Thiruvananthapuram',
    // ... more cities
  ];

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

  const handleSearch = () => {
    console.log(destination, month)
  }


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
      'Less Than 10,000': false,
      '10,000-20,000': false,
      '20,000-40,000': false,
      '40,000-60,000': false,
      '60,000-80,000': false,
      'Above 80,000': false
    },
    hotelStarRating: {
      '5 Star': false,
      '4 Star': false,
      '3 Star': false,
      '2 Star': false
    },
    activities: {
      'Adventure': false,
      'Nature': false,
      'Hill Station': false,
      'Religious': false,
      'Water Activities': false
    },
    cities: {
      'Alappuzha': false,
      'Ernakulam': false,
      'Idukki': false,
      'Kannur': false,
      'Kochi': false,
      'Kollam': false,
      'Kottayam': false,
      'Kozhikode': false,
      'Palakkad': false,
      'Thiruvananthapuram': false,
    },
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

  const pkg = [{
    imageUrl: "/slide3.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay']
  },
  {
    imageUrl: "/slide1.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay', 'Flights', 'Breakfast']
  },
  {
    imageUrl: "/slide3.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay']
  },
  {
    imageUrl: "/slide1.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay', 'Flights', 'Breakfast']
  },
  {
    imageUrl: "/slide3.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay']
  },
  {
    imageUrl: "/slide1.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay', 'Flights', 'Breakfast']
  },
  {
    imageUrl: "/slide3.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay']
  },
  {
    imageUrl: "/slide1.jpg", // Replace with your image path
    title: "Soothing Kumarakom, Munnar, Alleppey Honeymoon Package",
    duration: "7 Days & 6 Nights",
    shortDescription: "Explore the serene beauty of Kumarakom with this honeymoon package. Includes stay, meals, and sightseeing.",
    price: "₹22,900",
    originalPrice: "₹26,024",
    discount: 12, // in percentage
    hotelRatings: ['3 Star', '4 Star', '5 Star'],
    cities: ["Kochi", "Munnar", "Thekkady", "Kumarakom", "Alleppey"],
    inclusions: ['Meals', 'Sightseeing', 'Stay', 'Flights', 'Breakfast']
  },

  ];


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

  const fetchPackages = async () => {
    setisLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages?limit=10&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.packages)
      setPackages(data.packages)
      if (data.length === 0) {
        setisNoMore(true)
        setisLoading(false)
      }
      // return data.packages
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
  };

  async function nextPage() {
    currentPage++;
    setPage(currentPage)
    await fetchPackages();
    // setPackages(items)
  }

  // Function to handle previous page button click
  async function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      setPage(currentPage)
      await fetchPackages();
      // setPackages(items)
    }
  }

  useEffect(() => {
    if (page == 1) {
      fetchPackages()
      // setPackages(items)
    }
    console.log(packages)
  }, [])

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
          <div className="flex-grow">
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
          </div>

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
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Activities</h4>
                  {/* Map through durations or any similar category */}
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
                </div>

                {/* cities checkboxes */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Cities</h4>
                  {/* Map through durations or any similar category */}
                  {Object.keys(filters.cities).map((key) => (
                    <label key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.cities[key]}
                        onChange={() => handleCheckboxChange('cities', key)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{key}</span>
                    </label>
                  ))}
                </div>

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
              <h2 className="text-xl w-full border-b-2 text-left text-deep-purple font-medium">Showing {pkg.length} results...</h2>
              {packages.map((pkg) => (
                <PackageCompo pkg={pkg}/>
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
              <div className='flex gap-6'>
                {currentPage > 1 && <span onClick={() => prevPage()}
                  className='flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700'><FaArrowLeftLong />prev</span>}
                <span className='border rounded-full border-2 border-deep-purple flex justify-center items-center w-7 h-7'>{currentPage}</span>
                {!isNoMore && <span onClick={() => nextPage()}
                  className='flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700'>next<FaArrowRightLong /></span>}
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
                    reviews.map((review) => {
                      return (
                        <SwiperSlide>
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

export default packages
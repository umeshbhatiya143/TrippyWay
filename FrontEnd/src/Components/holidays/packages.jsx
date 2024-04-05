import React, { useState, useEffect } from 'react'
import FAQItem from '../faqItem';
import ReviewCard from '../reviewCard';
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

const packages = () => {
  const [destination, setDestination] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [month, setMonth] = useState('');
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

  // ------------package component--------------
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
              className="w-full p-2 rounded-l-md "
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
          <button className="bg-button-color hover:bg-button-color-hover text-white font-bold py-2 px-4 rounded-md ml-2"
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

            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-deep-purple font-medium">Showing {pkg.length} results...</h2>
              {pkg.map((pkg) => (
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
                      <p className="block mt-1 text-sm leading-tight font-medium text-black hover:underline">{pkg.duration}</p>
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
                          View Details
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r">
                          Customize & Get Quotes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* -----------Recommended Destinantions----------- */}
          <div className="shadow-2xl rounded-xl p-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Destinations</h2>
          </div>

          {/* -----------Recommended packages---------------- */}
          <div className="shadow-2xl rounded-xl p-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Packages</h2>
          </div>

          {/* -----------Recommended Hotels--------------- */}
          <div className="shadow-2xl rounded-xl p-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Hotels</h2>
          </div>

          {/*----------------- Recommended Blogs----------------- */}
          <div className="shadow-2xl rounded-xl p-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Blogs</h2>
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
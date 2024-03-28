import React, { useState, useEffect } from 'react'

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
    inclusions: ['Meals', 'Sightseeing', 'Stay']
  },

  ];

  return (
    <div className='w-full'>

      {/* -------------------search bar---------------- */}
      <div className="h-60 w-full relative bg-cover bg-no-repeat bg-center flex gap-4 items-center justify-center" style={{ backgroundImage: "url('/bg-pkg.jpg')" }}>
        {/* Search container */}
        <div className="bg-white bg-opacity-75 rounded-lg  shadow-md p-4 flex w-full max-w-2xl">
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
              className="w-full p-2 border-2 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md ml-2"
            onClick={handleSearch}>
            Explore
          </button>
        </div>
      </div>


      {/* --------------filters and package components------------ */}

      <div className="w-full flex justify-center">
        <div className="w-[70%] flex flex-row gap-6 border-1 p-6">

          {/* ---filters---- */}
          <aside className="w-full md:w-64 p-4 bg-white shadow-md">
            <div className="mb-6">
              {/* Honeymoon & Family checkboxes */}
              <h4 className="font-semibold mb-2">Categories</h4>
              {Object.keys(filters.categories).map((key) => (
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

            {/* Duration checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Budget Per Person</h4>
              {/* Map through durations or any similar category */}
              {Object.keys(filters.budgetPerPerson).map((key) => (
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

            {/* Duration checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Hotel Star Rating</h4>
              {/* Map through durations or any similar category */}
              {Object.keys(filters.hotelStarRating).map((key) => (
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

            {/* Duration checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Activities</h4>
              {/* Map through durations or any similar category */}
              {Object.keys(filters.activities).map((key) => (
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

            {/* Duration checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Cities</h4>
              {/* Map through durations or any similar category */}
              {Object.keys(filters.cities).map((key) => (
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

            {/* Duration checkboxes */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Inclusions</h4>
              {/* Map through durations or any similar category */}
              {Object.keys(filters.inclusions).map((key) => (
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

          </aside>


          {/*------------ package components ------------*/}

          <div className="flex flex-col gap-2">
            {pkg.map((pkg) => (

              <div className="max-w-md mx-auto bg-white border-2 rounded-xl shadow-md overflow-hidden md:max-w-3xl my-4">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={pkg.imageUrl} alt={pkg.title} />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{pkg.title}</div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{pkg.duration}</p>
                    <p className="mt-2 text-gray-500">{pkg.shortDescription}</p>
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
                    {/* Icons representing various inclusions */}
                    <div className="flex items-center mt-4">
                      {pkg.inclusions.map((inclusion) => (
                        <div key={inclusion} className="flex items-center mr-2">
                          <img className="h-6 w-6" src={`/icons/${inclusion.toLowerCase()}.png`} alt={inclusion} />
                          <span className="ml-1 text-sm">{inclusion}</span>
                        </div>
                      ))}
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
      </div>
    </div>
  )
}

export default packages
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsCloudUpload } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/assets/loader.gif'
import Image from 'next/image';

export default function TourPackageForm({ setIsShowPackageForm, isShowPackageForm }) {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [hotels, setHotels] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 0,
        price: 0,
        discount: 0,
        datesAvailable: [],
        destinations: [],
        itinerary: [],
        inclusions: [],
        exclusions: [],
        hotels: [],
        transportation: '',
        images: [],
        rating: '',
        reviews: [],
        numberOfBookingsMade: 0,
        availableSpots: 0,
        cancellationPolicy: '',
        paymentOptions: [],
        minimumGroupSize: 0,
        maximumGroupSize: 0,
        ageRestrictions: 0,
        healthAndSafetyMeasures: '',
        specialOffers: '',
        tagsKeywords: [],
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            datesAvailable: [...prevState.datesAvailable, date]
        }));
    };

    // Function to handle removing a selected date
    const handleRemoveDate = (dateToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            datesAvailable: formData.datesAvailable.filter(date => date !== dateToRemove)
        }));
    };

    //destinations
    const handleInputChange = (e) => {
        setInputValue(e.target.textContent);
    };

    const handleDestinationsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDestination();
        }
    };

    const addDestination = () => {
        const destination = inputValue.trim();
        if (destination) {
            setFormData(prevState => ({
                ...prevState,
                destinations: [...prevState.destinations, destination]
            }));
            setInputValue('');
        }
    };

    const removeDestination = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            destinations: prevState.destinations.filter((_, index) => index !== indexToRemove)
        }));
    };


    //itinerary

    const handleItineraryKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addItineraryItem();
        }
    };

    const addItineraryItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                itinerary: [...prevState.itinerary, item]
            }))
            setInputValue('');
        }
    };

    const removeItineraryItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            itinerary: prevState.itinerary.filter((_, index) => index !== indexToRemove)
        }));
    };

    //inclusions
    const handleInclusionsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInclusionsItem();
        }
    };

    const addInclusionsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                inclusions: [...prevState.inclusions, item]
            }))
            setInputValue('');
        }
    };

    const removeInclusionsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            inclusions: prevState.inclusions.filter((_, index) => index !== indexToRemove)
        }));
    };

    //exclusions
    const handleExclusionsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExclusionsItem();
        }
    };

    const addExclusionsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                exclusions: [...prevState.exclusions, item]
            }))
            setInputValue('');
        }
    };

    const removeExclusionsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            exclusions: prevState.exclusions.filter((_, index) => index !== indexToRemove)
        }));
    };

    //keywords
    const handleKeywordsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addKeywordsItem();
        }
    };

    const addKeywordsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                tagsKeywords: [...prevState.tagsKeywords, item]
            }))
            setInputValue('');
        }
    };

    const removeKeywordsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            tagsKeywords: prevState.tagsKeywords.filter((_, index) => index !== indexToRemove)
        }));
    };


    //hotels
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleHotelSelect = (hotelId) => {
        if (!formData.hotels.includes(hotelId)) {
            setFormData(prevState => ({
                ...prevState,
                hotels: [...prevState.hotels, hotelId]
            }));
        }
    };

    const handleRemoveHotel = (hotelId) => {
        setFormData(prevState => ({
            ...prevState,
            hotels: prevState.hotels.filter((id) => id !== hotelId)
        }));
    };

    const fetchHotelData = async () => {

        try {
          // Construct URL with query parameters
          const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/hotels`);
        //   const params = { fields: 'name,profilePicture,gender,dob,pincode,state,country,address' }; // Define fields you want to fetch
        //   url.search = new URLSearchParams(params).toString();
    
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          setHotels(data);
    
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

    const handleImageUpdate = async (selectedFile) => {
        // return new Promise(async (resolve, reject) => {
        //   if (!selectedFile) {
        //     resolve();
        //     return;
        //   }
        const formData = new FormData();
        formData.append('photo', selectedFile[0]);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/images/upload-image`, {
                method: 'POST',
                body: formData,
            });
            // if (!response.ok) throw new Error('Failed to upload image');
            const { imageUrl } = await response.json();
            return imageUrl;  // Resolve the promise with the new image URL
        } catch (error) {
            console.error(error.message);
            toast.error('Error uploading image', toastOptions);
            // reject(error);
        }
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const imgs = await Promise.all(imageURLs.map(async (imag) => {
            return handleImageUpdate(imag);
        }));

        const updatedData = {
            ...formData,
            images: imgs
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to add package');
            toast.success('Package added successfully', toastOptions);
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to add package', toastOptions);
        } finally {
            setIsLoading(false)
            setTimeout(() => {

                setIsShowPackageForm(!isShowPackageForm)
            }, 1000)
        }
    };

    //images
    function onImageChange(e) {
        setImageURLs(prevState => [...prevState, e.target.files]);

        const file = e.target.files[0];

        // Get the first selected file
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageUrl = event.target.result;
            setImages(prevState => [...prevState, imageUrl])
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    }

    function deleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        setImageURLs(updatedImages)
    }

  useEffect(()=>{
    console.log(formData)
  })

    useEffect(() => {
        fetchHotelData()
    },[])

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="relative w-full flex justify-end">
                <span
                    onClick={() => setIsShowPackageForm(!isShowPackageForm)}
                    className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all duration-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
                    <RxCross2 size={20} />
                </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Tour Package Form</h1>
            <form action='' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Duration:</label>
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">Discount (in %):</label>
                    <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="datesAvailable" className="block text-gray-700 font-bold mb-2">DatesAvailable:</label>
                    <div className='flex gap-10 items-center'>
                        <DatePicker
                            selected={null}
                            onChange={handleDateChange}
                            inline
                            selectsRange={false} // Set to false to allow selecting multiple individual dates
                            excludeDates={formData.datesAvailable}
                            dateFormat="dd/MM/yyyy"
                            calendarClassName="multiple-date-picker-calendar"
                        />
                        {formData.datesAvailable.map((date, index) => (
                            <span key={index} >
                                {new Date(date).toLocaleDateString()}
                                <button className="bg-white ml-2 rounded-md px-2 text-red-600" onClick={() => handleRemoveDate(date)}>Remove</button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="destinations" className="block text-gray-700 font-bold mb-2">Destinations:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleDestinationsKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.destinations.map((destination, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{destination}</span>
                                <button
                                    onClick={() => removeDestination(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="itinerary" className="block text-gray-700 font-bold mb-2">Itinerary:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleItineraryKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.itinerary.map((itiner, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{itiner}</span>
                                <button
                                    onClick={() => removeItineraryItem(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="inclusions" className="block text-gray-700 font-bold mb-2">Inclusions:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleInclusionsKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.inclusions.map((inclusion, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{inclusion}</span>
                                <button
                                    onClick={() => removeInclusionsItem(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="exclusions" className="block text-gray-700 font-bold mb-2">Exclusions:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleExclusionsKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.exclusions.map((exclusion, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{exclusion}</span>
                                <button
                                    onClick={() => removeExclusionsItem(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="hotels" className="block text-gray-700 font-bold mb-2">Hotels:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by hotel title"
                        className="border w-full border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                    {searchTerm && (
                        <ul className="space-y-2 border rounded-md h-60 overflow-y-scroll">
                            {hotels
                                .filter((hotel) => hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((hotel) => (
                                    <li 
                                    onClick={() => handleHotelSelect(hotel._id)}
                                    key={hotel.hotelId} className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                        <p className="font-medium text-deep-purple">{hotel.name}</p>
                                        <p className="text-gray-500 text-sm">ID: {hotel._id}</p>
                                    </li>
                                ))}
                        </ul>
                    )}
                    <div>
                        <p>Selected Hotels:</p>
                        <ul>
                            {formData.hotels.map((hotelId) => (
                                <li key={hotelId}>
                                    {hotelId}
                                    <button className='bg-white ml-2 rounded-md px-2 text-red-600' onClick={() => handleRemoveHotel(hotelId)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="availableSpots" className="block text-gray-700 font-bold mb-2">AvailableSpots:</label>
                    <input type="number" id="availableSpots" name="availableSpots" value={formData.availableSpots} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="numberOfBookingsMade" className="block text-gray-700 font-bold mb-2">Number of Bookingd Made:</label>
                    <input type="number" id="numberOfBookingsMade" name="numberOfBookingsMade" value={formData.numberOfBookingsMade} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="cancellationPolicy" className="block text-gray-700 font-bold mb-2">Cancellelation Policy:</label>
                    <textarea id="cancellationPolicy" name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" />
                </div>

                <div className="mb-4">
                    <label htmlFor="minimumGroupSize" className="block text-gray-700 font-bold mb-2">Minimum Group Size:</label>
                    <input type="number" id="minimumGroupSize" name="minimumGroupSize" value={formData.minimumGroupSize} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="maximumGroupSize" className="block text-gray-700 font-bold mb-2">Maximum Group Size:</label>
                    <input type="number" id="maximumGroupSize" name="maximumGroupSize" value={formData.maximumGroupSize} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="healthAndSafetyMeasures" className="block text-gray-700 font-bold mb-2">healthAndSafetyMeasures:</label>
                    <textarea id="healthAndSafetyMeasures" name="healthAndSafetyMeasures" value={formData.healthAndSafetyMeasures} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4" ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="ageRestrictions" className="block text-gray-700 font-bold mb-2">Age Restrictions:</label>
                    <input type="number" id="ageRestrictions" name="ageRestrictions" value={formData.ageRestrictions} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="specialOffers" className="block text-gray-700 font-bold mb-2">Special Offers:</label>
                    <input type="text" id="specialOffers" name="specialOffers" value={formData.specialOffers} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="inclusions" className="block text-gray-700 font-bold mb-2">Keywords:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleKeywordsKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.tagsKeywords.map((keyword, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{keyword}</span>
                                <button
                                    onClick={() => removeKeywordsItem(index)}
                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* upload and display images */}
                <div className="flex items-center justify-center flex-col gap-20">
                    <label htmlFor="images" className="block text-2xl text-gray-700 font-bold mb-2">Images:</label>
                    <div className="pt-30 flex items-center justify-center min-h-100">
                        <label className='text-sm cursor-pointer flex flex-col items-center' htmlFor="getKachra">
                            <BsCloudUpload size={30} />
                            <span style={{ color: "blue" }}>click here, or drag & drop</span>
                            <span style={{ color: "dimgray" }}>to upload the kachra...</span>
                        </label>
                        <input
                            type="file"
                            id='getKachra'
                            multiple
                            accept="image/*"
                            onChange={onImageChange}
                            className="hidden" />

                    </div>
                    <div className="flex flex-wrap gap-10">
                        {images.map((imageSrc, index) => (
                            <div className="relative" key={index}>
                                <RxCrossCircled size={40} className="absolute top-0 right-0  text-white rounded-full bg-deep-purple cursor-pointer" onClick={() => deleteImage(index)} />
                                <img className='w-80 h-80 rounded object-cover' src={imageSrc} alt="not found" />
                            </div>
                        ))
                        }
                    </div>
                </div>

                {!isLoading ? (<button type="submit" className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>)
                    :
                    (
                        <div className="w-20 h-20 relative">
                            <Image src={Loader} alt="Loading..." layout="fill" objectFit="cover" />
                        </div>
                    )}
            </form >

            <ToastContainer />
        </div >
    );
}
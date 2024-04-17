import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsCloudUpload } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/assets/loader.gif'
import Image from 'next/image';

export default function TourPackageForm({ setIsShowHotelForm, isShowHotelForm }) {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: [],
        rating: 0,
        description: '',
        amenities: [],
        price: 0,
        images: [],
        Availability:''
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

    //destinations
    const handleInputChange = (e) => {
        setInputValue(e.target.textContent);
    };

    const handleLocationKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addLocation();
        }
    };

    const addLocation = () => {
        const location = inputValue.trim();
        if (location) {
            setFormData(prevState => ({
                ...prevState,
                location: [...prevState.location, location]
            }));
            setInputValue('');
        }
    };

    const removeDestination = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            location: prevState.location.filter((_, index) => index !== indexToRemove)
        }));
    };


    //amenities

    const handleAmenitiesKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addAmenitiesItem();
        }
    };

    const addAmenitiesItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                amenities: [...prevState.amenities, item]
            }))
            setInputValue('');
        }
    };

    const removeAmenitiesItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            amenities: prevState.amenities.filter((_, index) => index !== indexToRemove)
        }));
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/hotels/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to add hotel');
            toast.success('Hotel added successfully', toastOptions);
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to add hotel', toastOptions);
        } finally {
            setIsLoading(false)
            setTimeout(() => {

                setIsShowHotelForm(!isShowHotelForm)
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


    // useEffect(() => {
    //     console.log(formData)
    //     console.log(images)
    // })

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="relative w-full flex justify-end">
                <span
                    onClick={() => setIsShowHotelForm(!isShowHotelForm)}
                    className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all duration-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
                    <RxCross2 size={20} />
                </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Add Hotel Form</h1>
            <form action='' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div className="mb-4">
                    <label htmlFor="locations" className="block text-gray-700 font-bold mb-2">Locations:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleLocationKeyDown}
                        placeholder="Enter destinations separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.location.map((destination, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{destination}</span>
                                <div
                                    onClick={() => removeDestination(index)}
                                    className="text-red-500 cursor-pointer hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="amenities" className="block text-gray-700 font-bold mb-2">Amenities:</label>
                    <div
                        contentEditable="true"
                        className="border border-gray-300 p-2 rounded"
                        onInput={handleInputChange}
                        onKeyDown={handleAmenitiesKeyDown}
                        placeholder="Enter amenities separated by commas"
                    ></div>
                    <div className="flex flex-wrap mt-2">
                        {formData.amenities.map((amenities, index) => (
                            <div key={index} className="bg-gray-200 p-1 rounded-full mr-2 mb-2 flex items-center">
                                <span className="mr-1">{amenities}</span>
                                <div
                                    onClick={() => removeAmenitiesItem(index)}
                                    className="text-red-500 cursor-pointer hover:text-red-700 focus:outline-none"
                                >
                                    &#10005;
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating:</label>
                    <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
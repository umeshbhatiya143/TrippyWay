import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
//import { LiaHotelSolid } from "react-icons/lia";

import { FaTents } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "@/Components/reviewCard";
//import ex from "@/Components/ex";
import FAQItem from "@/Components/faqItem";
import Card from "@/Components/card";
import Rating from "@/Components/Rating";
import { IoWifiSharp } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { MdRoomService } from "react-icons/md";
import { MdDryCleaning } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { FaFire } from "react-icons/fa6";
import { PiTelevisionBold } from "react-icons/pi";
import { GiSoap } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { FaSwimmingPool } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { MdAirportShuttle } from "react-icons/md";
import { GiWineBottle } from "react-icons/gi";
import { MdIron } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
const Hotels = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  const [hotel,setHotel]=useState({
    
        name: "",
        location: [ ],
        rating: 0,
        description: "",
        amenities: [],
        price: 0,
        images: []
  })
  const slideContent = [
    {
      image: "/slide1.jpg",
    },
    {
      image: "/slide2.jpg",
    },
    {
      image: "/slide3.jpg",
    },
  ];

  const hotelAmenities = {
    Wifi: <IoWifiSharp size="25" />,
    Parking: <FaCar size="25" />,
    "Front Desk Service": <IoIosPerson size="25" />,
    Roomservice: <MdRoomService size="25" />,
    Housekeeping: <MdDryCleaning size="25" />,
    "Air Conditioning": <TbAirConditioning size="25" />,
    Heating: <FaFire size="25" />,
    Television: <PiTelevisionBold size="25" />,
    "Bathroom Essentials": <GiSoap size="25" />,
    "Fitness Center": <CgGym size="25" />,
    "Swimming Pool": <FaSwimmingPool size="25" />,
    "Restaurant Bar": <IoRestaurant size="25" />,
    "Airport Shuttle": <MdAirportShuttle size="25" />,
    "Mini Bar": <GiWineBottle size="25" />,
    "Ironing Facilities": <MdIron size="25" />,
    "Pet Friendly": <MdOutlinePets size="25" />,
  };

  const hotels = {
    name: "Zostel Shangarh | Standard Private Room",
    location: "8 km from City Center",

    rating: 0,
    description1:
      "Our Hostel in Shangarh is nestled under the verdant, forested mountain ranges of the Great Himalayan National Park. Dipped in scenic beauty and a meditative quiet air, this backpackers’ hostel in Himachal Pradesh offers sublime views of snow-capped mountains with an environment suited for artists, digital nomads, and creators.",
    description2:
      "Our Hostel in Shangarh is nestled under the verdant, forested mountain ranges of the Great Himalayan National Park. Dipped in scenic beauty and a meditative quiet air, this backpackers’ hostel in Himachal Pradesh offers sublime views of snow-capped mountains with an environment suited for artists, digital nomads, and creators.",
    amenities: [
      "Wifi",
      "Parking",
      "Front Desk Service",
      "Roomservice",
      "Housekeeping",
      "Air Conditioning",
      "Heating",
      "Television",
      "Bathroom Essentials",
      "Fitness Center",
      "Swimming Pool",
      "Restaurant Bar",
      "Airport Shuttle",
      "Mini Bar",
      "Ironing Facilities",
      "Pet Friendly",
    ],
    rooms: [
      {
        name: "Standard Room",
        type: "Single",
        description: "Comfortable standard room with single bed",
        capacity: 1,
        beds: 1,
        price: 100,
        currency: "USD",
        amenities: [
          "Wifi",
          "Television",
          "Air Conditioning",
          "Bathroom Essentials",
          "Roomservice",
        ],
        imageURL: "URL to Room Image",
        createdAt: "Date and Time of Creation",
        updatedAt: "Date and Time of Last Update",
      },
      {
        name: "Standard Room",
        type: "Single",
        description: "Comfortable standard room with single bed",
        capacity: 1,
        beds: 1,
        price: 100,
        currency: "USD",
        amenities: [
            "Wifi",
            "Television",
            "Air Conditioning",
            "Bathroom Essentials",
            "Roomservice",
          ],
        imageURL: "URL to Room Image",
        createdAt: "Date and Time of Creation",
        updatedAt: "Date and Time of Last Update",
      },
      {
        name: "Standard Room",
        type: "Single",
        description: "Comfortable standard room with single bed",
        capacity: 1,
        beds: 1,
        price: 100,
        currency: "USD",
        amenities: [
            "Wifi",
            "Television",
            "Air Conditioning",
            "Bathroom Essentials",
            "Roomservice",
          ],
        imageURL: "URL to Room Image",
        createdAt: "Date and Time of Creation",
        updatedAt: "Date and Time of Last Update",
      },
    ],
    price: 0,
    currency: "USD",
    imageURL: "URL to Hotel Image",
    createdAt: "Date and Time of Creation",
    updatedAt: "Date and Time of Last Update",
  };
  const reviews = [
    // Dummy review data
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "What’s most special about this resort is that it is loved by all kinds of travelers for its beautiful location and splendid views of the Himalayas that it offers. Besides this, the hospitality here is heartwarming and the amenities are umpteen to keep every guest pampered. ",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "What’s most special about this resort is that it is loved by all kinds of travelers for its beautiful location and splendid views of the Himalayas that it offers. Besides this, the hospitality here is heartwarming and the amenities are umpteen to keep every guest pampered. ",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "What’s most special about this resort is that it is loved by all kinds of travelers for its beautiful location and splendid views of the Himalayas that it offers. Besides this, the hospitality here is heartwarming and the amenities are umpteen to keep every guest pampered. ",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "What’s most special about this resort is that it is loved by all kinds of travelers for its beautiful location and splendid views of the Himalayas that it offers. Besides this, the hospitality here is heartwarming and the amenities are umpteen to keep every guest pampered. ",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    // More reviews...
  ];
  const [read, setRead] = useState(false);
  const readFunction = () => setRead((read) => !read);
  const stars = 4.5;


  const fetchHotel = async () => {

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/hotels/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log(data.package)
      
     setHotel(data.hotel);
      
      
      
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHotel()
   
    
   
  }, [id]);
  console.log(hotel)

  return (
    <div className="flex w-full justify-center ">
      <div className="w-[70%] flex flex-col gap-4">
        <div className="shadow-2xl p-4">
          {/*Subheading */}
          <div className="bg-slate-200 rounded-md w-full mt-0">
            <div className="container  md:flex justify-between gap-5 items-center p-4">
              {/* package heading */}
              <div className="flex flex-col gap-4 font-sans md:text-3xl font-bold ">
                <h2>{hotel.name}</h2>
              </div>
              {/* customize and book Section */}
              {/* <div className="flex items-center space-x-4 gap-5 justify-center ">
                <div className="">
                  <button className="bg-dark-cyan hover:bg-opacity-80 text-white transition-colors duration-300 font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                    Customize
                  </button>
                </div>
                <div className="">
                  <button className="bg-button-color hover:bg-button-color-hover transition-colors duration-300 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                    Book
                  </button>
                </div>
              </div> */}
            </div>
            {/* Anchor section  */}
            <div>
              <ul className="md:flex md:flex-row  px-4 md:item-center">
                <a
                  href="#photos"
                  className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                >
                  <li className="">
                    <div className="flex items-center gap-1 font-bold">
                      <FaImages className="mr-2 sm:mr-0" />
                      Photos
                    </div>
                  </li>
                </a>

                <a
                  href="#about"
                  className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                >
                  <li className="">
                    <div className="flex items-center  gap-1 font-bold">
                      <IoIosInformationCircle className="mr-2 sm" />
                      About
                    </div>
                  </li>
                </a>

                <a
                  href="#rooms"
                  className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                >
                  <li className="">
                    <div className="flex items-center gap-1 font-bold ">
                      <IoBed className="mr-2" />
                      Rooms
                    </div>
                  </li>
                </a>

                <a
                  href="#amenties"
                  className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                >
                  <li className="">
                    <div className="flex items-center gap-1 font-bold">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>Amenities</span>
                    </div>
                  </li>
                </a>
                <a
                  href="#location"
                  className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                >
                  <li className="">
                    <div className="flex items-center gap-1 font-bold">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>Location</span>
                    </div>
                  </li>
                </a>
              </ul>
            </div>
          </div>
          {/* Carosol section */}
          <div id="photos" className="md:flex">
            <div className="overflow-hidden relative mt-5 ml-2 md:w-2/3 mr-2">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                slidesPerView={1}
                loop={true}
                className="h-full relative" // Ensure the Swiper itself has a fixed height
              >
                {hotel.images.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center rounded-md justify-center bg-gray-200">
                      {" "}
                      {/* Added bg-gray-200 as a placeholder background */}
                      <img
                        src={slide}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="md:w-1/3 mt-5 ml-3">
              <div id="customize" className="mt-2">
                <p className="font-bold md:text-xl">Customizable</p>
                <p className="text-left mt-2 mb-2">
                  Tailor your stay to perfection - from room selection to
                  amenities, craft your ideal hotel experience.
                </p>

                <hr size="3"></hr>
              </div>

              <div id="stay" className="mt-2">
                <p className="font-bold md:text-xl">Stay Plan</p>
                <div className=" md:text-xl flex justify-start space-x-5 m-2 mt-8 mb-5">
                  <FaTents className="font-bold md:text-2xl" />
                  <p>2 days 1 Night</p>
                </div>
                <hr size="3"></hr>
              </div>

              <div id="inclusion" className="mt-2">
                <p className="font-bold md:text-xl">Rating</p>
                <div>
                  <Rating stars={hotel.rating} />
                </div>

                <hr size="3"></hr>
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div id="about">
            <div className="text-xl font-bold m-5">About the hotel</div>

            <div className="m-5">
              {hotel.description}
              {/* <button onClick={readFunction} className="font-bold p-1">
                {" "}
                {read ? "Read Less" : "Read More..."}
              </button>
              {read ? <div>{hotels.description2}</div> : <></>} */}
            </div>
          </div>
          <hr></hr>
          {/* Locations */}
          <div id="location" className="flex flex-col m-3">
            <div className="text-xl font-bold m-5">Location </div>

            <div className="md:w-[50%] md:ml-10">{hotel.location}</div>
          </div>
          <hr></hr>
          {/* Rooms */}
          <hr></hr>
          <div id="amenties">
            <div className="text-xl font-bold m-5">
              Facilities you will receive at this hotel
            </div>
            <div className="flex flex-row justify-center border  ">
              <div className="grid grid-cols-5 gap-4 justify-start gap-y-6 m-2 mt-8 mb-5">
                {hotel.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex flex-col gap-2 justify-center items-center mr-2"
                  >
                    {/*<img className="h-6 w-6" src={`/icons/${inclusion.toLowerCase()}.png`} alt={inclusion} />*/}
                    {hotelAmenities[amenity]}
                    <span className="ml-1 font-normal">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr></hr>
          

          <div id="rooms" className="m-3 p-2">
            <div className="text-xl font-bold m-5 ">
              Room Types at {hotel.name}{" "}
            </div>
            <div className="flex flex-col justify-center ">
              {hotels.rooms.map((room, index) => (
                <div key={index} className="w-full flex flex-row gap-4 mx-auto bg-white border-2  rounded-md shadow-md overflow-hidden my-4">
                  <div className="w-2/6 m-2 rounded-md">
                    <Swiper
                      modules={[Navigation]}
                      navigation={true}
                      slidesPerView={1}
                      loop={true}
                      className="h-60 relative" // Ensure the Swiper itself has a fixed height
                    >
                      {hotel.images.map((slide, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            {" "}
                            {/* Added bg-gray-200 as a placeholder background */}
                            <img
                              src={slide}
                              alt={`Slide ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="w-4/6 flex flex-col">
                    {/* other description of room */}

                    <div className="text-xl font-medium p-1 text-dark-cyan"> {room.name}</div>
                    <div className="flex flex-col m-3">
                      <div>Type: {room.type}</div>

                      <div> Capacity:{room.capacity}</div>
                      <div> bed: {room.beds}</div>
                      <div> {room.description}</div>
                    </div>
                    {/* Ameneties */}
                    <div className="flex p-4 gap-2 justify-between flex-wrap items-center mt-2">
                      {room.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex flex-col gap-2 justify-center items-center mr-2 text-button-color-hover"
                        >
                          {/*<img className="h-6 w-6" src={`/icons/${inclusion.toLowerCase()}.png`} alt={inclusion} />*/}
                          {hotelAmenities[amenity]}
                          <span className="ml-1 text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*----------------- Tour Reviews----------------- */}
        <div className="shadow-2xl rounded-xl p-6 bg-custom-white p-10">
            <div className="container flex flex-col items-center mx-auto  bg-dark-cyan gap-6 rounded-b-xl py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-10">Hotel Reviews</h2>
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
      </div>
      
    </div>
  );
};

export default Hotels;

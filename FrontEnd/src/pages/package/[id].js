import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
//import { LiaHotelSolid } from "react-icons/lia";
import { GiMeal } from "react-icons/gi";
import { FaMountainSun } from "react-icons/fa6";
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
import FAQItem from "@/Components/faqItem";
import Card from "@/Components/card";
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
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin, loginUser, logoutUser } from "@/store/slices";
import { toast } from "react-toastify";
import { GoDotFill } from "react-icons/go";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { SlLocationPin } from "react-icons/sl";
import { FaCalendarCheck } from "react-icons/fa6";
import Calendar from 'react-calendar';

const Packages = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const [showMore, setShowMore] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const [pack, setPack] = useState({
    title: "",
    description: "",
    duration: 0,
    price: 0,
    discount: 0,
    datesAvailable: [],
    destinations: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    hotels: [],
    transportation: "",
    images: [],
    rating: "",
    reviews: [],
    numberOfBookingsMade: 0,
    availableSpots: 0,
    cancellationPolicy: "",
    paymentOptions: [],
    minimumGroupSize: 0,
    maximumGroupSize: 0,
    ageRestrictions: 0,
    healthAndSafetyMeasures: "",
    specialOffers: "",
    tagsKeywords: [],
  });
  const router = useRouter();
  const { id } = router.query;
  //hooks to
  const [read, setRead] = useState(false);
  const [packageHotel, setPackageHotel] = useState([]);
  // const [open, setOpen] = useState(...pack.detailedItinirary,);
  const [selectedDate, setSelectedDate] = useState('2022-04-18');

  // Dummy data for available dates and package prices
  const availableDates = [
    { date: '2022-04-18', price: '$100' },
    { date: '2022-04-20', price: '$120' },
    // Add more available dates and prices as needed
  ];

  // Function to check if a date is available
  const isDateAvailable = date => availableDates.find(item => item.date === date.toISOString().split('T')[0]);

  // Function to disable non-available dates
  const tileDisabled = ({ date }) => {
    const availability = isDateAvailable(date);
    return !availability; // Disable dates that are not available
  };

  // Function to render custom content for calendar tile
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const availability = isDateAvailable(date);
      if (availability) {
        return (
          <div className="text-center">
            <p className=" text-[10px] text-deep-purple">{availability.price}</p>
          </div>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

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

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const iSize = 25;
  const inclusionIcons = {
    Sightseeing: <PiBinoculars size={iSize} />,
    Meals: <GiHotMeal size={iSize} />,
    Breakfast: <IoFastFoodOutline size={iSize} />,
    Transfers: <MdOutlineTransferWithinAStation size={iSize} />,
    "Airport Pickup-Drop": <MdAirportShuttle size={iSize} />,
    "Private Cab": <FaCar size={iSize} />,
    Cruise: <GiCruiser size={iSize} />,
    Houseboat: <MdHouseboat size={iSize} />,
    "Adventure Activity": <TbTrekking />,
    Safari: <ImSafari size={iSize} />,
    Flights: <MdOutlineFlight size={iSize} />,
    Stay: <FaHome size={iSize} />,
  };

  //--------Reviews------
  const reviews = [
    // Dummy review data
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "Amazing experience, our guide was knowledgeable and friendly!",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "Amazing experience, our guide was knowledgeable and friendly!",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "Amazing experience, our guide was knowledgeable and friendly!",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    {
      id: 1,
      name: "John Doe",
      date: "Oct 22, 2023",
      rating: 5,
      comment: "Amazing experience, our guide was knowledgeable and friendly!",
      avatar: "https://i.pravatar.cc/300?img=1", // Placeholder avatar image URL
    },
    // More reviews...
  ];

  // ------faqs---------
  const faqs = [
    {
      question: "How do I sign up?",
      answer:
        "You can sign up by clicking the Sign Up button at the top of the page.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription from your profile settings at any time.",
    },
    {
      question: "How do I sign up?",
      answer:
        "You can sign up by clicking the Sign Up button at the top of the page.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription from your profile settings at any time.",
    },
    {
      question: "How do I sign up?",
      answer:
        "You can sign up by clicking the Sign Up button at the top of the page.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription from your profile settings at any time.",
    },
    // ... more FAQs
  ];

  // //ReadMore
  const readFunction = () => setRead((read) => !read);

  const prev = () =>
    setCurr((curr) => (curr == 0 ? images.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr == images.length - 1 ? 0 : curr + 1));
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings_small = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // //to maintain accordion state
  // const [openSections, setOpenSections] = useState(Array(pack.detailedItininary.length).fill(false));

  const toggle = (index) => {
    const newOpenSections = [...openSections];
    newOpenSections[index] = !newOpenSections[index];
    setOpenSections(newOpenSections);
  };


  //fetch hotlel
  const fetchHotel = async (hotelId) => {

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/hotels/${hotelId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.hotel;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHotels = async (data) => {
    const hotels = await Promise.all(
      data.map((hotelId) => {
        return fetchHotel(hotelId);
      })
    );

    setPackageHotel(hotels);

  };

  const fetchPackage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/packages/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      fetchHotels(data.package.hotels)
      setPack(data.package);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (pkgId) => {
    // setIsLoading(true)

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`
      );
      const params = { fields: "cart" }; // Define fields you want to fetch
      url.search = new URLSearchParams(params).toString();

      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        res = await res.json();

        const updatedCart = [...res.user.cart, pkgId];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart }),
          }
        );
        if (!response.ok) throw new Error("Failed to update profile");
        toast.success("Package added in cart successfully", toastOptions);

        const updatedData = {
          userId: userData.userId,
          token: userData.token,
          cart: updatedCart,
        };
        dispatch(loginUser(updatedData));
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add package in cart", toastOptions);
    } finally {
      router.push("/Cart");
    }
  };

  const addToCart = (pkgId) => {
    if (isLoggedIn) {
      updateUserProfile(pkgId);
    } else {
      dispatch(toggleLogin());
    }
  };

  useEffect(() => {
    fetchPackage()
  }, [id]);


  let itininaryIcon1 = { background: "#0B525B" }
  let itininaryIcon2 = { background: "#3C096C" }


  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[70%] flex flex-col gap-20">
          {/* Anchor Section */}
          <div className="shadow-2xl p-4">
            <div className="bg-slate-200 rounded-md w-full mt-0">
              <div className="container  md:flex justify-between gap-5 items-center p-4">
                {/* package heading */}
                <div className="flex flex-col gap-2 font-sans md:text-3xl font-bold ">
                  <h2 className="text-deep-purple">{pack.title}</h2>
                  <span className="text-dark-cyan text-sm font-normal border border-deep-purple w-fit px-2 rounded-md">{pack.destinations.join(' ➜ ')}</span>
                  {/* <div className="flex flex-col gap-1">
                    <div className="text-teal-600 text-sm">
                      {pack.discount}% Off
                    </div>
                    <div className="items-center font-sans md:text-2xl font-bold">
                      <span>&#8377;</span>
                      {Math.floor(
                        pack.price - (pack.price * pack.discount) / 100
                      )}
                      <sup className="text-red text-bold">*</sup>
                      <div className="ml-4 relative inline-block">
                        <span className="relative z-10 text-deep-purple text-xl">
                          {pack.price}
                        </span>
                        <div className="absolute w-full h-0.5 bg-deep-purple top-1/2 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* customize and book Section */}
                {/* <div className="flex w-fit items-center space-x-4 gap-5 justify-center ">
                  <div className="">
                    <button className="bg-dark-cyan hover:bg-opacity-80 text-white transition-colors duration-300 font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                      Customize
                    </button>
                  </div>
                  <div onClick={() => addToCart(pack._id)} className="">
                    <button className="bg-button-color w-36 hover:bg-button-color-hover transition-colors duration-300 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                      Add to Cart
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
                    href="#hotels"
                    className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                  >
                    <li className="">
                      <div className="flex items-center gap-1 font-bold ">
                        <LiaHotelSolid className="mr-2" />
                        Hotels
                      </div>
                    </li>
                  </a>

                  <a
                    href="#itininary"
                    className="flex py-2 px-4 rounded-md hover:bg-deep-purple transition-colors duration-300 hover:text-white items-center justify-center"
                  >
                    <li className="">
                      <div className="flex items-center gap-1 font-bold">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>Detailed itininary</span>
                      </div>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            {/* Different section of the page */}

            {/* carosel section of the page */}
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
                  className="h-[600px] relative" // Ensure the Swiper itself has a fixed height
                >
                  {pack.images.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center rounded-md justify-center bg-gray-200">
                        <img
                          src={slide}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full rounded-md object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* <div className="absolute bottom-4 right-0 left-0">
                <div className="flex justify-center items-center gap-2">
                  {images.map((_, i) => (
                    <div
                      className={`transition-all md:w-4 md:h-4 sm:w-3 sm:h-3 bg-white rounded-full ${curr == i ? "p-2" : "bg-opacity-50"
                        }`}
                    />
                  ))}
                </div>
              </div> */}
              </div>
              <div style={{ scrollbarWidth: "none" }} className="md:w-1/3 shadow-xl border-2 rounded-md h-[600px] overflow-y-scroll mt-5 px-8">
                <div id="stay" className="mt-2">
                  <p className="font-bold md:text-xl">Stay Plan</p>
                  <div className=" md:text-xl flex justify-start space-x-5 m-2 mt-5 mb-5">
                    <FaTents className="font-bold md:text-2xl" />
                    <p className="border border-deep-purple px-2 rounded-md">{pack.duration-1} nights / {pack.duration} days</p>
                  </div>
                  <hr size="3"></hr>
                </div>

                <div id="price" className="mt-5 ml-3">
                  {/* <p className="font-bold md:text-xl">Price</p> */}
                  <div className="flex flex-col gap-1 mb-5">
                    <div className="text-teal-600 text-sm">
                      {pack.discount}% Off
                    </div>
                    <div className="items-center flex font-sans md:text-3xl font-bold text-deep-purple ">
                      <span>&#8377;</span>
                      {Math.floor(
                        pack.price - (pack.price * pack.discount) / 100
                      )}
                      <sup className="text-red-600 text-bold">*</sup>
                      <div className="ml-4 flex relative inline-block -mb-2">
                        <span className="relative text-gray-600 font-normal text-[16px]">
                          {pack.price}
                        </span>
                        <div className="absolute w-full h-[2px] bg-gray-900 top-[17px]"></div>

                      </div>
                    </div>
                    <p className="text-gray-600 text-[10px] font-normal -mt-2">*per person</p>
                  </div>

                  {/* calendar for selecting available dates */}
                  <div className="flex justify-between">
                    <span className="flex gap-2 items-center mb-3">
                      <FaCalendarCheck />
                      {selectedDate}
                    </span>
                    <span onClick={() => setShowCalendar(!showCalendar)} className="cursor-pointer text-md text-blue-600">Modify</span>
                  </div>
                  {showCalendar &&
                    < div className="container border-2 border-gray-300 rounded-xl shadow-2xl mx-auto p-5">
                      <Calendar
                        value={selectedDate}
                        onChange={setSelectedDate}
                        tileClassName={({ date }) => {
                          const availability = isDateAvailable(date);
                          return availability ? 'react-calendar__tile--available' : 'react-calendar__tile--disabled';
                        }}
                        tileContent={tileContent}
                      />
                    </div>}

                  <div onClick={() => addToCart(pack._id)} className="mb-4 mt-2">
                    <button className="flex items-center justify-center bg-gradient-to-bl from-deep-purple to-dark-cyan text-white bg-dark-cyan hover:bg-button-color-hover transition-colors py-1 px-6 rounded-full">
                      Add to Cart
                    </button>
                  </div>

                  <hr size="3"></hr>
                </div>

                <div className="mt-4">
                  <p className="font-bold md:text-xl">
                    Hotel Included in the package:
                  </p>
                  <div className="mb-5 mt-8">
                    {["2 star", "3 star", "4 star", "5 star"].map((rating) => (
                      <span
                        key={rating}
                        className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}
                      >
                        {rating}
                      </span>
                    ))}
                  </div>
                  <hr size="3"></hr>
                </div>

                <div id="inclusion" className="mt-2">
                  <p className="font-bold md:text-xl">Inclusions</p>
                  {/* <div className="flex justify-start space-x-10 m-2 mt-8 mb-5">
                    <div>
                      <LiaHotelSolid className="font-bold md:text-2xl" />
                      <p>Hotels</p>
                    </div>
                    <div>
                      <FaCar className="font-bold md:text-2xl" />
                      <p>Travel</p>
                    </div>
                    <div>
                      <GiMeal className="font-bold md:text-2xl" />
                      <p>Hotels</p>
                    </div>
                    <div>
                      <FaMountainSun className="font-bold md:text-2xl" />
                      <p>Sightseeing</p>
                    </div>
                  </div> */}
                  <div className="flex p-4 gap-4 flex-wrap items-center mt-4">
                    {pack?.inclusions?.map((inclusion) => (
                      <div
                        key={inclusion}
                        className="flex flex-col gap-2 justify-center items-center mr-2"
                      >
                        {/*<img className="h-6 w-6" src={`/icons/${inclusion.toLowerCase()}.png`} alt={inclusion} />*/}
                        {inclusionIcons[inclusion]}
                        <span className="ml-1 text-sm">{inclusion}</span>
                      </div>
                    ))}
                  </div>
                  <hr size="3"></hr>
                </div>
              </div>
            </div>
            <hr className="mt-5 mb-5"></hr>
            {/* About the package */}
            <div id="about" className="flex">
              <div>
                <div className="text-xl font-bold m-5">About The Place</div>

                <div className="m-5">
                  {pack.description.substring(0, 500)}
                  {!showMore && <span className="font-bold cursor-pointer text-deep-purple" onClick={() => setShowMore(!showMore)}>...show more</span>}
                  {showMore && <span>{pack.description.substring(500)}</span>}
                  {showMore && <span className="font-bold cursor-pointer text-deep-purple" onClick={() => setShowMore(!showMore)}>show Less</span>}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="text-xl font-bold m-5">Hotels</div>
            <div id="hotels" className="w-full ">
              <div className="w-full mt-5 flex flex-row justify-center">
                {/* <Slider {...settings}>
                {packageHotel.map((hotel, index) => {
                  return (
                    <div key={index} className="bg-slate-200 rounded-xl w-[300px] h-[350px] text-black ">
                      <a>
                        <img
                          className="rounded-t-xl h-[200px]"
                          src={hotel.images[0]}
                        ></img>
                        <div className="flex flex-col justify-start gap-1 p-1">
                          <p className="text-xl font-semibold">{hotel.name}</p>
                          <p>{hotel.price}</p>
                          <p>{hotel.location}</p>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </Slider> */}

                <Swiper
                  modules={[Navigation, Autoplay, Pagination]}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                  pagination={{ clickable: true }}
                  slidesPerView={2}

                  loop={true}
                  className="h-full w-full relative flex flex-row gap-3 justify-center" // Ensure the Swiper itself has a fixed height
                >
                  {packageHotel.map((hotel, index) => {
                    return (
                      <SwiperSlide key={index} >
                        <div className="bg-slate-200 rounded-xl w-[300px] h-[400px] text-black m-10 p-5">

                          <div className="bg-white h-[350px]">

                            <img
                              className="rounded-t-xl h-[250px] w-[300px]"
                              src={hotel.images[0]}
                            ></img>
                            <div className="flex flex-col justify-start gap-1 p-1">
                              <p className="text-[15px] font-semibold">{hotel.name}</p>
                              <div className="flex flex-row justify-between m-2 ">
                                <p><span>&#8377;</span>{hotel.price}</p>
                                {/* <p>{hotel.location}</p> */}
                                <button onClick={() => router.push(`/hotel/${hotel._id}`)}
                                  className="m-2 bg-deep-purple hover:bg-opacity-75 transition-colors duration-300 text-white font-bold py-2 px-4 rounded-l">
                                  View Details
                                </button>
                              </div>

                            </div>
                          </div>



                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <hr className="mt-10 mb-5"></hr>

            <div className="md:w-1/2 m-5 sm:w-full">


            </div>
            <div id="itininary" className="text-xl font-bold mb-5 m-3">Detailed itininary</div>
            <div className="bg-slate-200 rounded-xl">

              <VerticalTimeline className="border-t-2">
                {pack.itinerary.map((itininary, index) => {
                  return (<VerticalTimelineElement contentStyle={{ borderTop: "#3C096C" }} key={index} date={itininary.split("-")[0]} dateClassName="date" iconStyle={index % 2 == 0 ? itininaryIcon1 : itininaryIcon2} icon={<SlLocationPin className="text-white font-bold" />}>
                    <h3 className={`vertical-timeline-element-title font-semibold text-xl m-2 p-1 ${index % 2 != 0 ? 'text-button-color-hover' : 'text-dark-cyan'} `}>{itininary.split("-")[1]}</h3>
                    <hr className="bg-button-color"></hr>
                    <p id="description" className="m-2 p-2 text-[14px]" >{itininary.split("-")[2]}</p>
                  </VerticalTimelineElement>)
                })}
              </VerticalTimeline>
            </div>

            {/* cancellation policy */}
            <div className="flex gap-10 p-10 w-full">
              <div className="p-4 w-1/2 rounded-md border">
                <h2 className="font-bold text-xl">Exclusions</h2>
              </div>
              <div className="p-4 w-1/2 rounded-md border">
                <h2 className="font-bold text-xl">Cancellation Policy</h2>
                <p>{pack.cancellationPolicy}</p>
              </div>
            </div>
          </div>

          {/* -----------Recommended Destinantions----------- */}
          <div className=" shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
              Recommened Destinations
            </h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay]}
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
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">
                view more
              </div>
            </div>
          </div>

          {/* -----------Recommended packages---------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
              Recommened Packages
            </h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay]}
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
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">
                view more
              </div>
            </div>
          </div>

          {/* -----------Recommended Hotels--------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
              Recommened Hotels
            </h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay]}
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
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">
                view more
              </div>
            </div>
          </div>

          {/*----------------- Recommended Blogs----------------- */}
          <div className="shadow-2xl rounded-xl pt-20 px-4 pb-10">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
              Recommened Blogs
            </h2>
            <div className=" relative">
              {/* <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div> */}
              <div className="verflow-hidden flex relative">
                <Swiper
                  modules={[Autoplay]}
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
              <div className="w-28 text-dark-cyan border text-center border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">
                view more
              </div>
            </div>
          </div>

          {/*----------------- Tour Reviews----------------- */}
          <div className="shadow-2xl rounded-xl p-6 bg-custom-white p-10">
            <div className="container flex flex-col items-center mx-auto  bg-dark-cyan gap-6 rounded-b-xl py-20">
              <h2 className="text-4xl font-bold text-center text-white mb-10">
                Tour Reviews
              </h2>
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
                  {reviews.map((review) => {
                    return (
                      <SwiperSlide>
                        <ReviewCard key={review.id} review={review} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>

          {/* ------------FAQS-------------- */}
          <div className="w-full shadow-2xl rounded-xl mx-auto p-5">
            <h2 className="text-3xl text-center font-semibold mb-14">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2 md:space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Packages;

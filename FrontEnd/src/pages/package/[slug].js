import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
//import { LiaHotelSolid } from "react-icons/lia";
import { FaCar } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { FaMountainSun } from "react-icons/fa6";
import { FaTents } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pack from "./pack.json";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ReviewCard from "@/Components/reviewCard";
import FAQItem from "@/Components/faqItem";
import Card from "@/Components/card";

const Packages = () => {
  const router = useRouter();
  const { slug } = router.query;
  //hooks to
  const [read, setRead] = useState(false);
  // const [open, setOpen] = useState(...pack.detailedItinirary,);

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
  const [openSections, setOpenSections] = useState(Array(pack.detailedItininary.length).fill(false));

  const toggle = (index) => {
    const newOpenSections = [...openSections];
    newOpenSections[index] = !newOpenSections[index];
    setOpenSections(newOpenSections);
  };

  return (
    <>

      <div className="w-full flex justify-center">
        <div className="w-[70%] flex flex-col gap-20">
          {/* Anchor Section */}
          <div className="shadow-2xl p-4">
            <div className="bg-slate-200 rounded-md w-full mt-0">
              <div className="container  md:flex justify-between gap-5 items-center p-4">
                {/* package heading */}
                <div className="flex flex-col gap-4 font-sans md:text-3xl font-bold ">
                  <h2>{pack.title}</h2>
                  <div className="flex flex-col gap-1">
                    <div className="text-teal-600 text-sm">{pack.discount}% Off</div>
                    <div className="items-center font-sans md:text-2xl font-bold">
                      <span>&#8377;</span>
                      {pack.price}
                      <sup>*</sup>
                      <div className="ml-4 relative inline-block">
                        <span className="relative z-10 text-deep-purple text-xl">40,000</span>
                        <div className="absolute w-full h-0.5 bg-deep-purple top-1/2 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* customize and book Section */}
                <div className="flex items-center space-x-4 gap-5 justify-center ">

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
                </div>
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
                  className="h-full relative" // Ensure the Swiper itself has a fixed height
                >
                  {slideContent.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full flex items-center rounded-md justify-center bg-gray-200"> {/* Added bg-gray-200 as a placeholder background */}
                        <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full rounded-md object-cover" />
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
              <div className="md:w-1/3 mt-5 ml-3">
                <div id="customize" className="mt-2">
                  <p className="font-bold md:text-xl">Customizable</p>
                  <p className="text-left mt-2 mb-2">
                    Customizable itineraries where you may choose transport, stay &
                    sightseeing as per your taste & comfort
                  </p>

                  <hr size="3"></hr>
                </div>

                <div id="stay" className="mt-2">
                  <p className="font-bold md:text-xl">Stay Plan</p>
                  <div className=" md:text-xl flex justify-start space-x-5 m-2 mt-8 mb-5">
                    <FaTents className="font-bold md:text-2xl" />
                    <p>{pack.stayPlan}</p>
                  </div>
                  <hr size="3"></hr>
                </div>

                <div className="mt-4">
                  <p className="font-bold md:text-xl">Hotel Included in the package:</p>
                  <div className="mb-5 mt-8">
                    {pack.hotelRatings.map((rating) => (
                      <span key={rating} className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2`}>{rating}</span>
                    ))}
                  </div>
                  <hr size="3"></hr>
                </div>

                <div id="inclusion" className="mt-2">
                  <p className="font-bold md:text-xl">Inclusions</p>
                  <div className="flex justify-start space-x-10 m-2 mt-8 mb-5">
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
                  </div>
                  <hr size="3"></hr>
                </div>
              </div>
            </div>
            <hr className="mt-5 mb-5"></hr>
            {/* About the package */}
            <div id="about">
              <div className="text-xl font-bold m-5">About The Place</div>

              <div className="m-5">
                {pack.about1}
                <button onClick={readFunction} className="font-bold p-1">
                  {" "}
                  {read ? "Read Less" : "Read More..."}
                </button>
                {read ? <div>{pack.about2}</div> : <></>}
              </div>
            </div>
            <hr></hr>
            <div className="text-xl font-bold m-5">Hotels</div>
            <div id="hotels" className="w-full ">
              <div className="w-full mt-5 flex flex-row justify-center">
                {/* <Slider {...settings}>
                {pack.hotels.map((hotel, index) => {
                  return (
                    <div className="bg-slate-200 rounded-xl w-[300px] h-[350px] text-black ">
                      <a>
                        <img
                          className="rounded-t-xl h-[200px]"
                          src={hotel.image}
                        ></img>
                        <div className="flex flex-col justify-start gap-1 p-1">
                          <p className="text-xl font-semibold">{hotel.name}</p>
                          <p>{hotel.distance}</p>
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
                  slidesPerView={4}

                  loop={true}
                  className="h-full w-full relative flex justify-center" // Ensure the Swiper itself has a fixed height
                >
                  {pack.hotels.map((hotel, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="bg-slate-200 rounded-xl w-[300px] h-[350px] text-black ">
                          <a>
                            <img
                              className="rounded-t-xl h-[200px]"
                              src={hotel.image}
                            ></img>
                            <div className="flex flex-col justify-start gap-1 p-1">
                              <p className="text-xl font-semibold">{hotel.name}</p>
                              <p>{hotel.distance}</p>
                              <p>{hotel.location}</p>
                            </div>
                          </a>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <hr className="mt-10 mb-5"></hr>


            <div id="itininary" className="md:w-1/2 m-5 sm:w-full">
              <div className="text-xl font-bold mb-3">Detailed itininary</div>
              {pack.detailedItininary.map((itininary, index) => {
                return (
                  <div key={index} className="mb-5">
                    <div
                      className="flex justify-between items-center cursor-pointer p-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
                      onClick={() => toggle(index)}
                    >
                      <p className="font-semibold">{itininary.titleD}</p>
                      <FaChevronDown className={`transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`} />
                    </div>
                    {openSections[index] && (
                      <div className="mt-3 p-4 bg-white rounded-md shadow">
                        <Swiper
                          modules={[Navigation]}
                          navigation={true}
                          slidesPerView={1}
                          loop={true}
                          className="h-60" // Fixed height
                        >
                          {slideContent.map((slide, index) => (
                            <SwiperSlide key={index}>
                              <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <ul className="list-disc list-inside mt-4">
                          {Object.keys(itininary.details).map((key) => (
                            <li key={key} className="mt-1">
                              {itininary.details[key]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              }
              )}
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

    </>
  );
};

export default Packages;

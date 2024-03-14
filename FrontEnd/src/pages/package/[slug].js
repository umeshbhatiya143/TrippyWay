import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
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

const Packages = () => {
  const router = useRouter();
  const { slug } = router.query;
  //hooks to
  const [curr, setCurr] = useState(0);
  const [read, setRead] = useState(false);
  // const [open, setOpen] = useState(...pack.detailedItinirary,);
  const images = [
    {
      imageurl: "../../slide1.jpg",
    },
    {
      imageurl: "../../slide2.jpg",
    },
    {
      imageurl: "../../slide3.jpg",
    },
  ];

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

  //ReadMore
  const readFunction = () => setRead((read) => !read);

  //to maintain accordion state
  const [openSections, setOpenSections] = useState(Array(pack.detailedItininary.length).fill(false));

  const toggle = (index) => {
    const newOpenSections = [...openSections];
    newOpenSections[index] = !newOpenSections[index];
    setOpenSections(newOpenSections);
  };

  return (
    <div className=" ">
      {/* Anchor Section */}
      <div className="bg-slate-200 w-full mt-0">
        <div className="container  md:flex justify-start gap-5 items-center h-28">
          {/* package heading */}
          <div className="m-2 p-1 items-center font-sans md:text-3xl font-bold ">
            {pack.title}
          </div>
          {/* customize and book Section */}
          <div className="flex items-center space-x-4 gap-5 justify-center ">
            <div>
              <p className="items-center font-sans md:text-2xl font-bold">
                <span>&#8377;</span>
                {pack.price}
                <sup>*</sup>
              </p>
            </div>
            <div className="">
              <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                Customize
              </button>
            </div>
            <div className="">
              <button className="bg-gradient-to-r from-black to-slate-500 hover:from-slate-700 hover:to-slate-400 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                Book
              </button>
            </div>
          </div>
        </div>
        {/* Anchor section  */}
        <div>
          <ul className="md:flex md:flex-row md:item-center md:w-1/2">
            <a
              href="#photos"
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li className="md:m-1 md:p-2">
                <div className="flex items-center gap-1 font-bold">
                  <FaImages className="mr-2 sm:mr-0" />
                  Photos
                </div>
              </li>
            </a>

            <a
              href="#about"
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li className="md:m-1 md:p-2">
                <div className="flex items-center  gap-1 font-bold">
                  <IoIosInformationCircle className="mr-2 sm" />
                  About
                </div>
              </li>
            </a>

            <a
              href="#hotels"
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li className="md:m-1 md:p-2">
                <div className="flex items-center gap-1 font-bold ">
                  <LiaHotelSolid className="mr-2" />
                  Hotels
                </div>
              </li>
            </a>

            <a
              href="#itinerary"
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li className="md:m-1 md:p-2">
                <div className="flex items-center gap-1 font-bold">
                  <FaMapMarkerAlt className="mr-2" />
                  Detailed Itinerary
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
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {images.map((content, index) => {
              return <img src={content.imageurl}></img>;
            })}
          </div>
          <div className="absolute flex items-center justify-between inset-0 p-4">
            <button onClick={prev}>
              <FaChevronLeft className="rounded-full shadow bg-slate-400 text-gray-800 hover:bg-slate-100 sm:text-xs md:text-3xl" />
            </button>
            <button onClick={next}>
              <FaChevronRight className="rounded-full shadow bg-slate-400 text-gray-800  hover:bg-slate-100 sm:text-xs md:text-3xl" />
            </button>
          </div>
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex justify-center items-center gap-2">
              {images.map((_, i) => (
                <div
                  className={`transition-all md:w-4 md:h-4 sm:w-3 sm:h-3 bg-white rounded-full ${curr == i ? "p-2" : "bg-opacity-50"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/3 mt-5 ml-3">
          <div id="customize" className="mt-2">
            <p className="font-bold md:text-xl">Customizable</p>
            <p className="text-left w-1/2 mt-2 mb-2">
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
      <div id="hotels" className="w-11/12 m-auto">
        <div className="mt-5">
          <Slider {...settings}>
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
          </Slider>
        </div>
      </div>
      <hr className="mt-10 mb-5"></hr>


      <div id="itinerary" className="md:w-1/2 m-5 sm:w-full">
        <div className="text-xl font-bold mb-3">Detailed itinerary</div>
        <div className="">
          {pack.detailedItininary.map((itininary, index) => {
            return (
              <div key={index} >
                <div
                  className="flex justify-between"
                  onClick={() => toggle(index)}
                >
                  <p>{itininary.titleD}</p>
                  <FaChevronDown className={openSections[index] ? `rotate-180` : ""} />
                </div>
                <hr className="mt-3 mb-3"></hr>
                {openSections[index] && (
                  <div className="transition-all ease-in-out duration-100 shadow">
                    <div className="md:w-1/2 sd:w-full">
                      <Slider {...settings_small}>
                        {pack.hotels.map((hotel, indexi) => {
                          return (
                            <div key={indexi} className="w-[200px] h-[200px]">
                              <a>
                                <img className="h-[200px]" src={hotel.image} alt={`Hotel ${indexi}`} />
                              </a>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="mt-5 ml-2 mb-5">
                      <ul>
                        {Object.keys(itininary.details).map((key) => {
                          return (
                            <li key={key}>
                              {itininary.details[key]}
                            </li>
                          );
                        })}


                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Packages;

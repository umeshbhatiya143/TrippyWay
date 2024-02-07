import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

const Packages = () => {
  const router = useRouter();
  const { slug } = router.query;
  //hooks to
  const [curr, setCurr] = useState(0);

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

  //let [open, setOpen] = useState(false);

  return (
    <div className=" ">
      {/* Anchor Section */}
      <div className="bg-slate-400 w-full fixed z-50">
        <div className="container  md:flex justify-start gap-5 items-center h-28">
          {/* package heading */}
          <div className="m-2 p-1 items-center font-sans md:text-3xl font-bold ">
            Turkish Extravaganza Package with Sunrise Hot Air Balloon
          </div>
          {/* customize and book Section */}
          <div className="flex items-center space-x-4 gap-5 justify-center ">
            <div>
              <p className="items-center font-sans md:text-2xl font-bold">
                <span>&#8377;</span>49999 <sup>*</sup>
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
          <ul className="md:flex md:flex-row md:item-center ">
          <a href="#photos"
              
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li  className="md:m-1 md:p-2">
                  <div className="flex items-center gap-1 font-bold">
                    <FaImages className="mr-2 sm:mr-0" />
                    Photos
                  </div>
                
              </li>
            </a>

            <a href="#about"
              
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li  className="md:m-1 md:p-2">
                  <div className="flex items-center  gap-1 font-bold">
                    <IoIosInformationCircle className="mr-2 sm" />
                    About
                  </div>
                
              </li>
            </a>

            <a href="#hotels"
              
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li  className="md:m-1 md:p-2">
                
                  <div className="flex items-center gap-1 font-bold ">
                    <LiaHotelSolid className="mr-2" />
                    Hotels
                  </div>
                
              </li>
            </a>

            <a href="#itinerary"
              
              className="flex hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center"
            >
              <li  className="md:m-1 md:p-2">
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
      <div id="photos" className="overflow-hidden relative">
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
                className={`transition-all md:w-4 md:h-4 sm:w-3 sm:h-3 bg-white rounded-full ${
                  curr == i ? "p-2" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div id="hotels">hotels</div>
      <div id="itinerary">detailed itinerary</div>
      <div id="about">about the place</div>
    </div>
  );
};

export default Packages;

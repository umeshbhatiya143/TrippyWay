import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaImages } from "react-icons/fa";
import { LiaHotelSolid } from "react-icons/lia";
import { IoIosInformationCircle } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronRight,FaChevronLeft } from "react-icons/fa6";


const Packages = () => {
  const router = useRouter();
  const { slug } = router.query;
  //hooks to
  const [curr , setCurr]=useState(0);

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
const prev=()=>
setCurr((curr)=> (curr=0? images.length-1 : curr-1)
)

const next=()=>setCurr(
  (curr)=> (curr=images-1 ? 0 : curr+1
))
 
  //let [open, setOpen] = useState(false);

  return (
    <div className="md:m-5 ">
      {/* Anchor Section */}
      <div className="bg-slate-300 w-full ">
        <div className="container mx-auto flex justify-between items-center">
          {/* package heading */}
          <div>
            <h1 className="m-2 p-1 items-center font-sans md:text-3xl ">
              Turkish Extravaganza Package with Sunrise Hot Air Balloon
            </h1>
          </div>
          {/* customize and book Section */}
          <div className="md:flex md:items-center md:space-x-4  ">
            <div>
              <p className="items-center font-sans md:text-2xl">
                <span>&#8377;</span>49999 <sup>*</sup>
              </p>
            </div>
            <div className="w-full  md:w-36">
              <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                Customize
              </button>
            </div>
            <div className="w-full  md:w-36 mt-2 md:mt-0">
              <button className="bg-gradient-to-r from-black to-slate-500 hover:from-slate-700 hover:to-slate-400 text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-lg shadow-md">
                Book
              </button>
            </div>
          </div>
        </div>
        {/* Anchor section  */}
        <div>
          <ul className="md:flex md:flex-row md:space-x-6 sm:space-x-3 md:item-center">
            <div className="flex  hover:bg-red-500 hover:text-white items-center">
              <li className="md:m-1 md:p-2">
                <a href="#photos">
                  <div className="flex items-center">
                    <FaImages className="mr-2 sm:mr-0" />
                    Photos
                  </div>
                </a>
              </li>
            </div>

            <div className="flex hover:bg-red-500 hover:text-white items-center">
              <li className="md:m-1 md:p-2">
                <a href="#hotels">
                  <div className="flex items-center">
                    <IoIosInformationCircle className="mr-2 sm" />
                    About
                  </div>
                </a>
              </li>
            </div>

            <div className="flex hover:bg-red-500 hover:text-white items-center">
              <li className="md:m-1 md:p-2">
                <a href="#itinerary">
                  <div className="flex items-center">
                    <LiaHotelSolid className="mr-2" />
                    Hotels
                  </div>
                </a>
              </li>
            </div>

            <div className="flex hover:bg-red-500 hover:text-white items-center">
              <li className="md:m-1 md:p-2">
                <a href="#about">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Detailed Itinerary
                  </div>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
      {/* Different section of the page */}

      {/* carosel section of the page */}
      <div className="overflow-hidden relative">
      <div className="flex transition-transform ease-out duration-500" style={{transform :`translateX(-${curr *100}%)`}}>
        {images.map((content, index) => {
          return (
            
              <img src={content.imageurl}></img>
            
          );
        })}
      </div>
      <div className="absolute flex items-center justify-between inset-0 p-4">
      <button onClick={prev}>
        < FaChevronLeft size={40} className="rounded-full shadow bg-white text-gray-800 hover:bg-slate-300"/>
        </button>
        <button onClick={next}>
        < FaChevronRight size={40} className="rounded-full shadow bg-white text-gray-800  hover:bg-slate-300"/>
        </button>
        
      </div>
      </div>

      
      <div id="photos">photos</div>
      <div id="hotels">hotels</div>
      <div id="itinerary">detailed itinerary</div>
      <div id="about">about the place</div>
    </div>
  );
};

export default Packages;

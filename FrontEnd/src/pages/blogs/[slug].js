// components/Dashboard.js

import { useState } from "react";
import { useRouter } from "next/router";
import DynamicPageLoader from "@/Components/blogs/DynamicPageLoader";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import CTA from "@/Components/cta";
import { FaSearch } from "react-icons/fa";



const Blogs = () => {
  const [selectedPage, setSelectedPage] = useState("trending");
  const [searchPlace, setSearchPlace] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const router = useRouter();

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    router.push(`/blogs/${page}`);
  };

  const handleSearch = () => {
    // Perform search based on searchPlace and searchDate
    console.log("Searching for:", searchPlace, searchDate);
    // You can implement your search logic here
  };

  return (
    <>
      <Header />
      <div className="flex flex-col ">
        {/* searchbar */}
        <div
          className="flex justify-center items-center md:h-96"
          style={{
            backgroundImage: "url('../../../blogbg.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center gap-y-3 sm:mb-1">
            <div className="text-center text-white text-xl md:text-6xl font-bold md:mt-4">
              Find Your Next Tour !
            </div>

            <div className="flex flex-col md:flex-row items-center h-full">
              <input
                type="text"
                placeholder="Search Places"
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
                className="mb-2 md:mb-0 mr-0 md:mr-4 px-4 py-2 border rounded focus:outline-none"
              />
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="mb-2 md:mb-0 mr-0 md:mr-4 px-4 py-2 border rounded focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              >
                <FaSearch className="md:text-2xl" />
              </button>
            </div>
          </div>
        </div>



   

        {/* filters */}
        <div className=" bg-gray-200 h-auto " >
          <ul className="md:flex md:flex-row md:item-center md:w-1/2 m-0">
            <div className=" hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center text-center">
            <li
              className="md:m-1 md:p-2"
              onClick={() => handleFieldClick("trending")}
            >
              Trending
            </li>
            </div>
            <div className=" hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center text-center">
            <li
              className="md:m-1 md:p-2"
              onClick={() => handleFieldClick("famous")}
            >
              Famous
            </li>
            </div>
            
            
            <div className=" hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center text-center">
            <li
              className="md:m-1 md:p-2"
              onClick={() => handleFieldClick("budget_friendly")}
            >
              Budget-Friendly
            </li>
            </div>
            
            <div className=" hover:bg-slate-800 hover:text-white items-center md:w-1/2 sm:w-full justify-center text-center">
            <li
              className="md:m-1 md:p-2 "
              onClick={() => handleFieldClick("allSeason")}
            >
              All Season
            </li>
            </div>
            
          </ul>
        </div>

        {/* selected page */}
        <div className="w-full min-h-screen p-10 ">
          {/* Dynamically load selected page component */}
          {selectedPage && <DynamicPageLoader page={selectedPage} />}

          {/* cta */}
          <div className="w-60 flex fixed h-96 right-10">
            <CTA />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/assets/loader.gif'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const AllPackages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isNoMore, setisNoMore] = useState(false)
  const [page, setPage] = useState(1)

  let currentPage = 1;

  // Function to handle package deletion
  const handleDeletePackage = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.packages)
     if(response.ok){
      fetchPackages()
     }
      // return data.packages
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter packages based on search query
  // const filteredPackages = packages.filter(pkg =>
  //   pkg.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const fetchPackages = async () => {
    setisLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages?limit=10&page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // console.log(data.packages)
      setPackages(data.packages)
      if (data.length === 0) {
        setisNoMore(true)
        setisLoading(false)
      }
      // return data.packages
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
  };

  async function nextPage() {
    currentPage++;
    setPage(page + 1)
    await fetchPackages();
    // setPackages(items)
  }

  // Function to handle previous page button click
  async function prevPage() {
    currentPage--;
    setPage(page - 1)
    await fetchPackages();
  }

  useEffect(() => {
    if (page == 1) {
      fetchPackages()
      // setPackages(items)
      console.log(isNoMore)
    }
    // console.log(packages)
  }, [page])


  return (
    <div className='w-full flex flex-col items-center'>
      <h2 className='font-bold text-2xl text-center'>All Packages</h2>

      <div className="mt-4 mb-2 flex justify-end">
        <input
          type="text"
          placeholder="Search packages..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        />
      </div>

      <div className='w-full'>
        {packages.map(pkg => (
          <div key={pkg.id} className="border border-gray-300 rounded p-4 mb-4">
            <h3 className="font-semibold">{pkg.title}</h3>
            <p>Price: <span>&#8377;</span>{pkg.price}</p>
            <p>Duration: {pkg.duration}</p>

            <div className="flex justify-end">
              <button className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">View</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">Update</button>
              <button onClick={() => handleDeletePackage(pkg.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && <span className='text-black text-center mt-2'>Nothing to show...</span>}
      {isNoMore && packages.length > 0 && <span className='text-black text-center mt-2'>No more content...</span>}
      {isLoading && <div className="flex items-center w-24 h-24 relative">
        <Image
          alt='loader'
          src={Loader}
          width={100}
          height={100}
        />
        Loading...
      </div>}

      {/* navigation buttons */}
      <div className='mt-10 mb-20 w-full flex justify-center gap-6'>
        <button
          onClick={() => prevPage()}
          disabled={page === 1}
          className={`flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white transition-all duration-700 ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <FaArrowLeftLong />
          prev
        </button>
        <span className='border rounded-full border-2 border-deep-purple flex justify-center items-center w-7 h-7'>{page}</span>
        {!isNoMore && <span onClick={() => nextPage()}
          className='flex justify-center items-center gap-2 hover:bg-deep-purple rounded-full px-3 text-dark-cyan hover:text-white cursor-pointer transition-all duration-700'>next<FaArrowRightLong /></span>}
      </div>
    </div>
  );
};

export default AllPackages;

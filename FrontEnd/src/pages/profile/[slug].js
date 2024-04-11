// components/Dashboard.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DynamicPageLoader from '../../Components/profile/DynamicPageLoader';
import { IoIosArrowForward } from "react-icons/io";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('personalInfo');
  const [balance, setBalance] = useState(500); // Initial balance
  const router = useRouter();



  const handleDeposit = () => {
    // Simulate deposit logic (add $100 to the balance)
    setBalance(prevBalance => prevBalance + 100);
  };

  const handleWithdraw = () => {
    // Simulate withdraw logic (subtract $100 from the balance if there are sufficient funds)
    if (balance >= 100) {
      setBalance(prevBalance => prevBalance - 100);
    } else {
      alert("Insufficient funds!");
    }
  };

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    router.push(`/profile/${page}`);
  };

  const formatPageName = (pageName) => {
    const withSpaces = pageName.replace(/([A-Z])/g, ' $1');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  return (
    <section className='flex justify-center'>
      <div className="w-[60%] flex flex-col py-10 gap-6">

        <div className='flex justify-between items-center gap-4 text-deep-purple'>
          <div className='flex items-center gap-4 text-deep-purple'>
            <div className='border border-deep-purple rounded-md py-2 flex justify-center w-52'>Dashboard</div>
            <IoIosArrowForward />
            <span>{formatPageName(selectedPage)}</span>
          </div>
         
         {/* wallet balance */}
          <div className="relative right-0 flex items-center pr-10">
            <h2 className="text-2xl font-bold">Balance: &nbsp; </h2>
            <p className="text-lg font-medium">${balance}</p>
          </div>
        </div>

        {/* Left sidebar */}
        <div className='flex w-full'>
          <ul className='flex flex-col gap-6 bg-gray-200 p-6 rounded-md shadow-xl items-start w-64 h-fit'>

            {['personalInfo', 'loginDetails', 'bookingDetails', 'wishlist', 'history', 'eWallet', 'paymentDetails'].map((page) => (
              <li
                key={page}
                className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-white' : 'hover:bg-gray-300'} transition-colors duration-300`}
                onClick={() => handleFieldClick(page)}
              >
                {formatPageName(page)}
              </li>
            ))}
            <li
              className="cursor-pointer text-red-600 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
              onClick={""}
            >
              Logout
            </li>
            {/* <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('loginDetails')}>
              Login Details
            </li>
            <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('bookingDetails')}>
              Booking Details
            </li>
            <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('wishlist')}>
              Wishlist
            </li>
            <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('history')}>
              History
            </li>
            <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('eWallet')}>
              E-Wallet
            </li>
            <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('paymentDetails')}>
              Payment Details
            </li> */}
          </ul>


          {/* Right content */}
          <div className="w-full px-10">
            {/* Dynamically load selected page component */}
            {selectedPage && (
              <DynamicPageLoader page={selectedPage} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

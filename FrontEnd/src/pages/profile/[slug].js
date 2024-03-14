// components/Dashboard.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DynamicPageLoader from '../../Components/profile/DynamicPageLoader';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('userBasicInfo');
  const router = useRouter();

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    router.push(`/profile/${page}`);
  };

  return (
    <>
    <Header/>
    <div className="flex">
      {/* Left sidebar */}
      <div className="p-5 w-[250px] h-[100vh] bg-gray-200 p-4 float-right">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className='flex flex-col gap-10 p-5'>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('userBasicInfo')}>
            User Basic Info
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('loginDetails')}>
            Login Details
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('bookingDetails')}>
            Booking Details
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('wishlist')}>
            Wishlist
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('history')}>
            History
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('eWallet')}>
            E-Wallet
          </li>
          <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('paymentDetails')}>
            Payment Details
          </li>
        
        </ul>
      </div>

      {/* Right content */}
      <div className="w-full p-10">
        {/* Dynamically load selected page component */}
        {selectedPage && (
          <DynamicPageLoader page={selectedPage} />
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;

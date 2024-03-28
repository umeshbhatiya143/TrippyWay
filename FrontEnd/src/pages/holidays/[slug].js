// components/Dashboard.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DynamicPageLoader from '../../Components/holidays/DynamicPageLoader';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CTA from '../../Components/cta';

const Holidays = () => {
  const [selectedPage, setSelectedPage] = useState('packages');
  const router = useRouter();

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    // router.push(`/holidays/${page}`, undefined, { shallow: true });
    router.push(`/holidays/${page}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col">

        {/* filters */}
        <div className="p-5 bg-gray-200 p-2 float-right">
          <ul className='flex gap-10 '>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('packages')}>
              Packages
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('activities')}>
              Activities
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('themes')}>
              Themes
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('hotels')}>
              Hotels
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('placesToVisit')}>
              Places to Visit
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('famous_food')}>
              Famous Food
            </li>
          </ul>
        </div>

        {/* selected page */}
        <div className="w-full">
          {/* Dynamically load selected page component */}
          {selectedPage && (
            <DynamicPageLoader page={selectedPage} />
          )}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Holidays;

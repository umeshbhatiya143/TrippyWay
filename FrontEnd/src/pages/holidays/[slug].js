// components/Dashboard.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DynamicPageLoader from '../../Components/holidays/DynamicPageLoader';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const Holidays = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const [selectedPage, setSelectedPage] = useState(slug);

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    // router.push(`/holidays/${page}`, undefined, { shallow: true });
    router.push(`/holidays/${page}`);
  };

  useEffect(()=>{
    if(slug==='activities'){
      handleFieldClick('activities')
    }
    else if(slug==='packages'){
      handleFieldClick('packages')
    }
  },[slug]);

  return (
    <>
      <Header />
      <div className="flex flex-col">

        {/* filters */}
        <div className=" bg-gray-200 p-2">
          <ul className='flex gap-10 justify-center '>
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

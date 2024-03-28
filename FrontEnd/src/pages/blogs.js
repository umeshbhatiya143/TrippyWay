// components/Dashboard.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DynamicPageLoader from '@/Components/blogs/DynamicPageLoader';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CTA from '../Components/cta';

const Blogs = () => {
  const [selectedPage, setSelectedPage] = useState('trending');
  const router = useRouter();

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    // router.push(`/blogs/${page}`);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col">
        {/* searchbar */}
        <div className="flex justify-center items-center h-40 bg-slate-500">
          <h2 className="text-xl font-bold mb-4">Searchbar</h2>
        </div>

        {/* filters */}
        <div className="p-5 bg-gray-200 p-2 float-right">
          <ul className='flex gap-10 '>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('trending')}>
              Trending
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('famous')}>
              Famous
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('budget_friendly')}>
              Budget-Friendly
            </li>
            <li className="cursor-pointer mb-2" onClick={() => handleFieldClick('allSeason')}>
              All Season
            </li>

          </ul>
        </div>

        {/* selected page */}
        <div className="w-full h-screen p-10">
          {/* Dynamically load selected page component */}
          {selectedPage && (
            <DynamicPageLoader page={selectedPage} />
          )}


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

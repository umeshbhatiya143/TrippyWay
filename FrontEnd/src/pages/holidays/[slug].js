import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DynamicPageLoader from '../../Components/holidays/DynamicPageLoader';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const Holidays = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedPage, setSelectedPage] = useState(slug || 'packages'); // Default to 'packages' if slug is not defined

  useEffect(() => {
    // Automatically select the page based on the URL slug
    setSelectedPage(slug);
  }, [slug]);

  const handleFieldClick = (page) => {
    setSelectedPage(page);
    router.push(`/holidays/${page}`, undefined, { shallow: true });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col">
        {/* filters */}
        <div className="bg-dark-cyan p-1 shadow-md">
          <ul className='flex gap-5 md:gap-10 justify-center text-custom-white'>
            {['packages', 'activities', 'themes', 'hotels', 'placesToVisit', 'famous_food'].map((page) => (
              <li
                key={page}
                className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple' : 'hover:bg-deep-purple'} transition-colors duration-300`}
                onClick={() => handleFieldClick(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1).replace('_', ' ')}
              </li>
            ))}
          </ul>
        </div>

        {/* selected page */}
        <div className="w-full">
          {/* Dynamically load selected page component */}
          {selectedPage && <DynamicPageLoader page={selectedPage} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Holidays;

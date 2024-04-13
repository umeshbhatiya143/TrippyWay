// // components/Dashboard.js

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import DynamicPageLoader from '../../Components/profile/DynamicPageLoader';
// import { IoIosArrowForward } from "react-icons/io";

// const Dashboard = () => {
//   const [selectedPage, setSelectedPage] = useState('personalInfo');
//   const [balance, setBalance] = useState(500); // Initial balance
//   const router = useRouter();



//   const handleDeposit = () => {
//     // Simulate deposit logic (add $100 to the balance)
//     setBalance(prevBalance => prevBalance + 100);
//   };

//   const handleWithdraw = () => {
//     // Simulate withdraw logic (subtract $100 from the balance if there are sufficient funds)
//     if (balance >= 100) {
//       setBalance(prevBalance => prevBalance - 100);
//     } else {
//       alert("Insufficient funds!");
//     }
//   };

//   const handleFieldClick = (page) => {
//     setSelectedPage(page);
//     router.push(`/profile/${page}`);
//   };

//   const formatPageName = (pageName) => {
//     const withSpaces = pageName.replace(/([A-Z])/g, ' $1');
//     return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
//   };

//   return (
//     <section className='w-full flex justify-center'>
//       <div className="w-[60%] flex flex-col py-10 gap-6">

//         <div className='flex justify-between items-center gap-4 text-deep-purple'>
//           <div className='flex items-center gap-4 text-deep-purple'>
//             <div className='border border-deep-purple rounded-md py-2 flex justify-center w-52'>Dashboard</div>
//             <IoIosArrowForward />
//             <span>{formatPageName(selectedPage)}</span>
//           </div>
         
//          {/* wallet balance */}
//           <div className="relative right-0 flex items-center pr-10">
//             <h2 className="text-2xl font-bold">Balance: &nbsp; </h2>
//             <p className="text-lg font-medium">${balance}</p>
//           </div>
//         </div>

//         {/* Left sidebar */}
//         <div className='flex w-full'>
//           <ul className='flex flex-col gap-2 bg-gray-200 rounded-md shadow-xl items-start py-4 w-64 h-fit'>

//             {['personalInfo', 'loginDetails', 'bookingDetails', 'eWallet', 'paymentDetails', 'wishlist'].map((page) => (
//               <li
//                 key={page}
//                 className={`w-full cursor-pointer rounded-md py-4 px-4 font-bold  ${selectedPage === page ? 'bg-deep-purple text-white border-l-[5px] border-blue-600' : 'hover:bg-gray-300'} transition-colors duration-300`}
//                 onClick={() => handleFieldClick(page)}
//               >
//                 {formatPageName(page)}
//               </li>
//             ))}
//             <li
//               className="cursor-pointer text-red-600 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
//               onClick={""}
//             >
//               Logout
//             </li>
//             {/* <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('loginDetails')}>
//               Login Details
//             </li>
//             <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('bookingDetails')}>
//               Booking Details
//             </li>
//             <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('wishlist')}>
//               Wishlist
//             </li>
//             <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('history')}>
//               History
//             </li>
//             <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('eWallet')}>
//               E-Wallet
//             </li>
//             <li className={`cursor-pointer py-2 px-4 rounded-md ${selectedPage === page ? 'bg-deep-purple text-custom-white' : 'hover:bg-deep-purple hover:text-custom-white'} transition-colors duration-300`} onClick={() => handleFieldClick('paymentDetails')}>
//               Payment Details
//             </li> */}
//           </ul>


//           {/* Right content */}
//           <div className="w-full px-10">
//             {/* Dynamically load selected page component */}
//             {selectedPage && (
//               <DynamicPageLoader page={selectedPage} />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DynamicPageLoader from '../../Components/profile/DynamicPageLoader';
import { IoIosArrowForward } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('personalInfo');
  const [balance, setBalance] = useState(500); // Initial balance
  const router = useRouter();

  const handleDeposit = () => {
    setBalance(prevBalance => prevBalance + 100);
  };

  const handleWithdraw = () => {
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
    return pageName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <section className='w-full flex justify-center'>
      <div className="w-[60%] flex flex-col py-10 gap-6">
        <div className='flex justify-between items-center gap-4 text-deep-purple'>
          <div className='flex items-center gap-4'>
            <div className='w-60 text-center font-bold border border-dark-cyan rounded-md py-2 px-4'>Dashboard</div>
            <IoIosArrowForward className="text-deep-purple" />
            <span className="font-bold">{formatPageName(selectedPage)}</span>
          </div>
         
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Balance: </h2>
            <p className="text-lg ml-2"><span>&#8377;</span>{balance.toFixed(2)}</p>
          </div>
        </div>

        <div className='flex w-full gap-8'>
          <ul className='flex flex-col gap-4 bg-gray-100 rounded-md shadow-xl w-60 h-fit py-4'>
            {['personalInfo', 'loginDetails', 'bookingDetails', 'eWallet', 'paymentDetails', 'wishlist'].map((page) => (
              <li
                key={page}
                className={`w-full cursor-pointer rounded-md py-3 px-4 font-bold text-gray-700 ${selectedPage === page ? 'bg-deep-purple text-white border-l-[5px] border-blue-600' : 'hover:bg-gray-300'} transition-colors duration-300`}
                onClick={() => handleFieldClick(page)}
              >
                {formatPageName(page)}
              </li>
            ))}
            <li
              className="cursor-pointer text-red-600 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center"
              onClick={() => alert('Logging out...')}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </li>
          </ul>

          <div className="flex-grow">
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


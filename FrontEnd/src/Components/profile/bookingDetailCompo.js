import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from '../Invoice';

const TravelersDetail = ({ travelersDetail, bookingStatus, journeyStatus, totalPrice, packageTitle, paymentDetails, startDate, endDate }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showInvoiceDesc, setShowInvoiceDesc] = useState(false)

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };


    return (
        <div className="p-4 bg-custom-white rounded shadow-lg mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-deep-purple font-semibold">{packageTitle}</h3>
                    <p className="text-dark-cyan">Total Price: {totalPrice}</p>
                    <p className="text-dark-cyan">Start Date: {startDate}</p>
                    <p className="text-dark-cyan">End Date: {endDate}</p>
                </div>
                <div className="flex items-center">
                    <button className=" text-bg-purple transition-all duration-1000 px-4 py-2 rounded relative">
                        {showInvoiceDesc && <span className='absolute transition-all duration-1000 w-40 bg-deep-purple rounded-md text-custom-white -top-10 -right-10'>Download Invoice</span>}
                        <PDFDownloadLink
                            document={<Invoice bookingOBj={{
                                ...{
                                    travelersDetail: travelersDetail,
                                    bookingStatus: bookingStatus,
                                    journeyStatus: journeyStatus,
                                    totalPrice: totalPrice,
                                    packageTitle: packageTitle,
                                    paymentDetails: paymentDetails,
                                    startDate: startDate,
                                    endDate: endDate,
                                    address: {
                                        "address1": "House no 12,xyz",
                                        "address2": "line 2 mn",
                                        "city": "abc",
                                        "state": "UP",
                                        "postalCode": "800010",
                                        "country": "India"
                                    },
                                    gstNo: "GST456763"
                                }
                            }} />}
                            fileName="invoice.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading document..." : <span className='flex items-center '> <FaFileDownload
                                    onMouseEnter={() => setShowInvoiceDesc(!showInvoiceDesc)}
                                    onMouseLeave={() => setShowInvoiceDesc(!showInvoiceDesc)} size={20} className="mr-2"
                                /></span>
                            }
                        </PDFDownloadLink>

                    </button>
                    <button className="text-deep-purple font-semibold mr-2" onClick={toggleDetails}>
                        {showDetails ? (
                            <span className='flex items-center gap-2'>
                                Hide Details <IoIosArrowUp />
                            </span>
                        )
                            : (
                                <span className='flex items-center gap-2'>
                                    Show Details <IoIosArrowDown />
                                </span>
                            )}
                    </button>
                </div>
            </div>
            {showDetails && (
                <div className="mt-4">
                    <h4 className="text-dark-cyan font-semibold">Additional Details:</h4>
                    <p className="text-dark-cyan">Booking Status: {bookingStatus}</p>
                    <p className="text-dark-cyan">Journey Status: {journeyStatus}</p>
                    {travelersDetail && travelersDetail.length > 0 ? (
                        <div className="mt-4">
                            <h4 className="text-dark-cyan font-semibold">Travelers Details:</h4>
                            {travelersDetail.map((traveler, index) => (
                                <div key={index} className="border-b border-gray-300 py-2">
                                    <p className="text-gray-700">Traveler {index + 1}</p>
                                    <p className="text-gray-600">First Name: {traveler.firstName}</p>
                                    <p className="text-gray-600">Last Name: {traveler.lastName}</p>
                                    <p className="text-gray-600">Date of Birth: {new Date(traveler.dob).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Gender: {traveler.gender}</p>
                                    <p className="text-gray-600">Aadhaar Number: {traveler.aadhaarNumber}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-dark-cyan">No travelers details available</p>
                    )}
                    <div className="mt-4">
                        <h4 className="text-dark-cyan font-semibold">Payment Details:</h4>
                        <p className="text-gray-600">Order ID: {paymentDetails.orderId}</p>
                        <p className="text-gray-600">Payment ID: {paymentDetails.paymentId}</p>
                    </div>
                    <div className="mt-4">
                        <button className="bg-deep-purple text-custom-white px-4 py-2 rounded">

                            <PDFDownloadLink
                                document={<Invoice bookingOBj={{
                                    ...{
                                        travelersDetail: travelersDetail,
                                        bookingStatus: bookingStatus,
                                        journeyStatus: journeyStatus,
                                        totalPrice: totalPrice,
                                        packageTitle: packageTitle,
                                        paymentDetails: paymentDetails,
                                        startDate: startDate,
                                        endDate: endDate,
                                        address: {
                                            "address1": "House no 12,xyz",
                                            "address2": "line 2 mn",
                                            "city": "abc",
                                            "state": "UP",
                                            "postalCode": "800010",
                                            "country": "India"
                                        },
                                        gstNo: "GST456763"
                                    }
                                }} />}
                                fileName="invoice.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? "Loading document..." : <span className='flex items-center '><FaFileDownload className="mr-2" /> Download Invoice</span>
                                }
                            </PDFDownloadLink>

                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelersDetail;

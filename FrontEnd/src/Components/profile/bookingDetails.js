import React from 'react';

const BookingDetails = () => {
    // Example booking data
    const bookingData = {
        completed: 5,
        upcoming: 3,
    };

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            <div className="mt-4">
                <p className='bg-white w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'><span className="font-semibold">Completed:</span> {bookingData.completed}</p>
                <p className='bg-white w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'><span className="font-semibold">Upcoming:</span> {bookingData.upcoming}</p>
            </div>
        </div>
    );
};

export default BookingDetails;

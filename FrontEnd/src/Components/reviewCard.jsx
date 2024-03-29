import React from 'react';
import { IoMdStar } from "react-icons/io";

// Individual review card
const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 m-4">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
        //   <StarIcon
        //     key={index}
        //     className={`h-5 w-5 ${
        //       index < review.rating ? 'text-yellow-500' : 'text-gray-300'
        //     }`}
        //   />
          <IoMdStar color={'yellow'}/>
        ))}
      </div>
      <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-10 h-10 rounded-full"
              src={review.avatar}
              alt={review.name}
            />
          </div>
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{review.name}</p>
            <p className="text-gray-600">{review.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReviewCard;

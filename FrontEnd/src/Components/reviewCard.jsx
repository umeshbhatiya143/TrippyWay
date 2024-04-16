import React from 'react';
import { IoMdStar } from "react-icons/io";
import Rating from './Rating';

// Individual review card
const ReviewCard = ({ review }) => {
  const rating=4;
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-10 items-center m-4">
      <div className="flex items-center mb-4">
        <Rating stars={rating}/>
      </div>
      <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="mr-2">
            <img
              className="w-10 h-10 rounded-full"
              src={review.avatar}
              alt={review.name}
            />
          </div>
          <div className="text-sm flex flex-col items-center gap-2 justify-center">
            <p className="text-gray-900 leading-none">{review.name}</p>
            <p className="text-gray-600">{review.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReviewCard;

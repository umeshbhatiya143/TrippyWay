import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Rating = ({ stars }) => {

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5; // to show half star
    return (
      <span key={index}>
        {stars >= index + 1
          ? < FaStar className="text-yellow-500 text-xl"/>
          : stars >= number
          ? <FaStarHalfAlt  className="text-yellow-500 text-xl"/>
          : <AiOutlineStar className="text-yellow-500 text-xl" />}
      </span>
    );
  });
  return <div className="flex flex-row m-2 gap-2">
    {ratingStar} 
    <div className="font-medium ">
        {stars} {" Ratings"}
    </div>
  </div>
}

export default Rating;

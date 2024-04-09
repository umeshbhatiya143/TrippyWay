import React, { useState } from "react";
import { useRouter } from "next/router";
import blog from "./blog.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import popular from "./popular.json";
import recent from "./recent.json";
import CommentsSection from "@/Components/CommentsSection";
import useNode from "@/Components/Hooks/useNode";

const Blog = () => {
  const router = useRouter();
  const { slug } = router.query;
  const comments = {
    id: 1,
    container: "main",
    replies: [],
  };
  const [commentData, setCommentData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();
  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentData, folderId, item);
    setCommentData(finalStructure);
  };
  const handleUpdateNode = (folderId, value) => {
    const finalStructure = editNode(commentData, folderId, value);
    setCommentData(finalStructure);
  };
  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentData, folderId);
    const temp = { ...finalStructure };
    setCommentData(temp);
  };
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* blog */}
      <div className="">
        {/* main section  it will contain main image ,small discription and wriiten by */}
        <div className="w-2/4 flex flex-col justify-between m-2 p-2 md:ml-20 md:mr-10 sm:ml-3 sm:mr-3 shadow-md">
          {/*Blog description */}
          <div className="flex flex-col justify-between">
            <h1 className="lg:text-3xl md:text-2xl sm:text:2xl md:font-bold sm:font-semibold m-2 p-2">
              {blog.title}
            </h1>
            <img src={blog.image} className="sm:h-64 md:h-72 lg:h-96"></img>
            {/*written by */}
            <div className="flex flex-row m-5 justify-start gap-x-3">
              <div class="rounded-full overflow-hidden bg-gray-300 sm:w-8 sm:h-8 md:h-20 md:w-20">
                <img
                  class="w-full h-full object-cover"
                  src={blog.user}
                  alt="Avatar"
                />
              </div>
              <div className="flex flex-col ml-5">
                <span className="text-violet-950 italic">Written By -</span>
                <span>{blog.username}</span>
                <span>{blog.date}</span>
              </div>
            </div>
            <p className="m-3 p-2">{blog.desc2}</p>
            {/* details */}

            <div>
              <h2 className="lg:text-3xl md:text-2xl sm:text:2xl md:font-bold sm:font-semibold m-2 p-2">
                {blog.subTitle}
              </h2>
              <p className="m-3 p-2">{blog.desc2}</p>
              {blog.places.map((place, index) => {
                return (
                  <div className="flex flex-col justify-center mt-5">
                    <h2 className="lg:text-2xl md:text-xl sm:text:xl md:font-medium sm:font-semibold m-2 p-2">
                      {place.name}
                    </h2>
                    <img
                      src={place.image}
                      className="sm:h-64 md:h-72 lg:h-96"
                    ></img>
                    <p>{place.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


         {/* comment section*/}
         <h1 className="text-2xl font-semibold m-10 mb-0">Comments</h1>
        <CommentsSection
          comments={commentData}
          handleInsertNode={handleInsertNode}
          handleUpdateNode={handleUpdateNode}
          handleDeleteNode={handleDeleteNode}
        />
       

        {/* Recent Posts*/}
        <div className="text-xl font-bold  mt-7 ml-10 p-1">Recents Posts</div>
        <div id="recent_post" className="w-11/12 m-auto">
          <div className="mt-5">
            <Slider {...settings}>
              {recent.recent.map((place, index) => {
                return (
                  <div className="bg-slate-200 rounded-xl w-[300px] h-[350px] text-black ">
                    <a>
                      <img
                        className="rounded-t-xl h-[250px] w-full"
                        src={place.image}
                      ></img>
                      <div className="flex flex-col justify-start gap-1 p-1">
                        <p className="text-xl font-semibold">{place.name}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        {/* Trending Posts*/}
        <div className="text-xl font-bold ml-10 mt-7">Trending Posts</div>
        <div id="hotels" className="w-11/12 m-auto mb-3">
          <div className="mt-5">
            <Slider {...settings}>
              {popular.popular.map((place, index) => {
                return (
                  <div className="bg-slate-200 rounded-xl w-[300px] h-[350px] text-black ">
                    <a>
                      <img
                        className="rounded-t-xl h-[250px] w-full"
                        src={place.image}
                      ></img>
                      <div className="flex flex-col justify-start gap-1 p-1">
                        <p className="text-xl font-semibold">{place.name}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      {/*Advertizement */}
      <div> ads</div>
    </div>
  );
};

export default Blog;

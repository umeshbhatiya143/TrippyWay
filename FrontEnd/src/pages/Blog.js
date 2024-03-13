import React from "react";
import BlogHeader from "@/Components/BlogHeader";
import Header from "@/Components/Header";
const Blog = () => {
  const blogContent = [
    {
      destination: "India",
      url: "../../blog1.jpg",
      topic: "9 Best Places To Explore On One-Day Trips From Delhi",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations.",
    },
    {
      destination: "India",
      url: "../../india1.jpg",
      topic: "9 Best Places To Explore On One-Day Trips From Delhi",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations.",
    },
    {
      destination: "India",
      url: "../../blog2.jpg",
      topic: "9 Best Places To Explore On One-Day Trips From Delhi",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations.",
    },
    {
      destination: "India",
      url: "../../india1.jpg",
      topic: "9 Best Places To Explore On One-Day Trips From Delhi",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations.",
    },
    {
      destination: "India",
      url: "../../india1.jpg",
      topic: "9 Best Places To Explore On One-Day Trips From Delhi",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations.",
    },
    {
      destination: "xyz",
      url: "../../slide1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
    {
      destination: "xyz",
      url: "../../xyz1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
    {
      destination: "xyz",
      url: "../../xyz1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
    {
      destination: "xyz",
      url: "../../xyz1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
    {
      destination: "xyz",
      url: "../../xyz1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
    {
      destination: "Xyz",
      url: "../../xyz1.jpg",
      topic: "9 Best Places To Explore On One-Day XYZ",
      description:
        "Venturing beyond the capital for one-day trips from Delhi opens up a treasure trove of experiences and destinations. ",
    },
  ];
  return (
    <>
      <Header/>
      <section class="m-2 my-2">
        <div
          class="  bg-blog-top  w-full bg-cover bg-center flex items-center justify-center m-none mr-0" style={{height:"400px"}}
          
        >
          <div class="text-center ">
            <h1 class="text-white text-2xl font-semibold uppercase md:text-3xl">
              Explore your Destinations
            </h1>
            <div class="flex flex-row justify-center space-x-2 pb-2">
            <input class="xl:w-full h-10 mt-4 px-4 py-2 sm:w-auto md:w-full lg:w-full sm:h-auto"type="text" placeholder="Explore"></input>
            <button class="mt-4 px-4 py-2 h-10  bg-slate-900 text-white text-sm uppercase font-medium rounded hover:bg-slate-700 focus:outline-none focus:bg-slate-700 sd:w-auto sd:h-auto">
              Explore
            </button>
            </div>
            
          </div>
        </div>
        



        <div class=" m-5 grid grid-flow-row-dense lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {blogContent.map((blog, index) => {
            return (
              <div key={index} class="m-3">
                
                <div class="max-w-sm rounded overflow-hidden shadow-lg  ">
                  <a href="#" class="  cusor-pointer">
                  <img
                    class=" h-auto max-w-full rounded-lg hover:opacity-50 transition-opacity-2 "
                    src={blog.url}
                    alt={blog.topic}
                  />
                  </a>
                  
                  <div class="px-6 py-4">
                    <div class=" font-bold text-xl mb-2">{blog.topic}</div>
                    <p class="text-base">{blog.description}</p>
                  
                    <button
                      class="flex items-center gap-2 px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                    >
                      Learn More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Blog;



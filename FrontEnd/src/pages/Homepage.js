import HeroSection from '@/Components/Homepage/Hero'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import pack from './package/pack.json'
import Card from '@/Components/card'

const Homepage = () => {
  return (
    <section className="flex flex-col gap-20">
      <HeroSection />

      {/* recommended packages */}
      <div className="w-full flex flex-col gap-10 items-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">Top Packages</h2>
        <div className="w-[70%]  relative">
          <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
          <div className="verflow-hidden flex relative">
            <Swiper
              modules={[Autoplay,]}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              className="h-full relative" // Ensure the Swiper itself has a fixed height
            >
              {[4, 2, 4, 5, 5].map((slide, index) => (
                <SwiperSlide key={index}>
                  <Card data={pack} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

        {/* recommended packages */}
        <div className="w-full flex flex-col gap-10 items-center">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Destinations</h2>
        <div className="w-[70%]  relative">
          <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
          <div className="verflow-hidden flex relative">
            <Swiper
              modules={[Autoplay,]}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              className="h-full relative" // Ensure the Swiper itself has a fixed height
            >
              {[4, 2, 4, 5, 5].map((slide, index) => (
                <SwiperSlide key={index}>
                  <Card data={pack} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

        {/* recommended packages */}
        <div className="w-full flex flex-col gap-10 items-center">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Destinations</h2>
        <div className="w-[70%]  relative">
          <div className="absolute -top-10 right-8 text-dark-cyan border border-dark-cyan hover:bg-dark-cyan hover:text-white transition-all duration-1000 rounded-md px-2 font-medium text-md hover:cursor-pointer">view more</div>
          <div className="verflow-hidden flex relative">
            <Swiper
              modules={[Autoplay,]}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              className="h-full relative" // Ensure the Swiper itself has a fixed height
            >
              {[4, 2, 4, 5, 5].map((slide, index) => (
                <SwiperSlide key={index}>
                  <Card data={pack} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Homepage
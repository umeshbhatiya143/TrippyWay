import HeroSection from '@/Components/Homepage/Hero'
import React from 'react'
import pkg from '@/pages/package/pack.json'

const Homepage = () => {
  return (
    <section className="flex flex-col gap-10">
      <HeroSection/>

      {/* packages component */}
      <div>
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Recommened Destinations</h2>

      </div>
    </section>
  )
}

export default Homepage
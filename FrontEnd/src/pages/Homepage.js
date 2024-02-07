import HeroSection from '@/Components/Homepage/Hero'
import React from 'react'
import PackageComponent from '../Components/Homepage/packageCompo';

const Homepage = () => {
  return (
    <section>
      <HeroSection/>
      <PackageComponent/>
    </section>
  )
}

export default Homepage
import React from 'react'
import Link from 'next/link';
const budget_friendly = () => {
  const allSeason= [
    {
      "title": "Exploring the Wonders of Machu Picchu",
      "cover_image": "../../../Machu_Picchu.jpg",
      "credit": "Photo by John Doe",
      "description": "Join us as we embark on an unforgettable journey to Machu Picchu, the ancient Incan citadel nestled in the Andes Mountains of Peru. Discover the rich history, breathtaking landscapes, and awe-inspiring architecture of this UNESCO World Heritage Site."
    },
    {
      "title": "A Safari Adventure in the Serengeti",
      "cover_image": "../../../serengeti.jpg",
      "credit": "Photo by Jane Smith",
      "description": "Experience the thrill of the wild as we venture into the heart of the Serengeti National Park in Tanzania. Get up close and personal with majestic lions, graceful giraffes, and towering elephants on this unforgettable safari adventure."
    },
    {
      "title": "Island Paradise: Exploring the Maldives",
      "cover_image": "../../../maldives.webp",
      "credit": "Photo by Alex Johnson",
      "description": "Escape to the idyllic beaches and crystal-clear waters of the Maldives, where luxury meets natural beauty. Dive into the vibrant coral reefs, unwind in overwater bungalows, and indulge in world-class dining for the ultimate tropical getaway."
    },
    {
      "title": "Exploring the Wonders of Machu Picchu",
      "cover_image": "../../../Machu_Picchu.jpg",
      "credit": "Photo by John Doe",
      "description": "Join us as we embark on an unforgettable journey to Machu Picchu, the ancient Incan citadel nestled in the Andes Mountains of Peru. Discover the rich history, breathtaking landscapes, and awe-inspiring architecture of this UNESCO World Heritage Site."
    },
    {
      "title": "A Safari Adventure in the Serengeti",
      "cover_image": "../../../serengeti.jpg",
      "credit": "Photo by Jane Smith",
      "description": "Experience the thrill of the wild as we venture into the heart of the Serengeti National Park in Tanzania. Get up close and personal with majestic lions, graceful giraffes, and towering elephants on this unforgettable safari adventure."
    },
    {
      "title": "Island Paradise: Exploring the Maldives",
      "cover_image": "../../../maldives.webp",
      "credit": "Photo by Alex Johnson",
      "description": "Escape to the idyllic beaches and crystal-clear waters of the Maldives, where luxury meets natural beauty. Dive into the vibrant coral reefs, unwind in overwater bungalows, and indulge in world-class dining for the ultimate tropical getaway."
    }
  ]
  return (
    <div className="container flex flex-wrap justify-center md:grid md:grid-cols-3 sm:grid-cols-1 gap-4 w-2/3">

      {allSeason.map((blog, index) => (
        <Link key={blog.id} href={`/blog/${blog.id}`}>
        <div key={index} className="blog-card " style={{ width: '100%', maxWidth: '300px', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', backgroundColor: '#fff' }}>
          <img src={blog.cover_image} alt={blog.title} style={{ maxWidth: '100%', borderRadius: '8px' ,height:"250px"}} />
          <h2 className='font-bold text-xl'>{blog.title}</h2>
          <p style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden',textOverflow: 'ellipsis' }}>{blog.description}</p>

          <p className='font-bold '>{blog.credit}</p>
          
        </div>
        </Link>
      ))}
    </div>
  )
}

export default budget_friendly
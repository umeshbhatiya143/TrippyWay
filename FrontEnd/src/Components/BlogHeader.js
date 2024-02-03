import React, { useState } from 'react'


const BlogHeader = () => {
    let Links =[
      {name:"HOME",link:"/"},
      {name:"SERVICE",link:"/"},
      {name:"DESTINATIONS",link:"/"},
      {name:"CDXFDGF",link:"/"},
      {name:"CONTACT",link:"/"},
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className={`shadow-md w-full  top-0 left-0 ${open ? ' ':''}`}>
      <div className='md:flex items-center justify-between bg-slate-900 py-4 md:px-10 px-7'>
      <img src="/logo.png" alt="TrippyWay Logo" className="h-14 -ml-10  mr-10 " />
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-white'>
       
        {open ? 'close':'menu'}
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in  ${open ? 'top-20 bg-slate-900 z-50 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7 '>
              <a href={link.link} className=' hover:text-gray-400 duration-500 text-white'>{link.name}</a>
            </li>
          ))
        }
        
      </ul>
      </div>
    </div>
  )
}

export default BlogHeader
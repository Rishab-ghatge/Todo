import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-400 text-white items-center py-2'>
      <div className="logo">
        <span className='font-bold text-2xl mx-7'>iTask</span>
      </div>
      <ul className='flex gap-8 mx-7 capitalize text-white'>
        <li className='cursor-pointer hover:font-bold transition-all text-[20px]'>home</li>
        <li className='cursor-pointer hover:font-bold transition-all text-[20px]'>Your tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar

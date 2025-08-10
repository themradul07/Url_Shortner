import React from 'react'

const Navbar = () => {
  return (
    <nav className=' flex justify-between px-3 md:px-28 py-3 bg-slate-900 text-white items-center'>
      <div className="logo font-bold text-2xl">
        <span className='text-green-600'>&lt;</span>
       Light
        <span className='text-green-600'>Link/&gt;</span>
      </div>
      {/* <ul>
        <li className='flex gap-8 '>
          <a className='hover:font-bold' href="">Home</a>
          <a className='hover:font-bold' href="">Contact</a>
          <a className='hover:font-bold' href="">About</a>
        </li>
      </ul> */}
      <div className='border border-green-700 flex gap-4 items-center justify-center px-3 py-2 bg-green-500 hover:bg-green-600 rounded-full'>
        <img width={25} src="/github-mark.svg" className='' alt="" />
        <span className='text-black font-semibold'>GitHub</span>
      </div>
    </nav>
  )
}

export default Navbar
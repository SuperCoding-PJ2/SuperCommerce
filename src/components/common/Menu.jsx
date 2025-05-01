import React from 'react'
import { Link } from 'react-router-dom';

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 transform transition-transform duration-300 ease-in-out z-10 p-4
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={onClose} className='absolute right-2 top-2'><img src={`${process.env.PUBLIC_URL}/img/Close.svg`} alt="메뉴닫기" className='invert brightness-5 w-6 '/></button>

      <nav className='mt-12 mb-[65px] border-t border-neutral-400'>
        <ul>
          <li className='text-neutral-400 py-2 text-center'>
            <Link to='/about'><div className='h-[60px] overflow-hidden'><img src={`${process.env.PUBLIC_URL}/img/eye glasses.svg`} alt="About" className='w-[80px] mx-auto'/></div>About</Link>
          </li>
          <li className='text-neutral-400 py-2 text-center'>
            <Link to='/man'><div className='h-[67px] overflow-hidden mt-[-10px]'><img src={`${process.env.PUBLIC_URL}/img/sneaker.svg`} alt="man" className='w-[80px] mx-auto'/></div>man</Link>
          </li>
          <li className='text-neutral-400 py-2 text-center'>
            <Link to='/man'><img src={`${process.env.PUBLIC_URL}/img/polo shirt.svg`} alt="woman" className='w-[80px] mx-auto'/>woman</Link>
          </li>
          <li className='text-neutral-400 py-2 text-center'>
            <Link to='/man'><img src={`${process.env.PUBLIC_URL}/img/jogger pants.svg`} alt="sale" className='w-[80px] mx-auto'/>sale</Link>
          </li>
        </ul>
      </nav>
      
      <p className='text-neutral-400 py-2 mb-12'>
        Austin brunch cloud bread cronut photo booth locavore crucifix edison bulb pork belly distillery. Before they sold out palo santo try-hard, vaporware salvia cardigan letterpress ugh butcher bitters brooklyn. ... 
      </p>
      <img src={`${process.env.PUBLIC_URL}/img/social_media.svg`} alt="social icon" />
    </div>
  )
}

export default Menu

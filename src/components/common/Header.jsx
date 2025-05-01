import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Menu from './Menu';
import HamburgerButton from './HamburgerButton';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <header className='flex justify-between items-center bg-gray-200 px-6 h-20'>
        <HamburgerButton onClick={() => setIsSidebarOpen(prev => !prev)} />
        <Menu 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)} 
        />
        <h1>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt='로고' />
          </Link>
        </h1>			
        <div className='text-sm flex justify-end items-center gap-4'>
          <p><span className='text-gray-500'>Ko</span> | <span className='font-bold'>KRW</span></p>
          <Link to='/login'>
            <p>
              <img src={`${process.env.PUBLIC_URL}/img/user.svg`} alt="로그인" />
            </p>
          </Link>
          <Link to='/shoppingcart'>
            <img src={`${process.env.PUBLIC_URL}/img/fast-cart.svg`} alt="장바구니" />
          </Link>
        </div>
      </header>
      <div className='border-b p-4 text-gray-400 text-sm flex gap-2'>
        <span className=''>home</span> <img src={`${process.env.PUBLIC_URL}/img/arrow.svg`} alt="화살표" /> <span>login</span>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Menu from './Menu';
import HamburgerButton from './HamburgerButton';
import Breadcrumb from './Breadcrumb';

const Header = ({type}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMain = type === 'main';

  return (
    <div>
      <header className={`w-full h-20
      ${isMain ? 'absolute left-0 top-0 z-10' : 'relative'}`}
    >
        <div className={`flex justify-between items-center w-full px-6 h-full
        ${isMain ? 'bg-none' : 'bg-gray-200'}`}
        >
          <HamburgerButton onClick={() => setIsSidebarOpen(prev => !prev)} />
          <Menu 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)} 
          />
                
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
        </div>
        <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[131px]'>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt='로고' />
          </Link>
        </h1>
      </header>
      {!isMain && (
        <Breadcrumb />
      )}
    </div>
  )
  
}

export default Header

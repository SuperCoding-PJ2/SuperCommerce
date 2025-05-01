import React from 'react'

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className='flex justify-between items-center bg-gray-200 px-6 h-20'>
        <div>
          <img src={`${process.env.PUBLIC_URL}/img/menu.svg`} alt="메뉴" />
        </div>
        <h1>
          <Link to='/'>
            <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt='로고' />
          </Link>
        </h1>			
        {/* <Menu /> */}
        <div className='text-sm flex justify-end items-center'>
          <p className='mr-4'><span className='text-gray-500'>Ko</span> | <span className='font-bold'>KRW</span></p>
          <Link to='/login'>
            <p>
              <img src={`${process.env.PUBLIC_URL}/img/user.svg`} alt="로그인" />
            </p>
          </Link>
        </div>
      </header>
      <div className='border-b p-4 text-gray-400 text-sm'>
        <span className=''>home</span> <span> > </span> <span>login</span>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

    <div className='w-full absolute bottom-0 border-t'>
      <div className='flex justify-center items-center gap-x-4 mb-4 pt-[50px]'>
        <div className='py-2 px-4 bg-gray-300 text-gray-500'>Terms and Conditions</div>
        <div className='py-2 px-4 bg-gray-300 text-gray-500'>Help</div>
        <div className='py-2 px-4 bg-gray-300 text-gray-500'>Delivery</div>
        <div className='py-2 px-4 bg-gray-300 text-gray-500'>Returns</div>
        <div className='py-2 px-4 bg-gray-300 text-gray-500'>Privacy</div>
      </div>
      <div className='w-full pt-[79px] pb-[110px] bg-gray-300 '>
        <div className='w-[1260px] mx-auto flex justify-center items-center gap-x-4'>
          <h1>
            <Link to='/'>
              <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt='로고' />
            </Link>
          </h1>
          <p>
          ⓒ2025 meesto. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

import React from 'react'
import Layout from './Layout'
import { useState, useRef } from 'react';

const SignUp = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // input 클릭 트리거
  };

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className='text-stone-800 font-bold text-[28px] font-[Montserrat]'>SignUp</h1>
        <div className='w-[1222px] flex justify-start gap-12'>
          <div>
            <label className='mt-2 text-neutral-500 text-[14px] block'>profile<span className='text-orange-600'>*</span></label>
            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* 클릭 가능한 동그라미 이미지 */}
            <div
              className="w-40 h-40 rounded-full overflow-hidden bg-gray-300 cursor-pointer"
              onClick={handleClick}
            >
              <img
                src={imageUrl || `${process.env.PUBLIC_URL}/img/profile.svg`} // 기본 이미지 경로 설정
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div>
              <label className='mt-2 text-neutral-500 text-[14px] block'>Email<span className='text-orange-600'>*</span></label>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
            </div>
            <div>
              <label className='mt-2 text-neutral-500 text-[14px] block'>Password<span className='text-orange-600'>*</span></label>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
            </div>
            <div>
              <label className='mt-2 text-neutral-500 text-[14px] block'>Phone<span className='text-orange-600'>*</span></label>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
            </div>
            <div>
              <label className='mt-2 text-neutral-500 text-[14px] block'>Zip code<span className='text-orange-600'>*</span></label>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
            </div>
            <div>
              <label className='mt-2 text-neutral-500 text-[14px] block'>Address<span className='text-orange-600'>*</span></label>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none block'/>
              <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none block mt-2'/>
            </div>
            <button className='w-[490px] h-[46px] bg-black text-stone-50 block mt-[34px] mb-[100px]'>Sign Up</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp

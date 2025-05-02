import React from 'react'
import { useState } from 'react';

const Detail = () => {
  const [selected, setSelected] = useState('');
  const [selected02, setSelected02] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleChange02 = (e) => {
    setSelected02(e.target.value);
  };

  return (
    <div className='w-[1600px] mx-auto my-8'>
      <div className='flex justify-between pr-[104px]'>
        <div>
          <div className='flex gap-4 mb-4'>
            <img src={`${process.env.PUBLIC_URL}/img/item_01.png`} alt="상품" className='block'/>
            <img src={`${process.env.PUBLIC_URL}/img/item_01.png`} alt="상품" className='fiter_s_01 block'/>
          </div>
          <div className='flex gap-4'>
            <img src={`${process.env.PUBLIC_URL}/img/item_01.png`} alt="상품" className='fiter_s_02 block '/>
            <img src={`${process.env.PUBLIC_URL}/img/item_01.png`} alt="상품" className='fiter_s_03 block'/>
          </div>
        </div>
      
        <div className='w-[510px]'>
          <span className='font-[Open Sans] text-gray-500 text-[13px]'>Ref.1234567GH</span>
          <h2 className='font-medium font-[Montserrat] text-[24px] text-gray-900 leading-[1.3]'>Fashion axe vegan single-origin<br />cotton keffiyeh shoe</h2>
          <div className='mt-4'>
            <span className='font-[Open Sans] text-gray-500 text-[20px] line-through'>\91,000</span>
            <span className='font-[Open Sans] text-[#FE5335] text-[20px] ml-2'>\70,000</span>
          </div>
          <p className='font-[Open Sans] text-gray-500 text-[13px]'>Tax free (21%) outside US</p>
          <p className='font-[Open Sans] text-gray-600 text-[16px] mt-4'>Men’s black technical lace-up sneakers in contrasting materials with a contrasting cotton-tab at the heel.</p>
          <div className='mt-2'>
            <span className='font-[Open Sans] text-gray-500 text-[14px] underline'>Product details</span>
            <span className='font-[Open Sans] text-gray-500 text-[14px] underline ml-4'>Size guide</span>
          </div>
      
          <div className='mt-4 flex justify-between '>
            <div className='flex gap-2'>
              <div className='w-[22px] h-[22px] bg-black'></div>
              <div className='w-[22px] h-[22px] bg-[#DFD497]'></div>
              <div className='w-[22px] h-[22px] bg-[#7DA28B]'></div>
              <div className='w-[22px] h-[22px] bg-[#8B9AB5]'></div>
            </div>
            <p className='font-[Open Sans] text-gray-500 text-[14px]'>Black</p>
          </div>
      
          <div className='w-full mt-12'>
            <label htmlFor="select" className="block text-sm font-medium text-gray-700 mb-1"></label>
            <select
              id="select"
              value={selected}
              onChange={handleChange}
              className="block w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose youre size</option>
              <option value="option1">310</option>
              <option value="option2">300</option>
              <option value="option3">270</option>
            </select>
          </div>
          <div className='w-full mt-4'>
            <label htmlFor="select" className="block text-sm font-medium text-gray-700 mb-1"></label>
            <select
              id="select"
              value={selected02}
              onChange={handleChange02}
              className="block w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
              <option value="option4">4</option>
            </select>
          </div>
      
          <button className='w-full h-[46px] bg-black text-stone-50 block my-4'>Add to bag</button>
      
          <div className='flex justify-between mt-4'>
            <span className='font-[Open Sans] text-gray-500 text-[14px] underline'>Product details</span>
            <div className='flex gap-2'>
              <span className='font-[Open Sans] text-gray-500 text-[14px]'>Share</span>
              <img src={`${process.env.PUBLIC_URL}/img/share.svg`} alt="share"/>
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex justify-start gap-12 mt-12 ml-[180px]'>
        <div className='w-[350px]'>
          <h3 className='font-medium font-[Montserrat] text-[18px] text-gray-900 my-4'>Product details</h3>
          <p className='font-[Open Sans] text-gray-600 text-[16px]'>
          Tote bag mlkshk humblebrag leggings normcore authentic mustache. Chartreuse swag brunch chillwave keytar shabby chic synth jianbing wolf pork belly jean shorts trust fund ugh hot chicken blog. Flexitarian pickled vape asymmetrical man braid chia hot chicken vinyl. Prism wolf keffiyeh cornhole snackwave roof party next leve
          </p>

          <ul className='mt-12 text-gray-600'>
            <li>•  Green juice flexitarian jean shorts</li>
            <li>•  Stumptown mumblecore asymmetrical ugh</li>
            <li>•  Fashion axe vegan single-origin</li>
          </ul>
        </div>

        <div className='w-[350px]'>
          <h3 className='font-medium font-[Montserrat] text-[18px] text-gray-900 my-4'>Information</h3>
          <ul className='text-gray-600'>
            <li>•  Green juice flexitarian jean shorts</li>
            <li>•  Stumptown mumblecore asymmetrical ugh</li>
            <li>•  Fashion axe vegan single-origin</li>
          </ul>
          <p className='font-[Open Sans] text-gray-600 text-[16px] mt-4'>
          Af offal letterpress, poutine ramps man bun intelligentsia kogi you probably haven't heard of them. Pickled aesthetic gochujang polaroid
          </p>
          <div className='mt-4'>
            <span className='font-[Open Sans] text-gray-700 text-[14px] font-bold underline'>Delivery</span>
            <span className='font-[Open Sans] text-gray-700 text-[14px] font-bold underline ml-8'>Return</span>
            <span className='font-[Open Sans] text-gray-700 text-[14px] font-bold underline ml-8'>Help</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

import React from 'react'
import Layout from '../common/Layout'
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // ⭐ Navigation 모듈
import 'swiper/css';
import 'swiper/css/navigation'; // ⭐ Navigation CSS

const List = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    fetch('/data/items.json')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const chunkedItems = [];
  // 아이템을 3개씩 묶어서 배열에 저장
  for (let i = 0; i < items.length; i += 4) {
    chunkedItems.push(items.slice(i, i + 4));
  }

  return (
    <Layout>
      <div className='flex items-center mb-4 px-4'>
        <div className='mr-4'><span className='text-gray-500'>view</span> <span className='text-gray-500'>1</span><span className='text-gray-500'> | </span><span className='font-bold font-black'>4</span></div>
        <div className='w-[193px]'>
          <label htmlFor="select" className="block text-sm font-medium text-gray-700 mb-1"></label>
          <select
            id="select"
            value={selected}
            onChange={handleChange}
            className="block w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Sort by</option>
            <option value="option1">option 1</option>
            <option value="option2">option 2</option>
            <option value="option3">option 3</option>
          </select>
        </div>
      </div>
      <div className='flex flex-wrap w-full'>
        {/* 아이템 목록 렌더링 */}
        {chunkedItems.map((chunk, index) => {
          if (index === 2) {
            // 셋째 줄에 슬라이더 넣기
            return (
                <div key={`custom-row-${index}`} className="flex w-full mb-6">
                  {/* 왼쪽 2개 아이템 */}
                  {chunk.slice(0, 2).map((item) => (
                    <div key={item.id} className="w-1/4">
                      <img src={item.image} alt="item" className="mx-auto" />
                      <p className="font-[Montserrat] text-[16px] text-gray-900 font-medium leading-[1.3] py-2 px-4">
                        {item.text}
                      </p>
                      <p className="font-[Open Sans] text-[16px] text-gray-900 font-medium px-4 pb-8">
                        {item.price}
                      </p>
                    </div>
                  ))}
  
                  {/* 오른쪽 2칸 슬라이더 */}
                  <div className="w-1/2 px-4">
                    <Swiper
                     slidesPerView={1}
                     spaceBetween={10}
                     modules={[Navigation]} // ⭐ Navigation 사용
                     navigation // ⭐ 네비게이션 활성화 
                    >
                      {chunk.slice(2).map((sliderItem) => (
                        <SwiperSlide key={sliderItem.id}>
                          <div className='h-[664px]'>
                            <img
                              src={sliderItem.image}
                              alt="item"
                              className="w-full h-[550px] object-cover"
                            />
                            <p className="font-[Montserrat] text-[16px] text-gray-900 font-medium leading-[1.3] py-2">
                              {sliderItem.text}
                            </p>
                            <p className="font-[Open Sans] text-[16px] text-gray-900 font-medium pb-8">
                              {sliderItem.price}
                            </p>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
            );
          }

          // 기본 아이템 출력
          return chunk.map((item) => (
            <div key={item.id} className="w-1/4">
              <img src={item.image} alt="item" className="mx-auto" />
              <p className="font-[Montserrat] text-[16px] text-gray-900 font-medium leading-[1.3] py-2 px-4">
                {item.text}
              </p>
              <p className="font-[Open Sans] text-[16px] text-gray-900 font-medium px-4 pb-8">{item.price}</p>
            </div>
          ));
        })}
      </div>
    </Layout>
  )
}

export default List

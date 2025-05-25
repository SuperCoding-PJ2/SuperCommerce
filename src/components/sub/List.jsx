import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getProducts } from '../../services/ProductService';

const List = () => {
  const [items, setItems] = useState([]);
  const [selectedSort, setSelectedSort] = useState('');
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 20, totalPages: 1 });

  const fetchList = async () => {
    const data = await getProducts({
      page: pageInfo.page,
      size: pageInfo.size,
      sortBy: selectedSort || 'createdAt',
      direction: 'desc',
    });
    setItems(data.content);
    setPageInfo({
      page: data.number,
      size: data.size,
      totalPages: data.totalPages
    });
  };

  useEffect(() => {
    fetchList();
  }, [selectedSort]);

  const handleChange = e => {
    setSelectedSort(e.target.value);
  };

  // 4개씩 묶어서 row 레이아웃 구성
  const chunked = [];
  for (let i = 0; i < items.length; i += 4) {
    chunked.push(items.slice(i, i + 4));
  }

  return (
      <Layout>
        <div className='flex items-center mb-4 px-4'>
          <div className='mr-4'>
            <span className='text-gray-500'>view</span>
            <span className='text-gray-500'>{pageInfo.page + 1}</span>
            <span className='text-gray-500'> | </span>
            <span className='font-bold'>{pageInfo.totalPages}</span>
          </div>
          <div className='w-[193px]'>
            <select
                value={selectedSort}
                onChange={handleChange}
                className="block w-full px-3 py-2 border-t border-b border-gray-300"
            >
              <option value="">Sort by</option>
              <option value="price">Price</option>
              <option value="createdAt">Newest</option>
              <option value="price,asc">Price ↑</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap w-full'>
          {chunked.map((chunk, row) =>
              row === 2 ? (
                  <div key={row} className="flex w-full mb-6">
                    {chunk.slice(0, 2).map(item => (
                        <div key={item.id} className="w-1/4">
                          <Link to={`/detail/${item.id}`}>
                            <img src={item.image} alt={item.text} className="mx-auto" />
                            <p className="py-2 px-4">{item.text}</p>
                            <p className="px-4 pb-8">{item.price}</p>
                          </Link>
                        </div>
                    ))}
                    <div className="w-1/2 px-4">
                      <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          modules={[Navigation]}
                          navigation
                      >
                        {chunk.slice(2).map(item => (
                            <SwiperSlide key={item.id}>
                              <img src={item.image} alt={item.text} className="w-full h-[550px] object-cover" />
                              <p className="py-2">{item.text}</p>
                              <p className="pb-8">{item.price}</p>
                            </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
              ) : (
                  chunk.map(item => (
                      <div key={item.id} className="w-1/4">
                        <Link to={`/detail/${item.id}`}>
                          <img src={item.image} alt={item.text} className="mx-auto" />
                          <p className="py-2 px-4">{item.text}</p>
                          <p className="px-4 pb-8">{item.price}</p>
                        </Link>
                      </div>
                  ))
              )
          )}
        </div>
      </Layout>
  );
};

export default List;

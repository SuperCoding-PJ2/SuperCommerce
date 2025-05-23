import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../common/Loading';
import { getProductById } from '../../services/ProductService';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProductById(id)
        .then(data => setProduct(data))
        .catch(console.error)
        .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const rawPrice = Number(product.price.toString().replace(/[^\d]/g, ''));
  const salePrice = Math.floor(rawPrice * 0.9);

  return (
      <div className='w-[1600px] mx-auto my-8'>
        <div className='flex justify-between pr-[104px]'>
          {/* 이미지 갤러리 (간단화) */}
          <div>
            <img src={product.image} alt="" className='block mb-4'/>
          </div>

          {/* 상품 정보 */}
          <div className='w-[510px]'>
            <span className='text-gray-500'>Ref.{product.id}</span>
            <h2 className='text-[24px] font-medium'>{product.text}</h2>

            <div className='mt-4'>
              <span className='line-through'>{rawPrice.toLocaleString()}</span>
              <span className='ml-2 text-[#FE5335]'>{salePrice.toLocaleString()}</span>
            </div>

            <p className='mt-4'>{product.description}</p>

            {/* 옵션 선택 */}
            <select value={size} onChange={e => setSize(e.target.value)} className='mt-4 w-full border p-2'>
              <option value="">Size</option>
              {product.availableSizes?.map(s => (
                  <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select value={quantity} onChange={e => setQuantity(+e.target.value)} className='mt-4 w-full border p-2'>
              {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>

            <button className='w-full h-[46px] bg-black text-white mt-4'>Add to bag</button>

            <div className='flex justify-between mt-4'>
              <Link to='/man' className='underline text-[#FE5335]'>List</Link>
            </div>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className='mt-12 grid grid-cols-2 gap-12 px-[180px]'>
          <div>
            <h3 className='text-[18px] font-medium mb-4'>Product details</h3>
            <p>{product.details}</p>
          </div>
          <div>
            <h3 className='text-[18px] font-medium mb-4'>Information</h3>
            <p>{product.info}</p>
          </div>
        </div>
      </div>
  );
};

export default Detail;

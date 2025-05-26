import React, { useState, useEffect, useContext } from 'react';
import {useParams, Link, Navigate, useNavigate} from 'react-router-dom';
import Loading from '../common/Loading';
import { getProductById } from '../../services/productService';
import { addCartItem } from '../../services/cartService';
import { AuthContext } from '../../context/AuthContext'; // 인증 컨텍스트 추가
import { toast } from 'react-toastify'; // 알림 기능 추가 (선택사항)

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();               // ← 여기에
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { token } = useContext(AuthContext); // 로그인 상태 확인

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // API 호출 및 응답 처리
    getProductById(id)
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('상품 데이터 로드 실패:', error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 장바구니 추가 함수
  const handleAddToCart = async () => {
    // 사이즈 선택 검증
    if (!size) {
      alert('사이즈를 선택해주세요.');
      return;
    }

    // 수량 검증
    if (quantity < 1) {
      alert('수량은 1개 이상이어야 합니다.');
      return;
    }

    // 로그인 상태 확인
    if (!token) {
      const goLogin = window.confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?');
      if (goLogin) {
        navigate('/login', { replace: true });
      }
      return;
    }

    try {
      setIsAddingToCart(true);

      // 가격 계산 (할인가 적용)
      const priceValue = typeof product.price === 'string'
        ? Number(product.price.replace(/[^\d]/g, ''))
        : (product.price || 0);
      const salePrice = Math.floor(priceValue * 0.9);

      // API 요청 데이터 구성
      const cartItem = {
        productId: Number(id),
        quantity: quantity,
        price: salePrice, // BigDecimal로 변환될 것임
        size: size
      };

      console.log('장바구니 추가 요청 데이터:', cartItem);

      // 장바구니 추가 API 호출
      const response = await addCartItem(cartItem);

      console.log('장바구니 추가 응답:', response);

      // 성공 메시지
      toast ? toast.success('상품이 장바구니에 추가되었습니다.') :
        alert('상품이 장바구니에 추가되었습니다.');

    } catch (error) {
      console.error('장바구니 추가 실패:', error.response?.data || error);

      // 오류 메시지
      const errorMsg = error.response?.data?.message || '장바구니 추가 중 오류가 발생했습니다.';
      toast ? toast.error(errorMsg) : alert(errorMsg);

    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) return <Loading />;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  // 데이터 구조에 맞게 속성 접근 수정
  const imageUrl = product.imageUrl || product.image || '/img/default-product.png';
  const productName = product.name || product.text || '제품명 없음';
  const productDesc = product.description || '';

  // 가격 처리
  const priceValue = typeof product.price === 'string'
    ? Number(product.price.replace(/[^\d]/g, ''))
    : (product.price || 0);

  const salePrice = Math.floor(priceValue * 0.9);

  return (
    <div className='w-[1600px] mx-auto my-8'>
      <div className='flex'>
        {/* 이미지 갤러리 */}
        <div className='w-3/5 pr-8'>
          <div className='h-full flex items-center justify-center bg-gray-50'>
            <img
              src={imageUrl}
              alt={productName}
              className='w-full h-auto object-contain max-h-[700px]'
            />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className='w-2/5 pl-8'>
          <span className='text-gray-500'>Ref.{id}</span>
          <h2 className='text-[24px] font-medium mt-2'>{productName}</h2>

          <div className='mt-6'>
            <span className='line-through text-gray-500'>{priceValue.toLocaleString()}원</span>
            <span className='ml-2 text-[#FE5335] text-xl font-semibold'>{salePrice.toLocaleString()}원</span>
          </div>

          <div className='mt-6 border-t border-b py-4'>
            <p className='text-gray-700 leading-relaxed'>{productDesc}</p>
          </div>

          {/* 옵션 선택 */}
          <div className='mt-8'>
            <p className='text-sm text-gray-600 mb-2'>사이즈</p>
            <select
              value={size}
              onChange={e => setSize(e.target.value)}
              className='w-full border p-3 rounded-sm bg-white'
            >
              <option value="">사이즈 선택</option>
              {(product.availableSizes || ['S', 'M', 'L', 'XL']).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {!size && <p className="text-red-500 text-xs mt-1">사이즈를 선택해주세요</p>}
          </div>

          <div className='mt-4'>
            <p className='text-sm text-gray-600 mb-2'>수량</p>
            <select
              value={quantity}
              onChange={e => setQuantity(+e.target.value)}
              className='w-full border p-3 rounded-sm bg-white'
            >
              {[...Array(10)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
          </div>

          <button
            className={`w-full h-[50px] ${
              isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800'
            } text-white mt-8 transition-colors`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? '처리 중...' : '장바구니에 추가'}
          </button>

          <div className='flex justify-between mt-8 pt-4 border-t'>
            <Link to='/man' className='underline text-[#FE5335] hover:text-[#d83a1c] transition-colors'>
              목록으로
            </Link>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className='mt-16 grid grid-cols-2 gap-12 px-[100px]'>
        <div>
          <h3 className='text-[18px] font-medium mb-4 pb-2 border-b'>제품 상세정보</h3>
          {/* 나머지 상세 정보 내용 */}
        </div>
      </div>
    </div>
  );
};

export default Detail;
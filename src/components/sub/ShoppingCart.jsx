import React, {useEffect, useState, useContext} from 'react';
import Layout from '../common/Layout';
import {Link, useNavigate} from 'react-router-dom';
import {
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  addCartItem,
  checkout,
} from '../../services/cartService';
import {AuthContext} from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ShoppingCart = () => {
  const { user, token } = useContext(AuthContext);
  const [cartPage, setCartPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(user?.shippingAddress || '');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const goLogin = window.confirm(
        '로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?'
      );
      if (goLogin) {
        navigate('/login', {replace: true});
      }
      return;
    }
    loadCart();
  }, [token, navigate]);

  const loadCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchCartItems({page: 0, size: 10});
      setCartPage(data);
    } catch {
      setError('장바구니를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleQtyChange = async (itemId, qty) => {
    try {
      await updateCartItem({itemId, quantity: qty});
      setCartPage(page => ({
        ...page,
        content: page.content.map(i =>
          i.id === itemId ? {...i, quantity: qty} : i
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async itemId => {
    try {
      await deleteCartItem({itemId});
      setCartPage(page => ({
        ...page,
        content: page.content.filter(i => i.id !== itemId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast.error('배송지를 입력해 주세요.');
      return;
    }
    setIsCheckingOut(true);
    try {
      await checkout({ shippingAddress });
      toast.success('결제가 완료되었습니다!');
      navigate('/myaccount', {replace: true});
    } catch (err) {
      const msg = err.response?.data?.message || '결제 중 오류가 발생했습니다.';
      toast.error(msg);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = cartPage
    ? cartPage.content.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 0;

  if (loading) return <Layout>로딩 중…</Layout>;
  if (error) return <Layout>{error}</Layout>;

  return (
    <Layout>
      <section className="px-4 text-sm text-[#212121]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          {/* 왼쪽 */}
          <div>
            <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
            <Link to="/man">
              <div className="text-[#212121] text-sm">← Continue shopping</div>
            </Link>
          </div>

          {/* 오른쪽 */}
          <div className="w-full space-y-6 py-8">
            {/* 헤더 */}
            <div className="grid grid-cols-5 border-b border-[#757575] py-3 font-semibold">
              <div className="col-span-2">Item</div>
              <div>Size</div>
              <div>QTY</div>
              <div>Price</div>
            </div>

            {/* 리스트 */}
            <div className="divide-y">
              {cartPage?.content.map((item, idx) => (
                <div
                  key={item.id != null ? item.id : idx}
                  className="grid grid-cols-5 py-4 items-center"
                >
                  {/* 아이템 정보 */}
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-gray-100"
                    />
                    <div className="flex flex-col items-start gap-2 max-w-[310px]">
                      <p className="font-bold text-[#232323]">{item.name}</p>
                      <p className="text-xs text-[#232323]">
                        SKU: {item.productId}
                      </p>
                    </div>
                  </div>

                  {/* 사이즈 */}
                  <div>{item.size}</div>

                  {/* 수량 */}
                  <div>
                    <select
                      className="border border-gray-300 px-3 py-1"
                      value={item.quantity}
                      onChange={e =>
                        handleQtyChange(item.id, Number(e.target.value))
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 가격 & 삭제 */}
                  <div className="flex justify-between items-center">
                    <span>₩{item.price * item.quantity}</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="ml-4 text-sm text-gray-500"
                    >
                      Delete ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-[#757575] pt-2 space-y-2">
              {/* 배송지 입력 필드 */}
              <div className="mt-4">
                <label htmlFor="shippingAddress" className="block text-sm font-semibold mb-1">
                  배송지
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  className="w-full border p-2 text-sm"
                  placeholder="배송지 입력"
                />
              </div>

              <div className="flex justify-between text-gray-600 border-b border-gray-300 py-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600 border-b border-gray-300 py-3">
                <span>Subtotal:</span>
                <span>₩{subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-b border-gray-300 py-3">
                <span>Cart total:</span>
                <span>₩{subtotal}</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="coupon" className="w-4 h-4"/>
                  <label htmlFor="coupon" className="text-sm">
                    I have a coupon code
                  </label>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`bg-black text-white px-6 py-2 text-sm font-semibold mt-4 sm:mt-6 ${
                    isCheckingOut ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-800'
                  }`}
                >
                  {isCheckingOut ? '결제 처리 중…' : 'Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShoppingCart;
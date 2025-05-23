import React, { useEffect, useState, useContext } from 'react';
import Layout from '../common/Layout';
import { Link } from 'react-router-dom';
import {
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  addCartItem,
} from '../../services/cartService';
import { AuthContext } from '../../context/AuthContext';

const ShoppingCart = () => {
  const { user, token } = useContext(AuthContext);
  const [cartPage, setCartPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 불러오기
  const loadCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchCartItems({ page: 0, size: 50 });
      setCartPage(data);
    } catch (err) {
      setError('장바구니를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // 수량 변경
  const handleQtyChange = async (itemId, qty) => {
    try {
      await updateCartItem({ itemId, quantity: qty });
      // 로컬 업데이트
      setCartPage(page => ({
        ...page,
        content: page.content.map(i =>
            i.id === itemId ? { ...i, quantity: qty } : i
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제
  const handleDelete = async (itemId) => {
    try {
      await deleteCartItem({ itemId });
      setCartPage(page => ({
        ...page,
        content: page.content.filter(i => i.id !== itemId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // 합계 계산
  const subtotal = cartPage
      ? cartPage.content.reduce((sum, i) => sum + i.price * i.quantity, 0)
      : 0;

  if (loading) return <Layout>로딩 중…</Layout>;
  if (error)   return <Layout>{error}</Layout>;

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
            <div className="w-full space-y py-8">
              {/* 헤더 */}
              <div className="grid grid-cols-5 border-b border-[#757575] py-3 font-semibold">
                <div className="col-span-2">Item</div>
                <div>Size</div>
                <div>QTY</div>
                <div>Price</div>
              </div>

              {/* 리스트 */}
              <div className="divide-y">
                {cartPage?.content.map(item => (
                    <div
                        key={item.id}
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
                    <input type="checkbox" id="coupon" className="w-4 h-4" />
                    <label htmlFor="coupon" className="text-sm">
                      I have a coupon code
                    </label>
                  </div>
                  <button className="bg-black text-white px-6 py-2 text-sm font-semibold mt-4 sm:mt-6">
                    Checkout
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

import React from 'react'
import Layout from '../common/Layout'
import { Link } from 'react-router-dom'

const ShoppingCart = () => {
    const cartItems = [
        {
            id: 1,
            name: 'Product Name 1',
            sku: '12341',
            image: '/img/shose1.png',
            color: 'Red',
            colorClass: 'bg-red-500',
            size: 270,
            price: '70,000',
        },
        {
            id: 2,
            name: 'Product Name 2',
            sku: '12342',
            image: '/img/shose2.png',
            color: 'Black',
            colorClass: 'bg-black',
            size: 290,
            price: '85,000',
        },
    ]

    return (
        <Layout>
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-sm text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
                    {/* 왼쪽: 타이틀/브레드크럼 */}
                    <div>
                        <div className="text-xs text-gray-400 mb-2">
                            Home &gt; Men &gt; Shoe &gt; <span className="text-black">Shopping Cart</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
                        <Link to='/man'>
                            <div className="text-black underline text-sm">← Continue shopping</div>
                        </Link>
                    </div>

                    {/* 오른쪽: 테이블 + 리스트 + 합계 */}
                    <div className="space-y-1">
                        {/* 테이블 헤더 */}
                        <div className="grid grid-cols-6 border-b border-[#757575] py-3 font-semibold">
                            <div className="col-span-2">Item</div>
                            <div>Color</div>
                            <div>Size</div>
                            <div>QTY</div>
                            <div>Price</div>
                        </div>

                        {/* 카트 아이템 리스트 */}
                        <div className="divide-y">
                            {cartItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-6 py-4 items-center">
                                    <div className="col-span-2 flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-gray-100" />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">Sku: {item.sku}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-4 h-4 ${item.colorClass} rounded-sm`} />
                                        <span>{item.color}</span>
                                    </div>
                                    <div>{item.size}</div>
                                    <div>
                                        <select className="border border-gray-300 px-2 py-1">
                                            <option>1</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>₩{item.price}</span>
                                        <button className="ml-4 text-sm text-gray-500">Delete ×</button>
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
                                <span>₩250</span>
                            </div>
                            <div className="flex justify-between font-bold text-base border-b border-gray-300 py-3">
                                <span>Cart total:</span>
                                <span>₩250</span>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                {/* 체크박스 */}
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="coupon" className="w-4 h-4" />
                                    <label htmlFor="coupon" className="text-sm">I have a coupon code</label>
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
    )
}

export default ShoppingCart
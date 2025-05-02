import React from 'react';
import Layout from '../common/Layout';

const MyAccount = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-sm text-gray-800">
                <div className="flex justify-between gap-12 items-start">
                    {/* Title + Logout (Left) */}
                    <div className="w-[260px]">
                        <h1 className="text-stone-800 font-bold text-[28px] font-[Montserrat] leading-[40px] mb-1">My account</h1>
                        <button className="text-sm font-semibold text-black underline">← Log Out</button>
                    </div>

                    {/* Info Section (Right) */}
                    <div className="flex-1">
                        <p className='text-stone-800 text-[16px] leading-[40px] font-bold font-[Montserrat]'>Hello, User name</p>
                        <hr className='border-gray-300' />

                        <div className="pt-6 space-y-6">
                            {/* User Info */}
                            <div className="flex justify-between flex-wrap items-center">
                                <div>
                                    <p className="font-bold">Email</p>
                                    <p className="text-gray-500">username@email.com</p>
                                </div>
                                <button className="text-sm underline font-semibold text-gray-600">Change password</button>
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-bold">Billing address</p>
                                    <p className="text-gray-500">151 Mill St, Eunice, LA, 70535</p>
                                </div>
                                <div>
                                    <p className="font-bold">Shipping address</p>
                                    <p className="text-gray-500">151 Mill St, Eunice, LA, 70535</p>
                                </div>
                            </div>

                            {/* Orders */}
                            <div className="mt-10">
                                <p className="font-bold mb-4">Your recent orders #</p>

                                {/* Table Header */}
                                <div className="grid grid-cols-6 border-b border-gray-300 py-3 font-semibold">
                                    <div className="col-span-2">Item</div>
                                    <div>Color</div>
                                    <div>Size</div>
                                    <div>QTY</div>
                                    <div>Price</div>
                                </div>

                                {/* Order Item */}
                                <div className="grid grid-cols-6 py-4 items-center">
                                    <div className="col-span-2 flex items-center gap-4">
                                        <img src="/img/shose1.png" alt="Product" className="w-16 h-16 object-cover bg-gray-100" />
                                        <div>
                                            <p className="font-medium">Everyday carry blue bottle YOLO neutra, tousled four loko</p>
                                            <p className="text-xs text-gray-500">Sku: 12345</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-sm" />
                                        <span>Red</span>
                                    </div>
                                    <div>270</div>
                                    <div>
                                        <select className="border border-gray-300 px-2 py-1">
                                            <option>1</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>₩70,000</span>
                                        <button className="ml-4 text-sm text-gray-500">Delete ×</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MyAccount;
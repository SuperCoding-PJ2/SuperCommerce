import React from 'react';
import Layout from '../common/Layout';

const MyAccount = () => {
  return (
    <Layout>
      <section className="px-4 text-sm text-[#212121]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          {/* Title + Logout (Left) */}
          <div className="w-[260px]">
            <h1 className="text-[#212121] font-bold text-[28px] font-[Montserrat] leading-[40px] mb-1">My account</h1>
            <button className="text-sm font-semibold text-[#212121]">← Log Out</button>
          </div>

          {/* Info Section (Right) */}
          <div className="w-full space-y py-8">
            <p className='text-[#212121] text-[16px] leading-[40px] font-bold font-[Montserrat]'>Hello, User name</p>
            <hr className='border-gray-300'/>

            <div className="pt-6 space-y-6">
              {/* User Info */}
              <div className="space-y-6">
                <div className="flex justify-start items-center">
                  <div className="w-80">
                    <p className="font-bold text-[#212121]">Email</p>
                    <p className="text-[#757575]">username@email.com</p>
                  </div>
                  <div className="w-80">
                    <button className="text-sm underline font-semibold text-[#757575]">Change password</button>
                  </div>
                </div>
                <hr className='border-gray-300'/>
              </div>

              {/* Address */}
              <div className="space-y-12">
                <div className="flex justify-start items-center">
                  <div className="w-80">
                    <p className="font-bold text-[#212121]">Billing address</p>
                    <p className="text-[#757575]">151 Mill St, Eunice, LA, 70535</p>
                  </div>
                  <div className="w-80">
                    <p className="font-bold">Shipping address</p>
                    <p className="text-[#757575]">151 Mill St, Eunice, LA, 70535</p>
                  </div>
                </div>
                <hr className='border-gray-300 mt-6'/>
              </div>

              {/* Orders */}
              <div className="">
                <p className="font-bold mb-4">Your recent orders #</p>
                <div className="grid grid-cols-6 font-semibold">
                  <div className="col-span-2">Item</div>
                  <div>Color</div>
                  <div>Size</div>
                  <div>QTY</div>
                  <div>Price</div>
                </div>

                <div className="grid grid-cols-6 py-4 items-center">
                  <div className="col-span-2 flex items-center gap-4">
                    <img src="/img/shose1.png" alt="Product" className="w-20 h-20 object-cover bg-gray-100" />
                    <div className="flex flex-col items-start gap-2 max-w-[220px]">
                      <p className="font-bold text-[#232323]">Everyday carry blue bottle YOLO neutra, tousled four loko</p>
                      <p className="text-xs text-[#757575]">Sku: 12345</p>
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
      </section>
    </Layout>
  );
};

export default MyAccount;
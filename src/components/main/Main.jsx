import React from "react";
// import colors from "tailwindcss/lib/public/colors";
import ProductSlot from "./ProductSlot";

const Main = () => {
  const productList = [
    {
      image: 'shose1.png',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '154',
      badge: '-30%',
      badgeColor: 'red',
    },
    {
      image: 'bag1.png',
      name: 'Thundercats pickled hell of copper mug fashion axel',
      price: '265',
      badge: '',
      badgeColor: '',
    },
    {
      image: 'bag2.png',
      name: 'Vape lomo occupy viral austin',
      price: '26,40',
      badge: 'Free shipping',
      badgeColor: 'black',
    },
    {
      image: 'shose4.png',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '154',
      badge: '-30%',
      badgeColor: 'red',
    },
    {
      image: 'shose3.png',
      name: 'Thundercats pickled hell of copper mug fashion axel',
      price: '265',
      badge: '',
      badgeColor: '',
    },
    {
      image: 'shose2.png',
      name: 'Vape lomo occupy viral austin',
      price: '26,40',
      badge: 'Free shipping',
      badgeColor: 'black',
    },
    // ... more products
  ];

  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <img
          src="/img/hero.png"
          alt="Model"
          className="w-full absolute top-0 left-1/2 -translate-x-1/2  object-cover z-0"
        />
      </div>

      {/* Product Feature Section */}
      <section className="max-w-7xl mx-24">
        <div className="flex flex-col md:flex-row gap-40 justify-center items-start">
          {/* 이미지 박스 – 고정 폭 */}
          <div className="w-[320px] flex-shrink-0 mt-[-110px] z-10">
            <img
              src="img/mainSide.png"
              alt="mainSide"
              className="object-contain"
            />
          </div>

          {/* 텍스트 박스 – 최대폭 제한 */}
          <div className="max-w-xl space-y-10 mt-[70px]">
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-800">
              <ul className="list-disc list-inside space-y-1">
                <li>Part of our responsible edit</li>
                <li>Waterproof up to 10,000mm</li>
                <li>10,000gm breathable</li>
                <li>Signature printed lining</li>
                <li>Two internal pockets</li>
                <li>Adjustable hood</li>
              </ul>
              <ul className="list-disc list-inside space-y-1">
                <li>Funnel neck</li>
                <li>Storm placket</li>
                <li>Long sleeves</li>
                <li>Adjustable wrist cuffs with built-in</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
              <p>
                A woman has the age she deserves. Luxury will be always around, no
                matter what happens in the world. I've always thought of the T-shirt
                as the Alpha and Omega of the fashion alphabet. It links everything
                in between. I didn’t have a place to escape to. I am like a freight
                train. Working on the details, visiting them and playing with them
                over the years, but always staying on the same track.
              </p>
              <p>
                The Parisian heart dictates for plenty of light fabrics - loose
                linens and cool-coloured stonewash denim - and note the combination
                of high and low as sharp tailoring is teamed with light shirts and
                casual Tees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 md:px-16 py-20 ">
          {productList.map((product, i) => (
            <ProductSlot key={i} {...product} />
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="relative overflow-hidden">
        <img
          src="/img/ad.png"
          alt="Model"
          className="w-full object-cover"
        />

        {/* 오버레이 박스 */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 px-6 py-4 text-center">
          <h2 className="text-4xl font-bold text-[#2E2E2E]">70% off</h2>
          <div className="border border-[#2E2E2E] text-[#2E2E2E] px-4 py-1 text-sm font-semibold">
            Shop now
          </div>
        </div>
      </div>

    </div>
  )
};

export default Main;

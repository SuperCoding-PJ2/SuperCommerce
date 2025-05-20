// src/components/ProductSlot.jsx
import React from 'react';

const ProductSlot = ({ id, imageUrl, name, price, badge, badgeColor = 'black' }) => {
  // API에서 받은 이미지가 없으면 기본 이미지 사용
  const displayImage = imageUrl || "/img/default-product.png";

  return (
    <div className="bg-white rounded-lg text-left relative">
      {badge && (
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
            badgeColor === 'red'
              ? 'text-red-600 font-bold'
              : 'text-neutral-800 font-bold'
          }`}
        >
          {badge}
        </span>
      )}
      <img src={displayImage} alt={name} className="w-full h-48 object-cover"/>
      <div className="p-3">
        <p className="mt-2 text-sm font-semibold line-clamp-2 h-10">
          {name}
        </p>
        <p className="text-sm text-gray-700">{price?.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default ProductSlot;
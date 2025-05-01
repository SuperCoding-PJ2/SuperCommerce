import React from 'react';

const ProductSlot = ({key, image, name, price, badge, badgeColor = 'black'}) => {

  let imageUrl = "/img/" + image;

  return (
    <div className="bg-white  rounded-lg text-left relative">
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
      <img src={imageUrl} alt={name} className=""/>
      <p className="mt-2 text-sm font-semibold">
        {name}
      </p>
      <p className="text-sm text-gray-700">${price}</p>
    </div>
  );
};

export default ProductSlot;
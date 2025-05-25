// src/components/Main.jsx
import React, {useState, useEffect} from "react";
import ProductSlot from "./ProductSlot";
import {getProducts} from "../../services/productService";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // 상품 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({page, size: 6});
        setProducts(response.content);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (err) {
        setError('상품 데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(err);
      }
    };

    fetchProducts();
  }, [page]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // 기존 하드코딩된 상품 리스트
  const staticProductList = [
    {
      image: 'shose1.png',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '154',
      badge: '-30%',
      badgeColor: 'red',
    },
    // ... 기타 하드코딩된 상품들
  ];

  // 데이터 로딩 중인 경우 로딩 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>상품을 불러오는 중입니다...</p>
      </div>
    );
  }

  // 오류 발생 시 오류 메시지 표시
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="relative before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[calc(100vh-22px)] before:w-[7px] before:h-[22px] before:bg-white before:z-10 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[100vh] after:w-[7px] after:h-[22px] after:bg-black">
      <div className="relative h-screen overflow-hidden">
        <img
          src="/img/hero.png"
          alt="Model"
          className="w-full absolute top-0 left-1/2 -translate-x-1/2 object-cover z-0"
        />
      </div>

      {/* Product Feature Section */}
      <section className="relative max-w-7xl mx-24">
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
                in between.
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

      {/* Products Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">최신 상품</h2>

          {/* API에서 불러온 상품 목록 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductSlot
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                badge={product.stock <= 0 ? '매진' : ''}
                badgeColor={product.stock < 10 ? 'red' : ''}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
              >
                이전
              </button>

              {[...Array(totalPages).keys()].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`mx-1 px-3 py-1 border rounded ${
                    pageNum === page ? 'bg-black text-white' : ''
                  }`}
                >
                  {pageNum + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
                className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Main;
import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const [productName, setProductName] = useState(null);

  const pathnames = location.pathname.split('/').filter(Boolean);

  useEffect(() => {
    // 상품 상세 페이지일 때만 fetch
    if (pathnames[0] === 'detail' && pathnames[1]) {
      const productId = pathnames[1];

      fetch('/data/items.json')
        .then((res) => res.json())
        .then((items) => {
          const matched = items.find(item => String(item.id) === productId);
          if (matched) {
            setProductName(matched.text);
          } else {
            setProductName(null);
          }
        })
        .catch((err) => {
          console.error('상품 데이터 로드 실패:', err);
          setProductName(null);
        });
    } else {
      setProductName(null);
    }
  }, [location.pathname, pathnames]);

  return (
    <nav className='border-b p-4 text-gray-400 text-sm flex gap-2'>
      <Link to="/">Home</Link>
      <span> &gt; </span>
      {/* /detail/:id 라면 "Man" 고정으로 표시 */}
      {location.pathname.startsWith('/detail/') && productName ? (
        <>
          <Link to="/man">Man</Link>
          <span> &gt; </span>
          <span className="text-gray-400">{productName}</span>
        </>
      ) : (
      pathnames.map((segment, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        const isProductDetail = pathnames[0] === 'detail' && index === 1 && productName;

        // 상품 상세 페이지면 이름 치환
        const nameToShow = isProductDetail
        ? productName // 상품 상세일 경우 이름 치환
        : segment.charAt(0).toUpperCase() + segment.slice(1); // 일반 경로는 첫 글자 대문자

        return (
          <span key={routeTo}>
            {' > '}
            {isLast ? (
              <span className="text-gray-400">{nameToShow}</span>
            ) : (
              <Link to={routeTo}>
                {nameToShow}
              </Link>
            )}
          </span>
        );
      }))}
    </nav>
  )
}

export default Breadcrumb

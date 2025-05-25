import React, {useState, useEffect} from 'react';
import Layout from '../common/Layout';
import 'swiper/css';
import 'swiper/css/navigation';
import {getProducts, getSortedProducts} from '../../services/productService';
import ProductSlot from '../main/ProductSlot';

const List = () => {
  const [items, setItems] = useState([]);
  const [selectedSort, setSelectedSort] = useState('createdAt,desc');
  const [pageInfo, setPageInfo] = useState({page: 0, size: 20, totalPages: 1});
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // 정렬 옵션 정의
  const sortOptions = [
    {value: 'createdAt,desc', label: '최신순'},
    {value: 'price,desc', label: '가격 높은순'},
    {value: 'price,asc', label: '가격 낮은순'},
    {value: 'name,asc', label: '이름 오름차순'},
    {value: 'name,desc', label: '이름 내림차순'},
  ];

  const fetchList = async () => {
    setLoading(true);
    try {
      // 정렬 방식 처리
      let sortBy = 'createdAt';
      let direction = 'desc';

      if (selectedSort) {
        const [sort, dir] = selectedSort.split(',');
        sortBy = sort;
        direction = dir || 'desc';
      }

      // 인기순, 조회수, 구매수 정렬은 /sorted 엔드포인트 사용
      const isSpecialSort = ['popularityScore', 'viewCount', 'purchaseCount'].includes(sortBy);

      const data = isSpecialSort
        ? await getSortedProducts({
          page: pageInfo.page,
          size: pageInfo.size,
          sortBy,
          direction,
          keyword,
          categoryId
        })
        : await getProducts({
          page: pageInfo.page,
          size: pageInfo.size,
          sortBy,
          direction,
          keyword,
          categoryId
        });

      setItems(data.content);
      setPageInfo({
        page: data.number,
        size: data.size,
        totalPages: data.totalPages
      });
    } catch (error) {
      console.error('상품 목록 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [selectedSort, pageInfo.page, keyword, categoryId]);

  const handleChange = e => {
    setSelectedSort(e.target.value);
    // 정렬 방식 변경 시 첫 페이지로 이동
    setPageInfo(prev => ({...prev, page: 0}));
  };

  // 4개씩 묶어서 row 레이아웃 구성
  const chunked = [];
  for (let i = 0; i < items.length; i += 4) {
    chunked.push(items.slice(i, i + 4));
  }

  // API 응답 데이터를 ProductSlot 컴포넌트에 맞게 매핑
  const mapItemToProductSlot = (item) => {
    return {
      id: item.id,
      name: item.name || '',
      price: item.price || 0,
      imageUrl: item.imageUrl || '/img/default-product.png',
      badge: item.isNew ? 'NEW' : (item.discount ? 'SALE' : null),
      badgeColor: item.discount ? 'red' : 'black',
      viewCount: item.viewCount,
      purchaseCount: item.purchaseCount,
      popularityScore: item.popularityScore
    };
  };

  return (
    <Layout>
      <div className='flex items-center justify-between mb-4 px-4'>
        <div className='flex items-center'>
          <div className='mr-4'>
            <span className='text-gray-500'>view </span>
            <span className='text-gray-500'>{pageInfo.page + 1}</span>
            <span className='text-gray-500'> | </span>
            <span className='font-bold'>{pageInfo.totalPages}</span>
          </div>
          <div className='w-[193px]'>
            <select
              value={selectedSort}
              onChange={handleChange}
              className="block w-full px-3 py-2 border-t border-b border-gray-300"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">상품을 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className='flex flex-wrap w-full'>
            {chunked.map((chunk, row) =>
              (<React.Fragment key={row}>
                {chunk.map(item => (
                  <div key={item.id} className="w-1/4 p-2">
                    <ProductSlot {...mapItemToProductSlot(item)} />
                  </div>
                ))}
              </React.Fragment>)
            )}
          </div>

          {items.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">상품이 없습니다.</p>
            </div>
          )}

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPageInfo(prev => ({...prev, page: Math.max(0, prev.page - 1)}))}
              disabled={pageInfo.page === 0}
              className="px-4 py-2 mr-2 bg-gray-200 disabled:opacity-50"
            >
              이전
            </button>
            <div className="flex items-center">
              {[...Array(Math.min(5, pageInfo.totalPages))].map((_, idx) => {
                const pageNumber = pageInfo.page < 3
                  ? idx
                  : pageInfo.page - 2 + idx;

                if (pageNumber >= pageInfo.totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPageInfo(prev => ({...prev, page: pageNumber}))}
                    className={`w-8 h-8 mx-1 ${pageInfo.page === pageNumber ? 'bg-black text-white' : 'bg-gray-200'}`}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPageInfo(prev => ({...prev, page: Math.min(prev.totalPages - 1, prev.page + 1)}))}
              disabled={pageInfo.page >= pageInfo.totalPages - 1}
              className="px-4 py-2 ml-2 bg-gray-200 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default List;
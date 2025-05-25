import axios from 'axios';

// API 기본 설정
const API = axios.create({
    baseURL: 'http://52.79.184.1:8080/api/v1/cart',
});

// 요청 인터셉터에 토큰 추가
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터로 에러 처리
API.interceptors.response.use(
  response => response,
  error => {
      // 401 에러 (인증 만료) 처리
      if (error.response && error.response.status === 401) {
          // 로그인 페이지로 리다이렉트 또는 토큰 갱신 로직
          localStorage.removeItem('token');
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);

// 장바구니 전체 조회 (Pageable)
export const fetchCartItems = async ({ page = 0, size = 10, sort = [] }) => {
    const res = await API.get('/items', {
        params: {
            page,
            size,
            sort,    // e.g. ['price,desc']
        },
    });
    return res.data; // { content: CartItemResponseDto[], totalElements, ... }
};

// 장바구니 항목 추가
export const addCartItem = async ({ productId, quantity, price, size }) => {
    const payload = { productId, quantity, price, size };
    console.log('장바구니 추가 요청 데이터:', payload);
    const res = await API.post('/items', payload);
    return res.data;
};

// 장바구니 항목 수량 수정
export const updateCartItem = async ({ itemId, quantity }) => {
    const res = await API.put(`/items/${itemId}`, null, {
        params: { quantity },
    });
    return res.data;
};

// 장바구니 항목 삭제
export const deleteCartItem = async ({ itemId }) => {
    const res = await API.delete(`/items/${itemId}`);
    return res.data;
};

// 장바구니 결제 처리 추가
export const checkout = async ({ shippingAddress }) => {
    const res = await API.post('/checkout', null, {
        params: { shippingAddress }
    });
    return res.data;
};

// 장바구니 아이템 개수 확인 (헤더 표시용)
export const getCartItemCount = async () => {
    try {
        const result = await fetchCartItems({ page: 0, size: 1 });
        return result.totalElements || 0;
    } catch (error) {
        console.error('장바구니 개수 조회 실패:', error);
        return 0;
    }
};
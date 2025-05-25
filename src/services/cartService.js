import axios from 'axios';

const API = axios.create({
    baseURL: 'http://52.79.184.1:8080/api/v1/cart/items',
});

// 장바구니 전체 조회 (Pageable)
export const fetchCartItems = async ({ page = 0, size = 10, sort = [] }) => {
    const res = await API.get('', {
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
    const res = await API.post('', payload);
    return res.data;
};

// 장바구니 항목 수량 수정
export const updateCartItem = async ({ itemId, quantity }) => {
    const res = await API.put(`/${itemId}`, null, {
        params: { quantity },
    });
    return res.data;
};

// 장바구니 항목 삭제
export const deleteCartItem = async ({ itemId }) => {
    const res = await API.delete(`/${itemId}`);
    return res.data;
};

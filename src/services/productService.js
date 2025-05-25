import axios from 'axios';

const API_URL = 'http://52.79.184.1:8080/api/v1';

// 기존 제품 조회 API
export const getProducts = async (params = {}) => {
  const response = await axios.get(`${API_URL}/products`, {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sortBy: params.sortBy ?? 'createdAt',
      direction: params.direction ?? 'desc',
      keyword: params.keyword ?? '',
      categoryId: params.categoryId ?? ''
    }
  });
  return response.data; // { content: [...], totalPages, totalElements, ... }
};

// 정렬된 제품 조회 API 추가
export const getSortedProducts = async (params = {}) => {
  const response = await axios.get(`${API_URL}/products/sorted`, {
    params: {
      page: params.page ?? 0,
      size: params.size ?? 10,
      sortBy: params.sortBy ?? 'createdAt',
      direction: params.direction ?? 'desc',
      keyword: params.keyword ?? '',
      categoryId: params.categoryId ?? ''
    }
  });
  return response.data; // { content: [...], totalPages, totalElements, ... }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data; // { id, text, price, image, ... }
};
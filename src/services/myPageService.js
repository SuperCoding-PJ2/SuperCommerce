import axios from 'axios';

// 인증 토큰을 가져오는 함수 (로컬 스토리지 또는 쿠키에서)
const getToken = () => {
    return localStorage.getItem('accessToken'); // 또는 쿠키에서 가져오기
};

const API = axios.create({
    baseURL: 'http://52.79.184.1:8080/api/v1/mypage',
});

// 모든 요청에 인증 헤더 추가
API.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('요청 헤더:', config.headers);
    return config;
});

// 내 정보 조회
export const fetchMyPage = async () => {
    const res = await API.get('');
    return res.data;
};

// 내 정보 수정 (multipart/form-data)
export const updateMyPage = async ({ email, shippingAddress, profileImageFile }) => {
    const formData = new FormData();
    formData.append('dto', new Blob([JSON.stringify({ email, shippingAddress })], {
        type: 'application/json'
    }));
    if (profileImageFile) {
        formData.append('image', profileImageFile);
    }

    const res = await API.put('', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
};
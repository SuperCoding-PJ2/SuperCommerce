import axios from 'axios';

const API = axios.create({
    baseURL: 'http://52.79.184.1:8080/api/v1/mypage',
});

// 내 정보 조회
export const fetchMyPage = async () => {
    const res = await API.get('');
    return res.data;
    /* {
        email: string,
        shippingAddress: string,
        recentOrderDto: {
          productName: string,
          imageUrl: string,
          color: string,
          quantity: number,
          price: number
        }
      }
    */
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

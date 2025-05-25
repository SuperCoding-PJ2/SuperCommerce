/* src/services/authService.js */
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://52.79.184.1:8080/api/v1/auth',
});

export const signup = async ({ email, password, phone, address, gender }) => {
  const res = await API.post('/signup', { email, password, phone, address, gender });
  return res.data;
};

// 프로필 이미지 업데이트 함수 추가
export const updateProfileImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('profile', imageFile);

  const res = await API.post('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const login = async ({email, password}) => {
  const res = await API.post('/login', {email, password});
  return res.data.token;
};

export const logout = async () => {
  await API.post('/logout');
};

// 사용자 프로필 정보 가져오기
export const getUserProfile = async () => {
  const res = await API.get('/profile');
  return res.data;
};

// 사용자 프로필 업데이트
export const updateUserProfile = async (userData) => {
  // FormData 객체인 경우
  if (userData instanceof FormData) {
    const res = await API.put('/profile', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  }
  // JSON 객체인 경우
  else {
    const res = await API.put('/profile', userData);
    return res.data;
  }
};
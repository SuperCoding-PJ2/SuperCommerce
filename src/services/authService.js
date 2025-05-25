/* src/services/authService.js */
import axios from 'axios';

// 백엔드 서버 URL 설정
const API_BASE_URL = 'http://52.79.184.1:8080';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/auth`,
});

export const signup = async (userData) => {
  try {
    console.log('signup', userData);
    // API 인스턴스 사용하여 요청
    const response = await API.post('/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
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
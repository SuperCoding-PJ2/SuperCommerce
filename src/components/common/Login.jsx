import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import Layout from './Layout';

// 백엔드 OAuth2 인가 엔드포인트
const API_BASE_URL = 'http://localhost:8080';//'http://52.79.184.1:8080';

const Login = () => {
  const [form, setForm] = useState({email: '', password: ''});
  const {login, loading} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e =>
    setForm(prev => ({...prev, [e.target.name]: e.target.value}));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      await login(form);
      navigate('/', {replace: true});
    } catch {
      setError('로그인에 실패했습니다.');
    }
  };

  // OAuth2 로그인을 위해 백엔드 인가 URL로 이동
  const handleOAuthLogin = provider => {
    const url = `${API_BASE_URL}/api/v1/oauth/authorization/${provider}`;
    console.log(url);
    window.location.href = `${API_BASE_URL}/api/v1/oauth/authorization/${provider}`;
  };

  return (
    <Layout>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Email*</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="border-2 p-2"
        />

        <label>Password*</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="border-2 p-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-black text-white"
        >
          {loading ? '로딩중…' : 'Login'}
        </button>
      </form>

      <div className="flex gap-4 mt-6">
        <button onClick={() => handleOAuthLogin('google')} className="px-4 py-2 border rounded">
          Google
        </button>
        <button onClick={() => handleOAuthLogin('naver')} className="px-4 py-2 border rounded">
          Naver
        </button>
        <button onClick={() => handleOAuthLogin('kakao')} className="px-4 py-2 border rounded">
          Kakao
        </button>
      </div>

      <Link to="/signup" className="mt-4 block">
        회원가입
      </Link>
    </Layout>
  );
};

export default Login;

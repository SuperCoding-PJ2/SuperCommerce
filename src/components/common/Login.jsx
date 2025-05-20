import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Layout from './Layout';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError('로그인에 실패했습니다.');
    }
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
          className="border-2 border-gray-300 p-2"
        />
        <label>Password*</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="border-2 border-gray-300 p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-black text-white"
        >
          {loading ? '로딩중...' : 'Login'}
        </button>
      </form>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => window.location.href = '/api/v1/oauth/authorization/google'}
        >Google로 로그인</button>
        <button
          onClick={() => window.location.href = '/api/v1/oauth/authorization/naver'}
        >Naver로 로그인</button>
        <button
          onClick={() => window.location.href = '/api/v1/oauth/authorization/kakao'}
        >Kakao로 로그인</button>
      </div>
      <Link to="/signup" className="mt-4 block">회원가입</Link>
    </Layout>
  );
};

export default Login;
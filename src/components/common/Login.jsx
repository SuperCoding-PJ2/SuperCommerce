import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useNavigate, Link} from 'react-router-dom';
import Layout from './Layout';

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

  // ✅ 소셜 로그인 통합 핸들러
  const handleOAuthLogin = provider => {
    const redirectUri = encodeURIComponent('https://52.79.184.1:8080/oauth/callback');
    //const redirectUri = encodeURIComponent('http://localhost:3000/oauth/callback');

    const state = provider;

    let clientId = '';
    let authUrl = '';
    let scope = '';
    let responseType = 'code';

    switch (provider) {
      case 'google':
        clientId = '702468159172-7c2h4u640p0jff9ems5ppmq0c3svrmfm.apps.googleusercontent.com';
        authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        scope = 'openid profile email';
        break;
      case 'naver':
        clientId = 'ZocBT93vkZ7sd98R88Mp';
        authUrl = 'https://nid.naver.com/oauth2.0/authorize';
        scope = 'name email';
        break;
      case 'kakao':
        clientId = '8957405e7da43015486f4077e1f30259';
        authUrl = 'https://kauth.kakao.com/oauth/authorize';
        scope = 'profile account_email';
        break;
      default:
        return;
    }

    // ✅ 각 플랫폼별 인증 요청 URL 구성
    const oauthUrl = `${authUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;

    window.location.href = oauthUrl;
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

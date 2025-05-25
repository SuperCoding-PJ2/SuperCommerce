// src/pages/OAuth2RedirectHandler.jsx
import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OAuth2RedirectHandler = () => {
  const { oauthLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const code = params.get('code');
    const state = params.get('state'); // 필요시
    const provider = params.get('provider'); // 백엔드가 붙여준다 가정

    if (!code || !provider) {
      setError('Invalid OAuth callback');
      return;
    }

    oauthLogin({ provider, code })
      .then(() => navigate('/'))
      .catch(() => {
        setError('소셜 로그인에 실패했습니다.');
      });
  }, [loc.search, oauthLogin, navigate]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return <div className="p-4">로그인 처리 중입니다…</div>;
};

export default OAuth2RedirectHandler;

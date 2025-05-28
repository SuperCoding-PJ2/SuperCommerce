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
    // URL 경로에서 provider 추출 (예: /oauth2/callback/google)
    const pathParts = loc.pathname.split('/');
    const provider = pathParts[pathParts.length - 1];

    if (!code || !provider) {
      setError('유효하지 않은 OAuth 콜백입니다.');
      return;
    }

    oauthLogin({ provider, code })
      .then(() => navigate('/'))
      .catch(() => {
        setError('소셜 로그인에 실패했습니다.');
      });
  }, [loc, oauthLogin, navigate]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return <div className="p-4">로그인 처리 중입니다…</div>;
};

export default OAuth2RedirectHandler;

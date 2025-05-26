// App.js 수정
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {useContext} from 'react';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/main/Main';
import About from './components/sub/About';
import List from './components/sub/List';
import Login from './components/common/Login';
import SignUp from './components/common/SignUp';
import ShoppingCart from './components/sub/ShoppingCart';
import Detail from './components/sub/Detail';
import MyAccount from "./components/sub/MyAccount";
import OAuth2RedirectHandler from "./handler/OAuth2RedirectHandler";
import {AuthProvider, AuthContext} from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import {ToastContainer} from "react-toastify";

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { initialized, token } = useContext(AuthContext);

  if (!initialized) return null;

  return (
    <div className="App">
      <Header type={isHome ? 'main' : 'sub'} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/man" element={<List />} />

        {/* ✅ 로그인 상태면 /myaccount로 리디렉트, 아니면 로그인 컴포넌트 */}
        <Route
          path="/login"
          element={token ? <Navigate to="/myaccount" replace /> : <Login />}
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        {/* 보호된 장바구니 */}
        <Route
          path="/shoppingcart"
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />

        <Route path="/detail/:id" element={<Detail />} />

        {/* 보호된 페이지 */}
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

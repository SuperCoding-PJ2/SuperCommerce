import { Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/man' element={<List />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/shoppingcart' element={<ShoppingCart />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/myaccount' element={<MyAccount />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;

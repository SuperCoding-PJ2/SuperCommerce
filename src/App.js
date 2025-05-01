import { Route, Routes } from 'react-router-dom';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/main/Main';
import About from './components/sub/About';
import List from './components/sub/List';
import Login from './components/common/Login';

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/man' element={<List />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;

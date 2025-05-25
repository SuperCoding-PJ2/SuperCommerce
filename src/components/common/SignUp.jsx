import React, {useState, useRef, useContext} from 'react';
import {AuthContext, AuthProvider} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Layout from './Layout';

const SignupContent = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone: '',
    zipcode: '',
    address1: '',
    address2: '',
    gender: ''
  });
  const {signup, loading} = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    // 주소 합치기
    const fullAddress = `${form.zipcode} ${form.address1} ${form.address2}`;

    try {
      await signup({
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: fullAddress,
        gender: form.gender
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <Layout>
      <h1 className='text-stone-800 font-bold text-[28px]'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex gap-12 mt-6'>
        <div className='flex flex-col gap-4 w-[490px]'>
          <label>Email *</label>
          <input name='email' type='email' value={form.email} onChange={handleChange} required className='border p-2'/>

          <label>Password *</label>
          <input name='password' type='password' value={form.password} onChange={handleChange} required
                 className='border p-2'/>

          <label>Phone *</label>
          <input name='phone' type='text' value={form.phone} onChange={handleChange} required className='border p-2'/>

          <label>Zip code *</label>
          <input name='zipcode' type='text' value={form.zipcode} onChange={handleChange} required
                 className='border p-2'/>

          <label>Address *</label>
          <input name='address1' type='text' placeholder='Address line 1' value={form.address1} onChange={handleChange}
                 required className='border p-2'/>
          <input name='address2' type='text' placeholder='Address line 2' value={form.address2} onChange={handleChange}
                 className='border p-2'/>

          <label>Gender *</label>
          <select name='gender' value={form.gender} onChange={handleChange} required className='border p-2'>
            <option value=''>선택하세요</option>
            <option value='male'>남성</option>
            <option value='female'>여성</option>
          </select>

          {error && <p className='text-red-500'>{error}</p>}

          <button type='submit' disabled={loading} className='w-full h-12 bg-black text-white mt-4'>
            {loading ? '로딩중...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default function Signup() {
  return (
    <AuthProvider>
      <SignupContent/>
    </AuthProvider>
  );
}

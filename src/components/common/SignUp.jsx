import React, {useState, useRef, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Layout from '../Layout';

const Signup = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
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

  const handleImageChange = e => {
    const img = e.target.files[0];
    if (img) {
      setFile(img);
      setImageUrl(URL.createObjectURL(img));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('phone', form.phone);
      formData.append('zipcode', form.zipcode);
      formData.append('address', `${form.address1} ${form.address2}`);
      formData.append('gender', form.gender);
      if (file) formData.append('profile', file);

      await signup(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <Layout>
      <h1 className='text-stone-800 font-bold text-[28px]'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex gap-12 mt-6'>
        <div>
          <label className='block text-neutral-500'>Profile *</label>
          <input type='file' accept='image/*' ref={fileInputRef} onChange={handleImageChange} className='hidden'/>
          <div onClick={handleClick} className='w-40 h-40 rounded-full bg-gray-300 overflow-hidden cursor-pointer'>
            <img src={imageUrl || `${process.env.PUBLIC_URL}/img/profile.svg`} alt='Profile'
                 className='w-full h-full object-cover'/>
          </div>
        </div>

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

export default Signup;

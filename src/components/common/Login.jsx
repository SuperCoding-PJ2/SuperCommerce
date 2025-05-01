import Layout from './Layout'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Layout>
      <div className="flex justify-between mb-[193px]">
        <h1 className='text-stone-800 font-bold text-[28px] font-[Montserrat]'>Login</h1>
        <div className='w-[1222px]'>
          <p className='text-stone-800 text-[16px] leading-[40px] font-bold font-[Montserrat] pt-[5px]'>Sign in to your account</p>
          <hr className='text-grey-600'></hr>
          <div className='pt-[11px] flex gap-4 items-end justify-between'>
            <div className='flex gap-2'>
              <div>
                <label className='text-neutral-500 text-[14px] block'>Email<span className='text-orange-600'>*</span></label>
                <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
              </div>
              <div>
                <label className='text-neutral-500 text-[14px] block'>Password<span className='text-orange-600'>*</span></label>
                <input type="text" className='border-2 border-solid border-grey-600 w-[490px] h-[46px] float-none'/>
              </div>
            </div>
            <div>
              <button className='w-[208px] h-[46px] bg-black text-stone-50 block'>Login</button>
            </div>
          </div>
          <div className='flex gap-4 justify-between mt-[20px]'>
            <div className='flex gap-2'>
              <button style={{background: `url(${process.env.PUBLIC_URL}/img/user_w.svg) no-repeat left 15px center #33691E` }} className='w-[200px] h-[46px] text-white pl-[55px] text-left'>Google로 로그인</button>
              <button style={{background: `url(${process.env.PUBLIC_URL}/img/user.svg) no-repeat left 15px center #05C75A`}} className='w-[200px] h-[46px] pl-[55px] text-left'>Naver로 로그인</button>
              <button style={{background: `url(${process.env.PUBLIC_URL}/img/user.svg) no-repeat left 15px center #FAE100`}} className='w-[200px] h-[46px] pl-[55px] text-left'>Kakao로 로그인</button>
            </div>
            <Link to='/signup'>
              <button className='border-y border-black w-[208px] h-[46px]'>회원가입</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login

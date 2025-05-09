import Lottie from 'lottie-react';
import loadingAnimation from '../../data/pentagons.json';


const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-132px)]'>
      <Lottie animationData={loadingAnimation} loop={true} className="w-96 h-96"/>
    </div>
  )
}

export default Loading

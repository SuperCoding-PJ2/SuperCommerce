import React from 'react'
import Layout from '../common/Layout'

const About = () => {
  return (
    <Layout>
      <div className='w-[1110px] mx-auto my-[96px]'>
        <div className='w-full flex justify-between gap-[124px]'>
          <img src={`${process.env.PUBLIC_URL}/img/about_01.png`} alt="" />
          <div className='pt-[130px]'>
            <h2 className='font-bold font-[Montserrat] text-[24px] text-gray-900 leading-[1.3]'>Innovative and conscious retail concept</h2>
            <p className='text-justify text-gray-500 mt-[50px]'>
            Iceland small batch art party asymmetrical waistcoat locavore. Dreamcatcher chillwave drinking vinegar, pop-up kombucha chartreuse gluten-free single-origin coffee VHS tumeric deep v slow-carb vinyl raclette. Austin brunch plaid quinoa pug. Hammock taxidermy activated charcoal migas kinfolk shaman gluten-free palo santo ugh try-hard +1.
            </p>
            <img src={`${process.env.PUBLIC_URL}/img/social_media.svg`} alt="" className='mt-[64px]'/>
          </div>
        </div>

        <div className="flex justify-between gap-[124px] items-center">
          <div className='font-[Open Sans] text-[16px] text-gray-500'>
            <p className='py-4'>
            Opening hours from 9AM until 8PM CET time on business days
            </p>
            <p className='py-4'>
            69 Chapel Street<br />Woodbridge, VA 22191
            </p>
            <p className='py-4'>
            +1-202-555-0129
            </p>
            <p className='py-4'>
            mistomail@email.com
            </p>
          </div>
          <img src={`${process.env.PUBLIC_URL}/img/about_02.png`} alt="" />
        </div>

      </div>
    </Layout>
  )
}

export default About

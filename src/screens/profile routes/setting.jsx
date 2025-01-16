import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'


const Setting = () => {
  return (
   <>
<Navbar/>

<div className='setting px-[10.3rem] py-[1.4rem] flex justify-between'>

<div className='w-[7rem]'>
<button>Privacy</button>
<br />
<button>Notifications</button>
</div>

<div className='w-[67rem]'>

<div>

  <div className='border px-[1.4rem] py-[.8rem] rounded'>

<h1 className='text-[1.2rem] font-bold'>My ads Settings</h1>

  </div>


</div>


<div className='password mt-10'>

  <div className='border px-[1rem] rounded py-[1rem]'>
    <h1 className='font-semibold text-[1.2rem]'>Create Password</h1>
  </div>


  <div className='px-[2rem] py-[2rem] border'>
    <input type="text" placeholder='New Password' className='border w-full px-[1rem] py-[.6rem]' />
    <br />
    <input type="text" placeholder='Create New Password' className='border mt-8 w-full px-[1rem] py-[.6rem]' />
    
    <br />
    <button className='mt-8 bg-gray-200 w-[9rem] px-[.8rem] py-[.8rem] rounded'>Create Password</button>

  </div>
  <div></div>
  <div></div>
  <div></div>

</div>


</div>


</div>


<Footer/>

   </>
  )
}

export default Setting
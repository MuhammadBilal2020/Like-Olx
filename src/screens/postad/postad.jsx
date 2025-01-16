import React from 'react'

import PostNavbar from '../../components/PostedNavbar'
import { useNavigate } from 'react-router-dom'

function PostAd() {
  let navigate = useNavigate()
  let categories = [
    {
      cateName : 'Mobile'
    },
    {
      cateName : 'Bike'
    },
    {
      cateName : 'Car'
    },
  ]
  const goToForm = (category) => {
    navigate(`/postAdForm/${category}`); // Navigate to the form
    
  };

  return (
    <>
      <PostNavbar />

      <div className='post-add mt-4'>
        <h1 className='text-center text-[1.4rem] font-bold'>POST YOUR AD</h1>

        <div className='w-[80rem] p-2 mx-auto mt-[2rem] '>

          <h1 className='font-bold'>Choose a category</h1>

          <div className='flex   border border-blue-500 gap-[2rem] mt-5  '>

            
              
              {categories && categories.map((item , index) =>
                
                <p key={index} onClick={() => goToForm(item.cateName)}  className='w-[33%] p-4 hover:bg-[#f3f2f2] px-[5rem] '>
                {item.cateName}
              </p>)}

             

              
            


          </div>

        </div>


      </div>

    </>
  )
}

export default PostAd
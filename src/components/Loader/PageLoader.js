import React, { useEffect, useState } from 'react';
const PageLoader = () =>{
   
    return(
      <div className='flex flex-row justify-center '>
       <div className='flex flex-row justify-center h-screen '>
        <div className='flex flex-col justify-center text-red-700'>M
          <div className = " animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-red-700">  </div>
         M</div></div>
          <div className='flex flex-row justify-center h-screen'>
          <div className='flex flex-col justify-center text-red-700'>I
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-red-700"></div>
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-blue-700"></div>
          I</div></div>
          <div className='flex flex-row justify-center h-screen'>
          <div className='flex flex-col justify-center text-red-700'>C
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-red-700"></div>
          C</div></div>
          </div>
        
  
    )
}

export default PageLoader;
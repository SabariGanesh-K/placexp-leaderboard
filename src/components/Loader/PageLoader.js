import React, { useEffect, useState } from 'react';
const PageLoader = () =>{
   
    return(
      <div className='flex flex-row justify-center '>
       <div className='flex flex-row justify-center h-screen '>
        <div className='flex flex-col justify-center text-purple-700'>P
          <div className = " animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-purple-700">  </div>
         P</div></div>
          <div className='flex flex-row justify-center h-screen'>
          <div className='flex flex-col justify-center text-purple-700'>X
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-purple-700"></div>
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-blue-700"></div>
          X</div></div>
          <div className='flex flex-row justify-center h-screen'>
          <div className='flex flex-col justify-center text-purple-700'>P
          <div className = "animate-spin rounded-full h-16 w-16 border-b-2 top-0 left-0 border-purple-700"></div>
          P</div></div>
          </div>
        
  
    )
}

export default PageLoader;
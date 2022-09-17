import React, { useContext, useState } from 'react'
import { AppConfig } from '../../context/AppConfig'
import { LeaderBoard } from '../Leaderboard/LeaderBoard'
import PageLoader from '../Loader/PageLoader'
import { Loader } from '../Loader/Loader'
export const Main = () => {
const  {fetchloading,data} = useContext(AppConfig);
  return (
    <>

  
    
    <div className='w-screen min-h-screen '>
    

    <div class={`max-w-96 h-screen ${(!fetchloading&&data.length>0)?"block":"hidden"}   `}>
    <LeaderBoard/>
    </div>

<div class={`absolute w-screen h-screen bg-black   top-0 bottom-0 left-0 z-9 ${(!fetchloading&&data.length>0)?"hidden":"block"} ` }>  
<PageLoader/> 
 </div>


        </div>
  </>
  )
}

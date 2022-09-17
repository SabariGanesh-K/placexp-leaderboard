import React, { useContext, useState } from 'react'
import smoke from '../../assets/smoke.mp4';
import { LeaderboardCard } from './LeaderboardCard'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { AppConfig } from '../../context/AppConfig';
import { Loader } from '../Loader/Loader';
export const LeaderBoard = () => {
  const [addMemtoggle,setaddMemToggle] = useState(false);
  const {adminStatus,removeSuuccess,data,addingLoad,addPointSuucess, removePointSuuccess,mailerror,signInWithGoogle,userexisterror,addSuucess, addMember} = useContext(AppConfig);
  const [addingName,setaddingName] = useState("");
  const [addingRegNo,setAddignRegno] = useState("");

  const commitAddMember = () =>{
    
    if (addingName&&addingRegNo){
      setaddMemToggle(false)
      addMember(addingName,addingRegNo);
    }
    else{
      alert("Enter valid name and regno !");
    }
    
   
  }
  
  const particlesInit = async (main) => {
    
   
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
   
  };
  const toggleAddMem = () =>{
    setaddMemToggle(!addMemtoggle);
  }
  return (
    <>
    <Particles
    className='z--1'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        particles: {
          number: { value: 200, density: { enable: true, value_area: 800 } },
          color: { value: "#8f8d9e" },
          shape: {
            type: "edge",
            stroke: { width: 0, color: "#4334a7" },
            polygon: { nb_sides: 7 },
           
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4334a7",
            opacity: 1,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
          }
        },
        retina_detect: true
      }}
    />
   
<div className='bg-[rgba(35,26,102,0.7)] w-screen z-50 relative flex flex-row justify-between' >

<div>
  //pxp logo
</div>
<div >
{!mailerror&&!adminStatus && <button onClick={signInWithGoogle} className='bg-yellow-600 cursor-pointer font-mono text-black font-3xl p-3 rounded-3xl m-3'>Admin login</button> }
{mailerror && <button className='bg-red-600  font-mono cursor-not-allowed text-black font-3xl p-3 rounded-3xl m-3 z-50 relative '>Access Denied</button>}
{!mailerror && adminStatus&& <button className='bg-neutral-600  font-mono cursor-not-allowed text-black font-3xl p-3 rounded-3xl m-3 z-50 relative '>Logged In</button>}
</div>

</div>




{adminStatus  &&   !addMemtoggle && !addingLoad&& <button className='bg-neutral-700 text-gray-200 p-2 mb-1 w-50 relative' onClick={toggleAddMem}> ADD MEMBERS + </button>}
      {adminStatus && addingLoad && <Loader/> }
      {adminStatus&& addMemtoggle && !addingLoad&& <div className='bg-neutral-900 text-white font-semibold text-xl'> 
       <div className=' w-50 relative'>  Name:- </div><input  className=' w-50 relative text-black' type='text' value = {addingName} onChange = {(e)=>setaddingName(e.target.value)} /> 
       <div  className=' w-50 relative'>  RegNo:- </div><input  className=' w-50 relative text-black' type='text' value = {addingRegNo} onChange = {(e)=>setAddignRegno(e.target.value)} /> 
        <div  className=' w-50 relative'>  </div> <div> <button onClick={commitAddMember} className='bg-green-700 text-black p-1 w-50 relative' >ADD</button> <button className='bg-red-700 text-black p-1 w-50 relative' onClick={toggleAddMem}>CANCEL</button> </div> </div>}
{adminStatus && !addingLoad && userexisterror &&  <div className='text-red-700 font-semibold font-mono'>User already exist !</div>  }
{adminStatus && !addingLoad && addSuucess &&  <div className='text-green-700 font-semibold font-mono'>User added Successfully !</div>  }
{adminStatus&& removeSuuccess&& <div className='bg-green-700  text-black font-medium'>Member successfully removed !</div>  }
{adminStatus&&  addPointSuucess && <div className='bg-green-700  text-black font-medium'>Points successfully added !</div>  }
{adminStatus&&  removePointSuuccess && <div className='bg-green-700  text-black font-medium'>Points removed successfully !</div>  }
<div className='w-screen'>
{data.length && data.map((item,k)=>{

 
  return(
    <div key = {k}>
    <LeaderboardCard points = {item.points} name = {item.name} regno = {item.regno} />
    </div>
  )
 
})}
</div>


  
  
    </>
    


  

   
  )
}

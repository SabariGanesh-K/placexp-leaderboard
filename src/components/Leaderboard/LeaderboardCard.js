import React, { useContext, useEffect, useState } from 'react'
import { AppConfig } from '../../context/AppConfig'

import { Loader } from '../Loader/Loader'
export const LeaderboardCard = (props) => {
  const [removeloading, setremoveloading] = useState(false);
  const [addingPointLoad, setAddingPointLoad] = useState(false);
  const [removePointloading, setremovePointloading] = useState(false);
  const {adminData,max1,max2,max3,removeMember,adminStatus, addPoints,minusPoints} = useContext(AppConfig);
  const [removetoggel,setremovetoggle] = useState(false);
  const [addptToggle,setAddPtToggle] = useState(false);
 
  const [minPtToggle,setMinPtToggle] = useState(false);
  const [addPt,setaddpt] = useState(0);
  const [minPt,setMinPt] = useState(0);
  
  console.log(max1,max2,max3)

  const [bg,setbg] = useState("bg-[rgba(0,0,0,0.8)]")
  
  useEffect(()=>{
    if(props.points === max1){
      setbg("bg-[rgba(185,135,70,0.8)]")
    }
    else if(props.points ===max2){
setbg("bg-[rgba(190,195,196,0.8)]")
    }
    else if (props.points==max3){
     setbg("bg-[rgba(119,43,43,0.8)]") 
    }
    else{
      setbg("bg-[rgba(0,0,0,0.8)]")
      
    }
  },[])
  let validate = typeof (addPt) === 'number' && typeof(minPt) === 'number';
  const toggleMinPt = () =>{
    setMinPtToggle(!minPtToggle);
    setremovetoggle(false);
    setAddPtToggle(false);
  }
  const toggleAddPt = () =>{
    setMinPtToggle(false);
    setAddPtToggle(!addptToggle);
setremovetoggle(false);
  }
  const toggleRemove = () =>{
    setMinPtToggle(false);
    setremovetoggle(!removetoggel);
    setAddPtToggle(false);
  }
  const commitAddPt = async() =>{
    setAddingPointLoad(true);
    if ( addPt>0 ){
      
      await addPoints(props.regno,props.points,addPt);
      setAddPtToggle(false);
    }
    else{
      alert("Enter valid addValue greater than 0!");
    }
    setAddingPointLoad(false);
  }
  const commitMinPt = async() =>{
    setremovePointloading(true);
    if ( minPt>0 ){
    
      await minusPoints(props.regno,props.points,minPt);
      setMinPtToggle(false);
    }
    else{
      alert("Enter valid minus value greater than 0!");
    }
    setremovePointloading(false);
  }
  const commitRemoval  = async() =>{
    setremoveloading(true);
 
    await removeMember(props.regno);
    setremovetoggle(false);
    setremoveloading(false);
  }
  return (
<div className='flex flex-col mt-8 font-[Nunito] '>
    <div className={`flex flex-row justify-between text-white font-bold p-5 ${bg} z-50 relative`}>
      <div className='font-xl'> {props.regno} </div>
      <div  className='font-xl'> {props.name} </div>
      <div  className='font-xl'> {props.points} </div>
    </div>
    <div className={`flex flex-row justify-evenly flex-wrap text-white z-50 relative ${bg} `}>
 
      {adminStatus && (!removeloading&&!addingPointLoad && !removePointloading)&& !removetoggel && !addptToggle && !minPtToggle  && <button  className='bg-neutral-500 rounded-md hover:bg-black hover:text-white font-semibold text-black p-2 mb-1' onClick={toggleRemove} > REMOVE </button>}
      {/* {adminStatus && removeloading && <Loader/> } */}

      {adminStatus   && !removetoggel && !addptToggle && !minPtToggle &&  (!removeloading&&!addingPointLoad && !removePointloading) && <button className='bg-neutral-500  rounded-md hover:bg-black hover:text-white font-semibold text-black p-2 mb-1' onClick={toggleAddPt}> + POINTS </button>}
      {/* {adminStatus && addingPointLoad && <Loader/> } */}
      
      {adminStatus   && !removetoggel && !addptToggle && !minPtToggle &&(!removeloading&&!addingPointLoad && !removePointloading) &&  <button className='bg-neutral-500  rounded-md hover:bg-black hover:text-white font-semibold text-black p-2 mb-1' onClick={toggleMinPt}> - POINTS </button>}
      {/* {adminStatus && removePointloading && <Loader/> } */}

   
    </div>
    <div className={` text-center  z-50 relative text-white font-semibold text-xl ${bg}  `}>
    

{adminStatus&& removetoggel &&!removeloading &&<>  <div>  Are you sure you want to remove ? </div> <div> <button onClick={commitRemoval} className='bg-green-700 text-black p-1'>Yes</button> <button className='bg-red-700 text-black p-1' onClick={toggleRemove}>Cancel</button> </div> </>}
{adminStatus&& addptToggle &&!addingPointLoad &&<>  <div>  Points to add:- </div><input className='text-black font-semibold text-xl' type='number' value = {addPt} onChange = {(e)=>setaddpt(e.target.value)} />  <div>  </div> <div> <button onClick={commitAddPt} className='bg-green-700 text-black p-1' >ADD</button> <button className='bg-red-700 text-black p-1' onClick={toggleAddPt}>CANCEL</button> </div> </>}
{adminStatus&& minPtToggle && !removePointloading &&<>  <div>  Points to remove :- </div><input className='text-black font-semibold text-xl' type='number' value = {minPt} onChange = {(e)=>setMinPt(e.target.value)} />  <div>  </div> <div> <button onClick={commitMinPt} className='bg-green-700 text-black p-1'>Deduct</button> <button className='bg-red-700 text-black p-1' onClick={toggleMinPt}>CANCEL</button> </div> </>}
  </div>
  </div>
  )
}
  
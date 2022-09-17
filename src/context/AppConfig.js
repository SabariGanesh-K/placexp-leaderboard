import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  setDoc,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
  const [adminStatus, setadminstatus] = useState(false);
  const [max1, setmax1] = useState(0);
  const [max2, setmax2] = useState(0);
  const [removeSuuccess, setremovesuccess] = useState(false);

  const [addPointSuucess, setAddPointSuucess] = useState(false);
  const [removePointSuuccess, setremovePointsuccess] = useState(false);

  const [max3, setmax3] = useState(0);
  const [adminfetching, setadminfetching] = useState(false);
  const [data, setdata] = useState([]);
  const [addingLoad, setAddingLoad] = useState(false);
  const [addSuucess, setAddSuucess] = useState(false);

  const [adminData, setAdminData] = useState([]);
  const [fetchloading, setfetchloading] = useState(false);
  const [mailerror, setmailerror] = useState(false);
  const [userexisterror, setuserexisterror] = useState(false);
  const [currentuser, setcurrentuser] = useState();
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: "placexp-leaderboard",
    storageBucket: "placexp-leaderboard.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: "G-Q3D8BN7R81"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const signOut = async () => {
    const res = await signOut(auth);
    setadminstatus(false);
  };
  const signInWithGoogle = async() => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(
        collection(db, "admins"),
        where("mail", "==", user.email)
      );
      const docs = await getDocs(q);
      console.log(docs.docs.data);
      if (docs.docs.length === 0) {
        setadminstatus(false);
        setmailerror(true);
        // await signOut();
      } else {
        setAdminData(docs.docs.data);
        setadminstatus(true);
        setmailerror(false);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const addMember = async (name, regno) => {
    setAddingLoad(true);
    const q = query(collection(db, "members"), where("regno", "==", regno));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      setuserexisterror(false);
  
    await setDoc(doc(db, "members", regno.toString()), {
      name: name,
      regno: regno,
      points: 0,
    });
     
      setAddSuucess(true);
      setremovePointsuccess(false);
      setremovesuccess(false);
      setAddPointSuucess(false);
      setAddingLoad(false);
    } else {
      setuserexisterror(true);
      setAddSuucess(false);
    }
    setTimeout(()=>{
      window.location.reload(false)
    },2000);
  };

  const removeMember = async(regno) => {
   console.log("reached for",regno)
    //   setremovesuccess(true);
   await deleteDoc(doc(db,"members",regno.toString()))
    
    setremovesuccess(true);
    setAddSuucess(false);
    setremovePointsuccess(false);
    setAddPointSuucess(false);
    setTimeout(()=>{
      window.location.reload(false)
    },2000);

  };
  const addPoints = async (regno, exist, addVal) => {
  
   
    await setDoc(doc(db, "members", regno.toString()), {
     
      points:  parseInt(exist) +parseInt(addVal),
    },{merge:true});
    setAddPointSuucess(true);
    setremovePointsuccess(false);
    setAddSuucess(false);
    setremovesuccess(false);
    setTimeout(()=>{
      window.location.reload(false)
    },2000);
   
  };
  const minusPoints = async (regno, exist, minVal) => {
  
    await setDoc(doc(db, "members", regno.toString()), {
     
      points: parseInt(exist)-parseInt(minVal),
    },{merge:true});
    setremovePointsuccess(true);
    setAddPointSuucess(false);
    setAddSuucess(false);
    setremovesuccess(false);
    setTimeout(()=>{
      window.location.reload(false)
    },2000);
  };


  useEffect(() => {
    const getData = async () => {
        let max = [0,0,0];
      if (data.length == 0) {
        console.log("enytered")
        const q = query(collection(db, "members".toString()), orderBy("points"));
        const docs = await getDocs(q);
     
        // getmaxvals(docs.docs.data);
        console.log(docs);
        let tmp = [];

        docs.forEach((item)=>{
            tmp.push(item.data());
            let pt = item.data().points;
            console.log("iterating",pt,max[0],max[1],max[2])
        
            let m1 = max[0];
            let m2 = max[1];
            let m3 = max[2];
            console.log(pt>m1,(pt>m3 &&pt >= m2  && pt<m1), (pt >= max3 && pt <m2 && pt <m1))
            if (pt > m1) {
             max[2] = m2;
             max[1] = m1;
             max[0] = pt;
              } 
               if (pt>m3 &&pt >= m2  && pt<m1) {

            max[2] = m2;
            max[1] = pt;
                
              } 
               if (pt >= m3 && pt <m2 && pt <m1) {

                max[2] = pt;
              } else {
                //nothing
              }
              
        })
        console.log(tmp);
        setdata(tmp.reverse());
        setmax1(max[0]);
        setmax2(max[1]);
        setmax3(max[2]);
        setfetchloading(false);
      }
    };
    const getAdminData = async () => {
      setadminfetching(true);
      const q = query(
        collection(db, "admins"),
        where("mail", "==", user.email)
      );
      const docs = await getDocs(q);
      console.log("wssddd",docs.docs.length);
      if (docs.docs.length === 0) {
        setmailerror(true);
        setadminstatus(false);
        setadminfetching(false);
      } else {
        //NAME,mail,designation
        //members :- name,regno,points
        setAdminData(docs.docs.data);
        setadminstatus(true);
        setadminfetching(false);
        setmailerror(false);
      }
    };
    getData()
    if(loading){
        return
    }
    if (user){
getAdminData()
    }
    

  }, [user,loading]);

  return (
    <AppConfig.Provider
      value={{
        adminStatus,
        signInWithGoogle,
        max1,
        max2,
        max3,
        userexisterror,
        adminfetching,
        data,
        addingLoad,
        addSuucess,
        removeSuuccess,
    

        addPointSuucess,
        removePointSuuccess,

        adminData,
        fetchloading,
        mailerror,
        addMember,
        removeMember,
        addPoints,
        minusPoints,
      }}
    >
      {" "}
      {children}{" "}
    </AppConfig.Provider>
  );
};
// {{adminStatus,adminfetching,data,addingLoad,addSuucess,removeSuuccess,removeloading,addingPointLoad
//   , addPointSuucess,removePointSuuccess,removePointloading,adminData,fetchloading,mailerror,signInWithGoogle,addMember,removeMember,
//   addPoints,minusPoints}}

import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile,
    updateEmail,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const authcontext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
import axios from 'axios';
import Loading from '../components/loading';

const Authprovider = ({ children }) => {


  const [user, setuser] = useState(null);
  const [photo, setphoto] = useState("");
  const [load, setload] = useState(true);
  const [mytutor,setmytutor]=useState([])
  const [book, setBook] = useState({});
  const [confirm, setconfirm] = useState({});
  const [preftutor,setpreftutor]=useState([]);
  const[roload,setroloading]=useState(true)


  const logout = () => {
    setload(true);
    signOut(auth)
      .then(() => {
        setuser(null);
       setrole(null);
       setroloading(true)
        
      })
      .catch((error) => {
        
      });
  };
  
  const toggletheme=()=>{

    document.documentElement.classList.toggle("dark")

  }
  const login = (email, password) => {
    setload(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createuser = (email, password) => {
    setload(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const [role, setrole] = useState(null);
 

  useEffect(() => {
    if (user?.email) { 
      console.log("User exists, checking role...");
      
      setroloading(true);
      if (role == null) {
        console.log("Role not set, fetching from backend...");
    
        fetch(`https://assignment-12-lovat.vercel.app/finduserbyemail?email=${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setrole(data.role);
            localStorage.setItem('userRole', data.role);
          })
          .catch(console.error)
          .finally(() => setroloading(false));
      } else {
        console.log("User role exists, Returning..... role = ",role);

        setroloading(false);
      }
    } else {
      console.log("User not logged in so role = ",role);
    }
  }, [user?.email, role]);
  
 





  const updateUserProfile = (user, profileData) => {
    return updateProfile(user, profileData)
      .then(() => {
        setuser({ ...user, ...profileData });
      })
      .catch((error) => console.error("Error updating profile:", error));
  };
  const updateUserEmail = (user, newEmail) => {
    return updateEmail(user, newEmail)
        .then(() => {
            setuser({ ...user, email: newEmail });
        })
        .catch(error => console.error("Error updating email:", error));
};


const updateUserPassword = (user, newPassword) => {
    return updatePassword(user, newPassword)
        .catch(error => console.error("Error updating password:", error));
};
const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };
  



//

  

 





//











  
  const authinfo = {
    user,
    setuser,
    createuser,
    logout,
    login,
    load,
    setload,
    photo,
    setphoto,
    updateUserProfile, 
    updateUserEmail, 
    updateUserPassword,
    googleLogin,
    mytutor,
    setmytutor,
    book,
    setBook,
    confirm, 
    setconfirm,
    preftutor,
    setpreftutor,
    toggletheme,
    role,
    setrole,
    roload,
    setroloading,
  };

  



  useEffect(() => {
    const stay = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      //console.log("set user = ",currentuser);
      
      
    });
    return stay;
  }, []);

  return <authcontext.Provider value={authinfo}>{children}</authcontext.Provider>;
};

export default Authprovider;

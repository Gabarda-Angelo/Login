import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom"; 
import {db as firebaseDB} from "../firebase";
import {toast} from "react-toastify";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";





import "./Home.css";

const Home = () => {   

  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);

  const {currentUser:user, isAdmin} = useSelector ((state) => ({...state.user}));
   const navigate = useNavigate();
  const [sort, setSort] = useState(false)
  useEffect(() => {
    firebaseDB.child("contacts").on("value", (snapshot) => {
      if(snapshot.val() !== null) {
         setData({...snapshot.val()})
      } else {
         setData({});
      }
    });

      return () =>{
        setData({});
      }
      
  }, []);




  const userContact = Object.values(data).find(
    (contact) => contact.email === user?.email
  );

  if (isAdmin) {
    return ( 
    <div class="componentsBackgroundColor">
      <div style = {{marginTop: "100px"}}>
          <h1 class="moveup"> ADMIN MODE</h1>
      </div>
    </div>  
      
    );

  } else if(userContact) {
     <h1>Hello User</h1>
  } else {
    // User logged in but no contact data found
    return (
      <div class="componentsBackgroundColor">
        <h1>Unfortunately, {user?.email}</h1>
        <p>Check your internet connection, or perhaps there's no contact data found for this user.</p>
      </div>
    );
  }
 
};

export default Home
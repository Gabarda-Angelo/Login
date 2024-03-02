// HI!! SIRRR JM!!  ETO PO YUNG ADMIN USER AND PASSWORD:T
// TALA CEMETERY  ANNUAL MAINTENANCE RECORD SYSTEM!
// for admin:  
//email:admin.cemetery@gmail.com
//password:123456
// already registered user example:  canelo.alvarez@gmail.com pass: 123456, 
//caya.sumbilla@gmail.com pass: 123456
// Features: 
// REDUX AND REACT
// FIREBASE DATABASE
// REGISTER
// VIEWING
// LOGIN
// CRUD SYSTEM 


// email:admin.cemetery@gmail.com
// password:123456




import React, {useEffect} from "react"
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRoute from "./components/UserRoute";
import {useDispatch} from "react-redux";
import {auth} from "./firebase";
import { setUser } from "./redux/actions";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
       if(authUser){
          dispatch(setUser(authUser))
       }else{
          dispatch(setUser(null));
       }
    })
  }, [dispatch])
  return (
    <Router>
     
      <div className="App">
      <Header/> 
      <Routes>
      <Route path="/login" element={<Login />} />
          <Route 
           exact path="/" 
            element={
              <UserRoute>
                <Home />
              </UserRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
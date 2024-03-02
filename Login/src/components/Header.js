import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../redux/actions";
import logoImage from "./treeIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { currentUser: user, isAdmin } = useSelector((state) => ({ ...state.user }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleAuth = () => {
    setEmail("");
    setPassword("");
    window.location.reload();
    dispatch(logoutInitiate());
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/login") {
      setActiveTab("Signin");
    }
  }, [location]);

  

  const navigate = useNavigate();

  //GOOOO BACKKK FUNNNNCTTTTIONNN
  const handleGoBack = () => {
    navigate(-1);
  };
  //<p onClick={handleGoBack}> go back here!</p>
  return ( 
    
    <div className="header">  
     

    <div className="logo-container">
       
      <p className="logo"> 
       
       <Link to ="/">  
        <img src={logoImage} alt="Logo" className="logo-image" />
        
      </Link>
      </p>   
      
            <div className="header-left">
                
      {isAdmin && (
        
       <h1>Heyy Wsssupp im admin</h1>
         
      )}
    
    </div>

    </div>
 
      {(!isAdmin) &&  ( 


          <Link to="/" onClick={handleGoBack}>
            <p
              
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>

          
        )}
         
        {isAdmin && (
          <Link to="">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>
        )}
        

        {user ? (
          <p style={{ cursor: "pointer" }} onClick={handleAuth}>
            Sign Out
          </p>
        ) : (
          <Link to="/login">
            <p
              className={`${activeTab === "Signin" ? "active" : ""}`}
              onClick={() => setActiveTab("Signin")}
            >
              Sign In
            </p>
          </Link>
        )}
      </div>
    
  );
};

export default Header;
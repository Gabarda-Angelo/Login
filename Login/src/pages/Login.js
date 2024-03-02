import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginInitiate } from "../redux/actions";
import { auth,db } from "../firebase";
import "./Login.css";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const { currentUser, isAdmin } = useSelector((state) => state.user);

  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (currentUser) {
      if (isAdmin) {
          navigate("/");
      } else {
        const userUID = auth.currentUser.uid;
        db.child("contacts") 
          .orderByChild("uid")
          .equalTo(userUID)
          .once("value")
          .then((snapshot) => {
            const contacts = snapshot.val();
            if (contacts) {
              const firstContactId = Object.keys(contacts)[0];
              
              if (firstContactId) {
                navigate(`/view/${firstContactId}`);
              } else {
               
                console.error("Contact ID not found in data");
               
              }
            } else {
              
              console.error("User data not found in the database");
             
            }
          })
          .catch((error) => {
            console.error("Login failed. Please check your credentials.");
          });
      }
    }
  }, [currentUser, isAdmin, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { 
      
      return;
    }
  
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <div id="logreg-forms">
        <form className="form-signin" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: "center" }}>
            Sign in
          </h1>
          <div className="social-login">
            
            
          </div>
          <p style={{ textAlign: "center" }}>OR</p>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
          <button className="btn btn-secondary btn-block" type="submit">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </button>
    
        </form>
      </div>
      
    </div>
  );
};

export default Login;
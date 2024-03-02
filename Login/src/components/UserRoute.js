// import React from "react";
// import {Route} from "react-router-dom";
// import { useSelector } from "react-redux";
// import LoadingToRedirect from "./LoadingToRedirect";


// const UserRoute = ({children, ...rest}) => {
//     const {currentUser} = useSelector((state) => state.user);
//     console.log("currentUser:", currentUser);
//   return currentUser ? <Route {...rest} /> : <LoadingToRedirect/>;
// };

// export default UserRoute

import React from 'react';
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";


const UserRoute = ({children, ...rest}) => {
  const {currentUser} = useSelector((state) => state.user);
  return currentUser ? children : <LoadingToRedirect />;
};

export default UserRoute


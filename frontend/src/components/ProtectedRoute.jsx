import { Children, useContext } from "react";
import { AuthContext } from "../AuthContext";

import {  Navigate } from "react-router-dom";

import { useAuth } from "../customHook/useAuth";


const ProtectedRoute = ({children}) => {
    // const {authState} = useContext(AuthContext)

    const { isAuthenticated} = useAuth();

    return isAuthenticated ? children:<Navigate to="/login"/>



}
 
export default ProtectedRoute;
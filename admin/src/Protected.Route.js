import React from 'react'
import { Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useStateValue } from './context/StateProvider';

function ProtectedRoute({Compo}) {

    const [{user}] = useStateValue();

    const checkJWTExpire = ()=>{
        if(!user) return false
    
        if (jwtDecode(user).exp * 1000 < Date.now()) {
          return false
        }
    
        return true
    }

    if(checkJWTExpire()){
        return Compo
    }
    return <Navigate to="/sign-in" replace />
}

export default ProtectedRoute
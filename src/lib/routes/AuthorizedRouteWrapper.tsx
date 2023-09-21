import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../features/user/AuthProvider.tsx";

export const AuthorizedRouteWrapper: React.FC = () =>{
    const auth = useAuth();
    
    return auth.user != null ? (<Outlet/>) : (<Navigate to="/login"/>)
} 
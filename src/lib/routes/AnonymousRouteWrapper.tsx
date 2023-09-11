import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../features/user/authProvider.tsx";

export const AnonymousRouteWrapper: React.FC = () => {
    const auth = useAuth();
    
    return auth.user == null ? (<Outlet/>) : (<Navigate to="/me"/>);
} 
import {authContextValue, useAuth} from "./AuthProvider.tsx";
import React from "react";


const userContext = useAuth();

interface userModalProps{
    user: authContextValue;
}

export const userModal : React.FC<userModalProps> =({user}) =>{
    user.i
}
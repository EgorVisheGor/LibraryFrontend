import {apiClient} from "./apiClient.ts";
import React from "react";
import {LoginForm} from "./login.tsx";

//TODO: обработку регистрационного запроса

export type registerRequestDto = {
    firstName : string;
    lastName : string;
    userName : string;
    password : string;
    email : string;
}

export type registerResponseDto = {
    token : string;
}

export function register(request: registerRequestDto){
    return apiClient.post('register', {json : request}).json<registerResponseDto>()
}

export const RegisterForm: React.FC = () => {
    
    const registerUserData: registerRequestDto = {
        firstName:"",
        lastName:"",
        userName:"",
        password:"",
        email:""
    }
    
    return(
        <form>
            <button onClick={LoginForm}>Вход</button>
            <button>Регистрация</button>
            <input type="email" value={registerUserData.email} placeholder="Email"/>
            <input type="text" value={registerUserData.userName} placeholder="Имя пользователя"/>
            <input type="text" value={registerUserData.firstName} placeholder="Ваше имя"/>
            <input type="text" value={registerUserData.lastName} placeholder="Ваша фамилия"/>
            <input type="password" value={registerUserData.password} placeholder="Пароль"/>
            <button>Зарегистрироваться</button>
        </form>
    )
}
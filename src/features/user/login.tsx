import {apiClient} from "./apiClient.ts";
import React from "react";
import {RegisterForm} from "./register.tsx";
import {useAuth} from "./AuthProvider.tsx";

//TODO: добавить функцию входа на кнопочку
export type loginRequestDto = {
    userName: string;
    password: string;
}

export type loginResponseDto = {
    token: string;
}

export function login(request: loginRequestDto) {
    return apiClient.post('login', {json: request}).json<loginResponseDto>();
}

export const LoginForm: React.FC = () => {
    const userdata: loginRequestDto = {
        password: "",
        userName: ""
    }
    const auth = useAuth();
    return (
        <form className="z-50 bg-white flex flex-col w-[500px] rounded-lg">
            <div className="relative">
                <button className="w-1/2 absolute left-0">Вход</button>
                <button onClick={() => RegisterForm} className="w-1/2 absolute right-0">Регистрация</button>
            </div>
            <p>Имя пользователя</p>
            <input className="bg-white" id="userName" type="text" placeholder="Имя пользователя"
                   value={userdata.userName}/>
            <input className="bg-white" type="password" placeholder="Пароль" value={userdata.password}/>
            <button onClick={() => auth.login(userdata)}>Войти</button>
        </form>
    )
}

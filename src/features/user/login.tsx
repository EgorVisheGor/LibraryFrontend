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
            <button>Вход</button>
            <button onClick={RegisterForm}>Регистрация</button>
            <input className="" type="text" placeholder="Имя пользователя" value={userdata.userName}/>
            <input type="password" placeholder="Пароль" value={userdata.password}/>
            <button onClick={() => auth.login(userdata)}>Войти</button>
        </form>
    )
}

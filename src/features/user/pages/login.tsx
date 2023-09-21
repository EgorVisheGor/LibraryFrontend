import React, {useCallback, useState} from "react";
import {AuthLayout} from "../../../Layout/AuthLayout.tsx";
import {useAuth} from "../AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export const LoginPage: React.FC = () => (
    <AuthLayout>
        <LoginForm />
    </AuthLayout>
)

export const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth();
    const navigate = useNavigate();
    
    const doLogin = useCallback(async () => {
        await login({userName: username, password });
        navigate("/")
    }, [username, password]);
    
    return (
        <div className="bg-white flex flex-col w-[500px] rounded-lg ">
            <div className="relative">
                <button className="w-1/2 absolute left-0">Вход</button>
                <button onClick={() => navigate("/register")} className="w-1/2 absolute right-0">Регистрация</button>
            </div>
            <input className="bg-white" id="userName" type="text" placeholder="Имя пользователя" onChange={(x) => setUsername(x.target.value)}/>
            <input className="bg-white" id="password" type="text" placeholder="Пароль" onChange={(x) => setPassword(x.target.value)}/>
            <button className="text-black" onClick={() => doLogin()}>Войти</button>
        </div>
    )
}

import React, {useCallback, useState} from "react";
import {AuthLayout} from "../../../Layout/AuthLayout.tsx";
import {useAuth} from "../AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

//TODO: обработку регистрационного запроса

export const RegisterPage: React.FC = () => (
    <AuthLayout>
        <RegisterForm/>
    </AuthLayout>
)

export const RegisterForm: React.FC = () => {
    const [userame, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const {register} = useAuth();
    const navigate = useNavigate();

    const doRegister = useCallback(async () => {
        await register({firstName: firstname, lastName: lastname, userName: userame,  password: password, email: email});
        navigate("/")
    }, [firstname, lastname, userame, password, email])


    return (
        <div className="bg-white flex flex-col w-[500px] rounded-lg">
            <div className="relative">
                <button className=" absolute left-0 w-1/2" onClick={() => navigate("/login")}>Вход</button>
                <button className=" w-1/2 absolute right-0">Регистрация</button>
            </div>
            <input className="bg-white" type="email" placeholder="Email" onChange={(x) => setEmail(x.target.value)}/>
            <input className="bg-white" type="text" placeholder="Имя пользователя" onChange={(x) => setUsername(x.target.value)}/>
            <input className="bg-white" type="text" placeholder="Ваше имя" onChange={(x) => setFirstname(x.target.value)}/>
            <input className="bg-white" type="text" placeholder="Ваша фамилия" onChange={(x) => setLastname(x.target.value)}/>
            <input className="bg-white" type="text" placeholder="Пароль" onChange={(x) => setPassword(x.target.value)}/>
            <button onClick={() => doRegister}> Зарегистрироваться</button>
        </div>
    )
}
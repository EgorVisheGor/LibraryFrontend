import React from "react";
import {useAuth} from "../features/user/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

type baseLayoutProps = {
    children: React.ReactNode;
};

//TODO: добавить поиск

const UserPanel: React.FC = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return user
        ? (
            <div className="userPanel">
                <img src="src/assets/authorizedUser" alt="user logo"></img>
                <p>"{user.userName}{user.lastName}"</p>
                <button onClick={() => logout()}>Выйти</button>
            </div>
        )
        :
        (
            <button className="flex justify-center bg-gray-950 px-4 py-2 text-white"
                    onClick={() => navigate("/login")}>
                Войти
            </button>
        )
}

export const BaseLayout = ({children}: baseLayoutProps) => {
    return (
        <div className="flex flex-col h-full">
            <header className="w-full h-20 flex items-center">
                <div id="headerPanel" className="w-full h-16 flex items-center justify-between">
                    <div className="h-16 flex gap-2 items-center">
                        <img id="mainLogo" src="src/assets/logo.svg" alt="Site's main logo" className="h-16"></img>
                        <p className="text-3xl font-extrabold">MiBooks</p>
                    </div>

                    <div className="flex rounded-lg overflow-hidden">
                        <input type="search" id="search" placeholder="Search..."
                               className="bg-slate-200 font-semibold pl-4"/>
                        <div className="bg-cover w-10 right-0 bg-slate-200">
                            <button>
                                <img src="src/assets/searchLogo.svg" alt="SearchIcon"/>
                            </button>
                        </div>
                    </div>
                    <UserPanel/>
                </div>
            </header>

            <main className="w-full">{children}</main>

            <footer className="w-full h-20 flex justify-between mt-auto">
                    <div className="About us">
                        <p>О нас</p>
                        <ul>
                            <li><a href="">Контакты</a></li>
                            <li><a href="">Адреса</a></li>
                            <li><a href="">Данные</a></li>
                            <li><a href="">Информация</a></li>
                        </ul>
                    </div>
                    <div className="About subscription">
                        <p>О подписке</p>
                        <ul>
                            <li><a>Цены</a></li>
                            <li><a>Сроки</a></li>
                            <li><a>Привилегии</a></li>
                        </ul>
                    </div>
                    <div className="Social media">
                        <p>Контакты</p>
                        <ul>
                            <li><a>Офис в казани: 123-456-789</a></li>
                            <li><a>Главный офис: 123-456-789</a></li>
                        </ul>
                    </div>
            </footer>
        </div>
    )
}
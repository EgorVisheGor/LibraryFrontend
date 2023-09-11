import React from "react";
import {useAuth} from "../features/user/AuthProvider.tsx";

type baseLayoutProps = {
    children: React.ReactNode;
};

//TODO: добавить поиск


const categories = [
    "Романы",
    "Детективы",
    "Фантастика",
];

const UserPanel: React.FC = () => {
    const {user, logout, openAuthModal} = useAuth();

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
            <button className="mx-auto h-10 flex w-20 items-center right-0 bg-sky-500 "
                    onClick={() => openAuthModal("login")}>
                Войти
            </button>
        )
}

const DropDownList: React.FC = () => {

    const categoriesList = categories.map(category =>
        <option value="category">{category}</option>);

    return (
        <select className="DropDownList">
            {categoriesList}
        </select>
    )
}

export const BaseLayout = ({children}: baseLayoutProps) => {
    return (
        <>
            <header className=" w-full h-16 overflow-hidden">
                <div id="headerPanel" className="w-full relative top-0 bg-cover h-16 items-center">

                    <div className="bg-cover absolute left-0 w-20 inline-flex">
                        <button className="" onClick={DropDownList}>
                            <img className="" src="src/assets/DropDownListIcon.svg" alt="Drop down list icon"/>
                        </button>
                    </div>

                    <div className="absolute left-52 my-auto">
                        <form id="searchPanel" className="flex h-10 bg-cover bg-slate-200 rounded-lg">
                            <input type="search" id="search" placeholder="Search..."
                                   className="bg-slate-200 rounded-lg px-px"/>
                            <div className="bg-cover w-10 right-0 bg-slate-200 rounded-lg">
                                <button>
                                    <img src="src/assets/searchLogo.svg" alt="SearchIcon"/>
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/*<div className="h-16 overflow-hidden">*/}
                    {/*    <img id="mainLogo" src="src/assets/mainLogo.jpg" alt="Site's main logo" className="h-16"></img>*/}
                    {/*</div>*/}

                    <div className="absolute right-0">
                        <UserPanel/>
                    </div>

                </div>
            </header>

            <main className="h-[1100px] w-full">{children}</main>

            <footer className="h-[200px] w-full overflow-hidden relative">
                
                <div className="absolute left-[0px] h-[200px] w-[200px]">
                    <img src="src/assets/mainLogo.jpg" alt="Logo image"/>
                </div>
                
                <div className="flex justify-between w-[1016px] absolute left-[200px]">
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
                </div>
            </footer>
        </>
    )
}
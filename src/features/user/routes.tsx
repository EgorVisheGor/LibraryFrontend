import {ModuleRoutes} from "../../lib/routes/types.ts";
import {LoginPage} from "./pages/login.tsx";
import {RegisterPage} from "./pages/register.tsx";

export const UserModuleRoutes: ModuleRoutes = {
    anonymous: [{
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    }],
    authenticated: [],
    common: []
}
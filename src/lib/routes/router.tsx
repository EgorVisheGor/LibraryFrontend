// @ts-ignore
import React from "react";
import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainPageLayout} from "../../Layout/MainPageLayout.tsx";
import {AuthorizedRouteWrapper} from "./AuthorizedRouteWrapper.tsx";
import {AnonymousRouteWrapper} from "./AnonymousRouteWrapper.tsx";
import {ModuleRoutes} from "./types.ts";
import {UserModuleRoutes} from "../../features/user/routes";

export const authorizedRoutes: RouteObject ={
    path: "/",
    element: <AuthorizedRouteWrapper />,
    children: [],
};

export const anonymousRoutes: RouteObject ={
    path:"/",
    element: <AnonymousRouteWrapper />,
    children: [],
}

export const commonRoutes: RouteObject[] =[
    {
        path:"/",
        element: <MainPageLayout/>
    }
]

function registerModuleRoutes(routes: ModuleRoutes) {
    anonymousRoutes.children!.push(...routes.anonymous);
    authorizedRoutes.children!.push(...routes.authenticated);
    commonRoutes.push(...routes.common);
}

registerModuleRoutes(UserModuleRoutes);

export const router =  createBrowserRouter([
    {
        path:"/",
        children:[
            ...commonRoutes,
            anonymousRoutes,
            authorizedRoutes
        ]
    }]);
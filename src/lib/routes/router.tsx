import React from "react";
import {createBrowserRouter, Outlet, RouteObject} from "react-router-dom";
import {MainPageLayout} from "../../Layout/MainPageLayout.tsx";
import {AuthorizedRouteWrapper} from "./AuthorizedRouteWrapper.tsx";
import {AnonymousRouteWrapper} from "./AnonymousRouteWrapper.tsx";
import {moduleRoutes} from "./types.ts";

export const authorizedRoutes: RouteObject ={
    path: "/",
    element: <AuthorizedRouteWrapper />,
    children: [],
};

export const anonymousRoutes: RouteObject ={
    path:"/",
    element: <AnonymousRouteWrapper />,
    children:[]
}

export const commonRoutes: RouteObject[] =[
    {
        path:"/",
        element: <MainPageLayout/>
    }
]

function registerModuleRoutes(routes: moduleRoutes) {
    anonymousRoutes.children!.push(...routes.anonymous);
    authorizedRoutes.children!.push(...routes.authenticated);
    commonRoutes.push(...routes.common);
}

export const router =  createBrowserRouter([
    {
        path:"/",
        children:[
            ...commonRoutes,
            anonymousRoutes,
            authorizedRoutes
        ]
    }]);
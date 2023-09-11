import { RouteObject } from "react-router-dom";

export type targetType = 'document' | 'window' | React.Ref<HTMLElement> | undefined;

export type moduleRoutes = {
    anonymous: RouteObject[];
    authenticated: RouteObject[];
    common: RouteObject[];
}
export type FCProps<C> = C extends React.FC<infer P> ? P : never;

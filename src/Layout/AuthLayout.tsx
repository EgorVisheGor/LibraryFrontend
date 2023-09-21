import React, {ReactElement} from "react";

interface AuthLayoutProps {
    children: ReactElement;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
    return (<div>{children}</div>)
}
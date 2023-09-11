import React, {ReactNode, useCallback, useState} from "react";
import {userProfileDto} from "./userProfileDto.ts";
import {
    QueryObserverResult,
    RefetchOptions,
    UseMutateAsyncFunction,
    useMutation,
    useQuery,
    useQueryClient
} from "react-query";
import {BaseError} from "../../lib/dto.ts";
import {tokenStore} from "./apiClient.ts";
import {HTTPError} from "ky";
import {getMyUser} from "./getMyUser.ts";
import {loginRequestDto, loginResponseDto, login, LoginForm} from "./login.tsx";
import {registerResponseDto, registerRequestDto, register, RegisterForm} from "./register.tsx";


export type authContextValue = {
    user: userProfileDto | null
    login: UseMutateAsyncFunction<loginResponseDto, BaseError, loginRequestDto>
    register: UseMutateAsyncFunction<registerResponseDto, BaseError, registerRequestDto>
    logout: () => void;
    isLoggingIn: boolean;
    isRegistering: boolean;
    reFetchUser: (
        options?: RefetchOptions | undefined) =>
        Promise<QueryObserverResult<userProfileDto | null, BaseError>>
    openAuthModal: (type: "login" | "register") => void;
};

const authContext = React.createContext<authContextValue | null>(null);

export interface authProviderProps {
    children: React.ReactNode;
}

const userKey = ["user", "me"];

export const AuthProvider = ({children}: authProviderProps) => {
    const queryClient = useQueryClient();

    const {
        data: user,
        error,
        status,
        isLoading,
        isIdle,
        isSuccess,
        refetch
    } = useQuery<userProfileDto | null, BaseError>({
        queryKey: userKey,
        queryFn: async () => {
            if (tokenStore.Token) {
                try {
                    return await getMyUser()
                } catch (e) {
                    if (e instanceof HTTPError && e.response.status == 401) {
                        tokenStore.Token = null;
                    }
                }
            }
            return null;
        },
    });

    const setUser = React.useCallback(
        (data: userProfileDto) => queryClient.setQueryData(userKey, data),
        [queryClient]
    );

    const loginMutation = useMutation<loginResponseDto, BaseError, loginRequestDto>({
        mutationFn: login,
        onSuccess: responce => {
            tokenStore.Token = responce.token;
            queryClient.invalidateQueries(userKey);
        },
    });

    const registerMutation = useMutation<registerResponseDto, BaseError, registerRequestDto>({
        mutationFn: register,
        onSuccess: responce => {
            tokenStore.Token = responce.token;
            queryClient.invalidateQueries(userKey)
        },
    });

    const logout = React.useCallback(() => {
        tokenStore.Token = null;
        queryClient.invalidateQueries(userKey);
    }, [queryClient]);

    const [openType, setOpenType] = useState<"login" | "register" | null>();

    const openAuthModal = useCallback((type: "login" | "register") => setOpenType(type), [setOpenType])

    const value = React.useMemo<authContextValue>(
        () => ({
            user: user ?? null,
            login: loginMutation.mutateAsync,
            register: registerMutation.mutateAsync,
            logout: logout,
            isLoggingIn: loginMutation.isLoading,
            isRegistering: registerMutation.isLoading,
            reFetchUser: refetch,
            openAuthModal: openAuthModal
        }), [
            user,
            loginMutation.mutateAsync,
            registerMutation.mutateAsync,
            logout,
            openAuthModal,
            loginMutation.isLoading,
            registerMutation.isLoading,
            refetch,
        ]
    );

    let modal: React.ReactElement | null = null

    switch (openType) {
        case "register":
            modal = (<RegisterForm/>);
            break;
        case "login":
            modal = (<LoginForm/>);
            break;
    }


    if (isSuccess) {
        return (
            <authContext.Provider value={value}>
                {modal}
                {children}
            </authContext.Provider>
        );
    }
    //TODO: исправить заглушку для загрузки
    if (isLoading || isIdle) {
        return (<div className="">Заглушка для загрузки</div>)
    }

    if (error) {
        return (
            <div style={{color: "tomato"}}>{JSON.stringify(error, null, 2)}</div>
        )
    }
    return <div>Unhadled status: {status}</div>;

}

export const useAuth = () => {
    const context = React.useContext(authContext);
    if (context === null) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
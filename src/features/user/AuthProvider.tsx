import React from "react";
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
import {login, loginRequestDto, loginResponseDto} from "./api/login.ts";
import {register, registerRequestDto, registerResponseDto} from "./api/register.ts";


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

    const value = React.useMemo<authContextValue>(
        () => ({
            user: user ?? null,
            login: loginMutation.mutateAsync,
            register: registerMutation.mutateAsync,
            logout: logout,
            isLoggingIn: loginMutation.isLoading,
            isRegistering: registerMutation.isLoading,
            reFetchUser: refetch,
        }), [
            user,
            loginMutation.mutateAsync,
            registerMutation.mutateAsync,
            logout,
            loginMutation.isLoading,
            registerMutation.isLoading,
            refetch,
        ]
    );
    
    if (isSuccess) {
        return (
            <authContext.Provider value={value}>
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
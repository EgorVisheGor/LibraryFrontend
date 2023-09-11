import { HTTPError } from 'ky';
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query';
import { AsyncReturnType } from 'type-fest';

const queryConfig: DefaultOptions ={
    queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false
    }
};

export const queryClient = new QueryClient({defaultOptions : queryConfig});

export type extractFnReturnType<FnType extends (...args: any) => any> = AsyncReturnType<FnType>;

export type queryConfig<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export type mutationConfig<mutationFnType extends (...args : any) => any> = UseMutationOptions<
extractFnReturnType<mutationFnType>,
HTTPError,
Parameters<mutationFnType>[0]>;
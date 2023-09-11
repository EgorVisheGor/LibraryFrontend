import {apiClient} from "../user/apiClient.ts";
import {GetBookByIdResponse} from "./getBookById.tsx";
import {AsyncReturnType} from "type-fest"
import {queryConfig} from "../../lib/reactQuery.ts";
import {useQuery} from "react-query";

export const getBooks = async () : Promise<GetBookByIdResponse[]>=> {
    // return apiClient.get(`books/mainPage`).json();
    return [{
        author: "123",
        name: "123"
    }] as GetBookByIdResponse[];
}

type ReturnType = AsyncReturnType<typeof getBooks>;

type useBooksOptions ={
    config?: queryConfig<ReturnType>; 
}

export const useBooks = ({config}: useBooksOptions = {})  => {
    return useQuery<ReturnType>(
        {
            ...config,
            queryKey:["books/mainPage"],
            queryFn: () => getBooks(),
        }
    )
}
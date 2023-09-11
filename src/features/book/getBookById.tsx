import {apiClient} from "../user/apiClient.ts";

export interface GetBookByIdResponse {
    id: string,
    name: string;
    author: string;
    description: string;
    imageID: File;
}

export const GetBookById = (id: string): Promise<GetBookByIdResponse> => {
    return apiClient.get(`books/${id}`).json();
}
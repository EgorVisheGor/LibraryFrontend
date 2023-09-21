import {apiClient} from "../user/apiClient.ts";

export interface GetAuthorByIdResponse{
    id: string,
    firstName: string,
    lastName: string,
    description: string,
    photoId: string
}

export const GetAuthorById = (id: string): Promise<GetAuthorByIdResponse> => {
    return apiClient.get(`authors/${id}`).json();
}
import {apiClient} from "../user/apiClient.ts";

export interface GetBookByIdResponse {
    id: string,
    title: string;
    publicationDate: Date;
    description: string;
    coverUrl:string;
    bookTags:string;
    authorId: string;
    applicationUserId:string;
}

export const GetBookById = (id: string): Promise<GetBookByIdResponse> => {
    return apiClient.get(`books/${id}`).json();
}
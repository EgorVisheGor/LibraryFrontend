import {getConfig} from "../user/apiClient.ts";

export const GetCoverUrl = (id: string): string => {
    return `${getConfig().baseUrl}/images/covers/${id}`;
}
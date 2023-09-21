import {apiClient} from "../apiClient.ts";

export type registerRequestDto = {
    firstName : string;
    lastName : string;
    userName : string;
    password : string;
    email : string;
}

export type registerResponseDto = {
    token : string;
}

export function register(request: registerRequestDto){
    return apiClient.post('authentication/register', {json : request}).json<registerResponseDto>()
}
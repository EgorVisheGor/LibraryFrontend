import {apiClient} from "../apiClient.ts";

export type loginRequestDto = {
    userName: string;
    password: string;
}

export type loginResponseDto = {
    token: string;
}

export function login(request: loginRequestDto) {
    return apiClient.post('authentication/login', {json: request}).json<loginResponseDto>();
}
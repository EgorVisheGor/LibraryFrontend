import {apiClient} from "./apiClient.ts";
import {userProfileDto} from "./userProfileDto.ts";

export function getMyUser(){
    return apiClient.get('me').json<userProfileDto>();
}
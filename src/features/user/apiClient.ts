import ky from "ky";

interface AppConfiguration{
    baseUrl: string;
}

const configInstance : AppConfiguration = {
    baseUrl: import.meta.env.VITE_BASE_URL ?? ''
}
export function getConfig(): AppConfiguration {
    return configInstance;
}

class TokenManager {
    private token: string | null = null;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    public set Token(token: string | null) {
        if (token == null)
            localStorage.removeItem('token');
        else
            localStorage.setItem('token', token);
        this.token = token;
    }

    public get Token() {
        return this.token;
    }
}

export const apiClient = ky.extend(
    {
        prefixUrl: getConfig().baseUrl || undefined,
        hooks: {
            beforeRequest: [
                request => {
                    request.headers.set('Authorization', `Bearer ${tokenStore.Token}}`);
                }
            ]
        }
    }
);

export const tokenStore = new TokenManager();

export interface User {
    name: string,
    id: number,
    token: string
}

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
}

export const register = (data: { username: string, password: string }) => {
    fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            }else {
                return Promise.reject(data)
            }
        })
}

export const login = (parmse) => {
    
}

export const logout = () => window.localStorage.removeItem(localStorageKey)
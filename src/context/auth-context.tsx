import React, { ReactNode, useState } from "react"
import * as auth from "../auth-provider"


const AuthContext = React.createContext<{
    user: auth.User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = "AuthContext"

interface AuthForm {
    username: string;
    password: string
}



export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<auth.User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout =  () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
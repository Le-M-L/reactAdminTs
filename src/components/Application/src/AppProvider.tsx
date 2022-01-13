import React, { useState } from "react"

// 断点布局
const AppContext = React.createContext<object>(null);
AppContext.displayName = "AppContext"


export const AppProvider = ({ children }:Element) => {
    const [isMobile] = useState(null);

    return <AppContext.Provider children={children} value={{isMobile }} />
}

export const useAppProvider = () => {
    const context = React.useContext(AppContext)
    if (!context) {
        throw new Error('useAuth必须在AppProvider中使用')
    }
    return context
}
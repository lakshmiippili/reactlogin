import React from "react"
const AuthContext = React.createContext({
    isLoggedIn :false,
    onLogout:()=>{},
    onLogin:()=>{}
})

export default AuthContext
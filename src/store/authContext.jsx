import React from "react"
import { useState, createContext } from "react"
const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    id: "",
    name: "",
    email: "",
    role: "",
    lang: "",
    langHandlers: () => {},
    login: (token, id, name, email, role) => {},
    logout: () => {},
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem("token")
    const [token, SetToken] = useState(initialToken)

    const initialid = localStorage.getItem("id")
    const [id, Setid] = useState(initialid)

    const initialEmail = localStorage.getItem("email")
    const [email, SetEmail] = useState(initialEmail)

    const initialRole = localStorage.getItem("role")
    const [role, SetRole] = useState(initialRole)

    const initialName = localStorage.getItem("name")
    const [name, SetName] = useState(initialName)

    const initialLang = localStorage.getItem("Lang")

    const Arabic = !!initialLang

    const UserIsLoggedIn = !!token

    const langHandler = () => {
        const isArabic = localStorage.getItem("Lang")
        console.log(isArabic)
        if (isArabic === "true") {
            console.log(isArabic)
            localStorage.removeItem("Lang")
            return null
        } else {
            console.log(isArabic)
            localStorage.removeItem("Lang")
            localStorage.setItem("Lang", "true")
            return true
        }
    }

    const loginHandler = (token, id, name, email, role) => {
        console.log(token, id, name, email, role)
        SetToken(token)
        Setid(id)
        SetEmail(email)
        SetName(name)
        SetRole(role)
        localStorage.setItem("token", token)
        localStorage.setItem("id", id)
        localStorage.setItem("email", email)
        localStorage.setItem("name", name)
        localStorage.setItem("role", role)
    }

    const logOutHandler = () => {
        SetToken(null)
        Setid(null)
        SetEmail(null)
        SetName(null)
        SetRole(null)
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
    }

    const contextValue = {
        token: token,
        id: id,
        name: name,
        email: email,
        role: role,
        isLoggedIn: UserIsLoggedIn,
        lang: Arabic,
        langHandlers: langHandler,
        login: loginHandler,
        logout: logOutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext

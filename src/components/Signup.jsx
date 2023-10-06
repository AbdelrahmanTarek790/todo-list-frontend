import { Alert, Checkbox } from "@mui/material"
import axios from "axios"
import { useContext, useState } from "react"
import apiUrl from "../store/constant"
import AuthContext from "../store/authContext"
const label = { inputProps: { "aria-label": "Checkbox demo" } }

export const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [passwordConfirm, setpasswordConfirm] = useState("")
    const [isError, setError] = useState(false)
    const [isErrorMessage, setErrorMessage] = useState("")
    const classes = "flex place-items-center w-[90%] mt-10 justify-center h-12 font-medium rounded-2xl"
    const authCtx = useContext(AuthContext)

    const submitHandler = () => {
        setError(false)
        axios
            .post(`${apiUrl}/signup`, { username, email, password, passwordConfirm })
            .then((el) => {
                const data = el.data
                authCtx.login(data.token, data.user._id, data.user.username, data.user.email, data.user.role)
            })
            .catch((err) => {
                setError(true)
                console.log(err)
                if (err.response && err.response.data) {
                    const errorData = err.response.data
                    const validationErrors = errorData.message
                    if (validationErrors.username) {
                        console.log(validationErrors.username.message)
                        setErrorMessage(validationErrors.username.message)
                        return
                    }
                    if (validationErrors.email) {
                        console.log(validationErrors.email.message)
                        setErrorMessage(validationErrors.email.message)
                        return
                    }
                    if (validationErrors.password) {
                        console.log(validationErrors.password.message)
                        setErrorMessage(validationErrors.password.message)
                        return
                    }
                    if (validationErrors.passwordConfirm) {
                        console.log(validationErrors.passwordConfirm.message)
                        setErrorMessage(validationErrors.passwordConfirm.message)
                        return
                    }

                    console.log(errorData)
                    setErrorMessage(errorData.message)
                } else {
                    // Handle network or other errors
                    console.log("Network Error:", err)
                }
            })
    }
    return (
        <div className="flex place-items-center flex-col mt-10 pb-6">
            {isError && (
                <Alert className=" w-[90%] mb-5" severity="error">
                    {isErrorMessage}
                </Alert>
            )}
            <input
                className="w-[90%] h-12  pl-4 fontAwesome rounded-lg"
                placeholder=" &#xf0e0; &nbsp; Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
            />
            <input
                className="w-[90%] h-12  pl-4 mt-7 fontAwesome rounded-lg"
                placeholder=" &#xf0e0; &nbsp; Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="w-[90%]  h-12 pl-4 mt-7 fontAwesome rounded-lg"
                placeholder=" &#xf084; &nbsp; Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
            />
            <input
                className="w-[90%]  h-12 pl-4 mt-7 fontAwesome rounded-lg"
                placeholder=" &#xf084; &nbsp; Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setpasswordConfirm(e.target.value)}
                autoComplete="new-password"
            />

            <div className="w-[90%] mt-4 flex place-items-center">
                <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                        color: "#6f11f5",
                        "&.Mui-checked": {
                            color: "#6f11f5",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                    }}
                />
                <p className="text-sm font-medium">Accept Terms & Conditions</p>
            </div>

            <div onClick={submitHandler} className={`${classes} bg-[#6f11f5] text-white cursor-pointer buttonHover`}>
                <i className="fa-solid fa-user mr-2"></i>
                <p>Sign in</p>
            </div>
        </div>
    )
}

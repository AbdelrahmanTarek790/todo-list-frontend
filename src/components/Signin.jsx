import { Alert, Checkbox } from "@mui/material"
import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import apiUrl from "../store/constant"
import AuthContext from "../store/authContext"
const label = { inputProps: { "aria-label": "Checkbox demo" } }
export const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setError] = useState(false)
    const [isErrorMessage, setErrorMessage] = useState("")
    const classes = "flex place-items-center w-[90%] mt-10 justify-center h-12 font-medium rounded-2xl"
    const authCtx = useContext(AuthContext)

    const submitHandler = async () => {
        setError(false)
        // axios
        //     .post(`${apiUrl}/signin`, { password, email })
        //     .then((el) => {
        //         console.log(el)
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data)
        //     })

        try {
            const response = await axios.post(`${apiUrl}/signin`, { password, email })
            const data = response.data
            console.log(data)
            authCtx.login(data.token, data.user._id, data.user.username, data.user.email, data.user.role)
            return
        } catch (error) {
            console.log(error.response)
            setErrorMessage(error.response.data.message)
            setError(true)
        }
    }

    return (
        <div className="flex place-items-center flex-col mt-10 ">
            {isError && (
                <Alert className=" w-[90%] mb-5" severity="error">
                    {isErrorMessage}
                </Alert>
            )}

            <input
                className="w-[90%] h-12  pl-4 fontAwesome rounded-lg"
                placeholder=" &#xf0e0; &nbsp; Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
            />
            <input
                className="w-[90%]  h-12 pl-4 mt-10 fontAwesome rounded-lg"
                placeholder=" &#xf084; &nbsp; Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
            />
            <div className="w-[90%] mt-4">
                <p className="text-sm ml-1 text-[#a26af8] hover:underline font-semibold hover:cursor-pointer  ">Forget Password ?</p>
            </div>
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
                <p className="text-sm font-medium">Remember Me</p>
            </div>

            <div onClick={submitHandler} className={`${classes} bg-[#6f11f5] text-white cursor-pointer buttonHover`}>
                <i className="fa-solid fa-user mr-2"></i>
                <p>Sign in</p>
            </div>
        </div>
    )
}

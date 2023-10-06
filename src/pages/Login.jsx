import { useEffect, useState } from "react"
import "../css/Login.css"
import { Signin } from "../components/Signin"
import { Link } from "react-router-dom"
import { Signup } from "../components/Signup"
export const Login = () => {
    const [isUrl, setUrl] = useState(window.location.pathname)
    useEffect(() => {
        setUrl(window.location.pathname)
    }, [])
    const classes = "flex place-items-center w-40 justify-center h-12 font-medium rounded-2xl"
    const ListLogin = [
        {
            name: "Sign in",
            URL: "/signin",
        },
        {
            name: "Sign up",
            URL: "/signup",
        },
    ]
    return (
        <div className="w-full flex justify-center place-items-center login">
            <div className="w-[450px] bg-white/50 rounded-2xl">
                <div className="flex justify-center gap-5 mt-7 ">
                    {ListLogin.map((el, key) => (
                        <Link
                            to={el.URL}
                            key={key}
                            onClick={() => {
                                setUrl(el.URL)
                            }}
                        >
                            <div className={isUrl === el.URL ? `${classes} bg-[#6f11f5] text-white buttonHover` : `${classes} text-[#6f11f5] bg-white`}>
                                <i className="fa-solid fa-user mr-2"></i>
                                <p>{el.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                {isUrl === "/signin" && (
                    <div>
                        <Signin></Signin>
                        <div
                            className={`flex place-items-center w-[90%] mt-4 pb-6 ml-3  justify-center h-12 font-medium rounded-xl  text-black text-left`}
                        >
                            <div className="w-full">
                                <span className="ml-3 text-sm">Don't have an account? &nbsp;</span>
                                <Link
                                    onClick={() => {
                                        setUrl("/signup")
                                    }}
                                    className="text-base text-[#a26af8] cursor-pointer hover:underline"
                                    to="/signup"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                {isUrl === "/signup" && <Signup></Signup>}
            </div>
        </div>
    )
}

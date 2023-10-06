import { Link } from "react-router-dom"
import "../css/LeftNavigator.css"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../store/authContext"
export const LeftNavigator = () => {
    const [isUrl, setUrl] = useState(window.location.pathname)
    const authCtx = useContext(AuthContext)
    useEffect(() => {
        setUrl(window.location.pathname)
    }, [])
    const listMap = [
        {
            name: "Dashboard",
            className: "fa-solid fa-layer-group  text-2xl",
            style: { padding: " 8px 10px" },
            url: "/dashboard",
        },
        {
            name: "Projects",
            className: "fa-solid fa-chart-bar text-2xl",
            style: { padding: " 8px 10px", marginRight: "2px" },
            url: "/projects",
        },
        // {
        //     name: "Team Members",
        //     className: "fa-solid fa-users  text-2xl",
        //     style: { padding: " 8px 10px", marginRight: "-4px" },
        //     url: "/team-members",
        // },
        // {
        //     name: "Messages",
        //     className: "fa-regular fa-comments text-2xl",
        //     style: { padding: " 8px 10px", marginRight: "-5px" },
        //     url: "/messages",
        // },
        {
            name: "Settings",
            className: "fa-solid fa-gear text-2xl",
            style: { padding: " 6px 10px", marginRight: "2px" },
            url: "/settings",
        },
    ]

    return (
        <div className="h-full bg-white w-64 flex flex-col gap-1">
            <br />
            <br />

            <div className="flex place-items-center place-content-center ml-6 gap-6 w-10/12 hover:bg-slate-100 rounded transition-all duration-300">
                <i className="fa-solid fa-user-astronaut text-2xl"></i>
                <div>
                    <p className="text-base">Abdelrahman</p>
                    <p className="text-xs">Abdelrahman</p>
                </div>
                <i className="fa-solid fa-sort-down"></i>
            </div>
            <br />
            <br />

            {listMap.map((el, key) => (
                <Link
                    key={key}
                    onClick={() => {
                        setUrl(el.url)
                    }}
                    style={el.name === "Logout" ? { marginTop: "240px" } : { marginTop: "20px" }}
                    to={el.url}
                >
                    <div className="flex place-items-center ml-8 gap-6 LNHover  w-60 pt-2 pb-2 pl-1">
                        <i className={isUrl === el.url && el.name != "Logout" ? `active ${el.className} ` : el.className} style={el.style}></i>
                        <p
                            style={el.name === "Logout" ? { color: "red", fontSize: "20px" } : {}}
                            className={isUrl === el.url && el.name != "Logout" ? `text-base text-black font-bold letter` : `text-base `}
                        >
                            {el.name}
                        </p>
                    </div>
                </Link>
            ))}

            <div
                onClick={authCtx.logout}
                className="flex place-items-center ml-8 gap-6 LNHover w-4/5 rounded-xl pt-2 pb-2 mt-[400px] pl-1 cursor-pointer hover:bg-slate-200 transition-all"
            >
                <i className="fa-solid fa-arrow-right-from-bracket text-2xl ml-3 text-red-500" style={{ marginRight: "10px" }}></i>
                <p style={{ color: "red", fontSize: "20px" }} className="text-base ">
                    Logout
                </p>
            </div>
        </div>
    )
}

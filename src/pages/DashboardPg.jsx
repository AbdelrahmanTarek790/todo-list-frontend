import { useContext, useEffect, useState } from "react"
import "../css/Dashboard.css"

import AuthContext from "../store/authContext"
import { MenuItem, TextField } from "@mui/material"
import apiUrl from "../store/constant"
import axios from "axios"
export const DashboardPg = () => {
    const authCtx = useContext(AuthContext)
    const [totalProj, setTotal] = useState(0)
    const [compProj, setComp] = useState(0)
    const [progressProj, setProgress] = useState(0)
    const [assignProj, setAssign] = useState(0)
    useEffect(() => {
        axios.get(`${apiUrl}/list/${authCtx.id}`).then((res) => {
            setTotal(res.data["totalProjects"])
            setComp(res.data.counts.Complete)
            setProgress(res.data.counts["In Progress"])
            setAssign(res.data.counts.Assigned)
        })
    }, [])

    const listArray = [
        {
            name: "TOTAL PROJECT",
            number: totalProj,
            color: "linear-gradient(to left top, #ff2aaf, #ff46b7, #ff5bbf, #ff6cc7, #ff7cce)",
            icon: " mt-5 ml-20 text-7xl opacity-40 text-white fa-solid fa-diagram-project",
        },
        {
            name: "ASSIGNED",
            number: assignProj,
            color: "linear-gradient(to left top, #6635f7, #774bf8, #865ff9, #9472fa, #a284fa)",
            icon: "mt-5 ml-20 fa-solid fa-list-check text-7xl opacity-40 text-white",
        },
        {
            name: "IN PROGRESS",
            number: progressProj,
            color: "linear-gradient(to left top, #fc8d41, #fd9751, #fda060, #fda970, #fdb27f)",
            icon: " mt-5 ml-24 text-7xl opacity-40 text-white fa-solid fa-spinner rotate-90",
        },
        {
            name: "COMPLETED",
            number: compProj,
            color: "linear-gradient(to left top, #10ac33, #17b63a, #1dc140, #23cb47, #28d64e)",
            icon: "mt-5 ml-24 text-7xl opacity-40 text-white  fa-regular fa-circle-check",
        },
    ]
    return (
        <div className="mt-10 ml-5 w-6/12 mr-5" style={{ minWidth: "570px", maxWidth: "1000px" }}>
            {/* <input
                type="search"
                className="h-12 pl-11"
                placeholder="I'm searching for ..."
                style={{
                    backgroundColor: "#f1f3f9",
                    width: "100%",
                    borderRadius: "15px",
                }}
            />
            <i
                style={{
                    position: "absolute",
                    left: "286px",
                    top: "50px",
                    fontSize: "18px",
                    color: "#9ca3af",
                    borderRight: "1px solid #ada9a9",
                    padding: "4px 6px 4px 0px",
                }}
                className="fa-solid fa-magnifying-glass"
            ></i> */}
            <div className="">
                <h1 className="text-2xl font-bold text-primarycolor">Dashboard</h1>
                <p className="text-gray-400 text-x mb-5">See your overall team performance</p>
            </div>
            <div className=" flex justify-between">
                {listArray.map((el, key) => (
                    <div
                        key={key}
                        style={{
                            width: "140px",
                            height: "200px",
                            overflow: "hidden",
                            backgroundImage: el.color,
                            borderRadius: "15px",
                        }}
                    >
                        <h1 className="mt-5 ml-4 text-white font-semibold ">{el.number}</h1>
                        <h2 className="mt-5 ml-4 text-gray-100 font-semibold text-sm">{el.name}</h2>
                        <i className={el.icon}></i>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="mt-5 w-[100%] h-f bg-white" style={{ height: "578px", borderRadius: "15px" }}>
                    <div className="ml-4 pt-6 flex place-items-center justify-between">
                        <h1 className="text-xl font-bold text-primarycolor">Performance</h1>
                        <h1 className="text-base font-semibold pl-2 mr-4 pr-2 mt-1  text-[#6d40f7]">See all</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

import { useContext, useEffect, useState } from "react"
import Calendar from "react-calendar"
import apiUrl, { pics } from "../store/constant"
import AuthContext from "../store/authContext"
import { MenuItem, TextField } from "@mui/material"
import Popup from "../components/Popup"
import axios from "axios"
import { ProjectList } from "../components/ProjectList"
export const RightNav = () => {
    const [date, setDate] = useState(new Date())
    const [isOpen, setIsOpen] = useState(false)
    const [noItems, setnoItems] = useState(false)
    const authCtx = useContext(AuthContext)
    const [list, setList] = useState([])
    const [totalProj, setTotal] = useState(0)
    useEffect(() => {
        axios.get(`${apiUrl}/list/${authCtx.id}`).then((res) => {
            setTotal(res.data.length)
            console.log(res)
            if (res.data.counts.Assigned === 0 && res.data.counts["In Progress"] === 0) {
                setnoItems(true)
            }
            setList(res.data["groupedTodolist"]["In Progress"])
        })
    }, [])
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }

    // console.log(pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)])
    const [listAvatar, setAvatar] = useState([
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
        {
            Image: pics[0][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
        },
    ])

    const [listProject, setProject] = useState([
        {
            name: "Meeting with client",
            Image: pics[1][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
            time: "Google Meet - 12.00",
        },
        {
            name: "Team Evaluation",
            Image: pics[1][Math.floor(Math.random() * (4 - 1 + 1) + 1)],
            time: "Google Meet - 12.00",
        },
    ])

    return (
        <div className="bg-white w-5/12 ">
            {/* <div className="flex justify-between place-items-center ml-4 mr-4 mt-12">
                <i className="fa-regular fa-bell text-3xl text-[#998eac]"></i>
                <div>
                    <button className="mr-2 bg-gradient-to-tr from-[#fd5ca5] to-[#fb7f7a] text-white btnbase ">Add a Project</button>
                    <button className="text-black btnbase btnbase2">Schedule a Shot</button>
                </div>
            </div> */}
            {isOpen && <Popup handleClose={togglePopup} />}
            <div className="ml-4 mt-3 pt-6 flex place-items-center justify-between">
                <h1 className="text-xl font-bold text-primarycolor">My Tasks</h1>
                <h1
                    className="text-2xl font-semibold pl-[7px] mr-4 pr-[6px] plus-button"
                    onClick={togglePopup}
                    style={{
                        border: "3px solid #9a90ac ",
                        color: "#9a90ac",
                        borderRadius: "15px",
                    }}
                >
                    +
                </h1>
            </div>
            {!noItems &&
                list.map(
                    (el, key) =>
                        el.done != "Complete" && (
                            <ProjectList value={el} ></ProjectList>
                        )
                )}
            {noItems && (
                <div className="h-[50%] text-center text-2xl font-bold flex place-items-center place-content-center">
                    <p>There is no lists</p>
                </div>
            )}
            {/* <div className="h-[172px]">
                <div className="ml-4 pt-6 ">
                    <h1 className="text-2xl font-bold text-primarycolor">Team Members</h1>
                </div>
                <div className="  mt-4 flex justify-evenly">
                    {listAvatar.map((el, key) => (
                        <div key={key} className="w-[60px]">
                            <img src={el?.Image || ""} alt="" />
                        </div>
                    ))}
                </div>
            </div> */}
            {/* <Calendar
                className="ml-4 mr-4"
                onChange={(newValue) => {
                    setDate(newValue)
                    console.log(newValue)
                }}
                selectRange={true}
                value={date}
            />
            <div>
                <div className="ml-4 pt-6 flex place-items-center justify-between">
                    <h1 className="text-2xl font-bold text-primarycolor">Today&apos;s Schedule</h1>
                    <h1 className="text-xl font-semibold pl-2 mr-4 pr-2 mt-1  text-[#6d40f7]">See all</h1>
                </div>
                <div className="flex mt-[80px]  justify-center">
                    {listProject.map((el, key) => (
                        <div key={key} className="w-[47%]">
                            <img src={el?.Image} />
                            <p className="text-base font-medium ml-3 mt-4 mb-2 text-[#412d64]">{el?.name}</p>
                            <div className="flex place-items-center">
                                <i className="fa-solid fa-video ml-3 text-[#9275c5]"></i>{" "}
                                <span className="text-sm font-semibold ml-3 text-[#9275c5]">{el?.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

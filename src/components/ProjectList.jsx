import { MenuItem, TextField } from "@mui/material"
import apiUrl, { pics } from "../store/constant"
import axios from "axios"
import { useState } from "react"

export const ProjectList = (props) => {
    props.value.image = pics[1][Math.floor(Math.random() * (4 - 1 + 1) + 1)]
    const [list, setList] = useState(props.value)

    console.log(list)
    const [display, setDisplay] = useState("block")
    const currencies = [
        {
            value: "In Progress",
            label: "In Progress",
        },
        {
            value: "Assigned",
            label: "Assigned",
        },
        {
            value: "Complete",
            label: "Complete",
        },
    ]
    return (
        <div>
            <div className={`ml-4 mt-4 mr-4`} style={{ display: display }}>
                <div className="flex ">
                    <img src={list.image} width={"40%"} />
                    <div className=" max-h-full flex flex-col justify-between" style={{ width: "100%" }}>
                        <div className="flex justify-between ">
                            <p className="text-lg font-medium h-20 overflow-clip w-[80%]">
                                {list.title} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus magnam molestias vel mollitia
                                consequatur quidem voluptatem explicabo hic. Cum nesciunt corporis tempore magnam eaque non earum facilis inventore
                                accusamus illo.
                            </p>
                            <TextField
                                id="standard-select-currency"
                                select
                                label=""
                                defaultValue=""
                                onChange={(ea) => {
                                    axios.put(`${apiUrl}/list/${list._id}`, { done: ea.target.value }).then((res) => {
                                        console.log(res)
                                        // if (ea.target.value === "Complete") {
                                        //     setDisplay("none")
                                        // }
                                        // setList(res.data)

                                        window.location.reload(true)
                                    })
                                }}
                                variant="standard"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-[#9275c5] font-semibold">{list.date}</p>

                            <p
                                className={
                                    list.done === "In Progress"
                                        ? `text-sm text-[#fd9d5b] font-semibold`
                                        : list.done === "Assigned"
                                        ? `text-sm text-[#7c51f8] font-semibold`
                                        : `text-sm text-[#1cbf3f] font-semibold`
                                }
                            >
                                {list.done}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <center>
                <hr className="w-[50%] mt-4"></hr>
            </center>
        </div>
    )
}

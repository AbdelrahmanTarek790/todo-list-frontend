import "../css/Popup.css"
import { useState, useContext } from "react"
import TextField from "@mui/material/TextField"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Alert, CircularProgress } from "@mui/material"
import apiUrl from "../store/constant"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import axios from "axios"
import AuthContext from "../store/authContext"

const Popup = (props) => {
    const [Error, setError] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const authCtx = useContext(AuthContext)

    const [IsReload, SetIsReload] = useState(false)
    const [title, setTitle] = useState("")
    const OnChangeHandler = (e) => {
        setError(false)
        setTitle(e.target.value)
    }
    const classes = "flex place-items-center w-40 justify-center h-12 font-medium rounded-2xl"
    const [date, setDate] = useState("")
    const OnChangeHandlerDate = (e) => {
        setError(false)
        const originalDate = new Date(e.$d)
        const year = originalDate.getFullYear().toString().slice(-2) // Get the last two digits of the year
        const month = (originalDate.getMonth() + 1).toString().padStart(2, "0") // Months are zero-based
        const day = originalDate.getDate().toString().padStart(2, "0")
        const hours = originalDate.getHours().toString().padStart(2, "0")
        const minutes = originalDate.getMinutes().toString().padStart(2, "0")
        const ampm = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        const formattedDate = `${year}/${month}/${day} ${formattedHours}:${minutes} ${ampm}`
        setDate(formattedDate)
    }

    const Submithandler = () => {
        console.log(date)

        axios
            .post(`${apiUrl}/list`, {
                title,
                date,
                userId: authCtx.id,
            })
            .then((res) => {
                window.location.reload(true)
            })
    }

    return (
        <div>
            <div className="popup-box">
                <div className="box">
                    <div style={{ color: "black" }} className="modal-header">
                        <button onClick={props.handleClose} className="btn--close" type="button" data-testid="close-modal">
                            <svg style={{ width: "25px" }} viewBox="0 0 24 24" className="">
                                <path d="M17 7L7 17" stroke="#6f48eb" strokeWidth="2"></path>
                                <path d="M7 7L17 17" stroke="#6f48eb" strokeWidth="2"></path>
                            </svg>
                        </button>
                    </div>

                    {Error && (
                        <Alert style={{ marginBottom: "10px" }} severity="error">
                            {ErrorMsg}
                        </Alert>
                    )}
                    <div className="w-full flex  justify-between  mt-8">
                        <TextField
                            className="w-[45%]"
                            sx={{ marginBottom: "15px" }}
                            id="standard-basic"
                            value={title}
                            onChange={OnChangeHandler}
                            label="Title"
                            variant="standard"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker value={date} onChange={OnChangeHandlerDate} className="w-[45%]" label="Basic date time picker" />
                        </LocalizationProvider>
                    </div>
                    <div className="w-full flex justify-end mt-8">
                        <div onClick={Submithandler} className={`${classes} bg-[#6f11f5] text-white buttonHover cursor-pointer`}>
                            <i className="fa-solid fa-user mr-2"></i>
                            <p>Post List</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup

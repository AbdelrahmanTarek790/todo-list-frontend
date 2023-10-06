import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LeftNavigator } from "./components/LeftNavigator"
import { RightNav } from "./pages/RightNav"
import { DashboardPg } from "./pages/DashboardPg"
import { Login } from "./pages/Login"
import { useContext } from "react"
import AuthContext from "./store/authContext"

function App() {
    const authCtx = useContext(AuthContext)
    return (
    
        <BrowserRouter>
            {authCtx.isLoggedIn && (
                <Routes>
                    <Route
                        path="dashboard"
                        element={
                            <>
                                <LeftNavigator></LeftNavigator>
                                <DashboardPg />
                                <RightNav />
                            </>
                        }
                    ></Route>

                    <Route
                        path="settings"
                        element={
                            <>
                                <LeftNavigator></LeftNavigator>
                            </>
                        }
                    ></Route>
                    <Route
                        path="team-members"
                        element={
                            <>
                                <LeftNavigator></LeftNavigator>
                            </>
                        }
                    ></Route>
                    <Route
                        path="projects"
                        element={
                            <>
                                <LeftNavigator></LeftNavigator>
                            </>
                        }
                    ></Route>
                    <Route
                        path="messages"
                        element={
                            <>
                                <LeftNavigator></LeftNavigator>
                            </>
                        }
                    ></Route>
                    <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
            )}
            {!authCtx.isLoggedIn && (
                <Routes>
                    <Route
                        path="signup"
                        element={
                            <>
                                <Login></Login>
                            </>
                        }
                    ></Route>
                    <Route
                        path="signin"
                        element={
                            <>
                                <Login></Login>
                            </>
                        }
                    ></Route>
                    <Route path="*" element={<Navigate to="signin" />} />
                </Routes>
            )}
        </BrowserRouter>
    )
}

export default App

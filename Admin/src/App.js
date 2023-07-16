import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import List from "./Pages/List/List";
import Single from "./Pages/Single/Single";
import New from "./Pages/NewUser/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./FormSource";
import "./Style/Dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import { AuthContext } from "./Context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./Datatablesource";
import NewHotel from "./Pages/NewHotel/NewHotel";
import NewRoom from "./Pages/NewRoom/NewRoom";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={userColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <New
                                            inputs={userInputs}
                                            title="Add New User"
                                        />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="hotels">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={hotelColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <NewHotel />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="rooms">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={roomColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <NewRoom />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

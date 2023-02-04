import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    dispatchLogin,
    fetchUser,
    dispatchGetUser,
} from "./redux/actions/authAction";

import Home from "./components/Home";
import Login from "./components/body/auth/Login";
import Header from "./components/header/Header";
import Register from "./components/body/auth/Register";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import NotFound from "./components/utils/NotFound/NotFound";
import ForgotPassword from "./components/body/auth/ForgotPassword";
import axios from "axios";
import ResetPassword from "./components/body/auth/ResetPassword";
import Profile from "./components/body/profile/Profile";

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    const { isLogged } = auth;

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post("/user/refresh_token", null);
                dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
            };
            getToken();
        }
    }, [auth.isLogged, dispatch]);

    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin());

                return fetchUser(token).then((res) => {
                    dispatch(dispatchGetUser(res));
                });
            };
            getUser();
        }
    }, [token, dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route
                        path="/login"
                        element={isLogged ? <NotFound /> : <Login />}
                        exact
                    />
                    <Route path="/register" element={isLogged ? <NotFound /> : <Register />} exact />
                    <Route path="/profile" element={isLogged ? <Profile /> : <NotFound />} exact />
                    <Route path="/forgot_password" element={isLogged ? <NotFound /> : <ForgotPassword />} exact />
                    <Route path="/user/reset/:token" element={isLogged ? <NotFound /> : <ResetPassword />} exact />
                    <Route
                        path="/user/activate/:activation_token"
                        element={<ActivationEmail />}
                        exact
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

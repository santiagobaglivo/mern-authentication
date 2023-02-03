import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {dispatchLogin} from './redux/actions/authAction'

import Home from "./components/Home";
import Login from "./components/body/auth/Login";
import Header from "./components/header/Header";
import Register from "./components/body/auth/Register";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import axios from 'axios'

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post("/user/refresh_token", null);
                dispatch({type: 'GET_TOKEN', payload: res.data.access_token});
            };
            getToken();
        }
    }, [auth.isLogged, dispatch]);

    useEffect(() => {
      if(token){
        const getUser = () => {
          dispatch(dispatchLogin())
        }
        getUser()
      }
    }, [token])

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/login" element={<Login />} exact />
                    <Route path="/register" element={<Register />} exact />
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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorMsg, showSuccessMsg } from "../../utils/Notification";
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
};

function Login() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const history = useNavigate()
    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/login", {
                email,
                password,
            });
            setUser({ ...user, err: "", success: res.data.msg });
            localStorage.setItem("firstLogin", true);
            dispatch(dispatchLogin())
            history('/')
        } catch (error) {
            error.response.data.msg &&
                setUser({ ...user, err: error.response.data.msg, success: "" });
        }
    };

    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrorMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Email Addres</label>
                    <input
                        htmlFor=""
                        type="text"
                        placeholder="Enter a email adress"
                        id="email"
                        value={email}
                        onChange={handleChangeInput}
                        name="email"
                    ></input>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input
                        htmlFor=""
                        type="password"
                        placeholder="Enter a Password"
                        id="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                    ></input>
                </div>
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your password</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

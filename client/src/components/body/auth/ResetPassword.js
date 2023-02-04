import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {showErrorMsg, showSuccessMsg} from '../../utils/Notification'
import { isLength, isMatch } from "../../utils/validations/Validation";

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: '',
}

function ResetPassword() {

    const {token} = useParams();
    const [data, setData] = useState(initialState)

    const {password, cf_password, err, success} = data;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const handleResetPassword = async () => {
        if(isLength(password)){
            return setData({...data, err: 'Password must be at least 6 characters.', success: ''})
        }
        if(!isMatch(password, cf_password)){
            return setData({...data, err: 'Password does not match.', success: ''}) 
        }

        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })
            
            return setData({...data, err: '', success: res.data.msg})

        } catch (error) {
            error.response.data.msg && setData({...data,err: error.response.data.msg, success: ''})
        }
    }

    return (
        <div className="fg_pass">
            <h2>Reset Your Password</h2>
            <div className="row">
                {err && showErrorMsg(err)}
                {success && showSuccessMsg(success)}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChangeInput}
                />
                                <input
                    type="password"
                    name="cf_password"
                    id="cf_password"
                    value={cf_password}
                    onChange={handleChangeInput}
                />
                <button onClick={handleResetPassword}>Reset your passowrd</button>
            </div>
        </div>
    );
}


export default ResetPassword;

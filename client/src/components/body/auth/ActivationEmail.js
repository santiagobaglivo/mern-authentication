import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../../utils/Notification";
import axios from "axios";

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(
                        "http://localhost:5000/user/activation",
                        { activation_token }
                    );
                    setSuccess(res.data.msg);
                } catch (error) {
                    console.log(error)
                    err.response.data.msg && setErr(err.response.data.msg);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <div className="activate_page">
            {err && showErrorMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail;

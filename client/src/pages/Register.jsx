import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleRegiser = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/auth/register", {username, email, password})
            navigate('/login')
        } catch(err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input required type="text" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}/>
                <input required type="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}/>
                <input required type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}/>
                <button onClick={handleRegiser}>Register</button>
                { error && <p>{error}</p> }
                <span>Do you have an account? <Link to="/Login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register;
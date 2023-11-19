import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login({username, password})
            navigate('/')
        } catch(err) {
            setError(err.response.data)
        }
    }

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
            <input required type="text" value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}/>
                <input required type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}/>
                <button onClick={handleLogin}>Login</button>
                { error && <p style={{color:'red'}}>{error}</p> }
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login;
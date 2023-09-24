import React from "react";
import Logo from "../assets/friendsLogo.jpg";
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className="navbar">
            <div className="container">
                <a className="logo" href="/">
                    <img src={Logo} width={200} height={130} alt="" />
                </a>
                <div className="links">
                    <Link className="link" to="/calendar"><h6>Calendar</h6></Link>
                    <Link className="link" to="/Split"><h6>Split</h6></Link>
                    <Link className="link" to="/Shopping List"><h6>Market</h6></Link>
                    <Link className="link" to="/Chores"><h6>Chores</h6></Link>
                    <Link className="link" to="/Plants"><h6>Plants</h6></Link>
                    <span>Setting</span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
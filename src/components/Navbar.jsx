import React from "react";
import Logo from "../assets/friendsLogo.jpg";
import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} width={200} height={130} alt="" />
                </div>
                <div className="links">
                    {/* to do link for pages or components like? */}
                    <Link className="link" to="/calendar"><h6>Calendar</h6></Link>
                    <Link className="link" to="/?cat=Split"><h6>Split</h6></Link>
                    <Link className="link" to="/?cat=Shopping List"><h6>Market</h6></Link>
                    <Link className="link" to="/?cat=Chores"><h6>Chores</h6></Link>
                    <Link className="link" to="/?cat=Plants"><h6>Plants</h6></Link>
                    <span>Setting</span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
import React from "react";
import Logo from "../assets/friendsLogo.jpg";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const { currUser, logout } = useContext(AuthContext);
    console.log(currUser)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="navbar">
            <div className="container">
                <a className="logo" href="/">
                    <img src={Logo} width={200} height={130} alt="" />
                </a>
                <div className="links">
                    <Link className="link" to="/calendar"><h6>Calendar</h6></Link>
                    <Link className="link" to="/split"><h6>Split</h6></Link>
                    <Link className="link" to="/market"><h6>Market</h6></Link>
                    <Link className="link" to="/chores"><h6>Chores</h6></Link>
                    <Link className="link" to="/plants"><h6>Plants</h6></Link>
                    <div className="dropdown">
                        <span onClick={handleOpen}>Setting</span>
                        {open ? (
                            <ul className="menu">
                                <li className="menu-item">
                                    <button>Menu 1</button>
                                </li>
                                <li className="menu-item">
                                    <Link to="/settings" onClick={handleOpen}>Tenants</Link>
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    {currUser ? 
                        <span onClick={logout}> Logout </span> : 
                        <Link className="link" to="/login"> Login </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
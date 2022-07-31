import React from 'react';
import {Link} from "react-router-dom";
import '../styles/navbar.css'
const Navbar = () => {
    return (
        <div className="navbar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/form">Form</Link>
                        </li>
                        <li>
                            <Link to="/news">News</Link>
                        </li>
                    </ul>
                </nav>
        </div>
    );
};

export default Navbar;
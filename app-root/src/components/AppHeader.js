import React from 'react';
import {NavLink} from "react-router-dom";

const AppHeader = (props) => {
    return (
        <header>
            <div>
                <h1>Micro FEs Demo</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/first">First App</NavLink>
                    </li>
                    <li>
                        <NavLink to="/second">Second App</NavLink>
                    </li>
                    <li>
                        <NavLink to="/third">Third App</NavLink>
                    </li>
                    <li>
                        <NavLink to="/fourth">Fourth App</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default AppHeader;

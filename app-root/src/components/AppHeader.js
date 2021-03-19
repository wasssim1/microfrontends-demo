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
                        <NavLink to="/app1">React-App1</NavLink>
                    </li>
                    <li>
                        <NavLink to="/app2">React-App2</NavLink>
                    </li>
                    <li>
                        <NavLink to="/third">IFrame-App1</NavLink>
                    </li>
                    <li>
                        <NavLink to="/fourth">IFrame-App2</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default AppHeader;

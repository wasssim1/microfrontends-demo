import React from 'react';
import {NavLink} from "react-router-dom";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const AppHeader = (props) => {
    return (
        <header>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: "1"}}>Portal</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
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
                        <NavLink to="/app3">IFrame-App1</NavLink>
                    </li>
                    <li>
                        <NavLink to="/app4">IFrame-App2</NavLink>
                    </li>
                    <li>
                        <NavLink to="/app5">IFrame-Dashboard</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default AppHeader;

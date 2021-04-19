import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const AppHeader = (props) => {
    const [ apps, setApps ] = useState([]);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const history = useHistory();

    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => { setAnchorEl(null);};
    const startApp = (app) => {
        handleClose();
        history.push(app.target_path)
    };
    useEffect(() => {
        fetch("/apps.json").then(res => res.json()).then(json => {setApps(json); console.log("APPS", json)});
    }, []);
    return (
        <header>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClick}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: "1"}}>Portal</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <Menu id="startmenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    {apps.map((app, i) =>
                          <MenuItem key={i} onClick={() => startApp(app)}>{app.name}</MenuItem>
                        )
                    }
                </Menu>
            </AppBar>
            <div>
                <h1>Micro FEs Demo</h1>
            </div>
        </header>
    )
};

export default AppHeader;

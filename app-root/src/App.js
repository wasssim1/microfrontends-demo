import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import {CssBaseline, Grid} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import {themeBarmenia} from "@onesty-tech/bvo-theme-react";
import {AppRoute} from "./components/AppRoute";
import {receiveMessage} from "./components/MessageHandler";

function App(props) {
	const [apps, setApps] = useState([]);
	useEffect(() => {
		fetch("/apps.json").then(res => res.json()).then(json => setApps(json));
		window.addEventListener('message', receiveMessage, false);
		return () => {
			window.removeEventListener("message", receiveMessage);
		}
	}, []);
	return (
			<BrowserRouter>
				<ThemeProvider theme={themeBarmenia}>
					<CssBaseline/>
					<div className="AppRoot">
						<AppHeader/>
						<hr/>
						<Grid container>
							<Grid item xm={2}>

							</Grid>
							<Grid item xs={12} xm={10}>
								<Switch>
									<Route exact path="/" render={() => <div>Welcome to the NextGen Portal</div>}/>
									{apps.map((app, i) => <AppRoute key={i} path={app.target_path} app={app}/>)}
									<Route path={"*"} render={(p) =>
											<div><strong>Unknown APP route...there is no App at {p.match.url}</strong></div>}/>
								</Switch>
							</Grid>
						</Grid>

						<div>{props.children}</div>

					</div>

				</ThemeProvider>
			</BrowserRouter>
	);
}

export default App;

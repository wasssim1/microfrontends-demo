import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import MicroPlainHtml from "./components/MicroPlainHtml";
import MicroWebpack from "./components/MicroWebpack";
import {CssBaseline} from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {themeBarmenia} from "@onesty-tech/bvo-theme-react";

const App1 = (props) => {
	const {history} = props;
	return (
			<MicroWebpack history={history} host="http://localhost:3001/app1" name="FirstApp"/>
	)
};

const App2 = (props) => {
	const {history} = props;
	return (
			<MicroWebpack history={history} host="http://localhost:3002/app2" name="SecondApp"/>
	)
};

const App3 = (props) => {
	const {history} = props;
	return (
			<MicroPlainHtml history={history} host="http://localhost:3001/app1" name="IFrameApp1"/>
	)
};

const App4 = (props) => {
	const {history} = props;
	return (
			<MicroPlainHtml history={history} host="http://localhost:3002/app2" name="IFrameApp2"/>
	)
};

const App5 = (props) => {
	const {history} = props;
	return (
			<MicroPlainHtml history={history} host="http://dev-dashboard.bvo.local" name="Dashboard"/>
	)
};

function App(props) {
	return (
			<BrowserRouter>
				<ThemeProvider theme={themeBarmenia}>
					<CssBaseline/>
					<div className="AppRoot">
						<AppHeader/>
						<hr/>
						<Switch>
							<Route exact path="/" render={() => <div>Hello</div>}/>
							<Route path="/app1" component={App1}/>
							<Route path="/app2" component={App2}/>
							<Route exact path="/app3" component={App3}/>
							<Route exact path="/app4" component={App4}/>
							<Route path="/app5" component={App5}/>
							<Route path={"*"} render={(props) =>
									<div><strong>Unknown APP route...there is no App at {props.match.url}</strong></div>}>
							</Route>
						</Switch>
						<div>{props.children}</div>
					</div>
				</ThemeProvider>
			</BrowserRouter>
	);
}

export default App;

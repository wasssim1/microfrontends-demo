import React, {useEffect} from 'react';
import './App.css';
import {Redirect, Route, Router, useRouteMatch} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {StatefulComponent} from "./StatefulComponent";

function App(props) {
	const {history} = props;
	const defaultHistory = createBrowserHistory({basename: process.env.PUBLIC_URL});

	return (
			<div className="AppFirst">
				<Router history={history || defaultHistory}>
					<Route exact path={"/"}><Redirect to="/app1"/></Route>
					<Route exact path="/app1" component={StatefulComponent}/>
					<Route exact path="/app1/details/:id" render={p => <StatefulComponent id={p.match.params.id || 'empty'}/>}/>
					<Route exact path="/details/:id" render={p => <StatefulComponent id={p.match.params.id || 'empty'}/>}/>
					<Route path={"*"}>
						<DebugRouting/>
					</Route>
				</Router>
			</div>
	);
}

function DebugRouting(props) {
	let {path, url, isExact} = useRouteMatch();
	return (
			<div>Url=<b>{url}</b> isExact ? {isExact ? 'true' : 'false'}<br/></div>
	)
}

export default App;

import React from "react";
import './App.css';
import {Redirect, Route, Router} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {StatefulComponent} from "./StatefulComponent";

function App(props) {
    const {history} = props;
    const defaultHistory = createBrowserHistory();

    return (
        <div className="AppFirst">
            <Router history={history || defaultHistory}>
                <Route exact path="/first" component={StatefulComponent}/>
                <Redirect from="/" to="/first"/>
            </Router>
        </div>
    );
}

export default App;

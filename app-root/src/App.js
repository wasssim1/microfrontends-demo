import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import MicroReact from "./components/MicroReact";

const {
    REACT_APP_FIRST_APP_HOST: firstAppHost,
    REACT_APP_SECOND_APP_HOST: secondAppHost,
} = process.env;

const FirstApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host={firstAppHost} name="FirstApp"/>
    )
};

const SecondApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host={secondAppHost} name="SecondApp"/>
    )
};

function App() {
    return (
        <BrowserRouter>
            <div className="AppRoot">
                <AppHeader/>
                <hr/>
                <Switch>
                    <Route exact path="/" render={() => <div>Hello</div>}/>
                    <Route exact path="/first" component={FirstApp}/>
                    <Route exact path="/second" component={SecondApp}/>
                    {/*<Redirect from="/" to="/first"/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import MicroReact from "./components/MicroReact";

const {
    REACT_APP_FIRST_APP_HOST: firstAppHost,
    REACT_APP_SECOND_APP_HOST: secondAppHost,
} = process.env;//don't work for dockerized/production builds...need to use nginx-templates-env-vars to override

const FirstApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host="http://localhost:3001" name="FirstApp"/>
    )
};

const SecondApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host="http://localhost:3002" name="SecondApp"/>
    )
};

const ThirdApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host="http://dev-contacts-ui.bvo.local" name="ThirdApp"/>
    )
};

const FourthApp = (props) => {
    const {history} = props;
    return (
        <MicroReact history={history} host="http://dev-dashboard.bvo.local" name="Dashboard"/>
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
                    <Route exact path="/third" component={ThirdApp}/>
                    <Route exact path="/fourth" component={FourthApp}/>
                    {/*<Redirect from="/" to="/first"/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

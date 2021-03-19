import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import MicroPlainHtml from "./components/MicroPlainHtml";
import MicroWebpack from "./components/MicroWebpack";


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

const ThirdApp = (props) => {
    const {history} = props;
    return (
        <MicroPlainHtml history={history} host="http://dev-contacts-ui.bvo.local" name="ThirdApp"/>
    )
};

const FourthApp = (props) => {
    const {history} = props;
    return (
        <MicroPlainHtml history={history} host="http://dev-dashboard.bvo.local" name="Dashboard"/>
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
                    <Route path="/app1" component={App1}/>
                    <Route path="/app2" component={App2}/>
                    <Route exact path="/third" component={ThirdApp}/>
                    <Route exact path="/fourth" component={FourthApp}/>
                    <Route path={"*"} render={(props) =>
                          <div><strong>Unknown APP route...there is no App at {props.match.url}</strong></div>}>

                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

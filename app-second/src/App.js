import logo from './logo.svg';
import './App.css';
import {Router} from "react-router-dom";
import {Link} from "react-router-dom";
import {createBrowserHistory} from "history";

function App(props) {
	const {history} = props;
	const defaultHistory = createBrowserHistory({basename: process.env.PUBLIC_URL});

	return (
			<Router history={history || defaultHistory}>
				<div className="AppSecond">
					<Link to={'/app1'}>Goto /app1</Link><br/>
					<Link to={'/app2'}>Goto /app2</Link><br/>
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo"/>
						<p>
							Edit <code>src/App.js</code> and save to reload.
						</p>
						<a
								className="App-link"
								href="https://reactjs.org"
								target="_blank"
								rel="noopener noreferrer"
						>
							Learn React
						</a>
					</header>
				</div>
			</Router>
	);
}

export default App;

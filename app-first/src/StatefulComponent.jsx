import React from "react";
import logo from './logo.svg';
import {Link} from "react-router-dom";

export const StatefulComponent = ({id}) => {
	const [val, setValue] = React.useState(false);
	const change = () => setValue(cur => !cur);

	return <React.Fragment>
		<h2>First App with stateful component</h2>
		<span>ID = {id}</span><br/>
		<label>
			<input type="checkbox" onChange={change} defaultChecked={val}/>
			Toggle-State
		</label>
		<br/>
		<span>State is {val === true ? 'checked' : 'unchecked'}</span>
		<img src={logo} className="App-logo" alt="logo"/>
		<br/>
		<Link to={'/app1'}>Goto /app1</Link><br/>
		<Link to={'/app2'}>Goto /app2</Link><br/>
		<Link to={'/app1/details/1'}>Goto /app1/details/1</Link><br/>
		<Link to={'/app1/details/2'}>Goto /app1/details/2</Link><br/>
		<Link to={'/details/1'}>Goto /details/1</Link> -> don't work inside portal<br/>
		<Link to={'/details/2'}>Goto /details/2</Link> -> don't work inside portal<br/>
	</React.Fragment>
}
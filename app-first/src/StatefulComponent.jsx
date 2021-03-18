import React from "react";

export const StatefulComponent = () => {
	const [val, setValue] = React.useState(false);
	const change = () => setValue(cur => !cur);

	return <React.Fragment>
		<h2>First App with stateful component</h2>
		<label>
			<input type="checkbox" onChange={change} defaultChecked={val}/>
			Toggle-State
		</label>
		<br/>
		<span>State is {val === true ? 'checked' : 'unchecked'}</span>
	</React.Fragment>
}
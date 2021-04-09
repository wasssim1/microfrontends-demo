import {Route} from "react-router-dom";
import MicroPlainHtml from "./MicroPlainHtml";
import MicroWebpack from "./MicroWebpack";
import React from "react";


export const AppRoute = ({app, ...rest}) => {
	return <Route {...rest}
					  render={(props) => (
							  app.type === "webpack" ?
									  <MicroWebpack history={props.history} host={app.host} name={app.name} jsConfigUrl={app.jsConfigUrl}
														 mountFunc={app.mountFunc} unmountFunc={app.unmountFunc}/>
									  :
									  <MicroPlainHtml name={app.name} url={app.host} mount_path={app.target_path}/>
					  )}/>
}
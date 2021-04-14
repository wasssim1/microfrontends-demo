import {Route} from "react-router-dom";
import IFrameUrlApp from "./IFrameUrlApp";
import WebpackNativeApp from "./WebpackNativeApp";
import React from "react";
import WebpackIFrameApp from "./WebpackIFrameApp";


export const AppRoute = ({app, ...rest}) => {
	return <Route {...rest}
					  render={(props) => (
							  app.type === "webpack" ?
									  <WebpackNativeApp history={props.history} host={app.host} name={app.name} jsConfigUrl={app.jsConfigUrl}
															  mountFunc={app.mountFunc} unmountFunc={app.unmountFunc}/>
									  : app.type === "webpackiframe" ?
									  <WebpackIFrameApp history={props.history} name={app.name} url={app.host} mount_path={app.target_path}
															  mountFunc={app.mountFunc} jsConfigUrl={app.jsConfigUrl}/>
									  :
									  <IFrameUrlApp name={app.name} url={app.host} mount_path={app.target_path}/>
					  )}/>
}
import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Container} from "@material-ui/core";
import {useWebpackIFrame} from "./hooks/useWebpackIFrame";
import {useLocation} from "react-router";

//TODO: read and understand https://www.benmarshall.me/responsive-iframes/
const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "hidden",
		position: "relative",
		width: "100%",
		//height: "50vh",
		paddingBottom: "75%",//4:3 format <-- sorgt auch für mindest höhe
		'& iframe': {
			border: "0",
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%"
		}
	},
	rootMax: {
		position: "relative",
		width: "100%",
		height: "auto",
		' & iframe': {
			width: "100vw",
			height: "70vh"
		}
	}
}));

const WebpackIFrameApp = (props) => {
	const { url , name, mount_path, mountFunc, jsConfigUrl, history} = props;
	const styles = useStyles();
	const iFrameElement = useWebpackIFrame({url , name, mount_path, mountFunc, jsConfigUrl, history});
	const containerID = name + "-container";
	return (
			<Container maxWidth="sm" className={styles.root} id={containerID}>
				{iFrameElement.iFrame}
			</Container>
	)
};

WebpackIFrameApp.defaultProps = {
	document,
	window,
};

export default WebpackIFrameApp;

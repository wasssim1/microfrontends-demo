import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Container, Grid, useMediaQuery} from "@material-ui/core";
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

const IFrameUrlApp = (props) => {
	const {name, url, mount_path} = props;
	const styles = useStyles();
	let location = useLocation();
	const iFrameRef = useRef(null);
	const containerID = name + "-container";
	const [ iframeUrl, setIFrameUrl ] = useState(url);
	useEffect(() => {
		setIFrameUrl(url + location.pathname.replace(mount_path, ""));//TODO: copy query-parameters to support iframe-url deep links
	}, [url, mount_path, location])
	return (
			<Container maxWidth="sm" className={styles.root} id={containerID}>
				<iframe ref={iFrameRef} title={name} src={iframeUrl}/>
			</Container>
	)
};

IFrameUrlApp.defaultProps = {
	document,
	window,
};

export default IFrameUrlApp;

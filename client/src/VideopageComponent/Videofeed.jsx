import {
	LocalUser, //render audio and video for local user
	RemoteUser, //render audio and video for remote user
	useIsConnected, //
	useJoin, //useOptions => appid[id the project you created in agora console]channel[id the channel the user is in]token[a string used to verify user permissions when joining a channel]
	useLocalMicrophoneTrack, //create a microphone audio track
	useLocalCameraTrack, //create  a camera audio track
	usePublish, //publish audio and video tracks for all users
	useRemoteUsers, //get all remote users
} from "agora-rtc-react";
import { useState } from "react";
import "./Videofeed.css";
import agoraLogo from "../../assets/images/agora-logo.png";

export const Videofeed = () => {
	const [calling, setCalling] = useState(false);
	const isConnected = useIsConnected(); //stores user connection status

	const AgoraConfig = {
		appid: "7d826d66b1004161a75360668f8ccce3",
		channel: "SIGCONNECTOR",
	};

	useJoin(
		{
			appid: AgoraConfig.appid,
			channel: AgoraConfig.channel,
			token: AgoraConfig.token ? AgoraConfig.token : null,
		},
		calling
	);
	//local user
	const [micOn, setMic] = useState(true);
	const [cameraOn, setCamera] = useState(true);
	const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
	const { localCameraTrack } = useLocalCameraTrack(cameraOn);
	usePublish([localMicrophoneTrack, localCameraTrack]);
	//remote users
	const remoteUsers = useRemoteUsers();

	return (
		<>
			<div className="room">
				{isConnected ? (
					<div className="user-list">
						<div className="user">
							<LocalUser
								audioTrack={localMicrophoneTrack}
								cameraOn={cameraOn}
								micOn={micOn}
								videoTrack={localCameraTrack}
								cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg">
								<samp className="user-name">You</samp>
							</LocalUser>
						</div>
						{remoteUsers.map((user) => (
							<div className="user" key={user.uid}>
								<RemoteUser
									cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
									user={user}>
									<samp className="user-name">{user.uid}</samp>
								</RemoteUser>
							</div>
						))}
					</div>
				) : (
					<div className="join-room">
						<img alt="agora-logo" className="logo" src={agoraLogo} />

						<button
							className={`join-channel ${
								!AgoraConfig.appid || !AgoraConfig.channel ? "disabled" : ""
							}`}
							disabled={!AgoraConfig.appid || !AgoraConfig.channel}
							onClick={() => {
								setCalling(true);
							}}>
							<span>Join Channel</span>
						</button>
					</div>
				)}
			</div>
			{isConnected && (
				<div className="control">
					<div className="left-control">
						<button className="btn" onClick={() => setMic((a) => !a)}>
							<i className={`i-microphone ${!micOn ? "off" : ""}`} />
						</button>
						<button className="btn" onClick={() => setCamera((a) => !a)}>
							<i className={`i-camera ${!cameraOn ? "off" : ""}`} />
						</button>
					</div>
					<button
						className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
						onClick={() => setCalling((a) => !a)}>
						{calling ? (
							<i className="i-phone-hangup" />
						) : (
							<i className="i-mdi-phone" />
						)}
					</button>
				</div>
			)}
		</>
	);
};

export default Videofeed;

// imports
import SignConnect from "../../assets/images/Signconnect.jpg";
import User from "../../assets/images/circled-user-male-skin-type.svg";
import MicOff from "../../assets/icons/muteMicrophone.svg";
import Mic from "../../assets/icons/microphone.svg";
import Videocam from "../../assets/icons/videocam.svg";
import VideocamOff from "../../assets/icons/muteVideocam.svg";
import EllipsesV from "../../assets/icons/ellipsisV.svg";
import Send from "../../assets/icons/send.svg";
import Link from "../../assets/icons/link.svg";
import Upload from "../../assets/icons/upload.svg";
import Message from "../../assets/icons/message.svg";
import EllipsisH from "../../assets/icons/ellipsisH.svg";
import AudioWave from "../../assets/icons/audioWave.svg";
import Expand from "../../assets/icons/expand.svg";
import Compress from "../../assets/icons/compress.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./New_meeting.scss";
import { Outlet, useNavigate } from "react-router-dom";
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

function New_meeting() {
	//
	const [calling, setCalling] = useState(false);
	const isConnected = useIsConnected(); //stores user connection status
	// agora config
	const AgoraConfig = {
		appid: "7d826d66b1004161a75360668f8ccce3",
		channel: "SIGCONNECTOR",
	};
	//
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
	//
	const navigate = useNavigate();

	return (
		<div className="new_meeting">
			<div className="logo ">
				<img src={SignConnect} alt="logo" className=" mx-3" />
				<span>
					<p className="logo_namw">SIGNCONNECT</p>
					<p className="date"></p>
				</span>
			</div>
			<div className="space"></div>
			<div className="availaible_participants"></div>
			<div className="link  ">
				<img src={Link} alt="link" />
				<p>| link to room</p>
			</div>
			<div
				className="profile"
				onClick={() => {
					navigate("/Profle", { state: { email: "mu@gmail.com" } });
				}}>
				<div>
					<img src={User} alt="link" />
					<span>
						<pre className="user_name">Adam Joseph</pre>
						<p className="role">Moderator</p>
					</span>
				</div>
				<img src={EllipsesV} alt="profile" className="ellipsesV" />
			</div>
			<div className="video_feed">
				{isConnected ? (
					<div className="user">
						<LocalUser
							audioTrack={localMicrophoneTrack}
							cameraOn={cameraOn}
							micOn={micOn}
							videoTrack={localCameraTrack}
							cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg">
							<samp className="user-name">You Paa</samp>
							<div
								className="top-right-corner-icons"
								style={{ position: "absolute", right: "5px", top: "5px" }}>
								<img
									src={AudioWave}
									alt="audiowave"
									style={{
										width: "30px",
										aspectRatio: "1",
										margin: "5px",
										backgroundColor: "#2427384d",
										borderRadius: "50%",
										padding: "5px",
									}}
								/>
								<img
									src={cameraOn ? Compress : Expand}
									alt="expand-or-compress"
									style={{
										width: "20px",
										height: "30px",
										margin: "5px",
										backgroundColor: "#2427384d",
										borderRadius: "50%",
										padding: "5px",
									}}
								/>
							</div>
						</LocalUser>
					</div>
				) : (
					<div className="join-room">
						<img alt="SignConnect" className="logo" src={SignConnect} />
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
			<div className="participants">
				<h2>Participants</h2>
				<div>$space*</div>
			</div>
			<div className="speakers">
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
			<div className="chats">
				<h2>Chats</h2>
				<div>1space*</div>
			</div>
			{isConnected && (
				<div className="controls">
					<button className="btn" onClick={() => setMic((a) => !a)}>
						<img
							src={micOn ? MicOff : Mic}
							alt={micOn ? "Mic off" : "Mic On"}
						/>
					</button>
					<button className="btn" onClick={() => setCamera((a) => !a)}>
						<img
							src={cameraOn ? VideocamOff : Videocam}
							alt={cameraOn ? "camera off" : "camera On"}
						/>
					</button>
					<button className="btn" onClick={() => setCamera((a) => !a)}>
						<img src={Upload} alt="Upload" />
					</button>
					<button className="btn" onClick={() => setCamera((a) => !a)}>
						<img src={Message} alt="Message" />
					</button>
					<button className="btn" onClick={() => setCamera((a) => !a)}>
						<img src={EllipsisH} alt="EllipsisH" />
					</button>
				</div>
			)}
			{isConnected && (
				<div className="end_call">
					<button
						className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
						onClick={() => setCalling((a) => !a)}>
						{calling ? <p>End Call</p> : <i className="i-mdi-phone" />}
					</button>
				</div>
			)}
			<div className="type_something">
				<input type="text" placeholder="Type Something..." />
				<button type="submit">
					<img src={Send} alt="" />
				</button>
			</div>
			<Outlet />
		</div>
	);
}

export default New_meeting;

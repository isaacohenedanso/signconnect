// imports
import SignConnect from "../../assets/images/Signconnect.jpg";
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
import User from "../../assets/icons/user.svg";
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
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./New_meeting.scss";

function New_meeting() {
	const [calling, setCalling] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const isConnected = useIsConnected(); //stores user connection status
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
	const { firstName, lastName, email, profile_image, sex, country, city } =
		location.state || {};

	useEffect(() => {
		const allParticipants = document.querySelector(".all-participants");
		// Function to add a participant
		const addParticipant = (name, isLocal = false) => {
			const existingParticipant = allParticipants.querySelector(
				`[data-participant="${name}"]`
			);
			if (!existingParticipant) {
				const participant = document.createElement("div");
				participant.className = "participant";
				participant.style.padding = "5px";
				participant.setAttribute("data-participant", name);

				const img = document.createElement("img");
				img.src = User;
				img.alt = "User";

				const p = document.createElement("p");
				p.textContent = name;
				if (isLocal) {
					p.textContent += " (You)";
				}

				participant.appendChild(img);
				participant.appendChild(p);
				allParticipants.appendChild(participant);
			}
		};

		if (isConnected) {
			// Add local user
			const localUserName = `${firstName} ${lastName}`;
			addParticipant(`${localUserName}`, true);

			// Add remote users
			remoteUsers.forEach((user) => {
				addParticipant(`${user.uid}`, false);
				// console.log("remote participants", remoteUserName.current.value);
				// window.alert("remote participants", remoteUserName.current.value);
			});

			// Clean up function to remove participants that are no longer connected
			return () => {
				const participants = allParticipants.querySelectorAll(".participant");
				participants.forEach((participant) => {
					const name = participant.getAttribute("data-participant");
					if (
						name !== `localUserName` &&
						!remoteUsers.some((user) => user.uid === name)
					) {
						allParticipants.removeChild(participant);
					}
				});
			};
		}
	}, [isConnected, firstName, lastName, remoteUsers]);

	const disappear = () => {
		setTimeout(() => {
			document.querySelector(".alert").style.display = "none";
		}, 3000);
	};
	const ExpandScreen = () => {
		// const videoFeed = document.querySelector(".video_feed");
		// videoFeed;
		console.log("bebe");
	};
	disappear();
	const useShowDate = () => {
		const [dateTime, setDateTime] = useState("");

		useEffect(() => {
			const updateTime = () => {
				let date = new Date();
				let today_Date = date.getDate();
				let Month = date.getMonth();
				let Year = date.getFullYear();
				let Hours = date.getHours().toString().padStart(2, "0");
				let Minutes = date.getMinutes().toString().padStart(2, "0");
				let Months = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				];
				setDateTime(
					`${Months[Month]} ${today_Date} ${Year} | ${Hours}:${Minutes}`
				);
			};

			updateTime(); // Initial call to set the date immediately

			const timerId = setInterval(updateTime, 1000);

			// Cleanup function
			return () => clearInterval(timerId);
		}, []);

		return dateTime;
	};

	return (
		<div>
			{firstName && (
				<div
					className="alert alert-success alert-dismissible fade show text-center"
					role="alert">
					Welcome {firstName} {lastName}
					<button
						className="btn btn-close"
						data-bs-dismiss="alert"
						aria-label="Close"></button>
				</div>
			)}
			<div className="new_meeting">
				<div className="logo ">
					<img src={SignConnect} alt="logo" className=" mx-3" />
					<span>
						<p className="logo_name">SIGNCONNECT</p>
						<p className="date">{useShowDate()}</p>
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
						navigate("/Profile", {
							state: {
								firstName,
								lastName,
								email,
								profile_image,
								sex,
								country,
								city,
							},
						});
						console.log("Profile: ", email);
					}}>
					<div>
						<img src={User} alt="link" />
						<span>
							<p className="user_name">
								{firstName} {lastName}
							</p>
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
								<samp className="user-name">{firstName}</samp>
								<div className="top-right-corner-icons">
									<img
										src={AudioWave}
										alt="audiowave"
										className="audiowave"
										onClick={ExpandScreen}
									/>
									<img
										src={cameraOn ? Expand : Compress}
										alt="expand-or-compress"
										className=""
									/>
								</div>
							</LocalUser>
						</div>
					) : (
						<div className="join-room">
							<img alt="SignConnect" className="logo" src={SignConnect} />
							{/* <input
								type="text"
								placeholder="Enter your userName"
								ref={remoteUserName}
							/> */}
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
					<p>Participants</p>
					<div className="all-participants"></div>
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
					<p>Chats</p>
					<div></div>
				</div>
				{isConnected && (
					<div className="controls">
						<button
							style={{ backgroundColor: micOn ? "#0e74ff" : "#fc484a" }}
							className="btn"
							onClick={() => setMic((a) => !a)}>
							<img
								src={micOn ? MicOff : Mic}
								alt={micOn ? "Mic off" : "Mic On"}
							/>
						</button>
						<button
							style={{ backgroundColor: cameraOn ? "#0e74ff" : "#fc484a" }}
							className="btn"
							onClick={() => setCamera((a) => !a)}>
							<img
								src={cameraOn ? VideocamOff : Videocam}
								alt={cameraOn ? "camera off" : "camera On"}
							/>
						</button>
						<button style={{ backgroundColor: "#0e74ff" }} className="btn">
							<img src={Upload} alt="Upload" />
						</button>
						<button style={{ backgroundColor: "#0e74ff" }} className="btn">
							<img src={Message} alt="Message" />
						</button>
						<button style={{ backgroundColor: "#0e74ff" }} className="btn">
							<img src={EllipsisH} alt="EllipsisH" />
						</button>
					</div>
				)}
				{isConnected && (
					<div className="end_call">
						<button
							style={{ backgroundColor: "#fc484a" }}
							className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
							onClick={() => setCalling((a) => !a)}>
							{calling ? <p>End Call</p> : <i className="i-mdi-phone" />}
						</button>
					</div>
				)}
				<div className="type_something">
					<input type="textarea" placeholder="Type Something..." />
					{/* <input type="text" name="" id="" /> */}
					<button type="submit">
						<img src={Send} alt="" />
					</button>
				</div>
				<Outlet />
			</div>
		</div>
	);
}

export default New_meeting;

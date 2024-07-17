import Section from "../../Section";
import Footer from "../Footer/Footer";
import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Person_Sign_language_Classes from "../../assets/images/Person-Sign-Language-Classes.png";
import VideoChat from "../../assets/icons/videoChat.png";
import Signlanguage from "../../assets/icons/signLanguage.png";
import Message from "../../assets/icons/message.svg";
import Accord from "./Accord";
import "./Home.scss";

function Home() {
	return (
		<>
			<main className="container p-3">
				<Section
					header="Welcome to SignConnect"
					message="The perfect place for anyone who wants to communicate with the deaf community through sign language! Join our community of signers from all over the world and start chatting in sign language today."
					img={Person_Sign_language_Classes}
					className="section_one"
				/>
				<div className="signUp">
					New to Signconnect?
					<NavLink activeclassname="active btn" to="/SignUP">
						Sign UP
					</NavLink>
				</div>
				<span className="features">
					<Section
						header="Real-Time Messaging"
						message="SignConnect includes a messaging feature that allows users to engage in real-time text-based conversation"
						img={Message}
						className="section_two"
					/>
					<Section
						header="Real-Time Video Chat"
						message="SignConnect allows users to engage in real-time video conversations using sign language"
						img={VideoChat}
						className="section_three"
					/>
					<Section
						header="Sign Language Translation"
						message="Sign language translation feature that enables users to translate sign language gestures or signs into written text or spoken language."
						img={Signlanguage}
						className="section_four"
					/>
				</span>
			</main>
			<br />
			<br />
			<Accord />
			<Footer />
			<Outlet />
		</>
	);
}

export default Home;

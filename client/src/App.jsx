import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Faq from "./Components/Faq";
import Support from "./Components/Support";
import Feedback from "./Components/Feedback";
import Login from "./Components/Login_SignUp/Login";
import SignUp from "./Components/Login_SignUp/SignUp";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import New_meeting from "./Components/New_meeting/New_meeting";
import Profile from "./Components/Profile/Profile";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
	render() {
		return (
			<>
				<Router>
					<Header />
					<Routes>
						<Route exact path="/" element={<Home />}></Route>
						<Route path="/About" element={<About />}></Route>
						<Route path="/Contact" element={<Contact />}></Route>
						<Route path="/Faq" element={<Faq />}></Route>
						<Route path="/Support" element={<Support />}></Route>
						<Route path="/Feedback" element={<Feedback />}></Route>
						<Route path="/Login" element={<Login />}></Route>
						<Route path="/SignUp" element={<SignUp />}></Route>
						<Route path="/New_meeting" element={<New_meeting />}></Route>
						<Route path="/Profile" element={<Profile />}></Route>
					</Routes>
				</Router>
			</>
		);
	}
}
export default App;

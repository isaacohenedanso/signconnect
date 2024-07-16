import { Outlet, NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../../assets/images/Signconnect.jpg";
import "./Header.scss";

const Header = () => {
	const location = useLocation();

	const isNewMeeting = location.pathname === "/New_meeting";
	// const isProfile = location.pathname === "/Profile";
	if (isNewMeeting) {
		return null;
	}
	// } else if (isProfile) {
	// 	return null;
	// }

	return (
		<div className="header">
			<nav className="nav container">
				<img className="Logo" src={Logo} alt="Signconnect" />
				<ul className="m-4 ">
					<li className="p-3 ">
						<NavLink activeclassname="active" className="link p-3 " to="/">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink activeclassname="active" className="link p-3 " to="/About">
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							activeclassname="active"
							className="link p-3 "
							to="/Contact">
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink activeclassname="active" className="link p-3 " to="/Login">
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							activeclassname="active"
							className="link p-3 hidden"
							to="/New_meeting">
							New_meeting
						</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Header;

import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "../../assets/images/Signconnect.jpg";
import Facebook from "../../assets/icons/facebook.svg";
import Twitter from "../../assets/icons/x.svg";
import LinkedIn from "../../assets/icons/linkedIn.svg";
import Email from "../../assets/icons/email.svg";
import Phone from "../../assets/icons/phone.svg";
import "./Footer.scss";

const Footer = () => {
	return (
		<div className="footer">
			<nav className="nav container">
				<img className="Logo" src={Logo} alt="Signconnect" />
				<div className="link-section">
					<ul className="m-4">
						<li className="p-3">
							<NavLink
								activeclassname="active"
								className="link p-3"
								to="/About">
								About
							</NavLink>
						</li>
						<li className="p-3 m-3">
							<NavLink
								activeclassname="active"
								className="link p-3"
								to="/Contact">
								Contact
							</NavLink>
						</li>

						<li className="p-3 m-3">
							<NavLink
								activeclassname="active"
								className="link p-3"
								to="/Support">
								Support
							</NavLink>
						</li>
						<li className="p-3 m-3">
							<NavLink
								activeclassname="active"
								className="link p-3"
								to="/Feedback">
								Feedback
							</NavLink>
						</li>
					</ul>
					<ul>
						<li>
							<a
								className="link p-3"
								href="mailto:ahabnnie@gmail.com?Signconnect">
								<img src={Email} alt="Email" />
								signconnect@gmail.com
							</a>
						</li>
						<li>
							<a className="link p-3" href="tel:+233-201-726-152">
								<img src={Phone} alt="Phone" /> +233201726152
							</a>
						</li>
						<li>
							<a className="link p-3" href="">
								<img src={LinkedIn} alt="LinkedIn" />
							</a>
						</li>
						<li>
							<a className="link p-3" href="">
								<img src={Twitter} alt="X" />
							</a>
						</li>
						<li>
							<a className="link p-3" href="">
								<img src={Facebook} alt="Facebook" />
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<Outlet />
		</div>
	);
};

export default Footer;

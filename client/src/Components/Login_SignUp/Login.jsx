import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function Login() {
	const emailId = useRef();
	const passwordId = useRef();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginData = {
			email: emailId.current.value,
			password: passwordId.current.value,
		};
		// console.log(loginData.password);
		// console.log(loginData.email);
		try {
			const response = await axios.post(
				"http://localhost:3001/login",

				loginData
			);
			// console.log("Server response:", response.data);
			const {
				firstName,
				lastName,
				email,
				password,
				profile_image,
				sex,
				country,
				city,
			} = response.data.user;
			// console.log("User details:", { firstName, lastName, email });
			// window.alert(` Welcome ${firstName} ${lastName}`)

			// const userName = response.data.firstName;

			// console.log("userName", userName);
			navigate("/New_meeting", {
				state: {
					firstName,
					lastName,
					email,
					password,
					profile_image,
					sex,
					country,
					city,
				},
			});
			// console.log("Navigating with state:", { userName });
		} catch (error) {
			// window.alert("Wrong loggins");
			// console.error("Error logging in:", error);
			// console.log("Invalid email or password");
		}
	};

	return (
		<div className="container">
			<form action="" className="form form-floating" onSubmit={handleSubmit}>
				<div className="form-floating m-3">
					<input
						type="text"
						className="form-control"
						placeholder="enter email"
						id="emailId"
						ref={emailId}
					/>
					<label htmlFor="emailId">Email Address</label>
				</div>
				<div className="form-floating m-3">
					<input
						type="password"
						className="form-control"
						placeholder="enter password"
						id="passwordId"
						ref={passwordId}
					/>
					<label htmlFor="passwordId">Password</label>
				</div>

				<button className="m-3" type="submit">
					Login
				</button>
				<div className="d-flex align-items-center">
					<p className="m-3 ">Don&apos;t have an account?</p>
					<NavLink activeclassname="active" to="/SignUP">
						SignUP
					</NavLink>
				</div>
			</form>
			<Outlet />
		</div>
	);
}

export default Login;

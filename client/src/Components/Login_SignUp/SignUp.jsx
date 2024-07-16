import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

function SignUP() {
	const firstNameId = useRef();
	const lastNameId = useRef();
	const emailId = useRef();
	const passwordId = useRef();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const signUpData = {
			firstName: firstNameId.current.value,
			lastName: lastNameId.current.value,
			email: emailId.current.value,
			password: passwordId.current.value,
		};
		// Log the input values to the console
		console.log("User Data:", signUpData);

		try {
			const response = await axios.post("http://localhost:3001/register", signUpData);
			console.log("Server response:", response.data);

			// Clear the form
			firstNameId.current.value = "";
			lastNameId.current.value = "";
			emailId.current.value = "";
			passwordId.current.value = "";

			// Optionally, redirect to login page or show a success message
			navigate("/Login");
		} catch (error) {
			console.error("Error registering user:", error);
			// Handle error (e.g., show error message to user)
		}
	};

	return (
		<div className="container">
			<form action="" className="form form-floating" onSubmit={handleSubmit}>
				<div className="form-floating   m-3">
					<input
						type="text"
						className="form-control"
						placeholder="First Name"
						id="firstNameId"
						ref={firstNameId}
						required="required"
					/>
					<label htmlFor="firstNameId">First Name</label>
				</div>
				<div className="form-floating  m-3">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						id="lastNameId"
						ref={lastNameId}
						required="required"
					/>
					<label htmlFor="lastNameId">Last Name</label>
				</div>

				<div className="form-floating m-3 ">
					<input
						type="text"
						className="form-control"
						placeholder="enter email"
						id="emailId"
						ref={emailId}
						required="required"
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
						required="required"
					/>
					<label htmlFor="passwordId">Password</label>
				</div>
				<button
					className="m-3 "
					type="submit"
					style={{ borderRadius: "5px", padding: "5px" }}
					onClick={handleSubmit}>
					Create Account
				</button>
				<p>Already have an account?</p>
				<NavLink activeclassname="active" to="/Login">
					Login
				</NavLink>
			</form>
			<Outlet />
		</div>
	);
}

export default SignUP;

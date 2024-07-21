import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Profile.scss";
import User from "../../assets/icons/userBlack.svg";
import Edit from "../../assets/icons/edit.svg";
import axios from "axios";

function Header() {
	const handleEdit = () => {
		const inputs = document.getElementsByTagName("input");
		const upload_image = document.querySelector(".upload-image");
		upload_image.style.visibility = "visible";
		upload_image.style.width = "auto";
		for (let input of inputs) {
			input.removeAttribute("disabled");
		}
	};
	return (
		<div className="header">
			<button
				onClick={handleEdit}
				style={{
					borderRadius: "5px",
					padding: "5px ",
					margin: "5px",
					width: "auto",
				}}
				className="btn btn-secondary edit">
				<img src={Edit} alt="edit" /> Edit
			</button>
			<button
				onClick={handleEdit}
				style={{
					borderRadius: "5px",
					padding: "5px ",
					margin: "5px",
					width: "auto",
				}}
				className="btn btn-secondary edit">
				Log out
			</button>
		</div>
	);
}

function Profile() {
	const userFirstName = useRef();
	const userLastName = useRef();
	const userEmail = useRef();
	const userSex = useRef();
	const userCountry = useRef();
	const userCity = useRef();

	const location = useLocation();
	const { firstName, lastName, email, profile_image, sex, country, city } =
		location.state || {};

	useEffect(() => {
		const inputs = document.getElementsByTagName("input");
		for (let input of inputs) {
			input.setAttribute("disabled", "true");
		}
	}, []);

	console.log(firstName, lastName, email, profile_image, sex, country, city);
	const updateProfile = async () => {
		try {
			const response = await axios.put(
				`http://localhost:3001/profile/profile/${email}`,
				{ firstName, lastName, email, profile_image, sex, country, city }
			);
			console.log("Profile updated:", response.data);
		} catch (error) {
			console.error("Error updating profile:", error);
		}
		document.querySelector(".upload-image").style.visibility = "hidden";
	};

	return (
		<div className="container parent">
			<Header />
			<h2 className="text-center m-4">Profile</h2>

			<form
				// ref={}
				className="form bg-light p-4 hidden"
				style={{ borderRadius: "5px" }}>
				<div className="user-image">
					<img src={User} alt="user" className="user-profile" />
					<input
						type="file"
						name="image"
						id="image"
						accept="image/jpg, image/png, image/jpeg"
						className="upload-image"
						style={{ visibility: "hidden" }}
					/>
				</div>

				<div className="row">
					<div className="form-floating col-6 ">
						<input
							type="text"
							className="form-control disabled "
							id="firstName"
							name="firstName"
							placeholder="First Name"
							value={firstName || ""}
							ref={userFirstName}
						/>
						<label htmlFor="firstName" className="form-label px-4 py-auto ">
							First Name
						</label>
					</div>
					<div className="col-6  form-floating">
						<input
							type="text"
							className="form-control disabled"
							id="lastName"
							name="lastName"
							placeholder="last Name"
							value={lastName || ""}
							ref={userLastName}
						/>
						<label htmlFor="lastName" className="form-label px-4 py-auto">
							Last Name
						</label>
					</div>
				</div>
				<div className="row my-3">
					<div className="form-floating col-8">
						<input
							type="email"
							className="form-control disabled"
							id="email"
							name="email"
							placeholder="Email"
							value={email || ""}
							ref={userEmail}
						/>
						<label htmlFor="email" className="form-label px-4 py-auto">
							Email
						</label>
					</div>
					<div className="col-4  form-floating">
						<datalist id="sex">
							<option value="Male"></option>
							<option value="Female"></option>
						</datalist>
						<input
							type="text"
							list="sex"
							name="Sex"
							className="form-control disabled"
							ref={userSex}
						/>
						<label htmlFor="sex" className="form-label px-4 py-auto">
							Sex
						</label>
					</div>
				</div>
				<div className="row">
					<div className="form-floating col-6">
						<input
							type="text"
							className="form-control disabled"
							id="country"
							name="country"
							placeholder="Country"
							value={country || ""}
							ref={userCountry}
						/>
						<label htmlFor="country" className="form-label px-4 py-auto">
							Country
						</label>
					</div>
					<div className="form-floating col-6">
						<input
							type="text"
							className="form-control disabled"
							id="city"
							name="city"
							placeholder="City"
							value={city || ""}
							ref={userCity}
						/>
						<label htmlFor="city" className="form-label px-4 py-auto">
							City / State
						</label>
					</div>
				</div>
				<div className="d-flex justify-content-end align-items-center py-3">
					<button
						onClick={updateProfile}
						style={{
							borderRadius: "5px",
							padding: "5px ",
							margin: "5px",
							width: "auto",
						}}
						className="btn btn-secondary ">
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
export default Profile;

import { useState, useRef, useLocation } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Profile.scss";
import User from "../../assets/images/circled-user-male-skin-type.svg";
// import Edit from "../../assets/icons/edit.svg";

function Profile() {
	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef(null);
	const location = useLocation();
	const {
		firstName,
		lastName,
		email,
		password,
		profile_image,
		sex,
		country,
		city,
	} = location.state || {};
	console.log(
		firstName,
		lastName,
		email,
		password,
		profile_image,
		sex,
		country,
		city
	);
	const handleEditClick = () => {
		setIsEditing(!isEditing);

		if (formRef.current) {
			const inputs = formRef.current.getElementsByTagName("input");
			for (let input of inputs) {
				input.disabled = !isEditing;
			}
		}
	};

	return (
		<div className="container">
			<h2 className="text-center m-4">Profile</h2>
			<form
				ref={formRef}
				className="form bg-light p-3 hidden"
				style={{ borderRadius: "5px" }}>
				<img src={User} alt="" />
				<input
					type="file"
					name="image"
					id="image"
					accept="image/jpg, image/png, image/jpeg"
					style={{ display: "none" }}
				/>
				<div className="row">
					<div className="form-floating col-6 ">
						<input
							type="text"
							className="form-control disabled "
							id="firstName"
							placeholder="First Name"
							disabled={!isEditing}
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
							placeholder="last Name"
							disabled={!isEditing}
						/>
						<label htmlFor="lastName" className="form-label px-4 py-auto">
							Last Name
						</label>
					</div>
				</div>
				<div className="row my-5">
					<div className="form-floating col-8">
						<input
							type="email"
							className="form-control disabled"
							id="email"
							placeholder="Email"
							disabled={!isEditing}
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
							// id="sex"
							// placeholder="Sex"
							disabled={!isEditing}
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
							placeholder="Country"
							disabled={!isEditing}
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
							placeholder="City"
							disabled={!isEditing}
						/>
						<label htmlFor="city" className="form-label px-4 py-auto">
							City / State
						</label>
					</div>
				</div>
				{/* <div className="d-flex justify-content-end py-3"> */}
				{/* <button
						type="submit"

						onClick={handleEditClick}>
						<img src={Edit} alt="" style={{ width: "15px", margin: "3px" }} />
						Edit
					</button>
					<button
						type="submit"
						style={{
							borderRadius: "5px",
							padding: "5px ",
							margin: "5px",
							width: "auto",
							display: "none",
						}}
						className="btn btn-secondary enableInput">
						Submit
					</button> */}

				{/* </div> */}
				{/* <input type="text" name="name" disabled= />
				<input type="email" name="email" disabled={!isEditing} /> */}
				{/* Add more input fields as needed */}
			</form>
			<div className="d-flex justify-content-end py-3">
				<button
					onClick={handleEditClick}
					style={{
						borderRadius: "5px",
						padding: "5px ",
						margin: "5px",
						width: "auto",
					}}
					className="btn btn-secondary d-flex">
					{isEditing ? "Save" : "Edit"}
				</button>
			</div>
		</div>
	);
}
export default Profile;

// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Profile() {
// 	const [profileData, setProfileData] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchProfileData = async () => {
// 			try {
// 				// Assume the email is passed as state when navigating to this component
// 				const email = location.state?.email;

// 				if (!email) {
// 					throw new Error("No email provided");
// 				}

// 				const response = await axios.get(
// 					`http://localhost:3001/profile/${email}`
// 				);
// 				setProfileData(response.data);
// 				setLoading(false);
// 			} catch (err) {
// 				setError(err.message);
// 				setLoading(false);
// 			}
// 		};

// 		fetchProfileData();
// 	}, [location.state]);

// 	if (loading) return <div>Loading...</div>;
// 	if (error) return <div>Error: {error}</div>;

// 	return (
// 		<div className="container">
// 			<h1>User Profile</h1>
// 			{profileData && (
// 				<div>
// 					<p>
// 						<strong>First Name:</strong> {profileData.firstName}
// 					</p>
// 					<p>
// 						<strong>Last Name:</strong> {profileData.lastName}
// 					</p>
// 					<p>
// 						<strong>Email:</strong> {profileData.email}
// 					</p>
// 					{/* Add more fields as needed */}
// 				</div>
// 			)}
// 			<button onClick={() => navigate("/new-meeting")}>
// 				Go to New Meeting
// 			</button>
// 		</div>
// 	);
// }

// export default Profile;

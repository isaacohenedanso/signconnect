import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import emailjs from "@emailjs/browser";

const header = <h1>Get in touch with us</h1>;

function Contact() {
	const form = useRef();
	const fullName = useRef();
	const email = useRef();
	const message = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_qpfqp6m", "template_4lywoel", form.current, {
				publicKey: "XIrcHgICt-FIvSVdY",
			})
			.then(
				setTimeout(
					() => {
						console.log("SUCCESS!");
						fullName.current.value = "";
						email.current.value = "";
						message.current.value = "";
						window.alert("Message sent successfully");
					},
					(error) => {
						console.log("FAILED...", error.text);
					},
					1000
				)
			);
	};

	return (
		<div className="container">
			<span>{header}</span>
			<p>
				Hey, wanna work work with us, or have a suggestion to make, send us a
				message
			</p>
			<form className="form form-floating m-3" onSubmit={sendEmail} ref={form}>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="user_name"
						placeholder="Full Name"
						ref={fullName}
					/>
					<label htmlFor="floatingInput">Full Name</label>
				</div>
				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="user_email"
						placeholder="name@gmail.com"
						ref={email}
					/>
					<label htmlFor="user_email">Email Address</label>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<textarea
						name="message"
						className=" textarea mt-3 p-3"
						id="textarea"
						cols="100"
						rows="10"
						placeholder="Please type your message here"
						ref={message}></textarea>
					<input
						type="submit"
						value="Send"
						className="mt-3"
						style={{ width: "200px", padding: "5px" }}
					/>
				</div>
			</form>
		</div>
	);
}
export default Contact;

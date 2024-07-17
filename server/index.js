const express = require("express");
const connectDB = require("./db");
const bcrypt = require("bcrypt");
const model = require("./models/model");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// const reactRouter = require("react-router-dom");
// app.post("/login", async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		//find the user by email
// 		const user = await model.findOne({ email: email });

// 		if (!user) {
// 			console.log("User not found");
// 			return res.status(404).json("No records exists");
// 		}
// 		console.log("Stored hashed password:", user.password);
// 		console.log("Provided password:", password);

// 		const isMatch = await bcrypt.compare(password, user.password);
// 		console.log("Password provided ", password);

// 		if (!isMatch) {
// 			console.log("Incorrect password");
// 			return res.status(400).json("The password is incorect");
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// });
app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		//find the user by email
		const user = await model.findOne({ email: email });

		if (!user) {
			console.log("User not found");
			return res.status(404).json({ message: "No records exists" });
		}
		// console.log("Stored hashed password:", user.password);
		// console.log("Provided password:", password);

		const isMatch = await bcrypt.compare(password, user.password);
		// console.log("Password provided ", password);

		if (!isMatch) {
			console.log("Incorrect password");
			return res.status(400).json({ message: "The password is incorrect" });
		}
		const { firstName, lastName, sex, profile_image, country, city } = user;

		// If everything is correct
		res.status(200).json({
			message: "Login successful",
			user: { firstName, lastName, sex, email, profile_image, country, city },
		});
	} catch (error) {
		console.log(error);
		// res.status(500).json({ message: "Internal server error" });
	}
});

app.post("/register", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const existingUser = await model.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		//hash the passord
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newData = new model({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
		});
		await newData.save();
		res.status(200).send("data saved successfully");
		console.log("data saved successfully");
		console.log(req.body);
	} catch (err) {
		// console.log(err);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});

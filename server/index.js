const express = require("express");
const connectDB = require("./db");
const bcrypt = require("bcrypt");
const model = require("./models/model");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await model.findOne({ email: email });
		if (!user) {
			console.log("User not found");
			return res.status(404).json({ message: "No records exists" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			console.log("Incorrect password");
			return res.status(400).json({ message: "The password is incorrect" });
		}
		const { firstName, lastName, sex, profile_image, country, city } = user;
		res.status(200).json({
			message: "Login successful",
			user: { firstName, lastName, sex, email, profile_image, country, city },
		});
	} catch (error) {
		console.log(error);
	}
});
app.post("/register", async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const existingUser = await model.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
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
		res.status(500).send("Internal Server Error");
	}
});
app.put("/profile/profil/:email", async (req, res) => {
	try {
		const { email } = req.params;
		const updates = req.body;
		const user = await model.findOneAndUpdate({ email }, updates, {
			new: true,
		});

		if (!user) {
			return rs.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "Profile updated sucessfully", user });
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

const PORT_MONGODB = 3001;

app.listen(PORT_MONGODB, () => {
	console.log(`Server is running on port ${PORT_MONGODB}`);
});

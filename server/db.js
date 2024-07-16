const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			// "mongodb+srv://ahabnnie:ahabanniebbc@cluster0.h8e8rew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
			"mongodb://localhost:27017/sign"
		);
		console.log(`Mongodb connected `);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
module.exports = connectDB;

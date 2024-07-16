const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	profile_image: String,
	sex: String,
	country: String,
	city: String,
});
const model = mongoose.model("model", Schema); //collection name is models
module.exports = model;

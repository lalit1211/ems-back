const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");
const User = require("./user.schema");

const employeeSchema = new Schema({
	name: {
		type: String,
		required: [true, "please enter your name"],
		// ref: "User", // collection of which model is referring to
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		lowercase: true,
		validate: [
			validator.isEmail,
			"Please provide a valid email",
		],
	},
	emp_id: {
		// type: mongoose.Schema.Types.ObjectId,
		type: String,
		required:[true, "it is necessary"]
		// ref: "User",
	},
	post: {
		type: String,
		required: [true, "Post name can not be empty"],
	},
	department: {
		type: String,
		required: [true, "Department Name is required"],
	},
	qualification: {
		type: String,
		required: [
			true,
			"please provide your qualification",
		],
	},
	fathersName: {
		type: String,
		required: [true, "Fathers name is required"],
	},
	mothersName: {
		type: String,
		require: [true, "Mothers name is required"],
	},
	dob: {
		type: String,
		required: [true, "DOB is required"],
	},
	category: {
		type: String,
		required: [true, "category is required"],
	},
	religion: {
		type: String,
		required: [true, "religion is required"],
	},
	nationality: {
		type: String,
		required: [true, "Nationality is required"],
	},
	aadharNo: {
		type: String,
		required: [true, "Aadhar No is required"],
		minlength: [
			12,
			"Aadhar should be minimum 12 characters",
		],
		maxlength: [
			12,
			"Aadhar should not be greater than 12 characters",
		],
	},
	address: {
		type: String,
		required: [true, "Please fill the address Details"],
	},
	role:{
		type: String,
		required: [true, "role is required"]
	}
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;

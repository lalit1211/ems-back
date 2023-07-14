const Employee = require("../database/schema/employee.schema");
const catchAsync = require("../utils/catchAsync");
const _Error = require("../utils/_Error");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../database/schema/user.schema")


module.exports.addDetails = catchAsync(async (req, res, next) => {

	let { authorization } = req.headers;

	console.log("authorization headers", authorization);

	if (!authorization) {
		authorization = req.cookies.authorization;
	}

	// console.log("authorization cookies", authorization);

	let token;

	if (!authorization) {
		return next(
			new _Error("Please login to continue", 400),
		);
	}

	token = authorization;

	if (authorization.startsWith("Bearer")) {
		token = authorization.split(" ")[1];
	}

	if (!token) {
		return next(
			new _Error("Please login to continue", 400),
		);
	}

	_(token);

	const decoded = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET,
	);

	if (!decoded) {
		return next(new _Error("You are logged out.", 401));
	}

	const user = await User.findById(decoded.id);
  req.user = user;

//   next();
	// res.status(200).json({
	// 	status: "success",
	// 	message: `You are ${user.name}`,
	// 	data: user,
	// });
	console.log('user=>', user)
	const{name, email, _id,role}= req.user;












	const {
		// name: user.name,
		// email,
		post,
		department,
		qualification,
		fathersName,
		mothersName,
		dob,
		category,
		religion,
		nationality,
		aadharNo,
		address,
	} = req.body;

	const newEmployee = await Employee.create({
		name,
		email,
		post,
		department,
		emp_id: _id,
		role,
		qualification,
		fathersName,
		mothersName,
		dob,
		category,
		religion,
		nationality,
		aadharNo,
		address,
		// Emp_Id: req.user._id
	})



	res.status(200).json({
		status: "success",
		message: "Employee added successfully",
		data: newEmployee
	})
});



// ``````````````````````` Get All Employees................................

module.exports.getEmployee= catchAsync(async(req,res, next)=>{

	const allEmployee = await Employee.find()
	res.status(200).json({
		status: "success",
		data:allEmployee
	})
	console.log("all emp ==>" , allEmployee)
})

// ``````````````````````` Get Employee by Id.............................
module.exports.getEmployeeById = catchAsync(async(req, res, next)=>{
	const{emp_id} = req.body
	// const {emp_id}= req.params
	_e(emp_id)

	const emp = await Employee.findOne({emp_id})

	res.status(200).json({
		status: "success",
		data: emp
	})
})

// ``````````````````````` Delete Employee by ID.........................
module.exports.deleteEmployeeById = catchAsync(async(req,res,next)=>{
	const { emp_id } = req.body;
	const _id= emp_id;
	const emp = await Employee.deleteOne({emp_id})
	const usee = await User.deleteOne({_id})

	res.status(200).json({
		status: "success",
		message: "employee deleted"
	})
})


// ````````````````````````` Update Employee By Id.......................
module.exports.updateEmployeeById = catchAsync(async(req,res,next)=>{
	const {emp_id} = req.body;

	const updatedEmployee= await Employee.findOneAndUpdate({emp_id},req.body, {new:true})

	res.status(200).json({
		message:"success",
		data:updatedEmployee
	})
})
const User = require("../database/schema/user.schema");
const catchAsync = require("../utils/catchAsync");
const _Error = require("../utils/_Error");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

// ``````````````````````````` Sign_Up .................
module.exports.signUp = catchAsync(
	async (req, res, next) => {
		const {
			name,
			email,
			password,
			confirmPassword,
			role,
		} = req.body;

		const user = await User.create({
			name,
			email,
			password,
			confirmPassword,
			role,
		});

		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h",
			},
		);

		res.cookie("authorization", token, {
			expires: new Date(
				Date.now() + 1000 * 60 * 60 * 24,
			),
			httpOnly: true,
		});

		res.status(200).json({
			status: "success",
			message: "User created successfully",
			data: token,
		});
	},
);

// ``````````````````````````` Signin .................

module.exports.login = catchAsync(
	async (req, res, next) => {
		const { email, password } = req.body;
		// console.log(email, password)

		if (!email || !password) {
			return next(
				new _Error(
					"Please provide email and password",
					400,
				),
			);
		}

		const user = await User.findOne({
			email,
		}).select("+password");

		// ! switch to invalid email or password error

		if (!user) {
			return next(new _Error("Invalid Email", 401));
		}

		const isMatch = await bcrypt.compare(
			password,
			user.password,
		);

		if (!isMatch) {
			return next(
				new _Error("Password is wrong.", 401),
			);
		}

		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h",
			},
		);

		// token is save as a cookie and expire after 24 hours...........................
		res.cookie("authorization", token, {
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			httpOnly: true,
			secure: true
			// secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			status: "success",
			message: "User logged in successfully",
			token,
		});
	},
);

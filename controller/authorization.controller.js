const _Error = require("../utils/_Error");
const User = require("../database/schema/user.schema");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports.whoami = catchAsync(
	async (req, res, next) => {
		let { authorization } = req.headers;

		console.log("authorization headers", authorization);

		if (!authorization) {
			authorization = req.cookies.authorization;
		}

		console.log(
			"authorization cookies==>",
			authorization,
		);

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
			return next(
				new _Error("You are logged out.", 401),
			);
		}

		const user = await User.findById(decoded.id);
		req.user = user;

		// __("user++>",user)
		res.status(200).json({
			status: "success",
			message: `You are ${user.name}`,
			data: user,
		});
	},
);

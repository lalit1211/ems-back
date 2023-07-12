const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}


// cors middleware handle here.........................
const origin = ["http://localhost:3000", "http://localhost:3001"];

app.use(
	cors({
		// origin: "http://localhost:3000",
		origin,
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());


// api routes / api middleware...................
app.use("/api/v1/auth", require("./routes/authentication.routes"));
app.use("/api/v1/newEmployee", require("./routes/employee.routes"))



// # Global Error Handling Middleware.........................................
app.use((err, req, res, next) => {
	const errStatus = err.statusCode || 500;
	const message = err.message || "Something went wrong";
	const status = err.status || "error";

	res.status(errStatus).json({ message, status });
});

// middleware for handling rest of all type of requests.............................
app.all("*", (req, res) => {
	res.status(404).json({
		status: "fail",
		message: "Not found",
	});
});


module.exports = app;

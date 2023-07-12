const { connection, connect } = require("mongoose");

const { DATABASE } = process.env;

connect(DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connection.on("connected", () => {
	console.log("Connected to database");
});

connection.on("error", (error) => {
	console.log("Error connecting to database: " + error);
});

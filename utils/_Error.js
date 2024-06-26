class _Error extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4")
			? "fail"
			: "error";
		this.message = message;
	}
}

module.exports = _Error;

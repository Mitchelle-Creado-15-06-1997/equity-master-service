class BaseException extends Error {
	constructor(message, code, status = 500) {
		if (!message) {
			message = 'Oops!!! EquityMasterthing went wrong';
		}

		super(message);
		this.status = status;
		this.code = code || 'ERROR';
	}
}

module.exports = BaseException;

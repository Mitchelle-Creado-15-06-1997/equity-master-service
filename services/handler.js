const serviceConstants = require('../constants/appConstants');
const Logger = require('../services/logger');
const logger = new Logger();

const fs = require('fs');
const path = require('path');

class ServiceHandler {
	execute(data) {
		if (data && data.services) {
			data.services.forEach(service => {
				switch (service) {
					case serviceConstants.LOGGING:
						// Call and async fucntions without await to avoid blocking of API response and execute services
						const log = data && data.data;
						const result = {
							action: log.action,
							headers: log.headers,
							request: log.request,
							response: log.response
						}
						logger.request(result);
						break;

					default:
						break;
				}
			});
		}
	}
}

module.exports = ServiceHandler;
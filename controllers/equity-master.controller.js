const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { equityMasterSchema, equityMasterCronSchema } = require('../schema/schema-suit');
const EquityMasterBiz = require('../biz/equity-master.biz');

class EquityMasterController {
	register(app) {
		app.route('/v1/equity/:vendor/:master_code')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				// Validating request
				new RequestValidator(equityMasterSchema).create({...request.params,...request.query})

				const equityMasterBiz = new EquityMasterBiz();
				const _result = await equityMasterBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `created equity master successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
						action : CONSTANTS.ACTION.EQUITY_MASTER_CREATED,
						headers : { ...request.headers},
						request: {...request.params,...request.body},
						response: result
					}
				});
			} catch (error) {
				next(error);
			}
		})
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const validator = new RequestValidator(equityMasterSchema);
				validator.create({...request.params,...request.query});

				const equityMasterBiz = new EquityMasterBiz();
				const _result = await equityMasterBiz.fetch({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched equity master successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
						action : CONSTANTS.ACTION.EQUITY_MASTER_FETCHED,
						request: {...request.params,...request.query,client_code},
						response: result
					}
				});
			} catch (error) {
				next(error);
			}
		})

		app.route('/v1/equity/cron')
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				// Validating request
				new RequestValidator(equityMasterCronSchema).create({...request.params,...request.query})

				const equityMasterBiz = new EquityMasterBiz();
				const _result = await equityMasterBiz.masterCron({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `Cron running....`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
						action : CONSTANTS.ACTION.EQUITY_MASTER_CREATED,
						headers : { ...request.headers},
						request: {...request.params,...request.body},
						response: result
					}
				});
			} catch (error) {
				next(error);
			}
		})
	}
}

module.exports = EquityMasterController;

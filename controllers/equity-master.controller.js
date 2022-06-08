const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { equityMasterSchema } = require('../schema/schema-suit');
const EquityMasterBiz = require('../biz/equity-master.biz');

class EquityMasterController {
	register(app) {
		/**
		 * @api {post} v1/equity-master/ Create equity-master
		 * @apiVersion 1.0.0
		 * @apiName CreateEquityMaster
		 * @apiGroup EquityMaster
		 * @apiPermission admin
		 *
		 * @apiDescription This endpoint will create a equity-master!
		 *
		 * @apiHeader {String} client_code will be shared to you .
		 * @apiHeaderExample {Header} Header-Example
		 *     "client_code: client_code"
		 *
		 * @apiExample {bash} Curl example
		 * curl -X POST -H "client_code: client_code" -i https://console.neo.com/v1/equity-master
		 *
		 * @apiSuccess {String} result <code>created</code> if everything went fine.
		 * @apiSuccessExample {json} Success-Example
		 *     HTTP/1.1 201 CREATED
		 *      {
		 *			"success": true,
		 *			"event": "EQUITY_MASTER_CREATED",
		 *			"message": "created equity master successfully.",
		 *			"uuid": "e043e090-758f-11eb-833e-1b36d8ab14c1",
		 *			"data": {}
		 *		}
		 *
		 * @apiError NoAccessRight Only authenticated Admins can access the data.
		 * @apiError UserNotFound   The <code>id</code> of the User was not found.
		 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
		 *
		 * @apiErrorExample Response (example):
		 *     HTTP/1.1 401 Not Authenticated
		 *     {
		 *       "error": "NoAccessRight"
		 *     }
		 */
		app.route('/v1/equity-master')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				const validator = new RequestValidator(equityMasterSchema);
				validator.create({...request.params,...request.body});

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
		.put(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				
				const validator = new RequestValidator(equityMasterSchema);
				validator.create({...request.params,...request.body,...request.query});

				const equityMasterBiz = new EquityMasterBiz();
				const _result = await equityMasterBiz.update({...request.params,...request.body,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `updated equity master successfully.`, {
					services: [
						CONSTANTS.LOGGING
					],
					data: { 
							action : CONSTANTS.ACTION.EQUITY_MASTER_UPDATED,
							request: {...request.params,...request.body,...request.query,client_code},
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

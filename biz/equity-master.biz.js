const PrismaBiz = require("./helpers/prisma.biz");
const RequestValidator = require('../validators/request.validator');
const API_DOC = require('../constants/api-suit.json')
const HttpProxy = require('../proxy/http-proxy');
const CONSTANTS = require('../constants/appConstants');
const TEMPLATE = require('../constants/template');
const TransformerBiz = require('./helpers/transformer.biz');
const { 
	equity
} = require('../schema/schema-suit');

class EquityMasterBiz {
	constructor() {
		this.prismaBiz = new PrismaBiz();
		this.transformer = new TransformerBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const details = await this.fetch(data);
				// const transformer_data = await this.transformer.transform({data:details},TEMPLATE[data.master_code][data.vendor]);     

				let result = {};
				const obj = {
					data: details,
					skipDuplicates: true
				}
				result = await this.prismaBiz.createMany(obj, CONSTANTS[data.master_code][data.vendor]);
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	validate(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const validator = new RequestValidator(equity[data.master_code][data.vendor]);
				validator.create(data);
				return resolve(true);
			} catch(error){
				return reject(error);
			}
		});
	}
	fetch(data) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.validate(data);

				const httpProxy = new HttpProxy(API_DOC[data.master_code][data.vendor], null, data);
				
				const response = await httpProxy.make_request();
				if (response && response.success && response.data && response.data.length) {
					return resolve(response.data);
				}
				return resolve([]);
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = EquityMasterBiz;

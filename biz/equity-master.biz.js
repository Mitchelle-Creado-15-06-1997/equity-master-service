const PrismaBiz = require("./helpers/prisma.biz");
const RequestValidator = require('../validators/request.validator');
const API_DOC = require('../constants/api-suit.json')
const HttpProxy = require('../proxy/http-proxy');
const CONSTANTS = require('../constants/appConstants');
const TEMPLATE = require('../constants/template');
const TransformerBiz = require('./helpers/transformer.biz');
const MongoBiz = require('./helpers/mongo.biz.js');

const { 
	equity
} = require('../schema/schema-suit');

class EquityMasterBiz {
	constructor() {
		this.prismaBiz = new PrismaBiz();
		this.transformer = new TransformerBiz();
		this.mongo = new MongoBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const details = await this.fetch(data);
				// const transformer_data = await this.transformer.transform({data:details},TEMPLATE[data.master_code][data.vendor]);     
				
				let result = {};
				await this.mongo.deleteMany({}, CONSTANTS[data.master_code][data.vendor])
				result = await this.mongo.insertMany(details, CONSTANTS[data.master_code][data.vendor]);

				// const obj = {
				// 	data: details,
				// 	skipDuplicates: true
				// }
				// result = await this.prismaBiz.createMany(obj, CONSTANTS[data.master_code][data.vendor]);
				resolve(result.ops);
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

				const httpProxy = new HttpProxy(API_DOC[data.vendor][data.master_code], null, data);
				
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

	masterCron(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const vendors = JSON.parse(data.vendor);

				for(let vendor of vendors) {
					let masters = JSON.parse(data[vendor]);
					for(let master of masters) {
						let master_params = CONSTANTS[master].PARAMS;
						if (master_params && master_params.length) {
							for(let param of master_params) {
								let value = {}
								value[CONSTANTS[master].PARAM_NAME] = param;
								const transformer_data = await this.transformer.transform({vendor,master,...value},TEMPLATE[vendor][master]);
								this.create(transformer_data);
							}
						} else {
							const transformer_data = await this.transformer.transform({vendor,master},TEMPLATE[vendor][master]);
							this.create(transformer_data);
						}
					}
				}
								
				return resolve(true);
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = EquityMasterBiz;

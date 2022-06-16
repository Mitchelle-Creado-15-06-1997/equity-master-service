const CONSTANTS = require('../../constants/appConstants');
const MongoQueryRepo = require('../../repositories/mongoQuery.repository');

class MongoBiz {
	constructor() {
		this.mongoQueryRepo = new MongoQueryRepo();
	}

	get(data,queries) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = {};
                for(var query of queries){
                    let raw = await this.mongoQueryRepo.get_mongo_data(data, query);
                    result = {
                        ...result,
                        ...raw
                    }
                }
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	insertMany(data,collection) {
		return new Promise(async (resolve, reject) => {	
			try {
                let result = await this.mongoQueryRepo.insertMany(data, collection);
                return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteMany(data,collection) {
		return new Promise(async (resolve, reject) => {	
			try {
                let result = await this.mongoQueryRepo.deleteMany(data, collection);
                return resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = MongoBiz;

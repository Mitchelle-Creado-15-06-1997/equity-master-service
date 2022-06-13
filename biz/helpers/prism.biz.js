const QueryRepo = require('../../repositories/prismaQuery.repository');

class PrismaBiz {
	constructor() {
        this.queryRepo = new QueryRepo();
	}
	rawQuery(query) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.rawQuery(query)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    findRaw(filter,options,table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.findRaw(filter,options,table_name)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    aggregateRaw(match,group,table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.aggregateRaw(match,group,table_name)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    findMany(obj={},table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.findMany(obj,table_name)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    create(obj,table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.create(obj,table_name)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    update(where,data,table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = [];
                result = await this.queryRepo.update(where,data,table_name)
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    
}

module.exports = PrismaBiz;

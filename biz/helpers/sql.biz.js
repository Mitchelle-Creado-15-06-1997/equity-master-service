const CONSTANTS = require('../../constants/appConstants');
const QueryRepo = require('../../repositories/query.repository');

class SqlBiz {
	constructor() {
        this.queryRepo = new QueryRepo();
	}
	get(data,queries,database) {
		return new Promise(async (resolve, reject) => {	
			try {
            var result = {};
            for(var query of queries){
                let raw = await this.queryRepo.get_sql_data(query,data,database);
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

    select(data,queries,database) {
		return new Promise(async (resolve, reject) => {	
			try {
          var result = [];
          for(var query of queries){
              let raw = await this.queryRepo.get_all_data(query,data,database);
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

    get_one(data,query,database) {
		return new Promise(async (resolve, reject) => {	
			try {
          let raw = await this.queryRepo.get_all_data(query,data,database);
          let result = raw
          resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    insert(query,data,database){
        return new Promise(async (resolve, reject) => {	
			try {
        let result = await this.queryRepo.create(query,data,database);
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    update(query,data,database){
        return new Promise(async (resolve, reject) => {	
			try {
        let result = await this.queryRepo.create(query,data,database);
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }
}

module.exports = SqlBiz;

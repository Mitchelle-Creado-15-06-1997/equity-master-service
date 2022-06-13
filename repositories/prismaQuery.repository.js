const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaRepo {
	constructor() {
	}
	rawQuery(query) {
		return new Promise(async (resolve, reject) => {	
			try {
        var result = [];
        result = await prisma.$queryRawUnsafe(query)
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
        result = await prisma[table_name].findRaw({
            filter: filter,
            options: options,
        })
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
        result = await prisma[table_name].aggregateRaw({
            pipeline: [
              { $match: match },
              { $group: group },
            ],
          })
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
  }

  findMany(obj,table_name) {
		return new Promise(async (resolve, reject) => {	
			try {
        var result = [];
        result = await prisma[table_name].findMany(obj)
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
        result = await prisma[table_name].create(obj)
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
        result = await prisma[table_name].update({
            where: where,
            data: data,
          })
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
  }
}

module.exports = PrismaRepo;

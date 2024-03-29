const mongo = require('../db/mongo');
const util = require('util');

class MongoQueryRepository {
    get_mongo_data(data, queries) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = queries.query;
                for (var key in data) {
                    query = query.replace(`{${key}}`, data[key]);
                }
                const result = await mongo.findOne(queries.collection,
                        JSON.parse(query),
                    {
                        projection: queries.projection
                });
                if(result){
                    return resolve(result.data);
                }
                resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }

    insertMany(data, collection) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await mongo.insertMany(collection, data);
                if(result){
                    return resolve(result);
                }
                return resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteMany(data, collection) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await mongo.deleteMany(collection, data);
                if(result){
                    return resolve(result);
                }
                return resolve(null);
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = MongoQueryRepository;
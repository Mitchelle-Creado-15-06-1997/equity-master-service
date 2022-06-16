const mongoose = require('mongoose');
const BaseException = require('../exceptions/base.exception')

const db = mongoose.connection;

module.exports = {
	findOne: (collection, query, projection) => new Promise(async (resolve, reject) => {
		try {
			if (!db) {
				throw new BaseException('Mongo Connection Exception occured');
			}
			const data = await db.collection(collection).findOne(query, projection);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	}),

	insertOne: (collection, data) => new Promise(async (resolve, reject) => {
		try {
			if (!db) {
				throw new BaseException('Mongo Connection Exception occured');
			}
			const result = await db.collection(collection).insertOne(data);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	}),

	insertMany: (collection, data) => new Promise(async (resolve, reject) => {
		try {
			if (!db) {
				throw new BaseException('Mongo Connection Exception occured');
			}
			const result = await db.collection(collection).insertMany(data);
			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	}),

	deleteMany: (collection, data) => new Promise(async (resolve, reject) => {
		try {
			if (!db) {
				throw new BaseException('Mongo Connection Exception occured');
			}
			const result = await db.collection(collection).deleteMany(data);
			return resolve(result);
		} catch (error) {
			return reject(error);
		}
	}),

	deleteOne: (collection, data) => new Promise(async (resolve, reject) => {
		try {
			if (!db) {
				throw new BaseException('Mongo Connection Exception occured');
			}
			const result = await db.collection(collection).deleteOne(data);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	}),
};
const mysql = require('mysql2');    
const config = require('config');
const dbConfig = config.get('db.mysql');

/**
 * Create mysql connection pool in a Singleton pattern 
 */
const getPool = (database) => {
	const pool = mysql.createPool({
		connectionLimit : (database && database.connection) || dbConfig.connection,
		host: (database && database.connection) || dbConfig.host,
		user: (database && database.connection) || dbConfig.user,
		password: (database && database.connection) || dbConfig.password,
		database: (database && database.connection) || dbConfig.database,
		debug: false,
		typeCast: (field, useDefaultTypeCasting) => {
			try {
				if (field.type === 'BIT' && field.length === 1) {
					const bytes = field.buffer();
					return bytes[0] === 1;
				}
				return useDefaultTypeCasting();
			} catch (error) {
				console.log('Casting failed ', error);
			}
		}
	});
	return pool;
};
let pool;

module.exports = {
	/**
     * @param {string} query
     * @param {array} params
     */
	execute: (query, params, database) => new Promise((resolve, reject) => {
		try {
			if (!pool) {
				pool = getPool(database);
			}

			pool.getConnection((connError, connection) => {
				if (connError) return reject(connError);
				connection.config.queryFormat = function (q, values) {
					try {
						if (!values) return q;
						if (q.indexOf(':') === -1) {
							return mysql.format(q, values);
						}
						const finalQuery = q.replace(/:(\w+)/g, (txt, key) => {
							if (values.hasOwnProperty(key)) {
								return this.escape(values[key]);
							}
							return txt;
						});
						return finalQuery;
					} catch (_) {
						return q;
					}
				};
				connection.query(query, params, (error, data) => {
					try {
						connection.release();
						if (error) {
							return reject(error);
						}
						return resolve(data);
					} catch (e) {
						return reject(e);
					}
				});
			});
		} catch (error) {
			reject(error);
		}
	}),
};

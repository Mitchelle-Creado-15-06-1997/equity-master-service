const mysql = require('../db/mysql');

class QueryRepo {
	get_sql_data(qry,data,database) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = qry;
				for (var key in data) {
					let rx = new RegExp(`{${key}}`, 'gi');
                    query = query.replace(rx, data[key] || '');
                }
				const result = await mysql.execute(query, [], database);
				if (result.length > 0) {
                    return resolve(result[0]);
                }
                resolve(null);
			} catch (error) {
				reject(error);
			}
		});
	}

	create(qry,data,database) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = qry;
				for (var key in data) {
					let rx = new RegExp(`{${key}}`, 'gi');
                    query = query.replace(rx, data[key] || '');
                }
				const result = await mysql.execute(query, [], database);
				if (result) {
                    return resolve(result);
                }
                resolve(null);
			} catch (error) {
				reject(error);
			}
		});
	}

	get_all_data(qry,data,database) {
		return new Promise(async (resolve, reject) => {
			try {
				let query = qry;
				for (var key in data) {
					let rx = new RegExp(`{${key}}`, 'gi');
                    query = query.replace(rx, data[key] || '');
                }
				const result = await mysql.execute(query, [], database);
				if (result.length > 0) {
                    return resolve(result);
                }
                resolve(null);
			} catch (error) {
				reject(error);
			}
		});
	}

	// run(qry,data,database) {
	// 	return new Promise(async (resolve, reject) => {
	// 		try {
	// 			let query = qry;
	// 			for (var key in data) {
	// 				let rx = new RegExp(`{${key}}`, 'gi');
    //                 query = query.replace(rx, data[key] || '');
    //             }
	// 			const result = await mysql.execute(query, [], database);
	// 			if (result.length > 0) {
    //                 return resolve(result[0]);
    //             }
    //             resolve(null);
	// 		} catch (error) {
	// 			reject(error);
	// 		}
	// 	});
	// }
}

module.exports = QueryRepo;

const json2xls = require('json2xls');
const fs = require('fs');
const { DOC_DIRECTORY, EXCEL_EXTENSION } = require('../../constants/appConstants');

class ExcelBiz {
	constructor() {
	}

	create(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if(!rows[0]) return resolve(null);
				const xls = json2xls(rows);
				const name = `${new Date().getTime()}${EXCEL_EXTENSION}`;
				const path = `${DOC_DIRECTORY}/${name}`;
				fs.writeFileSync(path, xls, 'binary'); 
				resolve({name,path});
			} catch(error){
				return reject(error);
			}
		});
	}
	buffer(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if(!rows[0]) return resolve(null);
				const file = await this.create(rows);
				if(!file) return resolve(null);
				const buffer = fs.createReadStream(file.path);
				fs.unlink(file.path,(err)=>{});
				resolve({name:file.name,buffer})
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = ExcelBiz;

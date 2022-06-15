//your app constants come here
const config = require('config');
module.exports = {
	CLIENT_CODES : config.get('app_config.client_code'),
	APPLICATION_JSON: 'application/json',
	JSON : 'json',
	TEXT_XML : 'text/xml',
	FORM_DATA: 'multipart/form-data',
	X_WWW_FORM_URLENCODED : 'application/x-www-form-urlencoded',
	LOGGING: 'LOGGING',
	EVENT_EMIT: 'EVENT_EMIT',
	DOC_DIRECTORY: 'storage/tmp',
	DOC_ZIP_DIRECTORY: 'storage/tmp/zip',
	DOCUMENT_TYPE : '',
	DOCUMENT_CATEGORY : '',
	DOCUMENT_SOURCE : 'LOS',
	REQUEST_ID_PREFIX : 'OFFER',
	DOCUMENT_SECTION : '',
	CURRENT_TIMESTAMP : 'CURRENT_TIMESTAMP',
	DEFAULT_DATE_FORMAT : 'YYYY-MM-DD HH:mm:ss',
	CSV : 'CSV',
	EXCEL : 'XLSL',
	CSV_EXTENSION : '.csv',
	EXCEL_EXTENSION : '.xlsx',
	EMIT_QUICKWORKS_EVENTS : [],
	EMIT_EVENTBRIDGE_EVENTS : [],
	MASTER_CODE : ["SECTOR", "INDEX", "COMPANY"],
	HEADER_VALIDATOR_EXCEPTOR : ['CHECK_APPLICATION_HEALTH','API_DOCUMENTATION'],
	VALID_VENDOR: ['CMOT'],
	EXCHANGE_TYPE: ['BSE', 'NSE'],
	ACTION: {
		CHECK_APPLICATION_HEALTH : 'CHECK_APPLICATION_HEALTH',
		EQUITY_MASTER_FETCHED : 'EQUITY_MASTER_FETCHED',
		EQUITY_MASTER_CREATED: 'EQUITY_MASTER_CREATED',
		EQUITY_MASTER_UPDATED: 'EQUITY_MASTER_UPDATED'

	},
	INDEX: {
		CMOT: 'eq_cmot_index_master'
	},
	SECTOR: {
		CMOT: 'eq_cmot_sector_master'
	},
	COMPANY: {
		CMOT: 'eq_cmot_company_master'
	},
	SEARCH_LIST : ["loan_code", "loanCode", "code"],
	EVENT : {
		'/' : {
			GET : 'API_DOCUMENTATION'
		},
		'/init' : {
			GET : 'CHECK_APPLICATION_HEALTH'
		},
		'/master/v1/equity/:vendor/:master_code' : {
			POST : 'EQUITY_MASTER_CREATED',
			PUT : 'EQUITY_MASTER_UPDATED',
			GET : 'EQUITY_MASTER_FETCHED'
		}
	}
};
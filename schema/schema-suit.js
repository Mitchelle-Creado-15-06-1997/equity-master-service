const Constants = require('../constants/appConstants');
const STRING = 'string';
const INT = 'int';
const DOUBLE = 'double';
const OBJECT = 'object';
const ARRAY = 'array';

const AnyOfStringNull = [
	{ type: STRING },
	{ type: null },
];

const AnyOfDoubleNull = [
	{ type: DOUBLE },
	{ type: null },
];

const AnyOfIntNull = [
	{ type: INT },
	{ type: null },
];

const AnyOfArrayNull = [
	{ type: ARRAY },
	{ type: null },
];
module.exports = {
	equityMasterSchema: {
		id: '/equityMasterSchema',
		type: 'object',
		required: ['vendor', 'master_code'],
		properties: {
			vendor: { type: 'string' },
			master_code: { type: 'string', enum: Constants.MASTER_CODE }
		}
	},
	equityMasterCronSchema: {
		id: '/equityMasterSchema',
		type: 'object',
		required: [],
		properties: {}
	},
	equity: {
		INDEX : {
			CMOT: {
				id: '/indexMasterCmot',
				type: 'object',
				required: ['exchange_type'],
				properties: {
					exchange_type: { type: 'string', enum: Constants.EXCHANGE_TYPE }
				}
			}
		},
		SECTOR : {
			CMOT: {
				id: '/sectorMasterCmot',
				type: 'object',
				required: [],
				properties: {}
			}
		},
		COMPANY : {
			CMOT: {
				id: '/companyMasterCmot',
				type: 'object',
				required: [],
				properties: {}
			}
		}
	},
	fuzzySchema: {
		id: '/fuzzySchema',
		type: 'object',
		required: ['full_name', 'match_name'],
		properties: {
			full_name: { type: 'string' },
			match_name: { type: 'string' }
		}
	},
	header: {
		id: '/header',
		type: 'object',
		required: ['client_code'],
		properties: {
			client_code: { type: 'string', enum: Constants.CLIENT_CODES },
		}
	},
	fetchUserById: {
		id: '/fetchUserById',
		type: 'object',
		additionalProperties: true,
		required: ["user_id"],
		properties: {
			"user_id": { "type": "string" }
		}
	},
	fetchServiceTypeById: {
		id: '/serviceType',
		type: 'object',
		additionalProperties: true,
		required: ["servicetype_id"],
		properties: {
			"servicetype_id": { "type": "string" }
		}
	}
};

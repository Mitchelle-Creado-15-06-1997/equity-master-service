const Constants = require('../constants/appConstants');

module.exports = {
    client_code : {
        equity_master : {
            id: '/equity-master',
            type: 'object',
            required: ['loan_code'],
            properties: {
                loan_code : { type : 'string'}
            },
            message: "loan_code - Required"
        }
    } 
};
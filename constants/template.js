//your app templates come here
const CONSTANT = require('../constants/appConstants');
module.exports = {
    client_code : {
        equity_master : {
            request : `{
                "equity_master" : "{{#? clean($root,'master')}}"
            }`
        }
    }
}


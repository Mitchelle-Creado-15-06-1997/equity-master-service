//your app templates come here
const CONSTANT = require('../constants/appConstants');
module.exports = {
    CMOT : {
        INDEX : `{
            "exchange_type": "{{#? $root.clean(this,'exchange_type')}}",
            "vendor": "{{#? $root.clean(this,'vendor')}}",
            "master_code": "{{#? $root.clean(this,'master')}}"
        }`,
        COMPANY : `{
            "vendor": "{{#? $root.clean(this,'vendor')}}",
            "master_code": "{{#? $root.clean(this,'master')}}"
        }`,
        SECTOR : `{
            "vendor": "{{#? $root.clean(this,'vendor')}}",
            "master_code": "{{#? $root.clean(this,'master')}}"
        }`
    }
}


//your app templates come here
const CONSTANT = require('../constants/appConstants');
module.exports = {
    COMPANY : {
        CMOT : `{
            "{{#each data}}": {
              "co_code": "{{#? $root.clean(this,'co_code')}}",
              "BSECode": "{{#? $root.clean(this,'BSECode')}}",
              "NSESymbol": "{{#? $root.clean(this,'NSESymbol')}}",
              "CompanyName": "{{#? $root.clean(this,'CompanyName')}}",
              "CompanyShortName": "{{#? $root.clean(this,'CompanyShortName')}}",
              "CategoryName": "{{#? $root.clean(this,'CategoryName')}}",
              "isin": "{{#? $root.clean(this,'isin')}}",
              "mcaptype": "{{#? $root.clean(this,'mcaptype')}}",
              "SectorCode": "{{#? $root.clean(this,'SectorCode')}}",
              "BSEGroup": "{{#? $root.clean(this,'BSEGroup')}}",
              "SectorName": "{{#? $root.clean(this,'SectorName')}}",
              "BSEListed": "{{#? $root.clean(this,'BSEListed')}}",
              "NSEListed": "{{#? $root.clean(this,'NSEListed')}}",
              "DisplayType": "{{#? $root.clean(this,'DisplayType')}}"
            }
        }`
    }
}


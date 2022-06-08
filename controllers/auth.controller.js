// const CONSTANTS = require('../constants/appConstants');
const con = require('./../db/mariadb');
const common = require('./../utils/common');

class AuthController {
    auth(app) {
        //Creating JWT Token
        app.route('/auth/createJwtToken')
            .post(async (request, response, next) => {
                try {
                    let token = await common.createJwtToken(request, response);
                    response.send(
                        {
                            code: 200,
                            message: "Token shown successfully",
                            data: token.data
                        });
                } catch (error) {
                    response.send(
                        {
                            code: 500,
                            message: error,
                            data: null
                        });
                }
            });
    }
}

module.exports = AuthController;

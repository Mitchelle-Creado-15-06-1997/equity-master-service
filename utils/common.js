const config = require('./../config/prod.json');
var jwt = require('jsonwebtoken');

// API to create JWT token
exports.createJwtToken = function (req, res) {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (email && password) {
            var data = {
                email,
                password
            }
            token = jwt.sign(
                data, config.privateKey, {
                expiresIn: '12h'
            });
            return ({
                status: 200,
                message: "Token shown successfully",
                data: token
            });
        } else {
            return ({
                status: 500,
                message: "Required parameters missing",
                data: []
            });
        }
    }
    catch (e) {
        return ({
            code: 500,
            data: e.message
        });
    }
}

//API to verify JWT token
exports.verifyApiToken = function (req, res) {
    return new Promise((resolve, reject) => {
        var token = req.headers.auth;
        //console.log("Token", token);
        if (token) {
            jwt.verify(token, config.privateKey, function (err, result) {
                if (err) {
                    reject({
                        Status: 500,
                        data: "Invalid Token"
                    });
                }
                else {
                    resolve({
                        Status: 200,
                        message: "Token verified successfully",
                        data: {
                            "email": result.email,
                            "password": result.password
                        }
                    });

                }
            });
        } else {
            reject({
                code: 500,
                data: "Token Missing"
            });
        }
    })
}

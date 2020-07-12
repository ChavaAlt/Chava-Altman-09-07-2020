"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/users/service");
const jwt = require("jsonwebtoken");
class UserController {
    constructor() {
        this.user_service = new service_2.default();
    }
    register(req, res) {
        if (req.body.firstName && req.body.lastName &&
            req.body.userName &&
            req.body.password &&
            req.body.email &&
            req.body.phone) {
            const user_params = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                roleType: parseInt(req.body.roleType)
            };
            this.user_service.register(user_params, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('Registration is done ', user_data, res);
                }
            });
        }
        else {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    login(req, res) {
        let loginData = req.header('xx-auth');
        if (loginData) {
            const user_filter = { "password": loginData.substring(0, 64), "userName": loginData.substring(64, loginData.length) };
            this.user_service.filterUser(user_filter, (err, user_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (user_data != null) {
                    let token = jwt.sign({ id: user_data._id }, 'my secret');
                    res.header('xx-auth', token);
                    service_1.successResponse('get user successfull', user_data, res);
                }
                else {
                    service_1.failureResponse("invalid user", user_data, res);
                }
            });
        }
        else {
            service_1.failureResponse("login failed", req.body, res);
        }
    }
}
exports.UserController = UserController;

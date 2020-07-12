"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const schema_1 = require("../../modules/users/schema");
class Authenticate {
    constructor() {
        this.authenticate = (req, res, next) => {
            let token = req.header('xx-auth');
            let decoded = jwt.verify(token.toString(), 'my secret');
            return schema_1.default.findOne({
                '_id': decoded._id
            }).then((user) => {
                req.user = user;
                req.token = token;
                next();
            }).catch((e) => {
                res.status(401).send();
            });
        };
    }
}
exports.default = new Authenticate;

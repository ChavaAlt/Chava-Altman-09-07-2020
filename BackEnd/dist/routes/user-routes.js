"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.user_controller = new user_controller_1.UserController();
    }
    route(app) {
        app.post('/api/user', (req, res) => {
            this.user_controller.register(req, res);
        });
        app.get('/api/user', (req, res) => {
            this.user_controller.login(req, res);
        });
    }
}
exports.UserRoutes = UserRoutes;

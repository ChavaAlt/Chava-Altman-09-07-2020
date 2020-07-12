"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const user_routes_1 = require("../routes/user-routes");
const task_routes_1 = require("../routes/task-routes");
class App {
    constructor() {
        this.mongoUrl = `mongodb+srv://Altmantest:1234@clusterc.9wvxu.mongodb.net/taskmanagment?retryWrites=true&w=majority`;
        this.user_routes = new user_routes_1.UserRoutes();
        this.task_routes = new task_routes_1.TaskRoutes();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.user_routes.route(this.app);
        this.task_routes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'build')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    }
}
exports.default = new App().app;

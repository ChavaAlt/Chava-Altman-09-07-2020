"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/tasks/service");
const enviornment_1 = require("../enviornment");
class TaskController {
    constructor() {
        this.task_service = new service_2.default();
    }
    create_task(req, res) {
        let role = parseInt(req.header('role'));
        if (!enviornment_1.default.IsAdminRole(role))
            service_1.failureResponse("no Allowence", req.body, res);
        if (req.body.title && req.body.description && req.body.dateCreation && req.body.taskOwner && role == enviornment_1.default.IsAdminRole(role)) {
            const task_params = {
                title: req.body.title,
                description: req.body.description,
                userName: req.body.userName,
                phone: req.body.phone,
                email: req.body.email,
                dateCreation: Date.now.toString(),
                taskOwner: req.body.taskOwner
            };
            this.task_service.createTask(task_params, (err, task_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('create task successfull', task_data, res);
                }
            });
        }
        else if (enviornment_1.default.IsAdminRole(role)) {
            // error response if some fields are missing in request body
            service_1.insufficientParameters(res);
        }
    }
    get_all_tasks(req, res) {
        let role = parseInt(req.header('roleType'));
        let user_id = req.header('user_id');
        if (!enviornment_1.default.IsAdminRole(role)) {
            const task_filter = { taskOwner: user_id };
            this.task_service.filterTasks(task_filter, (err, task_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (task_data) {
                    service_1.successResponse('tasks', task_data, res);
                }
            });
        }
        else {
            this.task_service.getAllTasks((err, task_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('tasks', task_data, res);
                }
            });
        }
    }
    update_task(req, res) {
        let user_id = req.header('user_id');
        let role = parseInt(req.header('role'));
        if (req.params.id) {
            this.task_service.task_filter = { _id: req.params.id };
            if (!enviornment_1.default.IsAdminRole(role))
                this, this.task_service.task_filter = { _id: req.params.id, taskOwner: user_id };
            this.task_service.filterTask(this.task_service.task_filter, (err, task_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (task_data) {
                    if (enviornment_1.default.IsAdminRole(role) || user_id == task_data.taskOwner.toString()) {
                        const task_params = {
                            _id: req.params.id,
                            title: req.body.title,
                            userName: req.body.userName,
                            phone: req.body.phone,
                            email: req.body.email,
                            description: req.body.description,
                            dateCreation: req.body.dateCreation,
                            taskOwner: req.body.taskOwner,
                        };
                        this.task_service.updateTask(task_params, (err) => {
                            if (err) {
                                service_1.mongoError(err, res);
                            }
                            else {
                                service_1.successResponse('update task successfully', null, res);
                            }
                        });
                    }
                    else {
                        service_1.failureResponse("this user cant update this task", task_data, res);
                    }
                }
                else {
                    service_1.failureResponse('invalid task', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_task(req, res) {
        let role = parseInt(req.header('role'));
        let user_id = req.header('user_id');
        if (req.params.id) {
            this.task_service.task_filter = { _id: req.params.id };
            if (!enviornment_1.default.IsAdminRole(role))
                this.task_service.task_filter = { _id: req.params.id, taskOwner: user_id };
            this.task_service.filterTask(this.task_service.task_filter, (err, task_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (task_data) {
                    if (enviornment_1.default.IsAdminRole(role) || user_id == task_data.taskOwner.toString()) {
                        this.task_service.deleteTask(req.params.id, (err, delete_details) => {
                            if (err) {
                                service_1.mongoError(err, res);
                            }
                            else if (delete_details.deletedCount !== 0) {
                                service_1.successResponse('delete task successfull', null, res);
                            }
                            else {
                                service_1.failureResponse('invalid task', null, res);
                            }
                        });
                    }
                    else {
                        service_1.failureResponse("this user cant delete this task", req.body, res);
                    }
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.TaskController = TaskController;

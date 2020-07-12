"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class TaskService {
    createTask(task_params, callback) {
        const _session = new schema_1.default(task_params);
        _session.save(callback);
    }
    getAllTasks(callback) {
        return schema_1.default.find(callback);
    }
    filterTask(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    filterTasks(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateTask(task_params, callback) {
        const query = { _id: task_params['_id'] };
        schema_1.default.findOneAndUpdate(query, task_params, callback);
    }
    deleteTask(_id, callback) {
        const query = { _id: _id };
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = TaskService;

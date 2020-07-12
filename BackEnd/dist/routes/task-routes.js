"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const task_controller_1 = require("../controllers/task.controller");
class TaskRoutes {
    constructor() {
        this.task_controller = new task_controller_1.TaskController();
    }
    route(app) {
        app.post('/api/task', (req, res) => {
            this.task_controller.create_task(req, res);
        });
        app.get('/api/getAllTasks', (req, res) => {
            this.task_controller.get_all_tasks(req, res);
        });
        app.put('/api/task/:id', (req, res) => {
            this.task_controller.update_task(req, res);
        });
        app.delete('/api/task/:id', (req, res) => {
            this.task_controller.delete_task(req, res);
        });
    }
}
exports.TaskRoutes = TaskRoutes;

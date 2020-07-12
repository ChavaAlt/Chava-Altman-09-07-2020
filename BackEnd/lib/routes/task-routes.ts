import { Application, Request, Response } from 'express';
import { TaskController } from '../controllers/task.controller';

export class TaskRoutes {

    private task_controller: TaskController = new TaskController();

    public route(app: Application) {
        
        app.post('/api/task', (req: Request, res: Response) => {
            this.task_controller.create_task(req, res);
        });

        app.get('/api/getAllTasks', (req: Request, res: Response) => {
            this.task_controller.get_all_tasks(req, res);
        });

        app.put('/api/task/:id', (req: Request, res: Response) => {
            this.task_controller.update_task(req, res);
        });

        app.delete('/api/task/:id', (req: Request, res: Response) => {
            this.task_controller.delete_task(req, res);
        });

    }
}
import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.user_controller.register(req, res);
        });

        app.get('/api/user', (req: Request, res: Response) => {
            this.user_controller.login(req, res);
        });

    }
}

import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as path from 'path'
import * as cors from 'cors'
import environment from "../enviornment";
import { UserRoutes } from "../routes/user-routes";
import {TaskRoutes} from "../routes/task-routes"

class App {

   public app: express.Application;
   public mongoUrl: string = `mongodb+srv://Altmantest:1234@clusterc.9wvxu.mongodb.net/taskmanagment?retryWrites=true&w=majority`;

   private user_routes: UserRoutes = new UserRoutes();
   private task_routes:TaskRoutes =new TaskRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.user_routes.route(this.app);
      this.task_routes.route(this.app);
   }

   private config(): void {
      this.app.use(cors())
      
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));

      this.app.use(express.static(path.join(__dirname, 'build')))

      this.app.get('/', (req, res) => {
         res.sendFile(path.join(__dirname, 'build', 'index.html'))
       })
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;
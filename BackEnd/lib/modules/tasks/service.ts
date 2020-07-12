import { ITask } from './model';
import tasks from './schema';

export default class TaskService {
    public task_filter;
    public createTask(task_params: ITask, callback: any) {
        const _session = new tasks(task_params);
        _session.save(callback);
    }

    public getAllTasks(callback:any )
    {
        return tasks.find(callback)
    }

    public filterTask(query: any, callback: any) {
        tasks.findOne(query, callback);
    }
    public filterTasks(query: any, callback: any) {
        tasks.find(query, callback);
    }


    public updateTask(task_params: ITask, callback: any) {
        const query = { _id: task_params['_id'] };
        tasks.findOneAndUpdate(query, task_params, callback);
    }

    public deleteTask(_id: String, callback: any) {
        const query = { _id: _id };
        tasks.deleteOne(query, callback);
    }
}

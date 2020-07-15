import {Task} from "../../../model/Task";

export interface ITaskListProps {
    tasks: Task[];
    onAddTask : any;
    onReadTasks : any;
}
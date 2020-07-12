import {Task} from "../../model/Task";
import {DELETE_TASK, READ_TASKS, ADD_TASK, UPDATE_TASK} from "../actions/task-actions";


const tasksReducer = (state: Task[] = [], action: any) => {
    let newState: Task[] = [];
    switch (action.type) {
        case READ_TASKS:
            newState = [
                ...state,
                action.payload.tasks
            ];
            return newState;       
        case DELETE_TASK:
            return state.filter(task => task._id !== action.payload.id);
            case ADD_TASK:
                newState = [
                    ...state,
                    action.payload.task
                ];
                return newState; 

                case UPDATE_TASK:
                state = state.filter(task => task._id !== action.payload.task._id);
               newState = [
                    ...state,
                    action.payload.task
                ];
                return newState; 
        default:
            return state;
    }
}

export default tasksReducer;
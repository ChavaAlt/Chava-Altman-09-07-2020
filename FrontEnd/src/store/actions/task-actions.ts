import {Task } from "../../model/Task";
import axios from 'axios'



export const UPDATE_TASK = 'tasks:updateTask';
export const DELETE_TASK = 'tasks:deleteTask';
export const READ_TASKS = 'tasks:readTasks;';
export const ADD_TASK = 'tasks:addTask;';




 export const getTasksAsync = async () => {
    
     const res = await axios.get('http://localhost:3001/api/getAllTasks');
   
     return res.data.DATA;
     // this.setState({ users: data });
 };





export function readTasks(tasks : Task[]) {  
   
    return {
        type: READ_TASKS,
        payload: {
            tasks 
        }
    }
}

export function deleteTask(id: number) {

    return {
        type: DELETE_TASK,
        payload: {
            id
        }
    }
}

export function addTask(newTask: Task) {
    

      return {         
        type: ADD_TASK,
        payload: {
            task: newTask
        }
    }
}

export function updateTask(newTask: Task) {
    
      return {         
        type: UPDATE_TASK,
        payload: {
            task: newTask
        }
    }
}
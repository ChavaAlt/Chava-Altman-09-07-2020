import {Task } from "../../model/Task";
import axios from 'axios'



export const UPDATE_TASK = 'tasks:updateTask';
export const DELETE_TASK = 'tasks:deleteTask';
export const READ_TASKS = 'tasks:readTasks;';
export const ADD_TASK = 'tasks:addTask;';




// const getTasksAsync = async (state : any) => {
    
//     const res = await axios.get('http://localhost:3001/api/getAllTasks');
   
//     return res.data.DATA;
//     // this.setState({ users: data });
// };

const deleteTaskAsync = async (id: number) => {
    
    const res = await axios.delete('http://localhost:3001/api/task/id');
   
    return res.data.DATA;
};

const updateTaskAsync = async (newTask: Task) => {
    
    const res = await axios.post('http://localhost:3001/api/getAllTasks');
   
    return res.data.DATA;
    // this.setState({ users: data });
};

const addTaskAsync = async (newTask: Task) => {
    
    const res = await axios.post('http://localhost:3001/api/getAllTasks');
   
    return res.data.DATA;
    // this.setState({ users: data });
};

export function readTasks(state : any) {  
   
    return {
        type: READ_TASKS,
        payload: {
            tasks: [] // getTasksAsync(state)
        }
    }
}

export function deleteTask(id: number) {

    deleteTaskAsync(id);
    return {
        type: DELETE_TASK,
        payload: {
            id
        }
    }
}

export function addTask(newTask: Task) {
    
     addTaskAsync(newTask);
      return {         
        type: UPDATE_TASK,
        payload: {
            task: {_id: "5f072211d11a933378f8ba9a", description : "Task add", title: "New Task", userName: "C Altman", email: "aaa@ggg.gg", phone: "0548413614", dateCreation: "2020-01-01", taskOwner:"asa"}
        }
    }
}

export function updateTask(newTask: Task) {
    
    updateTaskAsync(newTask);
      return {         
        type: UPDATE_TASK,
        payload: {
            task: newTask
        }
    }
}
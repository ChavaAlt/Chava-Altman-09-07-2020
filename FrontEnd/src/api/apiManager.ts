import axios from 'axios';

import { Task } from 'src/model/Task';

const url = "https://chava-altman-09-07-2020.herokuapp.com/api";


const headers = {
    'Content-Type': 'application/json',
    'roleType': '0',
    'user_id':'5f0612a8e9a04b31501d2c7b'
  };

 

const getAllTasks = () => {
 
    return axios.get(`${url}/getAllTasks`,{headers});
}


const addTask = (task: Task) => {
    console.log(task)
    return axios.post<Task>(`${url}/task`,task ,{headers} 
    );
}

const deleteTask = async (id: string) => {
    axios.delete<any>(`${url}/task/${id}`,{headers} );
       
}

const updateTask = async (task: Task) => {
    axios.put<Task>(`${url}/task/${task._id}`,task ,{headers}
    );
}

export {
    getAllTasks,
    addTask,
    deleteTask,
    updateTask
};

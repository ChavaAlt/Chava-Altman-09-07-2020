import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { ITask } from '../modules/tasks/model';
import TaskService from '../modules/tasks/service';
import e = require('express');
import enviornment from '../enviornment';
import UserService from 'modules/users/service';
import { ModificationNote } from 'modules/common/model';

export class TaskController {

    private task_service: TaskService = new TaskService();

    public create_task(req: Request, res: Response) {

       // let role = parseInt(req.header('role'));
       let role=1;
        if (!enviornment.IsAdminRole(role))
            failureResponse("no Allowence", req.body, res)
        if (req.body.title && req.body.description   && role == enviornment.IsAdminRole(role)) {
            const task_params: ITask = {
                title: req.body.title,
                description: req.body.description,
                userName:req.body.userName,
                phone:req.body.phone,
                email:req.body.email,
                dateCreation: Date.now().toString(),
                //taskOwner: req.header('user_id')
                taskOwner:"5f0612a8e9a04b31501d2c7b"
            };
            this.task_service.createTask(task_params, (err: any, task_data: ITask) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create task successfull', task_data, res);
                }
            });
        } else if (enviornment.IsAdminRole(role)) {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_all_tasks(req: Request, res: Response) {
        let role = parseInt(req.header('roleType'))
        let user_id = req.header('user_id')
        if (!enviornment.IsAdminRole(role)) {
            const task_filter = { taskOwner: user_id };
            this.task_service.filterTasks(task_filter, (err: any, task_data: ITask) => {
                if (err) {
                    mongoError(err, res);
                } else if (task_data) {
                    successResponse('tasks', task_data, res)
                }
            })
        }
        else {

            this.task_service.getAllTasks((err: any, task_data: ITask) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('tasks', task_data, res)
                }

            });
        }
    }

    public update_task(req: Request, res: Response) {
        let user_id = req.header('user_id');
        let role = parseInt(req.header('role'));
        if (req.params.id) {
           this.task_service.task_filter={ _id: req.params.id };
            if(!enviornment.IsAdminRole(role))
            this.task_service.task_filter = { _id: req.params.id ,taskOwner:user_id};
            this.task_service.filterTask(this.task_service.task_filter, (err: any, task_data: ITask) => {
                if (err) {
                    mongoError(err, res);
                } else if (task_data) {
                    if (enviornment.IsAdminRole(role) || user_id == task_data.taskOwner.toString()) {
                        const task_params: ITask = {
                            _id: req.params.id,
                            title: req.body.title,
                            userName:req.body.userName,
                            phone:req.body.phone,
                            email:req.body.email,
                            description: req.body.description,
                            dateCreation: req.body.dateCreation,
                            taskOwner: req.body.taskOwner,
                        };
                        this.task_service.updateTask(task_params, (err: any) => {
                            if (err) {
                                mongoError(err, res);
                            } else {
                                successResponse('update task successfully', null, res);
                            }
                        });
                    }
                    else {
                        failureResponse("this user cant update this task", task_data, res)
                    }
                } else {
                    failureResponse('invalid task', null, res);
                }
            });

        } else {
            insufficientParameters(res);
        }

    }

    public delete_task(req: Request, res: Response) {
        let role = parseInt(req.header('role'));
        let user_id = req.header('user_id');
        if (req.params.id) {
            this.task_service.task_filter={ _id: req.params.id };
            if(!enviornment.IsAdminRole(role))
            this.task_service.task_filter = { _id: req.params.id ,taskOwner:user_id};
            this.task_service.filterTask(this.task_service.task_filter, (err: any, task_data: ITask) => {
                if (err) {
                    mongoError(err, res);
                }
                else if (task_data) {
                    if (enviornment.IsAdminRole(role) || user_id == task_data.taskOwner.toString()) {
                        this.task_service.deleteTask(req.params.id, (err: any, delete_details) => {
                            if (err) {
                                mongoError(err, res);
                            } else if (delete_details.deletedCount !== 0) {
                                successResponse('delete task successfull', null, res);
                            } else {
                                failureResponse('invalid task', null, res);
                            }
                        });
                    }
                    else {
                        failureResponse("this user cant delete this task", req.body, res)
                    }
                }
            })

        } else {
            insufficientParameters(res);
        }
    }


}
import * as React from 'react';
import {ITaskListProps} from "./types/ITaskListProps";
import {Task} from "../../model/Task";
import TaskCloseButton from "../task-close-button/TaskCloseButton";
import {Grid, Table} from "react-bootstrap";
import TaskEditButton from "../task-edit-button/TaskEditButton";
import { readTasks, addTask } from 'src/store/actions/task-actions';
import {connect} from "react-redux";
import * as Api from '../../api/apiManager';
import { ITaskListState } from './types/ITaskListState';
import TaskAddButton from '../task-edit-button copy/TaskAddButton';

 export class TaskList extends React.Component<ITaskListProps, ITaskListState> {

    private task : Task;
    
    constructor(props: ITaskListProps, context: any) {
       
        super(props, context);
        this.state = {
            showModal: false
        }
    }

    public handleCloseModal = () => {
        
       // this.AddTask();
        this.setState({
            showModal : false
        })
    }

    public handleAddClick = () => {       

        
        this.setState({
            showModal : true
        })   
    }

    



    public getAllTasks = async () => {
        Api.getAllTasks()
            .then(({ data }) => {
                this.props.onReadTasks(data.DATA);
                console.log(data);
            }).catch((err) => {
                console.log(err)
            });
    }

    public componentWillMount(){
 
        this.getAllTasks();
    };

    public render() {
        return (
            <Grid>
                <Table striped={true} bordered={true} hover={true}>
                    <thead>
                        <tr>
                        <th> פעולות</th>
                        <th>תאריך יצירת המשימה</th>
                        <th>מייל</th>
                            <th>טלפון</th>
                            <th>שם משתמש</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTasks() }
                    </tbody>
                </Table>
                <TaskAddButton task={this.task}/>
        
            </Grid>
        )
    };

    public renderTasks = () => {
        return this.props.tasks.map((task: Task, index: number) => {
            return (
                <tr key={index}>
                    <td><TaskEditButton task={task}/>
                        <TaskCloseButton id={task._id}/>
                        </td>
                        <td>{ task!==undefined?task.dateCreation.substring(0,10):"" }</td>
                        <td>{ task!==undefined?task.email:"rrr@gmail.com" }</td>
                    <td>{ task!==undefined?task.phone:"036778765" }</td>
                    <td> 
                        { task!==undefined?task.userName :"user name"}
                    </td>

                </tr>
                
            );
        });
    }
}



const mapActionsToProps = {
    onAddTask: addTask,
    onReadTasks: readTasks
};

export default connect(undefined, mapActionsToProps)(TaskList);


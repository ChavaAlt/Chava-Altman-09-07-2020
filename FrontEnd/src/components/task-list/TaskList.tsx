import * as React from 'react';
import {ITaskListProps} from "./types/ITaskListProps";
import {Task} from "../../model/Task";
import TaskCloseButton from "../task-close-button/TaskCloseButton";
import {Grid, Table} from "react-bootstrap";
import TaskEditButton from "../task-edit-button/TaskEditButton";
import { readTasks } from 'src/store/actions/task-actions';
import {connect} from "react-redux";

class TaskList extends React.Component<ITaskListProps, {}> {

    constructor(props: ITaskListProps, context: any) {
        super(props, context);
    

    }

    public componentWillMount(){
 
         // this.props.onReadTasks();
            };

    public render() {
        return (
            <Grid>
                <Table striped={true} bordered={true} hover={true}>
                    <thead>
                        <tr>
                        <th> Titie</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTasks() }
                    </tbody>
                </Table>
            </Grid>
        )
    };

    public renderTasks = () => {
        return this.props.tasks.map((task: Task, index: number) => {
            return (
                <tr key={index}>
                    <td>{ task.description }</td>
                    <td>{ task.title }</td>
                    <td>
                        <TaskEditButton task={task}/>
                        <TaskCloseButton id={task._id}/>
                        
                    </td>

                </tr>
            );
        });
    }
}



const mapActionsToProps = {
    onReadTasks: readTasks
};

export default connect(undefined, mapActionsToProps)(TaskList);


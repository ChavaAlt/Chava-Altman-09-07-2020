import * as React from 'react';
import './TaskForm.css';
import {TaskFormState} from "./types/TaskFormState";
import { readTasks } from "../../store/actions/task-actions";
import {connect} from "react-redux";
import {TaskFormProps} from "./types/TaskFormProps";
import {Button, Col, Grid, Row} from "react-bootstrap";
import { IAppState } from 'src/store/AppStore';

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {

    constructor(props: TaskFormProps, context: any) {
        super(props, context);
        this.state = {
            currentTask: "",
            nextTaskId: 0
        }
    }

    public componentWillMount(){
 
// this.props.readTasks();
    };

    public handleClick = () => {
       
        // this.onEditTask();
    }

    public render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid>
                    <Row>
                        <Col sm={6} xs={12}>
                <input className="form-input" type="text" placeholder="add a task"
                       onChange={this.inputChange} value={ this.state.currentTask }/>
                        </Col>
                        <Col sm={6} xs={12}>
                            <Button bsStyle="info" type="submit" onClick={this.handleClick}>Add task</Button>
                        </Col>
                    </Row>
                </Grid>
            </form>
            )
    }


    private onAddTask() {
        this.props.onAddTask({
            id: this.state.nextTaskId,
            description: this.state.currentTask
        });
        this.updateStateOnSubmit();
    }

    private updateStateOnSubmit() {
        this.setState({
            currentTask: "",
            nextTaskId: this.state.nextTaskId + 1
        })
    }

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) :void => {
        e.preventDefault();
        this.onAddTask();
    }


    private inputChange = (e: any) => {
        this.setState({
            currentTask: e.target.value,
        });
    }
}

const mapStateToProps = (state: IAppState) => ({
    tasks: state.tasks
});

const mapActionsToProps = {
    onReadTasks : readTasks,
    // onAddTask : addTask
};

export default connect(mapStateToProps, mapActionsToProps)(TaskForm);

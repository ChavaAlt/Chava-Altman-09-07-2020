import * as React from 'react';
import {ITaskCloseButtonProps} from "./types/ITaskCloseButtonProps";
import {connect} from "react-redux";
import {deleteTask} from "../../store/actions/task-actions";
import {Button} from "react-bootstrap";
import * as Api from '../../api/apiManager';

class TaskCloseButton extends React.Component<ITaskCloseButtonProps, {}> {

    constructor(props: ITaskCloseButtonProps, context: any) {
        super(props, context);
    }

    public handleClick = () => {
        this.DeleteTask();
    }

    public DeleteTask = async () => {
        Api.deleteTask(this.props.id)
    .then(() => {
        this.onRemoveTask();
    }).catch((err) => {
        console.log(err)
    });
    }

    public render() {
        return (
            <Button bsStyle="danger" onClick={this.handleClick}>x</Button>
        )
    };

    public onRemoveTask = () => {
        this.props.onRemoveTask(this.props.id);
    }
}

const mapActionsToProps = {
    onRemoveTask: deleteTask
};

export default connect(undefined, mapActionsToProps)(TaskCloseButton);

import * as React from 'react';
import {ITaskAddButtonProps} from "./types/ITaskAddButtonProps";
import {TaskAddState} from "./types/TaskAddState";
import {connect} from "react-redux";
import {addTask} from "../../store/actions/task-actions";
import {Button, Modal} from "react-bootstrap";


class TaskAddButton extends React.Component<ITaskAddButtonProps, TaskAddState> {

    constructor(props: ITaskAddButtonProps, context: any) {
        super(props, context);
        this.state = {
            showModal: false
        }
    }

    public handleClick = () => {
        this.setState({
            showModal : true
        })

    }
    

    public handleClose = () => {
        this.onAddTask();
        this.setState({
            showModal : false
        })
    }

    public render() {
        return (
            <>
            <Modal
        show={this.state.showModal}
        onHide={this.handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
          <Button bsStyle="warning" onClick={this.handleClose}>אישור</Button>
      </Modal>
            <Button bsStyle="warning" onClick={this.handleClick}>edit</Button>
            </>
        )
    };

    public onAddTask = () => {
        this.props.onAddTask(this.props.task);
    }
}

const mapActionsToProps = {
    onAddTask: addTask
};

export default connect(undefined, mapActionsToProps)(TaskAddButton);

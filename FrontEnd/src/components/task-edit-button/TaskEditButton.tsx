import * as React from 'react';
import {ITaskEditButtonProps} from "./types/ITaskEditButtonProps";
import {TaskEditState} from "./types/TaskEditState";
import {connect} from "react-redux";
import {updateTask} from "../../store/actions/task-actions";
import {Button, Modal} from "react-bootstrap";

class TaskEditButton extends React.Component<ITaskEditButtonProps, TaskEditState> {

    constructor(props: ITaskEditButtonProps, context: any) {
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
        this.onEditTask();
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

    public onEditTask = () => {
        this.props.onEditTask(this.props.task);
    }
}

const mapActionsToProps = {
    onEditTask: updateTask
};

export default connect(undefined, mapActionsToProps)(TaskEditButton);

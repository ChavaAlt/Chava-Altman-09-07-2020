import * as React from 'react';
import {ITaskEditButtonProps} from "./types/ITaskEditButtonProps";
import {TaskEditState} from "./types/TaskEditState";
import {connect} from "react-redux";
import {updateTask} from "../../store/actions/task-actions";
import {Button, Modal,Label} from "react-bootstrap";
import * as Api from '../../api/apiManager';

class TaskEditButton extends React.Component<ITaskEditButtonProps, TaskEditState> {

    constructor(props: ITaskEditButtonProps, context: any) {
        super(props, context);
        this.state = {
            showModal: false,
            task:props.task
        }
    } 

    public handleClick = () => {
        this.setState({
            showModal : true
        })

    }

    public UpdateTask = async () => {
    
        Api.updateTask(this.state.task)
    .then(() => {
        this.onEditTask();
        
    }).catch((err) => {
        console.log(err)
    });
    }
    

    public handleClose = () => {
        
        this.UpdateTask();
        this.setState({
            showModal : false
        })
    }

    public handleUserNameChange=(event:React.FormEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        this.setState(prevState => ({
            task: {                   
                ...prevState.task,    
                userName: target.value   
            }
        }))
    }


    public handlePhoneChange=(event:React.FormEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        this.setState(prevState => ({
            task: {                   
                ...prevState.task,    
                phone: target.value   
            }
        }))
    }

    public handleEmailChange=(event:React.FormEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        this.setState(prevState => ({
            task: {                   
                ...prevState.task,    
                email: target.value   
            }
        }))
    }




    public render() {
        return (
            <>
           <Modal show={this.state.showModal} onHide={this.handleClose} dir="rtl">
        <Modal.Header >
          <Modal.Title>עריכת משימה</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        
            <Label>שם משתמש</Label>
            <input defaultValue={this.props.task.userName} onChange={this.handleUserNameChange}/>
            <br/>
            <Label>מייל</Label>
            <input type="email" defaultValue={this.props.task.email}onChange={this.handleEmailChange}/>
            <br/>
            <Label>טלפון</Label>
            <input defaultValue={this.props.task.phone}onChange={this.handlePhoneChange}/>
            <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleClose}>
            שמור שינויים
          </Button>
        </Modal.Footer>
      </Modal>
            <Button  onClick={this.handleClick} title="edit"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfUlEQVQ4jWMMiM1YxUABYKFEM1UMYLx0495/GEdYXA4u8fnHP5yamH68op4LqGvAFyRnv/2C6gVh1tdw9v+ta2jkgoE3gIeDCc7+9eUpikLuDxvg7H+eDjRyAVkGzJm3YDWMIyLED5dQ4HmuiKzw9VfW+zA2K+9pKrqAUgMAw2ghbEWtpHgAAAAASUVORK5CYII="/></Button>
            </>
        )
    };

    public onEditTask = () => {
        this.props.onEditTask(this.props.task);
    }
}
// const mapStateToProps = (state: TaskEditState) => ({
//     task: state.task
// });


const mapActionsToProps = {
    onEditTask: updateTask
};

export default connect(undefined, mapActionsToProps)(TaskEditButton);


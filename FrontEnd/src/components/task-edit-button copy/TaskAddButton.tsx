import * as React from 'react';
import {ITaskAddButtonProps} from "./types/ITaskAddButtonProps";
import {TaskAddState} from "./types/TaskAddState";
import {connect} from "react-redux";
import {addTask} from "../../store/actions/task-actions";
import {Button, Modal,Label} from "react-bootstrap";
import * as Api from '../../api/apiManager';
 // import {Task} from "../../model/Task";


class TaskAddButton extends React.Component<ITaskAddButtonProps, TaskAddState> {
    // private task : Task;

    constructor(props: ITaskAddButtonProps, context: any) {
        
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

   

    

    public AddTask = async () => {
        Api.addTask(this.state.task)
            .then((data) => {
                console.log(data.data)
               this.props.onAddTask(data.data.DATA)
            }).catch((err) => {
                console.log(err)
            });
    }
    

    public handleClose = () => {
        this.AddTask();
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

    public handleTitleChange=(event:React.FormEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        this.setState(prevState => ({
            task: {                   
                ...prevState.task,    
                title: target.value   
            }
        }))
    }

    public handleDescriptionChange=(event:React.FormEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        this.setState(prevState => ({
            task: {                   
                ...prevState.task,    
                description: target.value   
            }
        }))
    }

    public render() {
        return (
             <>

<Modal show={this.state.showModal} onHide={this.handleClose} dir="rtl">
        <Modal.Header >
          <Modal.Title>משימה חדשה</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Label>כותרת</Label>
            <input defaultValue="כותרת" onChange={this.handleTitleChange}/>
            <br/>
            <Label>תאור</Label>
            <input defaultValue="תאור" onChange={this.handleDescriptionChange}/>
            <br/>
            <Label>שם משתמש</Label>
            <input defaultValue="שם משתמש" onChange={this.handleUserNameChange}/>
            <br/>
            <Label>מייל</Label>
            <input type="email" defaultValue="מייל"onChange={this.handleEmailChange}/>
            <br/>
            <Label>טלפון</Label>
            <input type="number" defaultValue="טלפון"onChange={this.handlePhoneChange}/>
            <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleClose}>
            שמור שינויים
          </Button>
        </Modal.Footer>
      </Modal>

      <Button  onClick={this.handleClick} title="create">משימה חדשה</Button>
      

      

            
            </>
        )
    };

    public onAddTask = () => {
        this.props.onAddTask();
    }
}

const mapActionsToProps = {
    onAddTask: addTask
};

export default connect(undefined, mapActionsToProps)(TaskAddButton);

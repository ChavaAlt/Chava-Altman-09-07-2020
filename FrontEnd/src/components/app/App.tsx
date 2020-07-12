import TodoHeader from '../todo-header/TodoHeader';
import * as React from 'react';
import './App.css';
import TaskList from "../task-list/TaskList";
import {IState} from "./types/IState";
import {IProps} from "./types/IProps";
import {connect} from "react-redux";
import {IAppState} from "../../store/AppStore";
import {Button} from "react-bootstrap";

import { addTask } from 'src/store/actions/task-actions';



class App extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);       
    }

    public handleClick = () => {
       this.props.onAddTask();
    }



    public render() {
        return (
            <div className="App">
                <TodoHeader name="Tasks Management"/>
                
                <TaskList tasks={this.props.tasks}/>
                <Button bsStyle="info" type="submit" onClick={this.handleClick}>Add task</Button>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    tasks: state.tasks,
});

 const mapActionsToProps = {
     onAddTask: addTask
 };

// const mapDispatchToProps = (dispatch: Dispatch) => ({
    
//          actions : bindActionCreators(thunk, dispatch), dispatch
     
// });

//  export default connect(mapStateToProps, mapDispatchToProps)(App);


 export default connect(mapStateToProps, mapActionsToProps)(App);

import TodoHeader from '../todo-header/TodoHeader';
import * as React from 'react';
import './App.css';
import TaskList from "../task-list/TaskList";
import {IState} from "./types/IState";
import {IProps} from "./types/IProps";
import {connect} from "react-redux";
import {IAppState} from "../../store/AppStore";





class App extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);       
        this.context = context;
    }

    
   

    




    public render() {
        return (
            <div className="App">
                <TodoHeader name="Tasks Management"/>
                
                <TaskList tasks={...this.props.tasks}/>
                
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    tasks: state.tasks,
});



// const mapDispatchToProps = (dispatch: Dispatch) => ({
    
//          actions : bindActionCreators(thunk, dispatch), dispatch
     
// });

//  export default connect(mapStateToProps, mapDispatchToProps)(App);


 export default connect(mapStateToProps, undefined)(App);

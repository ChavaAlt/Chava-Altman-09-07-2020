import {createStore} from 'redux';
import allReducers from "./reducers/AllReducers";
import {Task} from "../model/Task";


export interface IAppState {
    tasks: Task[]
}

const INITIAL_STATE: IAppState = {
    
    tasks: [
        {_id: "5f072211d11a933378f8ba9a", description : "Task 1", title: "Story 1", userName: "C Altman", email: "aaa@ggg.gg", phone: "0548413614", dateCreation: "2020-01-01", taskOwner:"abra"},
        {_id: "5f072211d11a933378f8ba9b", description : "Task 2", title: "Story 2", userName: "S Berman", email: "bbb@ggg.gg", phone: "0548413614", dateCreation: "2020-01-01", taskOwner:"ham"},
        {_id: "5f072211d11a933378f8ba9c", description : "Task 3", title: "Story 3", userName: "C Altman", email: "ccc@ggg.gg", phone: "0548413614", dateCreation: "2020-01-01", taskOwner:"alt"},

    ],
}



const appStore = createStore(
    allReducers,
    INITIAL_STATE as any
    );
export { appStore };
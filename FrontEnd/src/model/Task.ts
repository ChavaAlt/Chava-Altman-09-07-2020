

export interface Task {
    _id: string;
    email: string;
    phone: string;
    userName: string;
    title: string;
    description: string;
    dateCreation: string;
    taskOwner: string;
    DATA:Task
}
export interface GetTasksResponse {
    STATUS : string,
    MESSAGE: string,
    DATA : GetTasksResponseData

}

export interface GetTasksResponseData{
    DATA : Task[],
    MESSAGE: string,
    STATUS: string
}
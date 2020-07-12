

export interface Task {
    _id: string;
    title: string;
    description: string;
    userName: string;
    phone: string;
    email: string;
    dateCreation: string;
    taskOwner: string;
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
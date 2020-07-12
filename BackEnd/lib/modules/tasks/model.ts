import { ModificationNote } from "../common/model";

export interface ITask {
    _id?:String
    title: String,
    description:  String,
    userName:String,
    phone:String,
    email:String
    dateCreation:String,
    taskOwner:Number,
    isCompleted?:Boolean

}
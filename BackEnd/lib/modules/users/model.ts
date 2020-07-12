import { ModificationNote } from "../common/model";

export interface IUser {
    _id?:String
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    phone:String,
    email:String,
    roleType:Number
}
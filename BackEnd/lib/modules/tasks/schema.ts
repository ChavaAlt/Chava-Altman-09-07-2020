
import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;



const schema = new Schema(
    {
        title: {type: String,  max: 100},
        description: {type: String, },
        userName:{type:String},
        email:{type:String},
        phone:{type:String},
        dateCreation:{type:Date,required:true,unique:true},
        taskOwner:{type: mongoose.SchemaTypes.ObjectId, ref: 'User'} ,
        isCompleted:{type:Boolean,required:false
    }
    });

export default mongoose.model('tasks', schema);
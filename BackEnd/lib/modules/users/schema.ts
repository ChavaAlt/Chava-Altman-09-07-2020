
import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;


let schemaDefenition = (min, max, pk = false, require = true,type="string") => ({
    type:type=="string"?String:Number,
    required: require,
    unique: pk,
    minlength: min,
    maxlength: max
});
const schema = new Schema(
    {
        firstName: schemaDefenition(3, 15),
        lastName: schemaDefenition(3, 15),
        userName: schemaDefenition(3, 15, true),
        password: schemaDefenition(64, 64),
        phone:schemaDefenition(7,10),
        email:schemaDefenition(10,100),
        roleType:schemaDefenition(1,1,false,true,"number")
    });

export default mongoose.model('users', schema);
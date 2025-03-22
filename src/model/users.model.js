import mongoose from './index.model.js'
import { ROLES } from '../constants/common.constants.js'


const validateRole = ( value ) => {
    if(ROLES[value])
        return true
    return false
}


let usersSchema = new mongoose.Schema({
    name:{ type:String, required:[true,"Name is required"]},
    email:{ type:String, required:[true,"Email is required"], unique:true },
    password:{ type:String, required:[true,"Password is required"] },
    role:{ type:String, default:ROLES.USER,
        validate:{
            validator:validateRole,
            message: props => `${props.value} is not a valid role`
        }
    }
    },{
        collection:'users',
        versionKey:false
    }
)


export default mongoose.model('users',usersSchema)


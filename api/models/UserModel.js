import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
         type:String,
         required:true,
         trim: true,
       },
    surename:{
       type:String,
       required:true,
       trim: true

    },
    email:{
        type:String,
        unique:true,
        trim: true,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps : true
})


const User = mongoose.model('User', UserSchema)
export default User
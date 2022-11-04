import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    name:{
         type:String,
         required:true,
         trim: true,
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


const Admin = mongoose.model('Admin', AdminSchema)
export default Admin
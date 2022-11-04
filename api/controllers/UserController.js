import User from '../models/UserModel.js'
import bcryptjs from "bcryptjs";


// Create CreateUser
export const CreateUser = async (req,res,next) => {
    const {name,surename,email,password} = req.body
 
    if(!name || !surename || !email || !password ) {
        res.status(400).json({ error: 'name,email && password is required!'})
    }
    else{
        try {
            const salt = await bcryptjs.genSaltSync(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
       
            await User.create({...req.body, password:hashedPassword})   
             res.status(200).json({ success: true, data:req.body})
           } catch (error) {
             next(error);
           } 
    }
} 

// Read User
export const ReadUser =  async (req,res,next) => {
    try {
       const user = await User.find()
       if(!user){
           res.status(400).json({ error: 'Null'})
       }
       if(user){
         res.status(200).json({ success: true, data:user })
       }
    } catch (error) {
        next(error);
    }
}

// Read Single User
export const ReadSingleUser =  async (req,res,next) => {
    const id = req.params.id
    try {

       const user = await User.findById(id)
       if(!user){
           res.status(400).json({ error: 'Null'})
       }
       if(user){
         res.status(200).json({ success: true, data:admin })
       }
    } catch (error) {
        next(error);
    }
}


// Update User
export const UpdateUser = async (req,res,next) => {
    const id = req.params.id
    const {name,email,password} = req.body;
    try {
        const isExist = await User.findById(id)
        if(!isExist){
            res.status(400).json({ error: 'Null'})
        }
        if(isExist){
            if(!name || !email || !password ) {
                res.status(400).json({ error: 'name,email && password is required!'})
            } else {
                 const salt = await bcryptjs.genSaltSync(10)
                 const hashedPassword = await bcryptjs.hash(password, salt)
                 const user = await User.findByIdAndUpdate(isExist._id,{...req.body, password:hashedPassword},{upsert: true}) 
                 res.status(200).json({ success: true, data:user })
            }        
        }
    } catch (error) {
        next(error)
    }

  
}

// Delete User
export const DeleteUser = async (req,res,next) => {
   const id = req.params.id  
   try {
    const isExist = await User.findById(id)
    if(!isExist){
        res.status(400).json({ error: 'Null'})
    }
    if(isExist){
       await User.findByIdAndDelete(isExist._id)
       res.status(200).json({ success: true , delete:isExist})
    } 
   } catch (error) {
      next(error) 
   }
}
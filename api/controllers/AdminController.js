import Admin from "../models/AdminModel.js";
import bcryptjs from "bcryptjs";


// Create Admin
export const CreateAdmin = async (req,res,next) => {
    const {name,email,password} = req.body

    if(!name || !email || !password ) {
        res.status(400).json({ error: 'name,email && password is required!'})
    }
    else{
        try {
            const salt = await bcryptjs.genSaltSync(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
       
            await Admin.create({...req.body, password:hashedPassword})   
             res.status(200).json({ success: true, data:req.body})
           } catch (error) {
             next(error);
           } 
    }
} 

// Read Admin
export const ReadAdmin =  async (req,res,next) => {
    try {
       const admin = await Admin.find()
       if(!admin){
           res.status(400).json({ error: 'Null'})
       }
       if(admin){
         res.status(200).json({ success: true, data:admin })
       }
    } catch (error) {
        next(error);
    }
}

// Read Single Admin
export const ReadSingleAdmin =  async (req,res,next) => {
    const id = req.params.id
    try {

       const admin = await Admin.findById(id)
       if(!admin){
           res.status(400).json({ error: 'Null'})
       }
       if(admin){
         res.status(200).json({ success: true, data:admin })
       }
    } catch (error) {
        next(error);
    }
}


// Update Admin
export const UpdateAdmin = async (req,res,next) => {
    const id = req.params.id
    const {name,email,password} = req.body;
    try {
        const isExist = await Admin.findById(id)
        if(!isExist){
            res.status(400).json({ error: 'Null'})
        }
        if(isExist){
            if(!name || !email || !password ) {
                res.status(400).json({ error: 'name,email && password is required!'})
            } else {
                 const salt = await bcryptjs.genSaltSync(10)
                 const hashedPassword = await bcryptjs.hash(password, salt)
                 const admin = await Admin.findByIdAndUpdate(isExist._id,{...req.body, password:hashedPassword},{upsert: true}) 
                 res.status(200).json({ success: true, data:admin })
            }        
        }
    } catch (error) {
        next(error)
    }

  
}

// Delete Admin
export const DeleteAdmin = async (req,res,next) => {
   const id = req.params.id  
   try {
    const isExist = await Admin.findById(id)
    if(!isExist){
        res.status(400).json({ error: 'Null'})
    }
    if(isExist){
       await Admin.findByIdAndDelete(isExist._id)
       res.status(200).json({ success: true , delete:isExist})
    } 
   } catch (error) {
      next(error) 
   }
}
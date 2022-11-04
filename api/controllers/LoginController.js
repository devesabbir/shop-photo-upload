import bcryptjs from "bcryptjs"
import Admin from "../models/AdminModel.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const LoginController = async (req, res, next) => {
    let {email, password} = req.body
    try {
       const loginAdmin = await Admin.findOne({email}) 
       if(!loginAdmin) {
          res.status(404).json({ message: 'Your Email is not available!'})
        } 
       
       if(loginAdmin){
          const passCheck = await bcryptjs.compare(password, loginAdmin.password)
          if(!passCheck){
              res.status(401).json({ message: 'Password does not match' })
          }

          if(passCheck){
              // Token
              const token = jwt.sign({id:loginAdmin._id,isAdmin:loginAdmin.isAdmin}, process.env.SECRET_KEY,{expiresIn:'10m'})

            let {_id, isAdmin, password,...loginAdminInfo} = loginAdmin._doc  
              res.cookie('access_token',token).status(200).json({ 
                  token: token,
                  data:loginAdminInfo
              })

          }
       }

    } catch (error) {
        next(error)
    } 
}



import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const SingleAuthMiddleware =  (req,res,next) => {
    let isAccess = req.cookies.access_token
    if(!isAccess){
        res.status(401).json({message:'Sorry You\'re not authorized to access this page.'})
    }

    // Jwt Verify
    const login = jwt.verify(isAccess, process.env.SECRET_KEY)

    if(!login){
       res.status(403).json({ message:'Unexpected token found.' })
    }

    if(login.id !== req.params.id){
        res.status(403).json({ message:'You are not eligible for this operation.'})
    }

    if(login){
        req.login = login
        next()
    }
}
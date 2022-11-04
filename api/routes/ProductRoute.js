import express from 'express'
const router = express.Router()
import fs from 'fs'
import multer from 'multer'
import path, { resolve } from 'path'
const __dirname = resolve()
import { CreateProduct, DeleteProduct, EditProduct, EditProductImage, GetProduct, GetSingleProduct } from '../controllers/ProductController.js'


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        if (fs.existsSync('./api/upload')){
          cb(null, path.join(__dirname, './api/upload'))
        } else {
          fs.mkdirSync(path.join(__dirname, './api/upload'))
          cb(null, path.join(__dirname, './api/upload'))
        } 
    },
    filename: (req,file,cb) => {
       cb(null, Date.now()  + '-' + file.originalname)
    }
}) 

const upload = multer({
    storage:storage 
}).array('photo', 10)

router.route('/').get( GetProduct ).post( upload, CreateProduct )
router.route('/:id').get( GetSingleProduct ).delete( DeleteProduct ).put( upload, EditProductImage ).patch(upload, EditProduct )


export default router
import Product from "../models/ProductModel.js"
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
//  Create a new Product
export const CreateProduct = async (req, res, next) => {
    

  //  category
     let cats = []
     if (req.body.category){
        cats = req.body.category.split(',')
     }
  //  file Upload
     let photo = []
     if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
           photo.push(req.files[i].filename)
        }
     }

    try {
      await Product.create({...req.body, photo:photo, category: cats})
      res.status(200).json({message: 'Product created successfully.'})
    } catch (error) {
       console.log(error);    
    }  
} 


//  Get Product
export const GetProduct = async (req, res, next) => { 
    try {
      let allproducts = await Product.find()
      res.status(200).json({message: 'All Products', data:allproducts})
    } catch (error) {
      next(error);
    }
}


// Delete Product

export const DeleteProduct = async (req, res, next) => {
   let id = req.params.id

   try {
     let deleteProduct = await Product.findOneAndDelete({_id: id})
     res.status(200).json({message: 'Delete Product', data:deleteProduct})
    
     if(deleteProduct.photo) {
         let photo = deleteProduct.photo
         if(photo.length > 0){
               for ( let i = 0; i < photo.length; i++ ) {
                   fs.unlinkSync(path.join(__dirname, '/api/upload/'+ photo[i]))   
               }
            } 
     }
     
    } catch (error) {   
      next(error)   
   }
   
}

//  Edi Product
export const EditProduct = async (req, res, next) => {
     let id = req.params.id
   
   //  category
      let cats = []
      if (req.body.category){
         cats = req.body.category.split(',')
      }
 
     try { 
       let isProduct = await Product.findById({_id:id})
       if (!isProduct) {
         res.status(404).json({message: 'Product Not Found!'});
       }

       if(isProduct){
         let edited = await Product.findByIdAndUpdate({_id: id}, {...req.body,category:cats},{upsert: true});

          res.status(200).json({message: 'Product Edit successfully updated'});
       }
      
     } catch (error) {
        
     }
   
}

//  Edit Product Image
export const EditProductImage = async (req, res, next) => {
    let id = req.params.id;
    //  file Upload
    let photo = []
    if (req.files) {
       for (let i = 0; i < req.files.length; i++) {
          photo.push(req.files[i].filename)
       }
    }

    try { 
      let isProduct = await Product.findById({_id:id})
       if (!isProduct) {
         res.status(404).json({message: 'Product Not Found!'});
       }

       if (isProduct) {
             
           if( isProduct.photo.length > 0 ){
                
             let afterDelt =  isProduct.photo.find()


               let allPhoto = isProduct.photo.concat(photo)
               const imgEidit = await Product.findByIdAndUpdate({_id: id}, { photo:allPhoto}, {upsert: true} )

               if(imgEidit) {
               res.status(200).json({ message: 'Product Images updated successfully', data:imgEidit})
              } 
                 
         } else {
            const imgEidit = await Product.findByIdAndUpdate({_id: id}, { photo:photo}, {upsert: true} )

             if(imgEidit) {
             res.status(200).json({ message: 'Product Images updated successfully', data:imgEidit})
            } 
         }  
      }
      
    } catch (error) {
       next(error)
    }
   
}

//  Get Single Product
export const GetSingleProduct = async (req, res, next) => {
    let id = req.params.id
    try {
       let singleProduct = await Product.findOne({_id: id});
       if (!singleProduct) {
         res.status(200).json({message: 'Product Not Found!' , data: null});
       }

       if ( singleProduct ) {
          res.status(200).json({message: 'Single Product' , data: singleProduct});
       }
      
    } catch (error) {
       next(error)
    }
    
}

 
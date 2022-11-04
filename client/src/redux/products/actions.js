import axios from "axios";
import { DELETE_PRODUCT, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT } from "./actionTypes";
import swal from 'sweetalert';

export const productRequest = () => ({
     type: PRODUCT_REQUEST
})


export const productSuccess = (payload) => ({
     type: PRODUCT_SUCCESS,
     payload: payload
})

export const productFail = (payload) => ({
     type: PRODUCT_FAIL,
     payload: payload
})


export const singleProduct = (payload) => ({
      type: SINGLE_PRODUCT,
      payload: payload
})

export const productDelete = (payload) => ({
   type: DELETE_PRODUCT,
   payload: payload
})



// Get All Product
export const getAllProduct = () =>  (dispatch) => {
     try {
       dispatch(productRequest())  
       setTimeout( async () => {
         await axios.get('http://localhost:5050/api/product')
          .then( res => dispatch(productSuccess(res.data.data)))
          .catch( err => dispatch(productFail(err)))  
      
       },1000)

       
     } catch (error) {
         dispatch(productFail(error))
     }
}

//  Create Product
export const createProduct = (data) => async (dispatch) => {
      try {
          await axios({
               method: 'POST',
               url: 'http://localhost:5050/api/product',
               headers: {
                   'content-type': 'multipart/form-data' 
                  },    
               data:data
                 
            }).then( res => {
               if ( res.status === 200) {
                 dispatch(getAllProduct())
                 swal({
                    title: "Good job!",
                    text: "Product Created!",
                    icon: "success",
                  });  
               }
               
            })
            .catch(err => console.log(err));
      } catch (error) {
          
      }
}

// Edit Product 

export const editProduct = (id,data) => async (dispatch) => {

    try {
      await axios({
          method: 'PATCH',
          url: 'http://localhost:5050/api/product/'+ id,
          headers: {
               'content-type': 'multipart/form-data' 
              }, 
          data: data
       }).then( res => {
          if ( res.status === 200) {
               dispatch(getAllProduct())
               swal({
                  title: "Good job!",
                  text: "Product Edited!",
                  icon: "success",
                });  
             }
       }).catch( err => {
          swal({
               title: "Error!",
               text: "Unable to Edit Product!",
               icon: "error",
             }); 
       })
 
    } catch (error) {
       dispatch(productFail(error))
    }
}

// product delete
export const deleteProduct = (id) => async (dispatch) => {
     
     try {
         await axios.delete('http://localhost:5050/api/product/' + id)
          .then( res => dispatch(productDelete(id)))
          .catch( err => dispatch(productFail(err)))   
     } catch (error) {
         dispatch(productFail(error))
     }
}
 
//  Single Product
export const productSingleAction = (id) => (dispatch) => {
    dispatch ({
       type: SINGLE_PRODUCT,
       payload: id
    })
}
 
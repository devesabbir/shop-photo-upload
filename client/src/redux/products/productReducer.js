import initialState from './initialState';
import { DELETE_PRODUCT, PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT } from './actionTypes';

const productReducer = (state = initialState, {type, payload}) => {
     switch (type) {
        case PRODUCT_REQUEST:         
           return ({
               ...state,
               skliton : true 
           })

        case PRODUCT_SUCCESS:
           return ({
              ...state,
              skliton : false,
              products: payload
           })
         
         case PRODUCT_FAIL:
            return ({
               ...state,
               skliton : false,
               error : payload
            })

         case SINGLE_PRODUCT:
            return ({
               ...state,
               productSingle: state.products.find( data => data._id === payload)
            })

            case DELETE_PRODUCT:
               return ({
                  ...state,
                  products: state.products.filter( data => data._id !== payload)
               })
   

     
        default:
           return state
     }
}


export default productReducer
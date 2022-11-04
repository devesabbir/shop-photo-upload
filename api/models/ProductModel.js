import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
     name: {
        type: String,
        required: true     
     },
     regular_price:{
        type: Number,
        required: true      
     },
     sale_price:{
        type:Number,
     },
     stock:{
        type:Number,
     },
     photo:{
        type:Array,
        default:[]
     },
     category:{
        type:Array,
        default:[]
     }
},{
    timestamps : true
})

const Product = mongoose.model('Product',ProductSchema)

export default Product
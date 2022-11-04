
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { editProduct } from './../../redux/products/actions';


function EditProduct() {
  const params = useParams()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
     name:'',
     regular_price:'',
     sale_price:'',
     stock:'',
     photo:[],
     category:[]
  })

//  Handle Input
 const handleInput = (e) => {
    setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))  
 }


// Handle Category
const handelCategory = (e) => {
    let cats = input.category  
    if (e.target.checked){
       cats.push(e.target.value)
       setInput((prev) => ({
          ...prev,
          category: cats
       }))
    } else{
      let newItem = cats.filter( item => item !== e.target.value)
      setInput((prev) => ({
        ...prev,
        category: newItem
     }))
   }
}

 useEffect(() => {
      axios({
        method: 'GET',
        url: 'http://localhost:5050/api/product/'+ params.id  
      }).then ( res => {  
        setInput((prev) => ({
             ...prev,
             ...res.data.data
        }))
      })
 },[])



//   handleCreateFormSubmit
const handleCreateFormSubmit = (e) => {
      e.preventDefault();

      let formData = new FormData()
      formData.append('name', input.name)
      formData.append('regular_price', input.regular_price)
      formData.append('sale_price', input.sale_price)
      formData.append('stock', input.stock)
      formData.append('category',input.category)
 

      dispatch(editProduct(params.id, formData));
  
 }

 
  return (
    <div className='container my-5'>
    <div className="row justify-content-center">
        <div className="col-md-5">
            <Link className='btn btn-primary' to="/admin/product">Back</Link>
            <br />
            <br />
            <div className="card product shadow-sm">
                <div className="card-body">
                <h2>Edit product</h2>
                <hr />
                <form action="" onSubmit={handleCreateFormSubmit} >
                    <div className="my-3">
                        <label htmlFor="">Name</label>
                        <input name='name' className='form-control' value={input.name} type="text" onChange={handleInput} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Regular Price</label>
                        <input name='regular_price' className='form-control' value={input.regular_price} type="text" onChange={handleInput} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Sale Price</label>
                        <input name='sale_price' onChange={handleInput} value={input.sale_price} className='form-control' type="text" />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Stock</label>
                        <input name='stock' onChange={handleInput} value={input.stock} className='form-control' type="text" />
                    </div>


                     <h4>Category</h4>
                    <div className="my-3">
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'men'} />
                        <label htmlFor="">Men</label>
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'women'} />
                        <label htmlFor="">Women</label>
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'Children'} />
                        <label htmlFor="">Children</label>
                    </div>


                    <div className="my-3">
                        <label htmlFor=""></label>
                        <input className='btn btn-primary w-100' type="submit"  value='Update'/>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default EditProduct
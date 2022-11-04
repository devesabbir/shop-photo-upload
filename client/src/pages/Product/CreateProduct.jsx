import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from './../../redux/products/actions';


const CreateProduct = () => {
    const dispatch = useDispatch()

   const [input, setInput] = useState({
      name:'',
      regular_price:'',
      sale_price:'',
      stock:'',
      photo:[],
      category: []
   })

//  Handle Form Input
   const handleInput = (e) => {
      setInput((prev) => ({
          ...prev,
          [e.target.name]: e.target.value
      }))
   }



// Handle Category
const handelCategory = (e) => {
    if (e.target.checked){
       let cats = input.category    
       cats.push(e.target.value)
       setInput((prev) => ({
          ...prev,
          category: cats
       }))
    } else{
      let cats = input.category
      let newItem = cats.filter( item => item !== e.target.value)
      setInput((prev) => ({
        ...prev,
        category: newItem
     }))
    }
}

//  Handle File
const handleFile = (e) => {
    setInput((prev) => ({
        ...prev,
        photo: e.target.files
    })) 
}


//  Handle Create Form Submit

const handleCreateFormSubmit = async (e) => {
      e.preventDefault()
      
      let formData = new FormData()
      formData.append('name', input.name)
      formData.append('regular_price', input.regular_price)
      formData.append('sale_price', input.sale_price)
      formData.append('stock', input.stock)
      formData.append('category', input.category)

      if(input.photo){
        for ( let i = 0; i <  input.photo.length; i++ ) {
         formData.append('photo', input.photo[i])
       }
      }

      console.log(Object.fromEntries(formData));

      dispatch(createProduct(formData))
      e.target.reset()
   
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
                <h2>Add new product</h2>
                <hr />
                <form action="" onSubmit={handleCreateFormSubmit} >
                    <div className="my-3">
                        <label htmlFor="">Name</label>
                        <input name='name' className='form-control' type="text" onChange={handleInput} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Regular Price</label>
                        <input name='regular_price' className='form-control' type="text" onChange={handleInput} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Sale Price</label>
                        <input name='sale_price' onChange={handleInput} className='form-control' type="text" />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Stock</label>
                        <input name='stock' onChange={handleInput} className='form-control' type="text" />
                    </div>

                    <div className="my-3">
                        <label htmlFor="">Photo</label>
                        <input onChange={handleFile}  name='photo' accept='.jpg, .jpeg, .png' className='form-control' type="file" multiple/>
                    </div>

                     <h4>Category</h4>
                    <div className="my-3">
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'men'} />
                        <label htmlFor="">Men</label>
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'women'} />
                        <label htmlFor="">Women</label>
                        <input className='mx-2' onChange={handelCategory} type="checkbox" value={'women'} />
                        <label htmlFor="">Children</label>
                    </div>


                    <div className="my-3">
                        <label htmlFor=""></label>
                        <input className='btn btn-primary w-100' type="submit"  value='Create'/>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
};

export default CreateProduct;
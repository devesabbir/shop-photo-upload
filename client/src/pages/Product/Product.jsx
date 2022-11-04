import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { productSingleAction, deleteProduct, getAllProduct } from '../../redux/products/actions';
import SingleProduct from '../Shop/SingleProduct';
import './Product.css';


const Product = () => {
  const dispatch = useDispatch()
  //  Single Id 
 const [id, setId] = useState(); 
 const [file, setFile] = useState({
    photo:[]
 }); 


 const { products } = useSelector(state => state.product)
 
  //  Delete Product 
const deleteProductHandle = (id) => {
    dispatch(deleteProduct(id))
 }
 
//  Single Product View
 const [single, setSingle] = useState(false);

 const handleSingleHide = () => setSingle(false);

 const handleQuickView = (id) => {
     dispatch(productSingleAction(id))
     setSingle(true)
 }

 const getId = (id) => {
    setId((prev) => ({
         ...prev,
         id:id
    }))
 }

 const fileHandler = (e) => {
    setFile({
        ...file,
        photo: e.target.files
    })

 }

 const fileUploader = (e) => {
    e.preventDefault()
     
    let formData = new FormData()
    
    if(file.photo) {
      for ( let i = 0; i < file.photo.length; i++) {
         formData.append('photo', file.photo[i])
      }
    }

    axios({
    method: 'PUT',
    url: 'http://localhost:5050/api/product/'+ id.id,
    headers: {
         'content-type': 'multipart/form-data' 
        }, 
    data: formData
  }).then( res => {
     dispatch(getAllProduct())
  }).catch( err => {
     console.log(err);
  })
 }


 


  return (
    <div className='container my-5'>
        <SingleProduct single={ single } handleSingleHide =  { handleSingleHide }  />
        <div className="row justify-content-center">
            <div className="col-md-10">
            <Link className='btn btn-primary' to="/admin/product/create">Add new</Link> &nbsp;
            <Link className='btn btn-warning' to="/">View Shop</Link>
                <br />
                <br />
                <div className="card product shadow-sm">
                    <div className="card-body">
                    <h2>All products</h2>
                    <hr />
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Regular Price</th>
                                <th>Sale Price</th>
                                <th>Stock</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            products.map((data, index) => (
                               <tr key={index}>
                                   <td>{index + 1}</td>
                                   <td>{data.name}</td>
                                   <td>{data.regular_price}</td>
                                   <td>{data.sale_price}</td>
                                   <td>{data.stock}</td>
                                   <td><img src={ data.photo.length > 0 ? `http://localhost:5050/upload/${data.photo[0]}` : ''} alt="" />
                                   <span style={{position:'relative', display:'inline-block'}}>
                                    <form onSubmit={fileUploader} >
 <input name='photo' onClick={() => getId(data._id)} onChange={fileHandler} type="file" multiple/>
                                      <button type='submit' className='uploadBtn'>Set</button>
                                    </form>
                                     
                                   </span>

                                   </td>
                                   <td>
                                       <div>
                                          <button className='btn btn-info mx-2' onClick={() => handleQuickView(data._id)} >View</button>
                                          <Link className='btn btn-info mx-2' to={'/admin/product/edit/'+ data._id} >Edit</Link>
                                           <button className='btn btn-danger' onClick={() => deleteProductHandle(data._id)} >Delete</button>
                                       </div>
                                   </td>
                               </tr>
                            ))
                          }           
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )


};

export default Product;
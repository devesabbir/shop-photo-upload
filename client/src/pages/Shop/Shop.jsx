import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import SingleProduct from './SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { productSingleAction } from '../../redux/products/actions';
import Skeleton from 'react-loading-skeleton'


const Shop = () => { 
    const dispatch = useDispatch()
    const { products, skliton, error } = useSelector( state => state.product)

    const [single, setSingle] = useState(false);

    const handleSingleHide = () => setSingle(false);
  
    const handleQuickView = (id) => {
        dispatch(productSingleAction(id))
        setSingle(true)
    }

  return (
    <>
 
    <SingleProduct single={  single } handleSingleHide =  { handleSingleHide }  />
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to="/">
                            <img src="api/upload/308309269_1274528083293218_9142085896027111475_n.jpg" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="menu">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="menu-list">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><a href="#">Blog</a></li>
                                <li><Link to="/">Shop</Link></li>
                                <li><Link to="/admin/product">Admin</Link></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container my-5 shop'>
            <div className="row">
                <div className="col-md-3">
                    <div className="widget">
                        <h2>Serch</h2>
                        <input className='form-control' type="text" />
                    </div>

                    <div className="widget">
                        <h2>Category</h2>
                        <ul className='list-group'>
                            <li className='list-group-item'><a href="#">Men</a></li>
                            <li className='list-group-item'><a href="#">Women</a></li>
                            <li className='list-group-item'><a href="#">Electronic</a></li>
                            <li className='list-group-item'><a href="#">Kids</a></li>
                        </ul>
                    </div>

                    <div className="widget">
                        <h2>Tags</h2>
                        <div className="tags">
                            <a href="#">Eid</a>
                            <a href="#">Puja</a>
                            <a href="#">Dengu</a>
                        </div>
                    </div>

                    <div className="widget my-2">
                        <h2>Price Search</h2>
                        <div className="search">
                            <input type="range" min={10} max={ 10000 } />
                            <input type="range" min={10} max={ 10000 } />
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row shop-area">
                        <h2>Our Products</h2>


                       {
                         skliton && 
                       <>
                    
                       <div className="col-md-4 shop-item mb-5"> 
                          <Skeleton height={300} /> 
                          <Skeleton height={30} /> 
                          <Skeleton height={2} /> 
                          <Skeleton height={30} width={ 150 } /> <Skeleton height={50} width={ 100 } /> 
                         
                       </div>

                            <div className="col-md-4 shop-item mb-5"> 
                            <Skeleton height={300} /> 
                            <Skeleton height={30} /> 
                            <Skeleton height={2} /> 
                            <Skeleton height={30} width={ 150 } /> <Skeleton height={50} width={ 100 } /> 

                            </div>
                            <div className="col-md-4 shop-item mb-5"> 
                            <Skeleton height={300} /> 
                            <Skeleton height={30} /> 
                            <Skeleton height={2} /> 
                            <Skeleton height={30} width={ 150 } /> <Skeleton height={50} width={ 100 } /> 

                            </div>
                            <div className="col-md-4 shop-item mb-5"> 
                            <Skeleton height={300} /> 
                            <Skeleton height={30} /> 
                            <Skeleton height={2} /> 
                            <Skeleton height={30} width={ 150 } /> <Skeleton height={50} width={ 100 } /> 

                            </div>
                      </>                  
                        
                            
                       }

                       {
                         products && products.map((data, index) => (
                        
                            <div key={index} className="col-md-4 shop-item mb-5">
                            <div className="card">
                                <img className='card-img' src={`http://localhost:5050/upload/${data.photo[0]}`} alt="" />
                                <div className="card-body">
                                    <h3>{data.name}</h3>                                
                                </div>
                                <div className="card-footer">
                                    <p>Price : ${`${data.sale_price ? data.sale_price : data.regular_price}`}</p>
                                    <button onClick={() => handleQuickView(data._id)} className='btn btn-sm btn-info'>Quick View</button>
                                </div>
                            </div>
                        </div>

                         ))
                       }

                    </div>
                </div>
            </div>
        </div>


    </>
  )
};

export default Shop;
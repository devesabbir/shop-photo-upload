import { Route, Routes } from "react-router-dom";
import CreateProduct from "./pages/Product/CreateProduct";
import Product from "./pages/Product/Product";
import Shop from "./pages/Shop/Shop";
import './App.css';
import EditProduct from './pages/Product/EditProduct';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllProduct } from './redux/products/actions'


function App() {
   const dispatch = useDispatch()

   useEffect(() => {
       dispatch(getAllProduct())
   },[dispatch])

  return (
    <>
    
      <Routes>
        <Route path="/" element={ <Shop /> } />
        <Route path="/admin/product" element={ <Product /> } />
        <Route path="/admin/product/create" element={ <CreateProduct /> } />
        <Route path="/admin/product/edit/:id" element={ <EditProduct /> } />
      </Routes>

    </>
  );
}

export default App;

import React from 'react'
import Component from '../../components/Navbar'
import ProductsList from '../../components/apis/Products/ProductList'
import RegisterModal from '../../components/apis/Products/RegisterModal'

const Products = () => {
  return (
    <div>
        <Component/>
        <div className='py-10 px-10'>
        <RegisterModal/>
        <ProductsList/>
        </div>
        
    </div>
  )
}


export default Products;
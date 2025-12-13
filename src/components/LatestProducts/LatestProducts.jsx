import React, { use } from 'react';
import Product from '../Product/product';




const LatestProducts = ({LatestProductsPromise}) => {
    const products = use(LatestProductsPromise);
    console.log(products)
    return (
       <div>
        <h2 className='text-5xl text-center'>Recent <span className='text-primary' >Products</span></h2>
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           {
            products.map(product => <Product key={product._id} product={product}></Product>)
           }
        </div>
       </div>
    );
};

export default LatestProducts;
import React, { use } from 'react';




const LatestProducts = ({LatestProductsPromise}) => {
    const products = use(LatestProductsPromise);
    console.log(products)
    return (
        <div>
           
        </div>
    );
};

export default LatestProducts;
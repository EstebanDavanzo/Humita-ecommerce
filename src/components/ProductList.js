import React from 'react';
import PropType from 'prop-types';
import Product from './Product.js';

 function ProductList({title,products}) {
    return (
        <>
            <h2 className="text-center mt-4 text-primary">
                {title}
            </h2>

            <ul className="row justify-content-center mt-4 mb-1 mr-4">
              {products.map((p) => <li className="col-lg-3 shadow my-3 mx-3" key={p.id}> 
                <Product product={p}/>
              </li>)} 
            </ul>
         </>
    )   
 }

ProductList.PropType = {
  products: PropType.string.isRequired
}

ProductList.defaultProps = {
  title:'soy un tìtulo'
}
  export default ProductList;
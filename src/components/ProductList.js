import React from 'react';
import Product from './Product.js';

 function ProductList({title,products}) {
    return (
        <>
            <h2 className="text-center mt-4">
                {title}
            </h2>

            <ul className="row justify-content-around mt-4 mb-1 mr-4">
              {products.map((p) => <li className="col-md-3 shadow my-3 mx-1" key={p.id}> 
                <Product product={p}/>
              </li>)} 
            </ul>
{/* 
            <link rel="stylesheet " href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css " />
            <a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." className="float" target="_blank ">
                <i className="fa fa-whatsapp my-float "></i>
            </a> */}
         </>
    )   
 }

  export default ProductList;
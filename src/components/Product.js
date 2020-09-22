import React from 'react';
import {Link} from 'react-router-dom'

import img1 from '../imagenes/item1/cuello.jpg' 
import img2 from '../imagenes/item2/bufandon.jpg'
import img3 from '../imagenes/item2/bufandon2.jpg'



function Product({ product }) {
    return (   
        <div className="text-center">
            <div style={{cursor:'pointer'}}>
                <Link to={`/product/${product.id}`}>
                    <img className="w-100 my-3" src={`../imagenes/item1/${product.imageId}`} alt="" />
                    <h3>{product.title}</h3>
                </Link>
            </div> 
            <p>
                {product.description}
            </p>
            <Link to={`/product/${product.id}`}>
                <button type='button' className=" w-75 btn btn-primary mb-3">Ver producto</button>
            </Link>
                    
        </div>  
    )
  }

export default Product;


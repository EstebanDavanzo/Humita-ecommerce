import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

function Product({ product }) {
    return (   
        <div className="text-center">
            <div style={{cursor:'pointer'}}>
                <Link to={`/product/${product.id}`}>
                    <img className="w-100 my-3" src={`/imagenes/${product.imageId}`} alt="" />
                    <h3 >{product.title}</h3>
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

  Product.PropType = {
    product: PropTypes.object.isRequired
  }

export default Product;


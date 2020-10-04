import React from 'react';
import { Link } from 'react-router-dom';

import img1 from '../imagenes/slide/slide1.jpg' 
import img3 from '../imagenes/slide/slide3.jpg'

 
function ProductContainer(){   
    return(
        <>
            <div id="carouselExampleControls" className=" text-center carousel" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                      <Link to={`/ProductContainer/invierno`}>
                        <img src={img1} className="slade" alt="..."/>
                      </Link>
                    </div>
                    <div className="carousel-item">
                      <Link to={`/ProductContainer/verano`}>
                        <img src={img3} className="slade" alt="..."/>
                      </Link>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    );
}

export default ProductContainer;
 
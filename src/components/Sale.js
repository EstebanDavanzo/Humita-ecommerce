import React from 'react';

import img1 from '../imagenes/slide/slide 1.png'
import img2 from '../imagenes/slide/slide 2.png'
import img3 from '../imagenes/slide/slide 3.png'

 
function Sale(){   
    return(
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={img1} className="d-block img-fluid" alt="..."/>
                </div>
                <div className="carousel-item">
                  <img src={img2} className="d-block img-fluid" alt="..."/>
                </div><div className="carousel-item">
                  <img src={img3} className="d-block img-fluid" alt="..."/>
                </div>

              </div>
          </div>
        </>
    );
}

export default Sale;
 
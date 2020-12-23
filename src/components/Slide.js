import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getFirestore}  from '../firebase/index'

function Slide(){
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const db = getFirestore();    
        const itemCollection = db.collection('items').where('categoryId','!=','invierno')
        
        itemCollection.get().then((querySnapshot) => {
          if(!querySnapshot===0){
            console.log('NO hay productos')
          } 
          setProducts(querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
        }).catch((error)=>{
          console.log('error searching items',error)
        }).finally(()=>{
          setLoading(false)
        })
  
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
    return(
        <>
          <Slider className="container my-5"{...settings}>
              {products.map((p) => <div className="col-sd-4" key={p.id}> 
                  <img className="rounded-circle w-sd-100 img-fluid" src={`/imagenes/${p.imageId}`} alt="" />
              </div>)}             
          </Slider>
          { loading && <p>Loading...</p>}
        </>
    )
}

export default Slide;


import React/* , {useEffect, useState } */ from 'react';
//import { Link } from 'react-router-dom';

import img1 from '../imagenes/slide/slide 1.png'
import img2 from '../imagenes/slide/slide 2.png'
import img3 from '../imagenes/slide/slide 3.png'

/* import {getFirestore}  from '../firebase/index' */
 
function ProductContainer(){   
    /* const [saleProducts, setSaleProducts] = useState([]);
    const [summerProducts, setSummerProducts] = useState([]);
    const [winterProducts, setWinterProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect con [] --> se ejecuta solo una vez
    useEffect(() => {
      const db = getFirestore();    
      const saleItemCollection = db.collection('items').where('sale','==',true)
      const summerItemCollection = db.collection('items').where('categoryId','==',"verano")
      const winterItemCollection = db.collection('items').where('categoryId','==',"invierno")
      
      saleItemCollection.get().then((querySnapshot) => {
        if(!querySnapshot===0){
          console.log('NO hay productos')
        }
        
        setSaleProducts(querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
      }).catch((error)=>{
        console.log('error searching items',error)
      }).finally(()=>{
        setLoading(false)
      })

      summerItemCollection.get().then((querySnapshot) => {
        if(!querySnapshot===0){
          console.log('NO hay productos')
        }
        setSummerProducts(querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
      }).catch((error)=>{
        console.log('error searching items',error)
      }).finally(()=>{
        setLoading(false)
      })

      winterItemCollection.get().then((querySnapshot) => {
        if(!querySnapshot===0){
          console.log('NO hay productos')
        }
        setWinterProducts(querySnapshot.docs.map(doc => ({...doc.data(), id:doc.id})))
      }).catch((error)=>{
        console.log('error searching items',error)
      }).finally(()=>{
        setLoading(false)
      })

    }, []); */

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

export default ProductContainer;
 
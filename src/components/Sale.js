import React, {useEffect, useState } from 'react';
import ProductList from './ProductList';
import { Link } from 'react-router-dom';

import img1 from '../imagenes/slide/slide1.jpg'
import img2 from '../imagenes/slide/slide2.jpg' 
import img3 from '../imagenes/slide/slide3.jpg'

import {getFirestore}  from '../firebase/index'
 
function ProductContainer(){   

    const [saleProducts, setSaleProducts] = useState([]);
    const [summerProducts, setSummerProducts] = useState([]);
    const [winterProducts, setWinterProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []);

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
 
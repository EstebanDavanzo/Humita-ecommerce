import React, {useEffect, useState } from 'react';
import ProductList from './ProductList';

import img1 from '../imagenes/item1/cuello.jpg' 
import img2 from '../imagenes/item2/bufandon.jpg'
import img3 from '../imagenes/item2/bufandon2.jpg'

import {getFirestore}  from '../firebase/index'
 
function ProductContainer(){   
    //const {category} = useParams()
    
    /* const title='SALE' */

    const [saleProducts, setSaleProducts] = useState([]);
    const [summerProducts, setSummerProducts] = useState([]);
    const [winterProducts, setWinterProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect con [] --> se ejecuta solo una vez
    useEffect(() => {
      const db = getFirestore();    
      const saleItemCollection = db.collection('items').where('sale','==',true)
      const summerItemCollection = db.collection('items').where('categoryId','==',"verano")
      const winterItemCollection = db.collection('items').where('categoryId','==',"invierno")

     /*  const priceItems = itemCollection.where('price', '>', 300)  /*filtra por un campo*/
      
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
            <div id="carouselExampleControls" className="text-center carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {/* <img src={img1} className="w-100" alt="..."/> */}
                        <ProductList title="SALE" products={saleProducts}/>
                        { loading && <p>Loading...</p>} 
                    </div>
                    <div className="carousel-item">
                        <ProductList title="SUMMER" products={summerProducts}/>
                        { loading && <p>Loading...</p>}
                        {/* <img src={img2} className="w-100" alt="..."/> */}
                    </div>
                    <div className="carousel-item">
                        <ProductList title="WINTER" products={winterProducts}/>
                        { loading && <p>Loading...</p>}
                        {/* <img src={img3} className="w-100" alt="..."/> */}
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
 {/*<section className="">
        <ProductList title={title} products={products}/>
        { loading && <p>Loading...</p>}
    </section */}
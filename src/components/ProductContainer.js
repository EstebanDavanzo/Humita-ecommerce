import React, {useEffect, useState } from 'react';
import ProductList from './ProductList';

import { useParams } from 'react-router-dom';


import {getFirestore}  from '../firebase/index'
 
function ProductContainer(){   
    const {category} = useParams()
    
    const title='Selección ' + category 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
      const db = getFirestore();    
      const itemCollection = db.collection('items').where('categoryId','==',category)
      
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

    }, [category]);

    return(
        <section className="container">
            <ProductList title={title} products={products}/>
            { loading && <p>Loading...</p>} 
        </section>
    );
}

export default ProductContainer;
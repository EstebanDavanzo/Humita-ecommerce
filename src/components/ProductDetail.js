import React, { useState,  useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {getFirestore}  from '../firebase/index'
import ItemCount from './ItemCount.js'

import {cartContext} from './CartContext.js'
/* import {useCartContext} from './CartContext.js' */

/* import data from '../data.json' */
import img1 from '../imagenes/item1/cuello.jpg'


function ProductDetail(){
    const {id} = useParams()
   
    const [cantItems, setItems] = useState(1)

    const {itemCart, setItemCart} = useContext(cartContext)
    /* const {itemCart, setItemCart} = useCartContext(); */

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const db = getFirestore(); 
        
        const itemCollection = db.collection('items')
        const item = itemCollection.doc(id)  /*filtra por id*/

        item.get().then((querySnapshot) => {
          if(!querySnapshot===0){
            console.log('NO hay productos')
          }
          setProduct(querySnapshot.data())
        }).catch((error)=>{
          console.log('error searching items',error)
        })
      }, []);

    function addCart({cantItems , id}){
        const position = itemCart.findIndex(i => i.item.id==id)

        if(position>=0){
            itemCart[position].cantidad+=cantItems
            setItemCart(itemCart)
        }else{
            const newItem = {item:{id:id,title:product.title,price:product.price},cantidad:cantItems}
            const aux = [...itemCart, newItem]
            setItemCart(aux)
        }
    
    }

    function buy(cantItems){
        console.log('Comprar: ' + cantItems + ' articulos');
    }


    return(
        <>           
            <div className="row align-items-start justify-content-around mt-3"> 
                <div className="col-lg-9 text-center"> 
                    <h2 className="text-center mt-3">{product.title}</h2>  
                    <img className="w-75" src={img1} alt="" />
                    <p className="w-100 mt-1">{product.detalle}</p>
                </div>
                <div className="col-lg-3 text-center mt-lg-5">
                    <h3>{product.title}</h3>
                    <h4>${product.price}</h4>
                    <p>{product.description}</p>
                    <ItemCount min={1} max={product.stock} cantItems={cantItems} setItems={setItems}/>
                    <button onClick={()=>addCart({cantItems, id})} type="button" className="w-100 my-2 btn btn-primary">Agregar al carrito</button>
                    <button onClick={()=>buy(cantItems)} type="button" className="w-100 mb-2 btn btn-primary" >Comprar {cantItems}</button> 
                </div>     
            </div>
        </>      
    );
}

export default ProductDetail;

import React, { useContext, useEffect, useState } from 'react';
import { useParams , Link } from 'react-router-dom';

import {getFirestore}  from '../firebase/index'
import * as firebase from 'firebase/app';
import 'firebase/firestore';


import { cartContext } from './CartContext.js'

/* import {useCartContext} from './CartContext.js' */

function Componente1(){
    return<>
        <div className=" container col-md my-5 align-items-center text-center justify-content-around">
            <h2>NO HAY ELEMENTOS EN EL CARRITO </h2>
            <Link to={'/'}>
                <button className="btn btn-primary w-50 btn-lg mt-3" type='button'> Ir a comprar </button>
            </Link>
        </div>
    </>
}


function Cart(){
    const {itemCart} = useContext(cartContext)

    const [buyer, setBuyer] = useState({});

    function onInputName(evt){
        buyer.name=evt.target.value
        setBuyer(buyer)
    }

    function onInputMail(evt){
        buyer.email=evt.target.value
        setBuyer(buyer)
    }

    function onInputPhone(evt){
        buyer.phone=evt.target.value
        setBuyer(buyer)
    }
 
    const [orderId, setOrderId] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function buyItems(itemCart){
        
        const db = getFirestore();   
        
        //Consulto stock
        const itemsToUpdate = db.collection('items')
                .where(firebase.firestore.FieldPath.documentId(),'in', itemCart.map(i => i.item.id))

        const query = await itemsToUpdate.get(); //El await es porque devuelve una promise
        const batch = db.batch()

        const outOfStock=[]

        query.docs.forEach((docSnapshot, idx) => {
            if(docSnapshot.data().stock >= itemCart[idx].cantidad) {
                console.log('hay stock')
                //actualizo la cantidad de stock en la base de datos
                batch.update(docSnapshot.ref, {stock:docSnapshot.data().stock - itemCart[idx].cantidad} )
            }else{
                console.log ('no hay stock')
                outOfStock.push({...docSnapshot.data(), id:docSnapshot.id})
            }
        })
    
        if (outOfStock.length===0){
            try{
                await batch.commit()
            }catch (err){
                console.log('no se puedo completar la compra, vuelva a intentar más tarde')
            }

        }

        //Genero orden  
        const orders = db.collection('orders')
        const order ={
            buyer:buyer,
            items:itemCart,
            total:itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0),
            date:firebase.firestore.Timestamp.fromDate(new Date())
        }
        
       //pushear la orden con promise
        orders.add(order).then( ({id}) => {
            setOrderId(id);
        }).catch(err => {
            setError(err)
        }).finally(()=>{
            setLoading(false)
        })

        //pushear la orden con await y catch
        /* try{
            const {id} = await order.add(order)
        }catch(err){
            console.log('error al generar la')
        } */

    }

    return(

        itemCart.length==0 ?  <Componente1/> : 
        <div className="container"> 
            <h2 className="mt-3 text-center">Finalizar Compra</h2>

            <div className="row align-items-start justify-content-around">
                <table className="col-7 mt-3">
                    <tbody className="border">
                        {itemCart.map(i => <tr key={i.item.id}>
                            <td className="text-center">{i.item.title}</td>
                            <td className="text-center">${i.item.price} c/u</td>
                            <td className="text-center">{i.cantidad} unidades</td>
                            <td className="text-right"><button type="button" className="btn btn-primary w-50">Quitar</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="row align-items-start justify-content-around">
                    <h5 className="col-7 text-right">TOTAL: ${itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0)}</h5>
            </div>
            <div className="row mb-3 align-items-start justify-content-around">
                <div className="col-7 text-center">
                    <button type="button" className=" btn btn-primary">Despachar</button>
                </div>         
            </div>


            <div className="row align-items-start justify-content-around">
                <div className="col-lg-5">              
                    <form className="form-horizontal" method="">
                        <fieldset>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="fname" name="name" onInput={onInputName} type="text" placeholder="Nombre y Apellido" className="form-control" required />
                                </div>
                            </div>
                    
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="email" name="email" onInput={onInputMail} type="text" placeholder="Email" className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-phone-square bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="phone" name="phone" onInput={onInputPhone} type="text" placeholder="Teléfono" className="form-control"/>
                                </div>
                            </div>
                        
                            <div className="col-lg-11 col-12 ml-lg-3 ml-0">
                                <button onClick={()=>buyItems(itemCart)} type="button" className="btn btn-primary w-100 btn-lg">Finalizar</button>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            </div>          
        </div>
    )
}

export default Cart;
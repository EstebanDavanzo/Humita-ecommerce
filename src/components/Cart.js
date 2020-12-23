import React, { useContext, useState } from 'react';

import {getFirestore}  from '../firebase/index'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { cartContext } from './CartContext.js'
import { CartEmpty } from './CartEmpty';

function Cart(){
    const {itemCart, setItemCart} = useContext(cartContext)
    const [buyer, setBuyer] = useState({});
    const [err, setErr] = useState({});
//----------------------------------
//   VALIDACIONES DE LOS INPUTS 
//---------------------------------- 
    function onInputName(evt){
        const aux={...buyer}
        const errInp={...err}
        const nameRegex3=/^(?!.* $)[A-Z][a-z]+$/
        const nameRegex2=/^[a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]{3,}$/
        const nameRegex=/^(?!.* $)[A-Z]+$/
        if(evt.target.value.match(nameRegex) || evt.target.value.trim().match(nameRegex2) || evt.target.value.trim().match(nameRegex3)) {    
            aux.name=evt.target.value
            setBuyer(aux)
            errInp.name=""
            setErr(errInp) 
         }    
         else {   
             /* setErr("Nombre inválido") */
             errInp.name="Nombre inválido"
             setErr(errInp)
             aux.name=""
             setBuyer(aux)   
         } 
    }

    function onInputMail(evt){
        const aux={...buyer}
        const errInp={...err}
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(evt.target.name==="email2"){
            if (emailRegex.test(evt.target.value)) {
                if(buyer.email!==evt.target.value){
                    errInp.email2="ERROR en verificación de email"
                    setErr(errInp)
                    aux.email2=""
                    setBuyer(aux)
                }else{
                    errInp.email2=""
                    setErr(errInp)
                    aux.email2=evt.target.value
                    setBuyer(aux)
                }
            }else{
                errInp.email2="email inválido"
                setErr(errInp)
                aux.email2=""
                setBuyer(aux)
            } 
        }

        if(evt.target.name==="email"){
            if (emailRegex.test(evt.target.value)) {
                if(buyer.email2!==evt.target.value && buyer.email2){
                    errInp.email="ERROR en verificación de MAIL"
                    setErr(errInp)
                    aux.email=""
                    setBuyer(aux)
                }else{
                    errInp.email=""
                    setErr(errInp)
                    aux.email=evt.target.value
                    setBuyer(aux)
                }
            }else{
                errInp.email="emial inválido"
                setErr(errInp)
                aux.email=""
                setBuyer(aux)
            }
        }
    }

    function onInputPhone(evt){
        const phonoRegex=/^[0-9]{6,14}$/
        const aux={...buyer} 
        const errInp={...err}      
        if(evt.target.value.match(phonoRegex)) {  
            errInp.phone=""
            aux.phone=evt.target.value
            setBuyer(aux) 
            setErr(errInp)
        }    
        else {   
            aux.phone=""
            errInp.phone="Teléfono inválido"
            setErr(errInp)
            setBuyer(aux)   
        } 
    }

    function remove(itm){
        //Remover un elemento de la lista
        const position = itemCart.findIndex(i => i.item.id===itm.item.id)
        if (position > -1) {
            itemCart.splice(position, 1);
            const aux = [...itemCart]
            setItemCart(aux)
        }    
    }
//-----------------------------
//  MANEJO DE ORDEN DE COMPRA
//-----------------------------
    const [orderId, setOrderId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function buyItems(itemCart){
        
        setLoading(true)
        const db = getFirestore();   
    
        const itemsToUpdate = db.collection('items')
                .where(firebase.firestore.FieldPath.documentId(),'in', itemCart.map(i => i.item.id))

        const query = await itemsToUpdate.get(); 
        const batch = db.batch()

        const outOfStock=[]

        query.docs.forEach((docSnapshot, idx) => {
            if(docSnapshot.data().stock >= itemCart[idx].cantidad) {
                batch.update(docSnapshot.ref, {stock:docSnapshot.data().stock - itemCart[idx].cantidad} )
            }else{
                outOfStock.push({...docSnapshot.data(), id:docSnapshot.id})
            }
        })
    
        if (outOfStock.length===0){
            try{
                await batch.commit()
            }catch (err){
                alert('no se puedo completar la compra, vuelva a intentar más tarde')
                setItemCart([])
            }
        }else{
            alert('El producto no tiene suficiente stock')
            setItemCart([])
        }

        //Genero orden 
        
        const orders = db.collection('orders')
        const order ={
            buyer:buyer,
            items:itemCart,
            total:itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0),
            date:firebase.firestore.Timestamp.fromDate(new Date())
        }

        try{
            const {id} = await orders.add(order)
            setOrderId(id)
        }catch(err){
            setError(err)
            console.log(error)
        } 

    }  

    return(
        
        itemCart.length===0 ? <CartEmpty/> : 
        <div className="container">
            <h2 className="mt-3 text-center">Finalizar Compra</h2>

            <div className="row align-items-start justify-content-around">
                <table className="col-7 mt-3">
                    <tbody className="border">
                        {itemCart.map(i => <tr key={i.item.id}>
                            <td className="text-center">{i.item.title}</td>
                            <td className="text-center">${i.item.price} c/u</td>
                            <td className="text-center">{i.cantidad} unidades</td>
                            <td className="text-right"><button type="button" className="btn btn-primary w-md-50" onClick={()=>remove(i)} >Quitar</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="row align-items-start justify-content-around">
                    <h5 className="col-7 text-right">TOTAL: ${itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0)}</h5>
            </div>
            
            <div className="row align-items-start justify-content-around">
                <div className="col-lg-7">              
                    <form className="form-horizontal" method="">
                        <fieldset>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="fname" name="name" onInput={onInputName} type="text" placeholder="Nombre y Apellido" className="form-control" required />{err.name ? err.name : <></>}
                                </div>
                            </div>
                    
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                                <div className="col-lg-5">
                                    <input id="email" name="email" onInput={onInputMail} type="text" placeholder="Email" className="form-control" required/>{err.email ? err.email : <></>}
                                </div>
                                <div className="col-lg-5 mt-3 mt-lg-0">    
                                    <input id="email2" name="email2" onInput={onInputMail} type="text" placeholder="Repetir email" className="form-control" required/>{ err.email2  ? err.email2 : <></>}
                                </div>
                            </div>
                            <div className="form-group form-row">
                                <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-phone-square bigicon"></i></span>
                                <div className="col-lg-10">
                                    <input id="phone" name="phone" onInput={onInputPhone} type="text" placeholder="Teléfono" className="form-control"/>{err.phone  ? err.phone : <></>}
                                </div>
                            </div>
                        
                            <div className="col-lg-11 col-12 ml-lg-4 ml-0">
                                <button disabled={ !buyer.name || !buyer.email || !buyer.phone || !buyer.email2 } onClick={()=>buyItems(itemCart)}   type="button" className="btn btn-primary w-100 btn-lg" /* data-toggle="modal" data-target="#exampleModal" */>Finalizar</button>
                            </div>

                        </fieldset>
                    </form>
                    { orderId  ? <>
                        <div className="text-center mt-3">
                            <button tylegende="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">Ver orden generada</button>
                        </div>

                        <div className="modal fade show" id="staticBackdrop" data-backdrop="static" data-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Numero de orden</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setItemCart([])}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Copie el código de su orden: {orderId}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setItemCart([])}>Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>:<>{ loading && <p className="text-center">Generando código de pedido...</p>}</>}
                </div>
            </div> 
             
        </div>
    )
}

export default Cart;
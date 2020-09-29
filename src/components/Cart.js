import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

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
    const {itemCart, setItemCart} = useContext(cartContext)
    const [buyer, setBuyer] = useState({});
    const [err, setErr] = useState("");
//----------------------------------
//   VALIDACIONES DE LOS INPUTS 
//---------------------------------- 
    function onInputName(evt){
        const aux={...buyer}
        const nameRegex2=/^[a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]{3,}$/
        const nameRegex=/^[a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+(?:\s+[a-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+)+$/ 
        if(evt.target.value.match(nameRegex) || evt.target.value.trim().match(nameRegex2)) {    
            aux.name=evt.target.value
            setBuyer(aux)
            setErr("") 
         }    
         else {   
             setErr("Nombre inválido")
             aux.name=""
             setBuyer(aux)   
         } 
    }

    function onInputMail(evt){
        const aux={...buyer}
       
        const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if(evt.target.name==="email2"){
            if (emailRegex.test(evt.target.value)) {
                if(buyer.email!==evt.target.value){
                    setErr('ERROR en verificación de MAIL')
                    aux.email2=""
                    setBuyer(aux)
                }else{
                    setErr("")
                    aux.email2=evt.target.value
                    setBuyer(aux)
                }
            }else{
                setErr('email invalido')
                aux.email2=""
                setBuyer(aux)
            } 
        }

        if(evt.target.name==="email"){
            if (emailRegex.test(evt.target.value)) {
                if(buyer.email2!==evt.target.value && buyer.email2){
                    setErr('ERROR en verificación de MAIL')
                    aux.email=""
                    setBuyer(aux)
                }else{
                    setErr("")
                    aux.email=evt.target.value
                    setBuyer(aux)
                }
            }else{
                setErr('email invalido')
                aux.email=""
                setBuyer(aux)
            }
           
        }
    }

    function onInputPhone(evt){
        const phonoRegex=/^[0-9]{6,14}$/
        const aux={...buyer}        
        if(evt.target.value.match(phonoRegex)) {    
           aux.phone=evt.target.value
           setBuyer(aux) 
           setErr("")
        }    
        else {   
            aux.phone=""
            setErr("Teléfono inválido")
            setBuyer(aux)   
        } 
    }

    const [check, setCheck] = useState();
    function despachar(check){
        setCheck(true)
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
                const aux=[]
                setItemCart(aux)
            }
        }else{
            alert('El producto no tiene suficiente stock')
            const aux=[]
            setItemCart(aux)
        }

        //Genero orden  
        const orders = db.collection('orders')
        const order ={
            buyer:buyer,
            items:itemCart,
            total:itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0),
            date:firebase.firestore.Timestamp.fromDate(new Date())
        }

        /* setOrderId(1) */

       //pushear la orden con promise
        
        orders.add(order).then( ({id}) => {
            console.log('entre al add')
            
            //Acá se debería mostrar la orden generada
            alert('Se genero la orden: '+id+' recibirá un mail con las indicaciones en las próximas horas') 
            setOrderId(id)
            
            //Una vez generada la orden borrar todos los productos que se agregaron al carrito
            const aux=[]
            setItemCart(aux)

        }).catch(err => {
            setError(err)
        }).finally(()=>{ 
            setLoading(false)
        })

        console.log('orderId',orderId)


        //pushear la orden con await y catch
        /* try{
            const {id} = await order.add(order)
        }catch(err){
            console.log('error al generar la')
        } */

    }

    return(
        
        itemCart.length==0 ? <Componente1/> : 
        <div className="container"> 
            <h2 className="mt-3 text-center">Finalizar Compra</h2>

            <div className="row align-items-start justify-content-around">
                <table className="col-7 mt-3">
                    <tbody className="border">
                        {itemCart.map(i => <tr key={i.item.id}>
                            <td className="text-center">{i.item.title}</td>
                            <td className="text-center">${i.item.price} c/u</td>
                            <td className="text-center">{i.cantidad} unidades</td>
                            <td className="text-right"><button type="button" className="btn btn-primary w-50" onClick={()=>remove(i)}>Quitar</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="row align-items-start justify-content-around">
                    <h5 className="col-7 text-right">TOTAL: ${itemCart.reduce((prev,next)=>prev + next.cantidad*next.item.price,0)}</h5>
            </div>
            <div className="row mb-3 align-items-start justify-content-around">
                <div className="col-7 text-center">
                    <button disabled={check===true} type="button" className=" btn btn-primary" onClick={despachar}>Despachar</button>
                </div>         
            </div>

            {check ?<>
                <div className="row align-items-start justify-content-around">
                    <div className="col-lg-7">              
                        <form className="form-horizontal" method="">
                            <fieldset>
                                <div className="form-group form-row">
                                    <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                    <div className="col-lg-10">
                                        <input id="fname" name="name" onInput={onInputName} type="text" placeholder="Nombre y Apellido" className="form-control" required />{!buyer.name ? err : <></>}
                                    </div>
                                </div>
                        
                                <div className="form-group form-row">
                                    <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-envelope-o bigicon"></i></span>
                                    <div className="col-lg-5">
                                        <input id="email" name="email" onInput={onInputMail} type="text" placeholder="Email" className="form-control" required/>{!buyer.email && buyer.name ? err : <></>}
                                    </div>
                                    <div className="col-lg-5">    
                                        <input id="email2" name="email2" onInput={onInputMail} type="text" placeholder="Repetir email" className="form-control" required/>{/* !validacion &&*/ !buyer.email || (buyer.email!==buyer.email2) ? err : <></>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <span className="col-lg-1 col-lg-offset-2 text-center"><i className="fa fa-phone-square bigicon"></i></span>
                                    <div className="col-lg-10">
                                        <input id="phone" name="phone" onInput={onInputPhone} type="text" placeholder="Teléfono" className="form-control"/>{!buyer.phone && buyer.email && buyer.name /* && validacion */ ? err : <></>}
                                    </div>
                                </div>
                            
                                <div className="col-lg-11 col-12 ml-lg-3 ml-0">
                                    <button disabled={ !buyer.name || !buyer.email || !buyer.phone || !buyer.email2 } onClick={()=>buyItems(itemCart)} type="button" className="btn btn-primary w-100 btn-lg" data-toggle="modal" data-target="#exampleModal">Finalizar</button>
                                </div>

                                {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Se generó su orden!</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Nos comunicaremos con vos para coordinar el envío</p>
                                                <p>Numero de orden: {orderId}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </fieldset>
                        </form>
                    </div>
                </div> 
            </> : <>
            </>} 

                     
        </div>
    )
}

export default Cart;
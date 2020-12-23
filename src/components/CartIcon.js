import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

import {cartContext} from './CartContext.js'

/* import cartImg from '../imagenes/cart icon.png'; */
/* import Cart from './Cart.js'; */

function CartIcon({claseCart}){
    
    const {itemCart} = useContext(cartContext)
    
    return(

        <div >
            <Link to={`/cart/${itemCart.reduce((prev,next)=>prev + next.cantidad,0)}`}>
                <div className="mx-1 row">
                    {/* <img className={claseCart} src={cartImg} alt="" /><span className={claseCart}>{itemCart.reduce((prev,next)=>prev + next.cantidad,0)}</span> */}
                    <FontAwesomeIcon icon={faCartArrowDown} className={claseCart} style={{ height: "26px", width:"26px" }}/><span className={claseCart}>{itemCart.reduce((prev,next)=>prev + next.cantidad,0)}</span>
                </div>
            </Link>
        </div>

    )      
}

export default CartIcon;

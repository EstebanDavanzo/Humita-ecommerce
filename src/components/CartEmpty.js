import React from 'react'
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
    return (
        <div className=" container col-md my-5 align-items-center text-center justify-content-around">
            <h2 className="primary-text">NO HAY ELEMENTOS EN EL CARRITO </h2>
            <Link to={'/'}>
                <button className="btn btn-primary w-50 btn-lg mt-3" type='button'> Ir a comprar </button>
            </Link>
        </div>
    )
}

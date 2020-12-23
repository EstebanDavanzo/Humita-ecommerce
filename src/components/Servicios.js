import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast, faStoreAlt } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'

function Servicios(){
    return(
        <div className="container">
            <div className="row text-center mt-5 justify-content-around" >
                <div className="col-sd-4">
                    <FontAwesomeIcon icon={faStoreAlt}style={{fontSize:"4em"}}  />
                    <br/>
                    Veni a nuestro <br/>show room
                </div>
                <div className="col-sd-4">
                    <FontAwesomeIcon icon={faShippingFast}style={{fontSize:"4em"}}/>
                    <br/>Envíos a todo<br/> el país
                </div>
                <div className="col-sd-4">
                    <FontAwesomeIcon icon={faCreditCard}style={{fontSize:"4em"}} />
                    <br/>Todos los medios <br/>de pago
                </div>
            </div>
        </div>
    )
}

export default Servicios;
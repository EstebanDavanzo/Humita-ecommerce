import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons'

function Footer(){   
    return(
        <footer className="bg-primary text-white mt-5 py-5">
            <div className="row mt-3">
                <p className="mt-2 col-lg-6 text-center">
                   <FontAwesomeIcon className="text-white" icon={faMapMarkerAlt}/>{" "}
                    Conde 1069 (Colegiales) CABA Argentina
                </p>
                <p className="mt-2 col-lg-6 text-center">
                    <FontAwesomeIcon className="text-white" icon={faEnvelopeOpen}/>{" "}
                     humitavestidos@gmail.com
                </p> 
            </div>
            <div className="row justify-content-center mt-3">
                <p className="text-center"> 
                    Todos los derechos reservados © 2020 
                    HUMITA - Vestidos
                </p>
                <div className="mx-3 d-flex redes">
                    <a className="mr-3 " href="https://www.instagram.com/humitavestidos/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} style={{ height: "25px", width:"25px" }} className="text-white ml-3"/>
                    </a>
                    <a className="mx-1" href="https://www.facebook.com/humitavestidoss" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} style={{ height: "23px", width:"23px" }} className="text-white"/>
                    </a> 
                </div>
            </div>
        </footer>
        
    );
}

export default Footer;

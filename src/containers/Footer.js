import React from 'react';

function Footer({btnFb, btnInsta}){   
    return(
        <footer className="container border border-primary mt-5">
            <div className="row mt-2">
                <p className="mt-2 col-lg-6 text-center">
                    DIRECCIÓN: Conde 1069 (Colegiales) CABA Argentina
                </p>
                <p className="mt-2 col-lg-6 text-center">
                    EMAIL    : humitavestidos@gmail.com
                </p> 
            </div>
            <div className="row justify-content-center mb-2">
                <p className="text-center"> 
                    Todos los derechos reservados © 2020 
                    HUMITA - Vestidos
                </p>
                    <div className="mx-3 d-flex redes">
                        <a className="mr-3 " href="https://www.instagram.com/humitavestidos/" target="_blank">
                            <img className="iconI" src={btnInsta} alt="" />
                        </a>
                        <a className="mx-1" href="https://www.facebook.com/humitavestidoss" target="_blank">
                            <img className="iconF" src={btnFb} alt="" />
                        </a> 
                    </div>
            </div>

        </footer>
        
    );
}

export default Footer;
/* 
<footer className="d-flex container justify-content-center my-5">
            <div className="row justify-content-center border border-primary p-1">
                <div className="row mt-3 justify-content-between">
                    <p className="mt-2 col-lg-6 text-center">
                        DIRECCIÓN: Conde 1069 (Colegiales) CABA Argentina
                    </p>

                    <p className="mt-2 col-lg-6 text-center">
                        EMAIL    : humitavestidos@gmail.com
                    </p>    
                </div>
                <div className="row">
                    <p className="mr-2">Todos los derechos reservados © 2020 </p>
                    <p className="mr-5">HUMITA - Vestidos</p>
                
                    <div className="mr-5 d-flex redes">
                        <a className="mr-3 " href="https://www.instagram.com/humitavestidos/" target="_blank">
                            <img className="iconI" src={btnInsta} alt="" />
                        </a>
                        <a className="mx-1" href="https://www.facebook.com/humitavestidoss" target="_blank">
                            <img className="iconF" src={btnFb} alt="" />
                        </a> 
                    </div>
                </div>
            </div>
        </footer>   */ 
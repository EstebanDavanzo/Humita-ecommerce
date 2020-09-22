import React from 'react';
import { Link } from 'react-router-dom';

import CartIcon from './CartIcon';

function NavBar({btnFb, btnInsta, logo}) {
    return (
        <nav className="navbar navbar-light bg-ligh navbar-expand-lg shadow-sm font-weight-bold"> 
            <div className="container">

                <CartIcon claseCart={"cart"}/>

                <Link to={`/`}>
                    <div className="navbar-brand mr-1" id='brand'>
                        <img src={logo} width="180px" alt=""/>
                    </div>
                </Link>

                <button className="navbar-toggler btn-ham" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown" data-toggle="collapse" 
                     data-target="#navbarNavDropdown" aria-expanded="true">
                    <ul className="navbar-nav mr-auto ml-auto text-center">
                        <li className="nav-item active">
                            <Link to={`/`}>
                                <div className="nav-link" style={{cursor:'pointer'}}>INICIO</div>
                            </Link> 
                        </li>
                            <Link to={`/nosotros`}>
                                <div className="nav-link" style={{cursor:'pointer'}}>QUIENES SOMOS</div>
                            </Link> 
                        <li className="nav-item dropdown">  
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}>                                
                                PRODUCTOS
                            </div>
                           
                            <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                                <Link to={`/ProductContainer/verano`}><div className="dropdown-item" style={{cursor:'pointer'}}>VERANO 2020</div> </Link>
                                <Link to={`/ProductContainer/invierno`}><div className="dropdown-item" style={{cursor:'pointer'}}>INVIERNO 2020</div> </Link>
                                {/* <a className="dropdown-item" href="#">TEJIDOS</a> */}
                            </div>
                        </li>                    
                        <li className="nav-item">
                            <Link to={`/contacto`}>
                                <div className="nav-link" style={{cursor:'pointer'}}>
                                    CONTACTO
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <CartIcon claseCart={"cart2"}/>

            <div className="mr-5 d-flex redes">
                <a className="mr-3" href="https://www.instagram.com/humitavestidos/" target="_blank">
                    <img className="iconI" src={btnInsta} alt="" />
                </a>
                <a className="mr-1 ml-1" href="https://www.facebook.com/humitavestidoss" target="_blank">
                    <img className="iconF" src={btnFb} alt="" />
                </a> 
            </div>
        </nav>     
    );
  }

  export default NavBar;

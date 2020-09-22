import React from 'react';
import NavBar from '../components/NavBar';
import logo from '../imagenes/logo.jpg';

function Header({btnFb, btnInsta}) {
    return (
        <header>
            <NavBar btnFb={btnFb} btnInsta={btnInsta} logo={logo}/>
        </header>
    );
}

export default Header;
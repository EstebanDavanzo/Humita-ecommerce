import React from 'react';
import NavBar from '../components/NavBar';
import logo from '../imagenes/logo.jpg';

function Header() {
    return (
        <header>
            <NavBar logo={logo}/>
        </header>
    );
}

export default Header;
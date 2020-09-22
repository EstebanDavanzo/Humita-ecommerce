import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './components/estilos.css';

import {cartContext} from './components/CartContext.js'
/* import {useCartContext,CartProvider} from './components/CartContext.js' */

import Header from './containers/header';
import Home from './containers/home';
import Footer from './containers/Footer';

import Cart from './components/Cart';
import ProductContainer from './components/ProductContainer';
import ProductDetail from './components/ProductDetail';
import Contacto from './components/Contacto';
import Nosotros from './components/Nosotros';

import btnInsta from './imagenes/insta.png';
import btnFb from './imagenes/fb.png'


function App() {

  const[itemCart, setItemCart] = useState([])
  
  return (
 
    <BrowserRouter>
      <cartContext.Provider value={{itemCart, setItemCart}}>
      {/* <CartProvider> */} 

        <Header btnFb={btnFb} btnInsta={btnInsta}/> 
        <div className="contenedor overflow-auto">
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path='/cart/:total'>
                <Cart/>
              </Route >
              <Route path='/ProductContainer/:category'>
                <ProductContainer/>
              </Route>
              <Route path='/ProductContainer/:category'>
                <ProductContainer/>
              </Route>
              <Route path='/contacto'>
                <Contacto/>
              </Route>
              <Route path='/product/:id'>
                <ProductDetail/>
              </Route >
              <Route path='/nosotros'>
                <Nosotros/>
              </Route>             
            </Switch>
            <Footer btnFb={btnFb} btnInsta={btnInsta}/>
          </div>
        </div> 

      </cartContext.Provider>
      {/* </CartProvider> */} 
      
    </BrowserRouter>
         

  );
}

export default App;

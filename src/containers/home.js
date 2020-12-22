import React from 'react';
/* import { isCompositeComponent } from 'react-dom/test-utils'; */
import Sale from '../components/Sale';
import Servicios from '../components/Servicios';
import Slide from '../components/Slide';

function Home(){   
    return(
        <main className="bg-secondary">
          <Sale/>
          <Servicios/>
          <Slide/>
        </main>
    );
}

export default Home;
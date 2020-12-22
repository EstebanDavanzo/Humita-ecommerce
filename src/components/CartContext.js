import React/* , {useContext, useState} */ from 'react';

export const cartContext = React.createContext();


/* export const useCartContext = () => useContext(cartContext);

export function CartProvider({ value, children }) {
  const [itemCart, setItemCart] = useState(value || [])

  return <cartContext.Provider value={{ itemCart, setItemCart }}>
      {children}
    </cartContext.Provider>
} */


/* EJEMPLO POLI
export const useListContext = () => useContext(ListContext);

export function ListProvider({ value, maxSize, children }) {
    const [list, setList] = useState(value || []);

    function addItem(newItem) {
      if(list.length < maxSize) {
        const l = [...list, newItem];
        setList(l);
      }
    };
  
    function cleanList() {
      setList([]);
    }
  
    return <ListContext.Provider value={{ list, addItem, quantity: list.length, cleanList }}>
      {children}
    </ListContext.Provider>
  }
 */

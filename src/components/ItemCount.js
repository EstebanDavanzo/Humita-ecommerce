import React from 'react';

function ItemCount({ min, max, cantItems, setItems}){

    function addItems(){
        setItems(cantItems+1);
    }
    function removeItems(){
         setItems(cantItems-1);
    }    

    return(
        <div>
                <button disabled={cantItems<=min} type="button" onClick={removeItems} className="w-25 btn btn-primary"> - </button>
                <label className="w-50 text-center text-primary">{cantItems}</label>
                <button disabled={cantItems>=max} type="button" onClick={addItems} className="w-25 btn btn-primary"> + </button>
        </div>
    );
}

export default ItemCount;
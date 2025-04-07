import { useState } from "react";
import { useOutletContext } from "react-router-dom"


function CartItem({item}) {
    const [quantity, setQuantity] = useState(item.quantity)

    const itemTotal = quantity * item.bookObj.price; 
    return (
        <div>
            <p>{item.bookObj.price}</p>
            <div>
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </div>

            <p>{itemTotal}</p>

        </div>   
    )
}

export default function Cart() {
    const { cartBooksState } = useOutletContext() 
    // cartBooksState.books obj {key, value} = {key: book.id, value : { bookObj: book, quantity: 1}
    const myItems = Array.from(cartBooksState.books);

    return (
        <>  
            {
                myItems.map((itemsArray)=> 
                    <CartItem key={itemsArray} item={itemsArray[1]}/>
                )
            }
            <p>subTotal:</p>
        </>
    )
}
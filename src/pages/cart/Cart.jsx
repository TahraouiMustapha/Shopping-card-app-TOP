import { useOutletContext } from "react-router-dom"
import CartItem from "./CartItem";


export default function Cart() {
    const { cartBooksState, setCartBooksState } = useOutletContext() 
    // cartBooksState = {books: new Map(),size: 0}
    // cartBooksState.books obj {key, value} = {key: book.id, value : { bookObj: book, quantity: 1}
    const myItems = Array.from(cartBooksState.books);

    function changeQuantityInItemsArray(id, newQuantity) {
        if(cartBooksState.books.has(id)) {
            setCartBooksState((prevState)=> {
                const map = new Map(prevState.books);
                const oldObj = map.get(id)
                map.set(id, {
                    ...oldObj,
                    quantity: newQuantity
                })
                return {
                    ...prevState,
                    books: map,
                }
            })   
        }
    }   

    return ( 
        <>  
            {
                myItems.map((itemsArray)=> 
                    <CartItem key={itemsArray[0]} 
                    changeQuantityInItemsArray={changeQuantityInItemsArray}
                    item={itemsArray[1]}/>
                )
            }
            <p>subTotal:</p>
        </>
    )
}
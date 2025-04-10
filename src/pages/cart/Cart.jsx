import { useOutletContext, Link } from "react-router-dom"
import CartItem from "./CartItem";
import styles from "./Cart.module.css"


function calculateSubtotal(itemsArray) {
    let total = 0 ;
    for(let item of itemsArray ) {
        total += item[1].bookObj.price * item[1].quantity
    }
    return total.toFixed(2);
}

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
    
    function deleteItem(id) {
        if(cartBooksState.books.has(id)) {
            setCartBooksState((prevState)=> {
                const myMap = new Map(prevState.books)
                myMap.delete(id)

                return {
                    books: myMap, 
                    size: prevState.size - 1
                }
            })
        }
    }

    const titles = ['Item', 'Price', 'Quantity', 'Total', ''];
    return ( 
        <div className={styles.content}>  
            <h2 className={styles.title}>Your Shopping Cart</h2>
            <div className={styles.main}>
                <div className={styles.itemsContainer}>
                    <div className={styles.head}>
                        {titles.map((title, index)=> <p key={index}>{title.toUpperCase()}</p>)}
                    </div>
                    
                    {
                        myItems.map((itemsArray)=> 
                            <CartItem key={itemsArray[0]} 
                            changeQuantityInItemsArray={changeQuantityInItemsArray}
                            deleteItem={deleteItem}
                            item={itemsArray[1]}/>
                        )
                    }
                </div>
                <div className={styles.orderSummary}>
                    <div className={styles.title}>Order Summary</div>
                    <div className={styles.subtotalContainer}>
                        <p>Subtotal</p>
                        <p className={styles.subtotal}>${calculateSubtotal(myItems)}</p>
                        <p>({myItems.length} items)</p> 
                    </div>
                    <div className={styles.shippingInfo}>Shipping and taxes computed at checkout</div>
                    <button className={styles.checkoutBtn}>Checkout</button>
                    <Link className={styles.continueShopping} to={'/shop'}>Continue Shopping</Link>
                </div>
            </div>


        </div>
    )
}
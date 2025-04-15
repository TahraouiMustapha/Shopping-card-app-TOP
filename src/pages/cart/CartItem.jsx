import { useNavigate } from "react-router-dom";
import { Quantity } from "../../components/quantity/Quantity";
import styles from "./Cart.module.css"

// cartBooksState.books object structure {key, value} => {key: book.id, value : { bookObj: book, quantity: 1}

export default function CartItem({item, changeQuantityInItemsArray, deleteItem}) {
    const navigate = useNavigate();
    const itemTotal = item.quantity * item.bookObj.price; 

    function handleAddQuantity(e) {
        const id = e.target.dataset.id;
        const newQuantity = item.quantity + 1
        changeQuantityInItemsArray(id, newQuantity);
    }

    function handleSubstractQuantity(e) {
        const id = e.target.dataset.id;
        const newQuantity = item.quantity <= 0? 0: item.quantity - 1
        changeQuantityInItemsArray(id, newQuantity);
    }

    function handleGoingToBookPage(book) {
        navigate(`/book/${book.id}`, {
            state: book
        })
    }

    return (
        <div className={styles.cartItem}> 
            <div>
                <div onClick={()=> handleGoingToBookPage(item.bookObj)}
                className={styles.thumbnail}
                style={{backgroundImage: `url(${item.bookObj.thumbnail})`}}></div>
                <div className={styles.bookTitle}>
                    {item.bookObj.title} 
                </div>
            </div>
            <p>${Number(item.bookObj.price).toFixed(2)}</p>
            <Quantity item={item} 
            handleAddQuantity={handleAddQuantity}
            handleSubstractQuantity={handleSubstractQuantity}/>

            <p>${itemTotal.toFixed(2)}</p>

            <button className={styles.removeBtn} 
            data-id={item.bookObj.id} 
            onClick={(e)=> deleteItem(e.target.dataset.id)}
            >Remove</button>
        </div>   
    )
}

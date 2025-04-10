import styles from "./Cart.module.css"

// cartBooksState.books object structure {key, value} => {key: book.id, value : { bookObj: book, quantity: 1}

export default function CartItem({item, changeQuantityInItemsArray, deleteItem}) {
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

    return (
        <div className={styles.cartItem}> 
            <div>
                <div className={styles.thumbnail}
                style={{backgroundImage: `url(${item.bookObj.thumbnail})`}}></div>
                <div className={styles.bookTitle}>
                    {item.bookObj.title} 
                </div>
            </div>
            <p>${Number(item.bookObj.price).toFixed(2)}</p>
            <div className={styles.quantity}>
                <button
                data-id = {item.bookObj.id}
                onClick={handleSubstractQuantity}>-</button>
                <p>{item.quantity}</p>
                <button 
                data-id = {item.bookObj.id}
                onClick={handleAddQuantity}>+</button>
            </div>

            <p>${itemTotal.toFixed(2)}</p>

            <button data-id={item.bookObj.id} 
            onClick={(e)=> deleteItem(e.target.dataset.id)}
            >remove</button>
        </div>   
    )
}

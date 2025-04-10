import styles from "./Quantity.module.css"

export default function Quantity({item, handleAddQuantity, handleSubstractQuantity}) {
    return (
        <div className={styles.quantity}>
            <button
            data-id = {item.bookObj.id}
            onClick={handleSubstractQuantity}>-</button>
            <p>{item.quantity}</p>
            <button 
            data-id = {item.bookObj.id}
            onClick={handleAddQuantity}>+</button>
        </div>
    )
}
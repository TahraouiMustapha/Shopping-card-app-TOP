import styles from "./Quantity.module.css"

function Quantity({item, handleAddQuantity, handleSubstractQuantity}) {
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

function BaseQuantity({ bookQuantity, setBookQuantity }) {

    function handleAddQuantity() {
        setBookQuantity((prevQuantity)=> prevQuantity + 1);
    }

    function handleSubstractQuantity() {
        setBookQuantity((prevQuantity)=> prevQuantity <= 0 ? 0 : prevQuantity - 1);
    }

    return (
        <div className={styles.quantity}>
            <button
            onClick={handleSubstractQuantity}>-</button>
            <p>{bookQuantity}</p>
            <button 
            onClick={handleAddQuantity}>+</button>
        </div>
    )
}

export { Quantity, BaseQuantity };

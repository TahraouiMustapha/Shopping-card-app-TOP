// cartBooksState.books obj {key, value} = {key: book.id, value : { bookObj: book, quantity: 1}


export default function CartItem({item, changeQuantityInItemsArray}) {

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
        <div> 
            <p>{item.bookObj.price}</p>
            <div>
                <button
                data-id = {item.bookObj.id}
                onClick={handleSubstractQuantity}>-</button>
                <p>{item.quantity}</p>
                <button 
                data-id = {item.bookObj.id}
                onClick={handleAddQuantity}>+</button>
            </div>

            <p>{itemTotal}</p>

        </div>   
    )
}

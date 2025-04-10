import styles from "./Card.module.css"


export default function Card({book, handleAddToCartClick, handleShowToast}) {
    const thumbnailStyle = {
        backgroundImage: book?.thumbnail ? `url(${book.thumbnail})`: 'none',
        textAlign: 'center',
        color: '#666'
    }

    return (
        <div className={styles.card}>
            <div 
            className={styles.thumbnail}
            style={thumbnailStyle}>
                {!book?.thumbnail && 'No image found'}
            </div>

            <div className={styles.content}>
                <div>
                    <p className={styles.title}>{book?.title}</p>
                    <p className={styles.author}>{book?.author}</p>
                </div>
                <div>
                    <p className={styles.price}>{book?.price}$</p>
                    <button onClick={()=> {
                        handleShowToast()
                        handleAddToCartClick(book)
                    }}
                    className={styles.addToCartBtn}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
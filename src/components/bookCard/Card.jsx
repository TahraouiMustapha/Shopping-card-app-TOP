import styles from "./Card.module.css"


export default function Card({book}) {
    const thumbnailStyle = {
        backgroundImage: book?.thumbnail ? `url(${book.thumbnail})`: 'none',
        backgroundColor: '#f3f3f3',
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
                    <p className={styles.price}>12$</p>
                    <button className={styles.addToCartBtn}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
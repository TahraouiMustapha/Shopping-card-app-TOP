import styles from "./Card.module.css"


export default function Card({book}) {
    return (
        <div className={styles.card}>
            <div 
            className={styles.thumbnail}
            style={{backgroundImage: `url(${book.thumbnail})`}}></div>

            <div className={styles.content}>
                <div>
                    <p className={styles.title}>{book.title}</p>
                    <p className={styles.author}>{book.author}</p>
                </div>
                <div>
                    <p className={styles.price}>12$</p>
                    <button className={styles.addToCartBtn}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
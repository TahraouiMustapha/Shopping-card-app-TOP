import styles from "./Card.module.css"
import { useNavigate } from "react-router-dom"


export default function Card({book, handleAddToCartClick, handleShowToast}) {
    const navigate = useNavigate();

    const thumbnailStyle = {
        backgroundImage: book?.thumbnail ? `url(${book.thumbnail})`: 'none',
        textAlign: 'center',
        color: '#666'
    }

    function handleGoingToBookPage(book) {
        navigate(`/book/${book.id}`, {
            state: { book }
        });
    }


    return (
        <div onClick={() => handleGoingToBookPage(book)} 
        className={styles.card}>
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
                    <button onClick={(e)=> {
                        e.stopPropagation();
                        handleShowToast()
                        handleAddToCartClick(book)
                    }}
                    className={styles.addToCartBtn}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
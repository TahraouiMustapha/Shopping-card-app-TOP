import { useEffect, useState } from "react";
import { useLocation, useParams, useOutletContext, useNavigate } from "react-router-dom"
import createBook from "../../utils/bookFactory";
import { BaseQuantity, Quantity } from "../../components/quantity/Quantity";
import styles from "./Book.module.css"

import { ShoppingCart } from "lucide-react";

export default function Book() {
    const { bookId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cartBooksState, setCartBooksState, setIsVisible } = useOutletContext() 
    

    const [book, setBook] = useState(state?.book || null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(!state?.book)

    const [bookQuantity, setBookQuantity] = useState(1);
    

    useEffect(()=> {
        // missing book id
        if(!bookId) { 
            setError("No id book in url!")
            return;
        }

        const fetchSingelBook = async ()=> {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI`,
                { mode:"cors"});

                if(response.status !== 200 || !response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`)
                }

                const myBook = await response.json();
                setBook(createBook(myBook))
                setError(null)
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }

        // missing state.book obj
        if(!state?.book) {
            fetchSingelBook();
        } else {
            setLoading(false);
            const newQuantity = cartBooksState.books.has(bookId) 
            ?  cartBooksState.books.get(bookId).quantity
            : 1;
            setBookQuantity(newQuantity)
            return;
        }


    }, [bookId, state?.book, cartBooksState.books])


    if(error) return <p>{error}</p>
    if(loading) return <p>Loading ...</p>



    function handleToCart(book) {
        setCartBooksState((prevState)=> {
            const myMap = new Map(prevState.books);

            myMap.set(book.id, {
                bookObj: book,
                quantity: bookQuantity
            })
            
            return  {
                books: myMap, 
                size: myMap.size
            }
        })
    }

    function handleShowToast() {
        setIsVisible(true)
    }


    return (
        <div className={styles.content}>
            <div className={styles.thumbnail}>thumbo</div>
            <div className={styles.infoContainer}>
                <div>
                    <h1 className={styles.title}>title</h1>
                    <p className={styles.author}> author </p> 
                    <p className={styles.categorie}>cat</p>  
                </div>

                <div>
                    <p className={styles.price}>18.3</p>
                    <BaseQuantity 
                    bookQuantity={bookQuantity} 
                    setBookQuantity={setBookQuantity}/>
                    <div className={styles.btns}>
                        <button onClick={()=> {
                            handleToCart(book)
                            handleShowToast()
                        }} 
                        className={styles.addToCartBtn}>
                            <ShoppingCart />
                            Add To Cart
                        </button>

                        <button onClick={()=> {
                            handleToCart(book)
                            navigate('/cart');
                        }}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import createBook from "../../utils/bookFactory";
import { BaseQuantity } from "../../components/quantity/Quantity";
import styles from "./Book.module.css"


export default function Book() {
    const { bookId } = useParams();
    const { state } = useLocation();

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
            setLoading(false)
            return;
        }


    }, [bookId, state?.book])


    if(error) return <p>{error}</p>
    if(loading) return <p>Loading ...</p>

    console.log('render')

    return (
        <div className={styles.content}>
            <p>{book.title}</p>
            <BaseQuantity 
            bookQuantity={bookQuantity} 
            setBookQuantity={setBookQuantity}/>
        </div>
    )
}
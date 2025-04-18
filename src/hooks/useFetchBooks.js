// https://www.googleapis.com/books/v1/volumes?&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI

// to get random 10 books
// https://www.googleapis.com/books/v1/volumes?q=2&startIndex=0&maxResults=10&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI
// https://www.googleapis.com/books/v1/volumes?q=2&startIndex=0&maxResults=10&filter=paid-ebooks&key=

// to get books with categorie self-help
// https://www.googleapis.com/books/v1/volumes?q=subject+category...

// to get trending books (newest)
// https://www.googleapis.com/books/v1/volumes?q=trending&orderBy=newest&maxResults=10&key=API_KEY


/*
    get books => books.items (array)
    get title => book.volumeInfo.title
    get first author => book.volumeInfo.authors[0] 
    get image link => book.volumeInfo.imageLinks.smallThumbnail
*/ 


import { useEffect, useState } from "react"
import createBook from "../utils/bookFactory";


const useBooks = (numberOfBooks = 30) => {
    const [books, setBooks] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
        const fetchBooks = async ()=> {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=t&subject:Fiction|subject:History|subject:Self-help|subject:Bussiness&maxResults=${numberOfBooks}&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI`, {
                    mode: "cors"
                })

                if(response.status !== 200 || !response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}` )
                }

                const myBooks = await response.json();
                setBooks(myBooks.items.map((item)=> createBook(item)));
                setError(null)
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks()
    }, [numberOfBooks])

    return { books, error, loading };
}

const useTrendingBooks = ()=> {
    const [trendingBooks, setTrendingBooks] = useState(null);
    const [trendingError, setTrendingError] =  useState(null);
    const [trendingLoading, setTrendingLoading]= useState(true)

    useEffect(()=> {
        const fetchBooks = async ()=> {
            try {
                const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=trending&country=US&filter=paid-ebooks&orderBy=newest&maxResults=10&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI', {
                    mode: "cors"
                })

                if(response.status !== 200 || !response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`)
                }

                const myBooks = await response.json();
                setTrendingBooks(myBooks.items.map((item)=> createBook(item)))
                setTrendingError(null)
            } catch (err) {
                setTrendingError(err)
            } finally {
                setTrendingLoading(false);
            }
        }

        fetchBooks()
    }, [])

    return { trendingBooks, trendingError, trendingLoading }
}

function useBestSellerBooks() {
    const [bestSellerBooks, setBestSellerBooks] = useState(null);
    const [bestSellerError, setBestSellerError] = useState(null);
    const [bestSellerLoading, setBestSellerLoading] = useState(true);

    useEffect(()=> {
        const fetchBooks = async()=>{
            try {
                const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=bestseller&country=US&filter=paid-ebooks&orderBy=newest&maxResults=10&key=AIzaSyBtMQ1A0xwSVvhZnDRg2n_QdCsl_zV_PWI', {
                    mode: 'cors'
                })

                if(response.status  !== 200 || !response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`)
                }

                const myBooks = await response.json()
                const books = myBooks.items.map((book)=> createBook(book))
                setBestSellerBooks(books);
                setBestSellerError(null)
            } catch(err) {
                setBestSellerError(err)
            } finally {
                setBestSellerLoading(false)
            }
        }

        fetchBooks();
    }, [])

    return {bestSellerBooks, bestSellerError, bestSellerLoading};
}


export { useBooks, useTrendingBooks, useBestSellerBooks };
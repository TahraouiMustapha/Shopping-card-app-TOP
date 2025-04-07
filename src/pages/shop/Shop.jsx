import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useBooks } from "../../hooks/useFetchBooks";
import styles from "./Shop.module.css"
import indexStyles from "../../index.module.css"
import Card from "../../components/bookCard/Card";
import { ShopSide } from "./ShopSide";

import { Search, Loader } from 'lucide-react';


function SearchBar({ setSearchValue }) {
    return (
        <div className={styles.search}>
            <Search color="#9ca3af"/>
            <input 
            placeholder="Search for books..."
            onChange={(e)=> setSearchValue(e.target.value)}/>
        </div>
    )
}

function BooksContainer({books, handleAddToCartClick}) {

    return (
        <div className={styles.booksContainer}>
            {books.map((book)=> <Card key={book.id} book={book} handleAddToCartClick={handleAddToCartClick}/>)}
        </div>
    )
}


export default function Shop() {
    const { books, error, loading } = useBooks()
    const [searchValue, setSearchValue] = useState('')
    const [priceInterval, setPriceInterval] = useState(null);
    const { categorie, setCategorie, setCartBooksState } = useOutletContext()
 
    if(error) return <p>A network error was encountered!</p> 
    if(loading) return (
        <Loader width={56} height={56}
        className={indexStyles.loaderSpinner}/>
    )



    function handleAddToCartClick(book) {
        setCartBooksState((prevBooksState)=> {
            let newMap = new Map(prevBooksState.books);      
            let size = prevBooksState.size;   

            if(!newMap.has(book.id)) {
                newMap.set(book.id, {
                    bookObj: book,
                    quantity: 1
                })
                size += 1
            } else {
                const oldObj = newMap.get(book.id);
                newMap.set(book.id, {
                    ...oldObj,
                    quantity: oldObj.quantity + 1 
                })
            }
            return {
                books:newMap,
                size: size
            } 
        })
    }

    let filterBooks = books;

    if(priceInterval) filterBooks = filterBooks.filter((book)=> {
        if(priceInterval[1]) return book.price >= priceInterval[0] && book.price <= priceInterval[1]
        return book.price >= priceInterval[0]
    })


    if(categorie.length > 0) filterBooks = filterBooks.filter((book)=> {
        return categorie.every((cat)=> book.categorie.includes(cat))
    })
    
    if(searchValue) filterBooks = filterBooks.filter((book)=> 
        book.title.toLowerCase().includes(searchValue.toLowerCase()
    ));


    return (
        <div className={styles.content}>
            <SearchBar setSearchValue={setSearchValue} />
            {/* for main seciton */}
            <div className={styles.main}>
                <h2 className={styles.title}>Books</h2>
                <p className={styles.numberOfresult}>{filterBooks?.length > 0 ? filterBooks.length : '0'} results</p>
                { filterBooks?.length > 0 
                ? <BooksContainer books={filterBooks} handleAddToCartClick={handleAddToCartClick}/>
                : 'No books found'}
            </div>
            <ShopSide setPriceInterval={setPriceInterval} setCategorie={setCategorie} parentCategories={categorie}/>
        </div>

    )
};
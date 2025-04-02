import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useBooks } from "../../hooks/useFetchBooks";
import styles from "./Shop.module.css"
import Card from "../../components/bookCard/Card";
import Accordion from "./Accordion";

import { Search, SlidersHorizontal } from 'lucide-react';


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

function BooksContainer({books}) {
    return (
        <div className={styles.booksContainer}>
            {books.map((book)=> <Card key={book.id} book={book}/>)}
        </div>
    )
}

function ShopSide({setPriceInterval, setCategorie, parentCategories}) {
    const [shownAccordions, setShownAccordions] = useState({
        price: false, 
        tags: false,
        genres: false
    })

    function handleAccordionClick(accordionName) {
        const newShowns = {
            ...shownAccordions,
        }
        newShowns[accordionName] = shownAccordions[accordionName]? false: true;

        setShownAccordions(newShowns)
    }

    function handlePriceAccordianClick(priceInterval) {
        setPriceInterval(priceInterval)
    }

    function handleGenreAccordianClick(categorie, getOut) {
        if(categorie) {
            // to get out the categorie if it exists before
            if(getOut) { 
                setCategorie((prevArray)=> {
                    return prevArray?.includes(categorie)
                    ? prevArray.filter((cat)=> cat != categorie)
                    :  prevArray;
                })
            } else {
                setCategorie((prevArray)=> {
                    return !prevArray?.includes(categorie)
                    ?  [...prevArray, categorie]
                    :  prevArray;
                })
            }
        }
    }

    return (
        <div className={styles.side}>
            <div 
            className={styles.head}>
                <SlidersHorizontal strokeWidth={3}/>
                <h2>Filters</h2>
            </div>
            
            <Accordion 
            accordiontitle={'price'}
            shownAccordions={shownAccordions}
            handleAccordionClick={handleAccordionClick}
            handlePriceAccordianClick={handlePriceAccordianClick}/>

            <Accordion 
            accordiontitle={'tags'}
            shownAccordions={shownAccordions}
            handleAccordionClick={handleAccordionClick}/>

            <Accordion 
            accordiontitle={'genres'}
            shownAccordions={shownAccordions}
            parentCategories={parentCategories}
            handleGenreAccordianClick={handleGenreAccordianClick}
            handleAccordionClick={handleAccordionClick}/>
        </div>
    )
}


export default function Shop() {
    const { books, error, loading } = useBooks()
    const [searchValue, setSearchValue] = useState('')
    const [priceInterval, setPriceInterval] = useState(null);
    const { categorie, setCategorie } = useOutletContext()

    let filterBooks = books;

    if(priceInterval) filterBooks = books.filter((book)=> {
        if(priceInterval[1]) return book.price >= priceInterval[0] && book.price <= priceInterval[1]
        return book.price >= priceInterval[0]
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
                { error ? (
                    <p>A network error was encountred!</p> 
                ): loading ? (
                    <p>Loading ...</p>
                ): (
                    filterBooks?.length > 0 && <BooksContainer books={filterBooks}/>
                )}
            </div>
            <ShopSide setPriceInterval={setPriceInterval} setCategorie={setCategorie} parentCategories={categorie}/>
        </div>

    )
};
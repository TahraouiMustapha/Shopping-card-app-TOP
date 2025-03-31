import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useBooks } from "../../hooks/useFetchBooks";
import styles from "./Shop.module.css"
import Card from "../../components/bookCard/Card";

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';




function SearchBar() {
    return (
        <div className={styles.search}>
            <Search color="#9ca3af"/>
            <input placeholder="Search for books..."/>
        </div>
    )
}

function BooksContainer({books}) {
    return (
        <div className={styles.booksContainer}>
            {books.map((book)=> <Card book={book}/>)}
        </div>
    )
}

function ShopSide() {
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
            handleAccordionClick={handleAccordionClick}/>

            <Accordion 
            accordiontitle={'tags'}
            shownAccordions={shownAccordions}
            handleAccordionClick={handleAccordionClick}/>

            <Accordion 
            accordiontitle={'genres'}
            shownAccordions={shownAccordions}
            handleAccordionClick={handleAccordionClick}/>
        </div>
    )
}

function Accordion({accordiontitle, shownAccordions, handleAccordionClick}) {
    const accordiontitleWithCapital = accordiontitle[0].toUpperCase() + accordiontitle.slice(1);

    return (
        <div className={styles.accordion}>
                <div 
                className={styles.accordionHead}
                onClick={()=> handleAccordionClick(accordiontitle)}>
                    <p>{accordiontitleWithCapital}</p>
                    <ChevronDown width={32} height={32} 
                    className={styles.arrow}
                    style={{
                        transform: shownAccordions[accordiontitle]? 'rotate(-180deg)': 'none'
                    }}/>
                </div>
                <div 
                className={styles.accordionContent}
                style={{
                    gridTemplateRows: shownAccordions[accordiontitle]? '1fr': '0fr',
                }}>
                    <div>
                        <ul>
                            <li>
                                <input type="checkbox" id="price1" name="price-intervale-one" value="['0', '19.99']"/>
                                <label htmlFor="price1"> From 0.00$ to 19.99$</label>
                            </li>

                            <li>
                                <input type="checkbox" id="price2" name="price-intervale-two" value="['20', '']"/>
                                <label htmlFor="price1"> From 20$ </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default function Shop() {
    const { books, error, loading } = useBooks()
    const { categorie } = useOutletContext()

    return (
        <div className={styles.content}>
            <SearchBar/>
            {/* for main seciton */}
            <div className={styles.main}>
                <h2 className={styles.title}>Books</h2>
                <p className={styles.numberOfresult}>{books?.length > 0 ? books.length : '0'} results</p>
                { error ? (
                    <p>A network error was encountred!</p> 
                ): loading ? (
                    <p>Loading ...</p>
                ): (
                    books?.length > 0 && <BooksContainer books={books}/>
                )}
            </div>
            <ShopSide/>
        </div>

    )
};
import { useOutletContext } from "react-router-dom";
import styles from "./Shop.module.css"
import Card from "../../components/bookCard/Card";

import { Search } from 'lucide-react';



function SearchBar() {
    return (
        <div className={styles.search}>
            <Search color="#9ca3af"/>
            <input placeholder="Search for books..."/>
        </div>
    )
}

function ShopMain() {
    return (
        <div className={styles.main}>
            <h2 className={styles.title}>Books</h2>
            <p className={styles.numberOfresult}>30 results</p>
            <div className={styles.booksContainer}>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

function ShopSide() {
    return (
        <div className={styles.side}>side</div>
    )
}

export default function Shop() {
    const { categorie } = useOutletContext()

    return (
        <div className={styles.content}>
            <SearchBar/>
            <ShopMain/>
            <ShopSide/>
        </div>

    )
};
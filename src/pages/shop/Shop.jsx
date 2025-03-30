import { useOutletContext } from "react-router-dom";
import styles from "./Shop.module.css";

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
        <div className={styles.main}>main</div>
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
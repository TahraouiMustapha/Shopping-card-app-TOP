import styles from './Slide.module.css'
import { useState } from 'react'
import Card from '../bookCard/Card'
import { ChevronRight, ChevronLeft } from 'lucide-react';



export default function Slide({books}) {
    const [shownIndex, setShownIndex] = useState([
        0, 1, 2, 3, 4
    ])


    function handleLiftClick() {
        setShownIndex((prevShownIndex) => 
            prevShownIndex.map((shown)=> shown <= 0? books.length - 1: shown -= 1 )
        )
    }

    function handleRightClick() {
        setShownIndex((prevShownIndex)=> 
            prevShownIndex.map((shown)=> shown >= books.length - 1? 0: shown += 1)
        )
    }

    return (
        <div className={styles.slide}>
            <ChevronLeft className={styles.arrow}
            onClick={handleLiftClick} size={32} strokeWidth={1.5}/>
            <div className={styles.cardsContainer}>
                {shownIndex.map((shown)=> <Card key={books[shown].id} book={books[shown]}/>)}
            </div>
            <ChevronRight className={styles.arrow}
            onClick={handleRightClick} size={32} strokeWidth={1.5}/>
        </div>
    )
}

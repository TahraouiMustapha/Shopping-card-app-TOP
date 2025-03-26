import styles from './Slide.module.css'
import { useState } from 'react'
import Card from '../bookCard/Card'


const arrayOfObjs = [
  {number:0},
  {number:1},
  {number:2},
  {number:3},
  {number:4},
  {number:5}
]

export default function Slide() {
    const [shownIndex, setShownIndex] = useState([
        0, 1, 2, 3
    ])


    function handleLiftClick() {
        setShownIndex((prevShownIndex) => 
            prevShownIndex.map((shown)=> shown <= 0? arrayOfObjs.length - 1: shown -= 1 )
        )
    }

    function handleRightClick() {
        setShownIndex((prevShownIndex)=> 
            prevShownIndex.map((shown)=> shown >= arrayOfObjs.length - 1? 0: shown += 1)
        )
    }

    return (
        <div className={styles.slide}>
            <button onClick={handleLiftClick}>&lt;</button>
            <div className={styles.cardsContainer}>
                {shownIndex.map((shown, index)=> <Card key={index} title={arrayOfObjs[shown].number}/>)}
            </div>
            <button onClick={handleRightClick}>&gt;</button>
        </div>
    )
}

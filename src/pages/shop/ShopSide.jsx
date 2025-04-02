import { useState } from "react";
import Accordion from "./Accordion";
import { SlidersHorizontal } from "lucide-react"
import styles from "./Shop.module.css"


export function ShopSide({setPriceInterval, setCategorie, parentCategories}) {
    const [shownAccordions, setShownAccordions] = useState({
        price: true, 
        tags: true,
        genres: true
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
import { useState } from "react";
import styles from "./Shop.module.css"
import { ChevronDown } from "lucide-react"


const accordion = {
    price: [{
            id: crypto.randomUUID(),
            value: [0, 19.99]
        }, {
            id: crypto.randomUUID(),
            value: [20, null]
        }],

    categories: [{
            id: crypto.randomUUID(),
            value: 'Adventure'   
        }, 
        {
            id: crypto.randomUUID(),
            value: 'Classic'   
        },
        {
            id: crypto.randomUUID(),
            value: 'Fiction'   
        },
        {
            id: crypto.randomUUID(),
            value: 'History'   
        },
        {
            id: crypto.randomUUID(),
            value: 'Pyschology'   
        },
        {
            id: crypto.randomUUID(),
            value: 'Science Fiction'   
        },
        {
            id: crypto.randomUUID(),
            value: 'Self-help'   
        }, 
        {
            id: crypto.randomUUID(), 
            value: 'Romance'
        }, 
        {
            id: crypto.randomUUID(), 
            value: 'Business & Economics'
        }
     ],
     tags: [
        {
            id: crypto.randomUUID(),
            value: 'Bestseller'
        },
        {
            id: crypto.randomUUID(),
            value: 'Emotional'
        },
        {
            id: crypto.randomUUID(),
            value: 'Highly Rated'
        },
        {
            id: crypto.randomUUID(),
            value: 'Trending'
        }
     ]


}


export default function Accordion({accordiontitle, shownAccordions, parentCategories, handleAccordionClick, handlePriceAccordianClick, handleGenreAccordianClick}) {
    const [isCheckedPrice, setIsCheckedPrice] = useState([false, false]); // based on having two intervals

    function handlePriceIntervalChecked(indexClicked) {
        let newArray = [...isCheckedPrice] 
        newArray[indexClicked] = newArray[indexClicked]? false: true;
        newArray[indexClicked] ? newArray = newArray.map((value, index)=> 
            index !== indexClicked ? false : true 
        ): null;
        setIsCheckedPrice(newArray)
    }

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
                            {accordiontitle === 'price' && 
                                accordion['price'].map((priceInterval, index)=> 
                                    <li key={priceInterval.id}>
                                        <input onChange={(e)=> {
                                            handlePriceIntervalChecked(index)
                                            e.target.checked
                                            ? handlePriceAccordianClick(JSON.parse(e.target.value))
                                            : handlePriceAccordianClick(null)
                                        }}
                                        type="checkbox" id="price1" name="price-intervale-one" 
                                        checked = {isCheckedPrice[index]}
                                        value={JSON.stringify(priceInterval.value)} />
                                        <label htmlFor="price1"> From {priceInterval.value[0]}$ {!!priceInterval.value[1] && ' to ' + priceInterval.value[1]+ '$'}</label>
                                    </li>
                                )}

                                {accordiontitle === 'genres' && 
                                accordion['categories'].map((categorie, index) => 
                                    <li key={categorie.id}>
                                        <input onChange={(e) => {
                                            e.target.checked 
                                            ? handleGenreAccordianClick(e.target.value, false)
                                            : handleGenreAccordianClick(e.target.value, true);                                                
                                        }}
                                        type="checkbox" 
                                        id={'categorie'+ index} 
                                        name={'categorie'+ index}
                                        value={categorie.value}
                                        // to check the categorie that been exist already at the state array
                                        checked={parentCategories.includes(categorie.value) ?? false} /> 
                                        <label htmlFor={'categorie'+ index}>{categorie.value}</label>
                                    </li>
                                )}

                                {accordiontitle === 'tags' && 
                                    accordion['tags'].map((tag, index)=> 
                                        <li>
                                            <input 
                                            type="checkbox" 
                                            id={'tag'+ index} 
                                            name={'tag'+ index}
                                            value={tag.value}/> 
                                            <label htmlFor={'tag'+ index}>{tag.value}</label>
                                        </li>
                                    )
                                }
                                {accordiontitle === 'tags' && <p>Not enough information available to determine tags for this books</p>}
                        </ul>
                    </div>
                </div>
            </div>
    )
}
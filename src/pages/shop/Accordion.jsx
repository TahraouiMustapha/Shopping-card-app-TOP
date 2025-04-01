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
    }]
}


export default function Accordion({accordiontitle, shownAccordions, handleAccordionClick, handlePriceAccordianClick}) {
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
                                            : null
                                        }}
                                        type="checkbox" id="price1" name="price-intervale-one" 
                                        checked = {isCheckedPrice[index]}
                                        value={JSON.stringify(priceInterval.value)} />
                                        <label htmlFor="price1"> From {priceInterval.value[0]}$ {!!priceInterval.value[1] && ' to ' + priceInterval.value[1]+ '$'}</label>
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            </div>
    )
}
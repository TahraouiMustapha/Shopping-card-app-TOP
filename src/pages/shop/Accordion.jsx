import styles from "./Shop.module.css"
import { ChevronDown } from "lucide-react"


const accordion = {
    price: [[0, 19.99], [20, null]]
}


export default function Accordion({accordiontitle, shownAccordions, handleAccordionClick, handlePriceAccordianClick}) {
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
                                accordion['price'].map((priceInterval)=> 
                                    <li>
                                        <input onClick={handlePriceAccordianClick}
                                        type="checkbox" id="price1" name="price-intervale-one" 
                                        value={JSON.stringify(priceInterval)} />
                                        <label htmlFor="price1"> From {priceInterval[0]}$ {!!priceInterval[1] && 'to' + priceInterval[1]+ '$'}</label>
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            </div>
    )
}
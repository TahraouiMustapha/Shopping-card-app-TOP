import { Link } from "react-router-dom"
import styles from "./NavigationBar.module.css"
import "../../index.module.css"
import { ShoppingCart } from "lucide-react"



function NavLink({title, children, itemsNumber}) {
    return(
        <div className={styles.navLink}>
            {children}
            {title === 'Cart' && (
                <>
                <Link to='cart'>{title}</Link>
                {itemsNumber !== 0 && <div className={styles.itemsNumber}>{itemsNumber}</div>}
                </>
            )}
        </div>
    )
}

function NavigationBar({itemsNumber}) {
    return (
        <div className={styles.navigationBar}>

            <div>
                <h1 className={styles.logo}>MYLib</h1>
                <Link to="/"> Home </Link>
                <Link to="shop"> Shop </Link>
            </div>

            <div>
                <NavLink title={'Cart'} itemsNumber={itemsNumber}>
                    <ShoppingCart size={32} className={styles.icon}/>
                </NavLink>
            </div>
        </div>
    )
}

export default NavigationBar
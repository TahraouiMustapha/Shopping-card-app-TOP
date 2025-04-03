import { Link } from "react-router-dom"
import styles from "./NavigationBar.module.css"
import "../../index.module.css"
import { ShoppingCart } from "lucide-react"



function NavLink({title, children}) {
    return(
        <div className={styles.navLink}>
            {children}
            <p>{title}</p>
        </div>
    )
}

function NavigationBar() {
    return (
        <div className={styles.navigationBar}>

            <div>
                <h1 className={styles.logo}>MYLib</h1>
                <Link to="/"> Home </Link>
                <Link to="shop"> Shop </Link>
            </div>

            <div>
                <NavLink title={'Cart'}>
                    <ShoppingCart size={32}/>
                </NavLink>
            </div>
        </div>
    )
}

export default NavigationBar
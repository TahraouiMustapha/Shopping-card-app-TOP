import { Link } from "react-router-dom"

function NavigationBar() {
    return (
        <>
            <Link to="/"> Home </Link>
            <Link to="shop"> Shop </Link>
        </>
    )
}

export default NavigationBar
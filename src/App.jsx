
import { useState } from "react"
import { Outlet } from "react-router-dom" 
import NavigationBar from "./components/navigationBar/NavigationBar"

export default function App() {
    const [categorie, setCategorie] = useState([])
    const [cartBooksState, setCartBooksState] = useState({
      cartBooks: new Map(),
      size: 0
    })

    return (
      <>
        <NavigationBar itemsNumber={cartBooksState.size}/>
        <div className="content-container">
          <Outlet context={
            {
              categorie, 
              setCategorie,
              cartBooksState, 
              setCartBooksState
            }
            }/>
        </div>
      </>
    )
  }
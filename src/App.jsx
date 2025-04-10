
import { useState } from "react"
import { Outlet } from "react-router-dom" 
import NavigationBar from "./components/navigationBar/NavigationBar"
import Toast from "./components/toast/Toast"

export default function App() {
    const [categorie, setCategorie] = useState([])
    const [cartBooksState, setCartBooksState] = useState({
      books: new Map(),
      size: 0
    })
    const [isVisible, setIsVisible] = useState(false)

    return (
      <>
        <NavigationBar itemsNumber={cartBooksState.size}/>
        <div className="content-container">
          <Outlet context={
            {
              categorie, 
              setCategorie,
              cartBooksState, 
              setCartBooksState,
              setIsVisible
            }
            }/>
        </div>
        {isVisible && <Toast  setIsVisible={setIsVisible}/>}
      </>
    )
  }
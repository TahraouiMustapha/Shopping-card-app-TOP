
import { useState } from "react"
import { Outlet } from "react-router-dom" 
import NavigationBar from "./components/navigationBar/NavigationBar"

export default function App() {
    const [categorie, setCategorie] = useState([])
    const [cartBooks, setCartBooks] = useState(new Map())

    return (
      <>
        <NavigationBar/>
        <div className="content-container">
          <Outlet context={
            {
              categorie, 
              setCategorie,
              cartBooks, 
              setCartBooks
            }
            }/>
        </div>
      </>
    )
  }
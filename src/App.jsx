
import { useState } from "react"
import { Outlet } from "react-router-dom" 
import NavigationBar from "./components/navigationBar/NavigationBar"

export default function App() {
    const [categorie, setCategorie] = useState('')

    return (
      <>
        <NavigationBar/>
        <div className="content-container">
          <Outlet context={{categorie: categorie, setCategorie: setCategorie}}/>
        </div>
      </>
    )
  }
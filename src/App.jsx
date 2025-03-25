
import { Outlet } from "react-router-dom" 
import NavigationBar from "./components/navigationBar/NavigationBar"

export default function App() {
    return (
      <>
        <NavigationBar/>
        <div className="content-container">
          <Outlet/>
        </div>
      </>
    )
  }
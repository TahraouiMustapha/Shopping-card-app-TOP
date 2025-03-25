import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './components/home/Home'
import Shop from './components/shop/Shop'
import NavigationBar from './components/navigationBar/NavigationBar'


function App() {
  return (
    <>
      <NavigationBar/>
      <div className="content-container">
        <Outlet/>
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "/", element: <Home/> },
      { path: "/shop", element: <Shop/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>
)

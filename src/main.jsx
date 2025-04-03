import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.module.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import routes from './routes/routes'


const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/> 
  </StrictMode>
)

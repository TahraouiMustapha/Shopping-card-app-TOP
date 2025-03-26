import App from "../App";
import Home from "../pages/home/Home"
import Shop from "../pages/shop/Shop"

const routes = [
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/shop", element: <Shop/>}
      ]
    }
]

export default routes;
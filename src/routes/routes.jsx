import App from "../App";
import Home from "../pages/home/Home"
import Shop from "../pages/shop/Shop"
import Cart from "../pages/cart/Cart";

const routes = [
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/shop", element: <Shop/>},
        { path: "/cart", element: <Cart/> }
      ]
    }
]

export default routes;
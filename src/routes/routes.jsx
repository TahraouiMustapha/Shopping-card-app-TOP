import App from "../App";
import Home from "../pages/home/Home"
import Shop from "../pages/shop/Shop"
import Cart from "../pages/cart/Cart";
import Book from "../pages/book/Book";

const routes = [
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/shop", element: <Shop/>},
        { path: "/cart", element: <Cart/> },
        { path:"/book/:bookId", element: <Book/>}
      ]
    }
]

export default routes;
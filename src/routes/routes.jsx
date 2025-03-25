import App from "../App";
import Home from "../components/home/Home"
import Shop from "../components/shop/Shop"

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
import { useOutletContext } from "react-router-dom"

export default function Cart() {
    const { cartBooksState } = useOutletContext() 

    console.log(cartBooksState.cartBooks.entries())


    return (
        <p>hi</p>
    )
}
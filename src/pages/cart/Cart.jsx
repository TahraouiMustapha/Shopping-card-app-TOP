import { useOutletContext } from "react-router-dom"

export default function Cart() {
    const { cartBooks } = useOutletContext() 

    console.log(cartBooks.entries())


    return (
        <p>hi</p>
    )
}
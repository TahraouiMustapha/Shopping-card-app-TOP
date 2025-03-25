import { useOutletContext } from "react-router-dom";

function Shop() {
    const { categorie } = useOutletContext()

    return (
        <>
            <div> i am a shop with {categorie} </div>
        </>

    )
}

export default Shop;
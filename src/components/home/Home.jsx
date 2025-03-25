import { useFetchBooks } from "../../hooks/useFetchBooks";

function Home(){
    const {books, error, loading} = useFetchBooks(2) 

    if(error) return <p>A network error was encountred</p>
    if(loading) return <p>Loading ...</p>

    console.log(books)

    return (
        <>
            <div>hi</div>
        </>

    )
}

export default Home;
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import Slide from "../../components/slide/Slide";


const categories = [{id: crypto.randomUUID(), categorieName:'Self-Help'},
                    {id: crypto.randomUUID(), categorieName:'History'},
                    {id: crypto.randomUUID(), categorieName:'Fiction'},
                    {id: crypto.randomUUID(), categorieName:'Business & Economics'}
                ];

function Home(){
    // const {books, error, loading} = useFetchBooks(2)
    const navigate = useNavigate();
    const { setCategorie } = useOutletContext()
    

    // if(error) return <p>A network error was encountred</p>
    // if(loading) return <p>Loading ...</p>

    function handleCategorieClick(categorieName) {
        setCategorie(categorieName)
        navigate('/shop');
    }    

    return (
        <div>

            <div> {/*cards container of categories section */}
                {categories.map((categorieObj)=> {
                    return <CategorieCard 
                            key={categorieObj.id}
                            categorieName={categorieObj.categorieName}
                            handleCategorieClick={handleCategorieClick} />
                })}
            </div>

            <div> 
            {/*slide element of trending part*/}
                <Slide/>
            </div>
        </div>
    )
}

function CategorieCard({categorieName, handleCategorieClick}) {
    return (
        <div 
        style={{border: '1px solid black', margin: '5px'}}
        onClick={()=> handleCategorieClick(categorieName)}>
            <div>
                <img src="#" alt="books image" />
            </div>
            <p>{categorieName}</p>
        </div>
    )
}

export default Home;
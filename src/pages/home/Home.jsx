import { useNavigate, useOutletContext } from "react-router-dom";
import { useTrendingBooks } from "../../hooks/useFetchBooks";
import Slide from "../../components/slide/Slide";


const categories = [{id: crypto.randomUUID(), categorieName:'Self-Help'},
                    {id: crypto.randomUUID(), categorieName:'History'},
                    {id: crypto.randomUUID(), categorieName:'Fiction'},
                    {id: crypto.randomUUID(), categorieName:'Business & Economics'}
                ];

function Home(){
    const { trendingBooks, trendingError, trendingLoading } = useTrendingBooks();
    const navigate = useNavigate();
    const { setCategorie } = useOutletContext()
    

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
            {trendingError ? (
                <p>A network error was encountred!</p>    
            ): trendingLoading ? (
                <p>Loading ...</p>
            ): (
                trendingBooks?.length > 0 && <Slide trendingBooks={trendingBooks}/> 
            )}
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
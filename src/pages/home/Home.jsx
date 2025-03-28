import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useTrendingBooks } from "../../hooks/useFetchBooks";
import Slide from "../../components/slide/Slide";
import styles from "./Home.module.css"


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
        <div className={styles.content}>
            <div className={styles.main}>
                <h1 className={styles.logo}>MYLib</h1>
                <p className={styles.bio}>Discover Your Next Must-Read Adventure!</p>
                <Link 
                to='/shop'
                className={styles.shopNowBtn}>Shop Now</Link>
            </div>

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
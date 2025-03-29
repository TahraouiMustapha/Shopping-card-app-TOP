import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useTrendingBooks } from "../../hooks/useFetchBooks";
import Slide from "../../components/slide/Slide";
import styles from "./Home.module.css"

import selfHelpImg from "../../assets/images/self-help_category.png"
import historyImg from "../../assets/images/history_category.png"
import fictionImg from "../../assets/images/fiction_category.png"
import businessImg from "../../assets/images/business_categorie.jpg"


const categories = [{id: crypto.randomUUID(), categorieName:'Self-Help', categorieImage: selfHelpImg},
                    {id: crypto.randomUUID(), categorieName:'History', categorieImage: historyImg},
                    {id: crypto.randomUUID(), categorieName:'Fiction', categorieImage: fictionImg},
                    {id: crypto.randomUUID(), categorieName:'Business & Economics', categorieImage: businessImg}
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
            {/* hero section */}
            <div className={styles.main}>
                <h1 className={styles.logo}>MYLib</h1>
                <p className={styles.bio}>Discover Your Next Must-Read Adventure!</p>
                <Link 
                to='/shop'
                className={styles.shopNowBtn}>Shop Now</Link>
            </div>
            {/* categories section */}
            <div className={styles.categories}> 
                <div className={styles.head}>
                    <h1 className={styles.title}>Popular Categories</h1>
                    <Link to='/shop' className={styles.seeMore}> see more</Link>
                </div>

                <div className={styles.cardsContainer}>
                    {categories.map((categorieObj)=> {
                        return <CategorieCard 
                                key={categorieObj.id}
                                categorieName={categorieObj.categorieName}
                                categorieImage={categorieObj.categorieImage}
                                handleCategorieClick={handleCategorieClick} />
                    })}
                </div>
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

function CategorieCard({categorieName, categorieImage, handleCategorieClick}) {
    return (
        <div 
        className={styles.categorieCard}
        onClick={()=> handleCategorieClick(categorieName)}>
            <div
                className={styles.categorieImage}
                style={{backgroundImage: `url(${categorieImage})`}}>     
            </div>
            <p>{categorieName}</p>
        </div>
    )
}

export default Home;
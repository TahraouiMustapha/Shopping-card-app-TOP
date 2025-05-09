import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useTrendingBooks, useBestSellerBooks } from "../../hooks/useFetchBooks";
import Slide from "../../components/slide/Slide";
import styles from "./Home.module.css"
import indexStyle from "../../index.module.css"

import selfHelpImg from "../../assets/images/self-help_category.png"
import historyImg from "../../assets/images/history_category.png"
import fictionImg from "../../assets/images/fiction_category.png"
import businessImg from "../../assets/images/business_categorie.jpg"
import { Loader, Proportions } from "lucide-react";

import PropTypes from "prop-types";

const categories = [{id: crypto.randomUUID(), categorieName:'Self-help', categorieImage: selfHelpImg},
                    {id: crypto.randomUUID(), categorieName:'History', categorieImage: historyImg},
                    {id: crypto.randomUUID(), categorieName:'Fiction', categorieImage: fictionImg},
                    {id: crypto.randomUUID(), categorieName:'Business & Economics', categorieImage: businessImg}
                ];

                
function Home(){
    const { trendingBooks, trendingError, trendingLoading } = useTrendingBooks();
    const { bestSellerBooks, bestSellerError, bestSellerLoading } = useBestSellerBooks()
    const navigate = useNavigate();
    const { setCategorie, setCartBooksState, setIsVisible } = useOutletContext()
    

    function handleCategorieClick(categorieName) {
        if(categorieName) {
            setCategorie((prevCategoriesArr)=> {
                if(prevCategoriesArr) {
                    return !prevCategoriesArr.includes(categorieName)
                    ? [...prevCategoriesArr, categorieName]
                    : prevCategoriesArr; 
                } 
            })
        }
        navigate('/shop');
    }    

    function handleAddToCartClick(book) {
        setCartBooksState((prevBooksState)=> {
            let newMap = new Map(prevBooksState.books);      
            let size = prevBooksState.size;   

            if(!newMap.has(book.id)) {
                newMap.set(book.id, {
                    bookObj: book,
                    quantity: 1
                })
                size += 1
            } else {
                const oldObj = newMap.get(book.id);
                newMap.set(book.id, {
                    ...oldObj,
                    quantity: oldObj.quantity + 1 
                })
            }
            return {
                books:newMap,
                size: size
            } 
        })
    }

    function handleShowToast() {
        setIsVisible(true)
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
            {/* ternding seciotn */}
            <div className={styles.trending}> 
                <div className={styles.head}>
                    <h1 className={styles.title}>What's Trending</h1>
                    <Link to='/shop' className={styles.seeMore}>see more</Link>
                </div>

                {trendingError ? (
                    <p>A network error was encountred!</p>    
                ): trendingLoading ? (
                    <Loader width={56} height={56}
                    className={indexStyle.loaderSpinner}/>
                ): (
                    trendingBooks?.length > 0 && <Slide books={trendingBooks} 
                    handleShowToast={handleShowToast}
                    handleAddToCartClick={handleAddToCartClick}/> 
                )}
            </div>

            {/* bestSeller section */}
            <div className={styles.trending}> 
                <div className={styles.head}>
                    <h1 className={styles.title}>Bestsellers</h1>
                    <Link to='/shop' className={styles.seeMore}>see more</Link>
                </div>

                {bestSellerError ? (
                    <p>A network error was encountered!</p>
                ): bestSellerLoading ? (
                    <Loader width={56} height={56}
                    className={indexStyle.loaderSpinner}/>
                ): bestSellerBooks?.length > 0 && <Slide books={bestSellerBooks} 
                                                    handleShowToast={handleShowToast}
                                                handleAddToCartClick={handleAddToCartClick}/>}
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

CategorieCard.proTypes = {
    categorieName: PropTypes.string.isRequired,
    handleCategorieClick: PropTypes.func
}


export default Home;
import hashToPrice from "./priceUtil";

// to structure data

function createBook(obj) {
    return {
        id: obj.id,
        title: obj.volumeInfo.title,
        author: obj.volumeInfo.authors? obj.volumeInfo.authors[0]:null,
        thumbnail: obj.volumeInfo.imageLinks.smallThumbnail,
        categorie: obj.volumeInfo.categories ?? 'Classic',
        price: hashToPrice(obj.volumeInfo.title)
    }
}


export default createBook;
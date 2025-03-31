// this function provided by ChatGPT
export default function hashToPrice(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % 1000000; // Simple hash function
    }
    let price = (hash % 3000) / 100; // Get a number between 0.00 and 30.00
    return price.toFixed(2); // Format as a price
}
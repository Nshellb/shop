import http from './http';

export default {
    async getBestProducts() { // best-product.json data를 가져오는 코드 
        return http.get('api/best-product.json');
    },
    async getFeaturedProducts() { // featured-product.json data를 가져오는 코드
        return http.get('api/featured-product.json');
    },
    async getProducts(page = 1, priceRange = null) { // products.json data를 가져오는 코드
        return http.get('api/products.json', {
            page, 
            priceRange,
        });
    },
}
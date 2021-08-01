import http from './http';

export default {
    async getBestProducts() { // best-product를 가져오는 코드 
        return http.get('api/best-product.json');
    },
    async getFeaturedProducts() { // featured-product를 가져오는 코드
        return http.get('api/featured-product.json');
    },
}
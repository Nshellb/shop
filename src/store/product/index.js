import productApi from '@/api/product';

export default {
    namespaced: true,
    state: {
        Products: [], // 상품 목록 출력
        totalProducts: 0,
        bestProducts: [],
        featuredProducts: [],
        page: 0, // 페이지 위치
        priceRange: null, // pricefilter
    },
    mutations: {
        setBestProducts(state, products) {
            state.bestProducts = [].concat(products); // 3. state에 저장하도록 만들어준다.
        },
        setFeaturedProducts(state, products) {
            state.featuredProducts = [].concat(products);
        },
        setProducts(state, products) {
            state.products = [].concat(products)
        },
        setTotalProducts(state, totalCount) {
            state.totalProducts = totalCount;
        },
        setPage(state, page) {
            state.page = page;
        },
        setPriceRange(state, priceRange) {
            state.priceRange = priceRange;
        }
    },
    actions: {
        async setBestProducts({ commit }) {
            const response = await productApi.getBestProducts(); // 1. getBestProducts를 api 에서 가져와서 

            commit('setBestProducts', response.data); // 2. mutation을 호출하고 
        },
        async setFeaturedProducts({ commit }) {
            const response = await productApi.getFeaturedProducts(); 

            commit('setFeaturedProducts', response.data); 
        },
        async setProducts({ commit, state }, page = 0) {
            const response = await productApi.getProducts(page, state.priceRange); 

            commit('setProducts', response.data.products);
            commit('setTotalProducts', response.data.total);
            commit('setPage', page);
        },
        async setPriceRange({ commit, dispatch }, priceRange) { // 상태값만 변경.
            commit('setPriceRange', priceRange); // 상태값만 변경.

            dispatch('setProducts'); // 기존 api 를 호출하던 setProducts action 을 호출
        },
    },
}
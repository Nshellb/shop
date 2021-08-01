import productApi from '@/api/product';

export default {
    namespaced: true,
    state: {
        bestProducts: [],
        featuredProducts: [],
    },
    mutations: {
        setBestProducts(state, products) {
            state.bestProducts = [].concat(products); // 3. state에 저장하도록 만들어준다.
        },
        setFeaturedProducts(state, products) {
            state.featuredProducts = [].concat(products);
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
    },
}
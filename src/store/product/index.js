import productApi from '@/api/product';

export default {
    namespaced: true,
    state: {
        bestProducts: []
    },
    mutations: {
        setBestProducts(state, products) {
            state.bestProducts = [].concat(products); // 3. state에 저장하도록 만들어준다.
        },
    },
    actions: {
        async setBestProducts({ commit }) {
            const response = await productApi.getBestProducts(); // 1. getBestProducts를 api 에서 가져와서 

            commit('setBestProducts', response.data); // 2. mutation을 호출하고 
        },
    },
}
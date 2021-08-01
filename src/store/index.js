import Vue from 'vue';
import Vuex from 'vuex';

import banner from './banner/index';
import product from './product/index';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    banner,
    product, 
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
 
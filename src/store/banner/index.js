import bannerApi from '@/api/banner';

export default {
    namespaced: true,
    state: {
        mainBanners: [] // SlideBanner Component를 저장하는 배열
    },
    mutations: {
        SetMainBanners(state, banners) { // 값을 추가하는 mutaions 선언
            state.mainBanners = [].concat(banners);
        }
    },
    actions: {
        async SetMainBanners({ commit }) {
            const response = await bannerApi.getMainSlideBanners(); // banner api 의 getMainSlideBanners를 통해 data를 가져오고
            // await 는 async 함수 내에서만 사용할 수 있는 코드인데 async 함수를 호출한뒤 실행한 결과를 return하는 함수이다.

            commit('setMainBanners', response.data); // setMainBanners mutation을 호출해서 값을 설정하는 코드를 추가한다.
        }
    },
}
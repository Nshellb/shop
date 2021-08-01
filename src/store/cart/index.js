export default {
    namespaced: true,
    state: {
        items: [], // 장바구니에 담은 상품들이 저장될 배열.
    },
    getters: {
        totalPrice(state) { // 장바구니에 들어있는 상품들의 총 금액을 return 할 getter
            return state.items.reduce((sum, item) => sum + item.price, 0); // reduce: 배열 항목들을 가지고 어떤 값을 만들때 사용.
            // sum 에는 이전에 실행한 잉여 함수의 결과, item 에는 배열의 각 항목을 넘겨주고 마지막으로 잉여함수의 결과를 return.
            // reduce의 두 번째 parameter인 0은 처음 연산시 sum의 초기값이 된다.
        }
    },
    mutations: {
        addItem(state, item) {
            state.items.push({ // items 에 저장.
                ...item
            });
        },
    },
    actions: {
        addItem({ commit }, item) { // 선택한 item을 저장.
            commit('addItem', item);
        }
    }
}
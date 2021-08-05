export default {
    namespaced: true,
    state: {
        items: [], // 장바구니에 담은 상품들이 저장될 배열.
    },
    getters: {
        totalPrice(state) { // 장바구니에 들어있는 상품들의 총 금액을 return 할 getter
            return state.items.reduce((sum, item) => sum + item.price * item.qty, 0); // reduce: 배열 항목들을 가지고 어떤 값을 만들때 사용.
            // sum 에는 이전에 실행한 잉여 함수의 결과, item 에는 배열의 각 항목을 넘겨주고 마지막으로 잉여함수의 결과를 return.
            // reduce의 두 번째 parameter인 0은 처음 연산시 sum의 초기값이 된다.
        },
        totalQty(state) {
            return state.items.reduce((sum, item) => sum + item.qty, 0);
        },
    },
    mutations: {
        addItem(state, item) { // items 에 저장.
            const cartItems = state.items.filter(cartItem => cartItem.id === item.id); // items 에서 장바구니에 추가할 상품과 같은 id 가 있는지 확인한뒤

            if (cartItems.length === 0) { // 같은 id 의 상품을 추가하지 않는다면 
                state.items.push({ // 장바구니에 추가
                    ...item,
                    qty: 1, // 수량을 1로
                });
            } else { // 같은 id 의 상품을 추가하는 경우 
                cartItems[0].qty ++; // 수량을 1 늘려준다.
            }
        },
        delItem(state, id) { // id 값에 해당하는 항목 삭제
            state.items = state.items.filter(item => item.id !== id);
        },
        changeQty(state, {id, qty}) { // 1) id 와 qty 를 입력 받아서
            const cartItem = state.items.filter(cartItem => cartItem.id === id);
      
            if (cartItem.length !== 0) {
                if (cartItem[0].qty + qty <= 0) { // 3) 장바구니의 상품이 0 이하가 되면 장바구니에서 상품을 삭제.
                    const index = state.items.findIndex(cartItem => cartItem.id === id);
        
                    state.items.splice(index, 1);
                } else {
                    cartItem[0].qty += qty; // 2) 해당상품의 qty 를 증가시키거나 
                }
            }
        },
        clearCart(state) {
            state.items = [];
        }
    },
    actions: {
        addItem({ commit }, item) { // 선택한 item을 저장.
            commit('addItem', item);
        },
        delItem({ commit }, id) { // id 값에 해당하는 항목 삭제
            commit('delItem', id);
        },
        increaseQty({ commit }, id) {
            commit('changeQty', {
                id, 
                qty: 1, // qty 증가
            })
        },
        decreaseQty({ commit }, id) {
            commit('changeQty', {
                id, 
                qty: -1, // qty 감소
            })
        },
        clearCart({ commit }) {
            commit('clearCart');
        }
    }
}
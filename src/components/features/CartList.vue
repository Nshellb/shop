<template>
    <div class="container-table-cart pos-relative">
        <div class="wrap-table-shopping-cart bgwhite">
            <table class="table-shopping-cart">
                <tr class="table-head">
                    <th class="column-1"></th>
                    <th class="column-2">Product</th>
                    <th class="column-3">Price</th>
                    <th class="column-4 p-l-70">Quantity</th>
                    <th class="column-5">Total</th>
                </tr>

                <!-- 상품 출력 -->
                <template v-for="item in cartItems">
                    <tr class="table-row">
                        <td class="column-1">
                            <!-- 상품 이미지 클릭시 delItem으로 상품을 장바구니에서 삭제 (클릭한 상품의 id 값을 넘겨줌.) -->
                            <div class="cart-img-product b-rad-4 o-f-hidden" @click="delItem(item.id)">
                                <img :src="item.image" alt="IMG-PRODUCT">
                            </div>
                        </td>
                        <td class="column-2">{{ item.title }}</td>
                        <td class="column-3">${{ item.price }}</td>
                        <td class="column-4">
                            <div class="flex-w bo5 of-hidden w-size17">
                                <!-- 상품의 '-' 버튼 클릭시 장바구니 상품의 갯수를 '-' 한다. -->
                                <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" @click="decrease(item.id)">
                                <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                                </button>

                                <input class="size8 m-text18 t-center num-product" type="number" name="num-product1" :value="item.qty">

                                <!-- 상품의 '+' 버튼 클릭시 장바구니 상품의 갯수를 '+' 한다. -->
                                <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" @click="increase(item.id)">
                                <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </td>
                        <td class="column-5">${{ item.price }}</td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('cart', { // 상품을 가져옴.
            cartItems: state => state.items
        })
    },
    methods: {
        delItem(id) { // 받아온 id 값으로 cart/index,js 의 delItem 수행.
            this.$store.dispatch('cart/delItem', id);
        },
        increase(id) { // increaseQty 호출
            this.$store.dispatch('cart/increaseQty', id);
        },
        decrease(id) { // decreaseQty 호출
            this.$store.dispatch('cart/decreaseQty', id);
        },
    },
}
</script>
<template>
    <section class="newproduct bgwhite p-t-45 p-b-105">
        <div class="container">
            <div class="sec-title p-b-60">
                <h3 class="m-text5 t-center">
                    Featured Products
                </h3>
            </div>

            <!-- Slide2 -->
            <div class="wrap-slick2">
                <div class="slick2" ref="slick">
                    <template v-for="product in products">
                        <div class="item-slick2 p-l-15 p-r-15">
                            <!-- Block2 -->
                            <div class="block2">
                                <!-- badge 값에 따른 각기 다른 label 추가 -->
                                <div class="block2-img wrap-pic-w of-hidden pos-relative" :class="{'block2-labelnew': product.badge === 'new', 'block2-labelsale': product.badge === 'sale'}">
                                    <img :src="product.image" alt="IMG-PRODUCT">

                                    <div class="block2-overlay trans-0-4">
                                        <a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">
                                            <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                            <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                        </a>

                                        <div class="block2-btn-addcart w-size1 trans-0-4">
                                            <!-- Button -->
                                            <button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" @click="addToCart(product)">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="block2-txt p-t-20">
                                    <router-link to="/" class="block2-name dis-block s-text3 p-b-5">
                                        {{ product.title }}
                                    </router-link>

                                    <span class="block2-price m-text6 p-r-5">
                                        ${{ product.price }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('product', {
            products: state => state.featuredProducts // featuredProducts 값을 vuex 에서 가져와서 products 배열로 사용
        }),
    },
    methods: {
        addToCart(product){
            this.$store.dispatch('cart/addItem', product);
        }
    },
    created() {
        this.$store.dispatch('product/setFeaturedProducts').then(() => {
            $(this.$refs.slick).slick2();
        });
    },
}
</script>

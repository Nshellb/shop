<template>
    <section class="slide1">
        <div class="wrap-slick1">
            <div class="slick1" ref="slick">
                <template v-for="banner in banners">
                    <div class="item-slick1 item1-slick1" :style="`background-image: url(${banner.image});`">
                        <div class="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                            <span class="caption1-slide1 m-text1 t-center animated visible-false m-b-15" data-appear="fadeInDown">
                                {{ banner.subtitle }}
                            </span>

                            <h2 class="caption2-slide1 xl-text1 t-center animated visible-false m-b-37" data-appear="fadeInUp">
                                {{ banner.title }}
                            </h2>

                            <div class="wrap-btn-slide1 w-size1 animated visible-false" data-appear="zoomIn">
                                <!-- Button -->
                                <a href="product.html" class="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState('banner', { // mapState의 첫 번째 parameter를 string으로 주고 
            banners: state => state.mainBanners // 두 번째 parameter에는 가져올 규칙을 넣는다. / banners를 vuex 에서 가져옴.
        })
    },
    created() {
        this.$store.dispatch('banner/setMainBanners').then(() => { // banner 모듈의 setMainBanners 라는 action 을 dispatch 하도록 만들어 준다.
            $(this.$refs.slick).slick1(); // 여기의 dispatch 는 Promise 객체를 return 하기 때문에 then 을 붙여서 slick 을 적용해준다.
        });
    },
}
</script>

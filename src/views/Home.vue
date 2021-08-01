<template>
  <div class="home">
    <SlideBanner />
    <BestProductList />
    <FeaturedProductList />
  </div>
</template>

<script>
import SlideBanner from '@/components/home/SlideBanner.vue';
import BestProductList from '@/components/home/BestProductList.vue';
import FeaturedProductList from '@/components/home/FeaturedProductList.vue'

export default {
  name: 'Home',
  components: {
    SlideBanner,
    BestProductList,
    FeaturedProductList,
  }
}
</script>
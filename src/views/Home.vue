<template>
  <div class="home">
    <SlideBanner />
    <BestProductList />
  </div>
</template>

<script>
import SlideBanner from '@/components/home/SlideBanner.vue';
import BestProductList from '@/components/home/BestProductList.vue';

export default {
  name: 'Home',
  components: {
    SlideBanner,
    BestProductList, 
  }
}
</script>
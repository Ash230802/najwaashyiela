<template>
  <div>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="../assets/homepage1.jpg" alt="Advertiser-1">
            </div>
            <div class="col-md-6">
                <img src="../assets/homepage2.jpg" alt="Advertiser-2">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h2>TOP SELLER</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <Carousel />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Carousel from './carousel/carousel.vue'

export default {
  name: 'Homepage',
  components: {
    Carousel
  },
};
</script>

<style scoped>
    h2 {
        text-align: center;
        margin-top: 1rem;
    }
    @media (max-width: 576px), (max-width: 1000px) and (orientation: landscape) {
    img {
        width: calc(100% - 0.1rem);
        height: auto;
        }
    }

</style>

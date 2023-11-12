<template>
    <!--
        data-bs-ride => automatic cycling (sliding)
        class="carousel-inner" => applied to the container that holds the carousel slides
    -->
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
        <!--
            Using array to combine the dynamic class (active) and static class (carousel-item)
            carousel-item => row parent
            Example: div class=container -> div class=row -> div class=col-4
        -->
        <!--
          Outer v-for: responsible for creating individual slides
                        (Carousel)
          Inner v-for: responsible for creating individual items within
                        each frame of the carousel.
        -->
      <div
        v-for="(group, groupIndex) in groupedCarouselItems"
        :key="groupIndex"
        :class="['carousel-item', { active: groupIndex === currentGroup }]"
      >
        <div class="row">
          <div
            v-for="(item, index) in group"
            :key="index"
            class="col-4"
          >
            <div class="carousel-item-content">
                <router-link :to="{ name: 'product', params: { productId: item.productId } }">
                  <img :src="item.imagePath" :alt="item.name" class="d-block w-100"  />
                </router-link>
                <div class="carousel-caption">
                    <h5>{{ item.name }}</h5>
                    <p class="product-price">{{ $formattedCurrencyAUD(item.price) }}</p>
                    <div class="wishlist-icon">
                        <img 
                            src="../../assets/loveicon.png" 
                            alt="Wishlist Icon" 
                            @click="addToWishlist(item)">
                    </div>
                </div>
            </div>
            <div v-if="item.showWishlistMessage" class="wishlist-message">
                The product has been added to your wishlist
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--
        data-bs-slide => same as @click
    -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import CarouselItems from '../product-details/product-data.vue';
import '../product-details/product-layout.css';
import { toggleWishlistMessage } from '../product-details/wishlist.js';
import { mapMutations } from 'vuex';

export default {
  name: "Carousel",
  data() {
    return {
      CarouselItems,
      currentGroup: 0,
    };
  },
  computed: {
    // Group the carousel items into groups of 3
    groupedCarouselItems() {
      const groupSize = 3;
      const grouped = [];
      //display only the first 4 elements in the carouselItems
      const CarouselElements = this.CarouselItems.slice(0, 4);
      //Create a new array using slice and push it to the new array called grouped
      for (let i = 0; i < CarouselElements.length; i += groupSize) {
        grouped.push( CarouselElements.slice(i, i + groupSize));
      }
      return grouped;
    },
  },
  methods: {
    ...mapMutations(['ADD_TO_WISHLIST']),

        addToWishlist(product) {
          this.ADD_TO_WISHLIST({
            productId: product.productId,
            salesPrice: product.salesPrice,
            price: product.price,
          }),
          toggleWishlistMessage(product);
        },
  }
};
</script>

<style scoped>
.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
    background-color: rgba(0, 0, 0, 0.5);
}
.carousel-control-next, .carousel-control-prev {
    width: 2rem;
    height: 2rem;
    top: 50%;
}
.carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.3);
    color: #000000; 
    padding: 1rem;
    text-align: left;
}
@media (max-width: 576px), (max-width: 1000px) and (orientation: landscape) {
    .carousel-caption h5 {
      font-size: 0.8rem;
      margin-bottom: 0;
    }
    .carousel-caption {
      top: 4.5rem;
    }
    .wishlist-icon {
      top: 2rem;
    }
}
/*Galaxy fold & Iphone 5/SE*/
@media (max-width: 320px) {
    .carousel-caption h5 {
      font-size: 0.7rem;
    }
    .carousel-caption {
      top: 3rem;
      padding-top: 0.5rem;
      padding-left: 0.3rem;
    }
    .wishlist-icon {
      top: 1.5rem;
    }
}
</style>
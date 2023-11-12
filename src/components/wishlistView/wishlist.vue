<template>
    <div v-html="pageTitle"></div>
    <div class="container">
        <div class="row">
            <div 
                v-for="item in wishlistItems" 
                :key="item.productId" 
                class="col-12 wishlist-item"
            >
                <button @click="removeItem(item.productId)" class="remove-button">
                    <font-awesome-icon :icon="['fas', 'times']" class="fa-2x icon-remove" />
                </button>
                <div class="row">
                    <div class="col-6 product-image">
                        <img :src="item.imagePath" :alt="item.name" />
                    </div>
                    <div class="col-6 product-info">
                        <h4>{{ item.name }}</h4>
                        <div class="product-price">
                            <sales-price
                                v-if="item.salesPrice" 
                                :price="$formattedCurrencyAUD(item.price)" 
                                :salesPrice="$formattedCurrencyAUD(item.salesPrice)" 
                                :applyFontFamily="false"
                            ></sales-price>
                            <p v-else class="normal-price"> {{ $formattedCurrencyAUD(item.price) }}</p>
                        </div>
                    <div class="col-12 actions-button-options">
                        <router-link :to="{ name: 'product', params: { productId: item.productId } }" >
                            <button class="select-options-button">SELECT OPTIONS</button>
                        </router-link>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 no-product" v-if="wishlistItems.length === 0">
                    <p>No product found in  the wishlist</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { computed, defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
import SalesPrice from '../details/sales-price.vue'

export default defineComponent({
    components: {
        SalesPrice,
    },
    setup() {
        const store = useStore();

        const wishlistItems = computed(() => {
            return store.state.wishlist || [];
        });

        const removeItem = (productId) => {
            //dispatch called the action in the store object
            store.dispatch('removeItemFromWishlist', productId);
        };

        const pageTitle = ref('');
        
        //getCurrentInstance() is used in Vue 3 to access the component's instance 
        const instance = getCurrentInstance();

        //using onMounted() to set the page-title after the component has been mounted to DOM
        onMounted(() => {
            pageTitle.value = instance.appContext.config.globalProperties.$setPageTitle('wishlist');

        });
        return {
            wishlistItems,
            removeItem,
            pageTitle
        }
    },
})
</script>

<style scoped>
.wishlist-item {
  margin: 1rem auto;
  padding: 1rem; /*create some space between the items and the border */
  background-color: #EBDEBA;
  width: 40rem;
}
.product-image {
    padding: 2rem;
}
img {
    width: 7rem;
    height: auto;
  }
.remove-button {
    background-color: transparent;
    border: none;
    position: absolute;
}
.product-info {
    padding: 4rem;
    text-align: center;
}
.no-product {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1rem;
}
.product-price .normal-price {
    margin-bottom: 0;
}
.select-options-button {
    position: relative;
    right: 0;
    padding: 5px 20px;
    margin-top: 0.5rem; 
    font-weight: bold;
    background-color: #F8F0E5;
    border: 2px solid #000;
}
.actions-button-options button:hover{
    background-color: #000;
    color: #fff;
}
@media (max-width: 576px) {
    .product-info {
        padding: 3rem 0 1rem 0rem;
    }
    .product-info h4 {
        font-size: 1rem;
        white-space: nowrap; /*forces the wrap to remain on a single line */
    }
    .select-options-button {
        font-size: 0.5rem;
        margin-left: 1rem;
    }
}
</style>


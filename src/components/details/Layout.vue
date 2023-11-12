<template>
    <div class="col-4">
        <div class="product-item-content">
            <router-link :to="{ name: 'product', params: { productId: product.productId } }">
                <img :src="product.imagePath" :alt="product.name" class="d-block w-100"  />
            </router-link>
                <div class="product-caption">
                    <h5>{{ product.name }}</h5>
                    <p v-if="isSaleProduct" class="product-price">
                        <sales-price 
                            :price="$formattedCurrencyAUD(product.price)" 
                            :salesPrice="$formattedCurrencyAUD(product.salesPrice)" 
                            :adjustFontSize="false"
                        ></sales-price>
                    </p>
                    <p v-else class="product-price">
                        {{ $formattedCurrencyAUD(product.price) }}
                    </p>
                    <div class="wishlist-icon" :class="{ 'wishlist-icon-search' : wishlistInSearch }">
                        <img
                            src="../../assets/loveicon.png" 
                            alt="Wishlist Icon" 
                            @click="addToWishlist(product)">
                    </div>
                </div>
                <div v-if="product.showWishlistMessage" class="wishlist-message">
                    The product has been added to your wishlist
                </div>
        </div>
    </div>
</template>

<script>
import '../product-details/product-layout.css';
import { toggleWishlistMessage } from '../product-details/wishlist.js';
import SalesPrice from './sales-price.vue';
import { mapMutations } from 'vuex';
import store from '../../store';

export default{
    props: {
        product: Object,
        wishlistInSearch: Boolean,
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
    },
    components: {
        SalesPrice,
    },
    computed: {
        isSaleProduct() {
            //!! indicates salesPrice = true or false; not returning the salesPrice
            return !!this.product.salesPrice;
        },
    },
}
</script>

<style scoped>

.col-4 {
    margin-top: 1rem;
}

</style>

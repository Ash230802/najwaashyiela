<template>
  <div>
    <div class="product-details" v-if="product">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="product-image">
                        <img :src="product.imagePath" :alt="product.name" />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="product-info">
                        <h2>{{ product.name }}</h2>
                        <p class="product-price">
                            <span v-if="isSaleProduct">
                                <!--passing the salesPrice and the price to the sales-price-->
                                <sales-price 
                                    :price="$formattedCurrencyAUD(product.price)" 
                                    :salesPrice="$formattedCurrencyAUD(product.salesPrice)" 
                                    :applyFontFamily="true" 
                                ></sales-price>
                            </span>
                            <span v-else>
                                {{ $formattedCurrencyAUD(product.price) }}
                            </span>
                        </p>
                        <div class="size-buttons">
                            <p class="select-size">Select size:</p>
                            <button
                            v-for="(size, index) in sizes"
                            :key="index"
                            @click="selectSize(size)"
                            :class="{ 'selected': selectedSize === size}"
                            >
                            {{ size }}
                            </button>
                        </div>
                        <div class="quantity">
                            <p class="quantity-label">Quantity:</p>
                            <div class="quantity-controls">
                                <button @click="decrementQuantity" class="quantity-button">-</button>
                                <span  class="quantity-value">{{ quantity }}</span>
                                <button @click="incrementQuantity" class="quantity-button">+</button>
                            </div>
                        </div>
                        <div class="action-buttons">
                            <button @click="addToCart(product.productId)" class="cart-button">ADD TO CART</button>
                            <!--<button @click="buyNow(product.productId)" class="purchase-button">BUY NOW</button>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showSuccessfulMessage" class="success-message">
                {{ successMessage }}      
        </div>
        <div v-if="showErrorMessage" class="error-message">
            {{ sizeMessage }}
        </div>
    </div>
  </div>
</template>

<script>
import ProductData from './product-data.vue';
import SalesPrice from '../details/sales-price.vue';
//mapMutations helps to map Vuex mutations to the methods in Vue components
import { mapMutations } from 'vuex';

export default {
  props: {
    productId: String, // The productId passed from Layout.vue
  },
  data() {
    return {
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      selectedSize: null,
      quantity: 1,
      showErrorMessage: false,
      showSuccessfulMessage: false,
    };
  },
  computed: {
    // Use find() to find for an element in ProductData matches the productId provided by the this.productId
    product() {
        const matchProduct = ProductData.find(product => product.productId === this.productId);
        return matchProduct;
    },
    isSaleProduct() {
        //!! indicates salesPrice = true or false; not returning the salesPrice
        return !!this.product.salesPrice;
    },
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size;
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    //use mapMutations to map the ADD_TO_CART mutation 
    //tells Vue to create a component method called ADD_TO_CART 
    //that is mapped to the 'ADD_TO_CART' mutation
    //ADD_TO_CART is a string inside an array 
    ...mapMutations(['ADD_TO_CART']),

    addItemToCart(productId) {
        //check if the size is selected
        if (!this.selectedSize) {
            this.sizeMessage = "Please choose a size";
            this.showErrorMessage = true;      
        }
        else {
            this.successMessage = "Product added to cart";
            this.showSuccessfulMessage = true;

            const salesPrice = this.product.salesPrice;
            const price = this.product.price;
            
            //call the ADD_TO_CART method created by mapMutations
            this.ADD_TO_CART({ 
                productId, 
                quantity: this.quantity, 
                size: this.selectedSize, 
                salesPrice: salesPrice,
                price,
                });
        }
        //This is set different from the wishlist.js considering it will has 
        //to show 2 different messages and set a timing for both messages
        setTimeout(() => {
            this.showSuccessfulMessage =  false;
            this.showErrorMessage = false;
        }, 3000);
    },
    addToCart(productId) {
        this.addItemToCart(productId);
    },
    buyNow(productId) {
        this.addItemToCart(productId);

        //redirect to the cart page 
        //use the useRouter() to access the router instance created in the main app
        const router = useRouter();
        router.push('/cart');
    }
  },
  components: {
    SalesPrice,
  },
};
</script>

<style scoped>
* {
    font-family: 'Roboto', sans-serif;
}
.product-info {
    display: flex;
    flex-direction: column;
    justify-content: center; /*handles main-axis*/
    align-items: center; /*handles cross-axis */
    margin-top: 5rem;
}
.product-info h2 {
    font-size: 2.8rem;
    font-weight: 400;
    margin-top: 4rem;
    margin-right: 12rem;
}
.product-info .product-price {
    font-size: 1.7rem;
    margin-right: 23rem; /*adjust the price to be on the left side */
}
.product-image {
    margin: 2rem 0; /*space top-bottom for the image */
}
img {
    width: 25rem;
    height: auto;
    margin-left: 5rem;
}
.select-size {
    margin-right: 25rem;
}
.size-buttons button {
    border: 1px solid #A8A196;
    color: #63666A;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin: 5px; /*space between each button*/
    cursor: pointer;
}
.size-buttons button:hover {
    border: 1px solid #000;
}
.size-buttons button.selected {
    color: #000;
    border: 1px solid #000;
}
.quantity-label {
    margin-right: 25rem;
}

.quantity-controls {
    display: flex;
    align-items: center; /*center it across cross axis  */
}
.quantity-button {
  padding: 5px 15px;
  border: 1px solid #63666A;
  cursor: pointer;
  background-color: transparent;
  line-height: 1.45;
}
.quantity-value {
    width: 2.5rem;
    padding: 2px 15px;
    border: 1px solid #63666A;
    line-height: 1.83;
    border-left: none;
    border-right: none;
    text-align: center;
}
.quantity {
    margin-bottom: 1rem; /*adjust space between the quantity and the action-buttons */
}
.action-buttons {
    display: flex;
    flex-direction: column;
}
.cart-button,
.purchase-button {
  padding: 5px 20px; 
  width: 20rem;  /*width of the buttons */
  margin: 5px;  /*adjust the space between the buttons */
  font-weight: bold;
  background-color: #F8F0E5;
  border: 2px solid #000;
  }
.action-buttons button:hover{
    background-color: #000;
    color: #fff;
}
.success-message, .error-message {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    padding: 1rem;
    z-index: 10000000;
}
.success-message {
    background-color: #1A5D1A;
}
.error-message {
    background-color: #BB2525;
}
/*special case for Galaxy Fold */
@media (max-width: 320px) {
    .cart-button,
    .purchase-button {
        width: 15rem; /*adjust the button to not be over the border */
    }
}
@media (max-width: 576px), (max-width: 1000px) and (orientation: landscape) {
    .product-image {
        margin-top: 4rem;
        margin-bottom: 0;
        text-align: center; /*helps center the image  */
    }
    img {
        width: 15rem;
        height: auto;
        margin-left: auto; /*center the image horizontally */
        margin-right: auto; /*center the image horizontally */
           
        }
    
    .product-info {
        margin: 1rem auto;
        text-align: center; /* Center the text */
    }
    .product-info h2 {
        font-size: 2rem;
        margin: 1rem;
    }
    .product-info .product-price {
        margin-right: 2rem; /*adjust the price to be on the left side */
    }
    .select-size, .quantity-label {
        margin-right: 2rem;
        font-size: 1rem;
    }
    .size-buttons .select-size {
        margin-bottom: 0.5rem; /*adjust the space between the buttons and the .select-size */
    }
    .size-buttons button {
        margin-top: 0; /*adjust the space between the buttons and the .select-size */
    }
    .quantity-label {
        margin-bottom: 0.5rem; /*adjust the space between the quantity label adn the buttons*/
    }
}
@media (max-width: 1000px) and (orientation: landscape) {
    .product-info {
        margin-top: 3rem;
    }
}
</style>
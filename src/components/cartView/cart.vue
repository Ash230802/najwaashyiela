<template>
  <!--v-html tells Vue that pageTitle will return html markup-->
  <div v-html="pageTitle"></div>
  <div class="container">
    <div class="row">
      <!--v-for somehow change the layout of the product-image and product-info to be in the same column-->
      <div v-for="item in cartItems" :key="item.productId" class="col-12">
        <button @click="removeItem(item.productId)" class="remove-button">
          <font-awesome-icon :icon="['fas', 'times']" class="fa-2x icon-remove" />
        </button>
        <!--add another row to make sure that the product-image is in the same row with the product-info--->
        <div class="row">
          <div class="col-6 productCart-image">
            <img :src="item.imagePath" :alt="item.name" />
          </div>
          <div class="col-6 productCart-info">
            <h4>{{ item.name }}</h4>
            <p class="product-quantity">Quantity: {{ item.quantity }}</p>
            <!--since the user might choose same products with different sizes, an array sizes is created to store the size-->
            <p v-for="(size, index) in item.sizes" :key="index" class="product-size">Size: {{ size }}</p>
            <div>
              <sales-price 
                v-if="item.salesPrice" 
                :price="$formattedCurrencyAUD(item.price)" 
                :salesPrice="$formattedCurrencyAUD(item.salesPrice)" 
                :applyFontFamily="false"
              ></sales-price>
              <p v-else> {{ $formattedCurrencyAUD(item.price) }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--checks if the cart array in the store state is empty or not-->
      <div class="row" v-if="cartItems.length>0">
        <div class="col-12">
          <div class="total-price">
            <h4>Total price: </h4>
            <h6>{{ $formattedCurrencyAUD(totalPrice) }}</h6>
          </div>
        </div>
        <div class="col-12 actions-button-cart">
          <button class="checkout-button" @click="checkout">CHECK OUT</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 no-product" v-if="cartItems.length === 0">
          <p>No product found in the cart</p>
        </div>
      </div>
      <div v-if="message" :style="{ color: message === 'Your order has been placed. Thank you!' ? '#1A5D1A' : '#BB2525'}" class="showMessage">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
//using Composition API 
import { computed, defineComponent, onMounted, ref, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { mapGetters } from 'vuex'
import SalesPrice from '../details/sales-price.vue'
import { toggleMessageTiming } from '../../utils/message-timing'

export default defineComponent({
  components: {
    SalesPrice,
  },
  setup() {
    const message = ref('');
    const store = useStore();

    const cartItems = computed(() => {
      //nullish coalescing 
      //if store.state.cart is null, empty, it will return empty array []
      //either way it will return an array.
      return store.state.cart || [];
    });

     const totalPrice = computed(() => {
      return store.getters.totalPrice;
    });

    //a method to remove the item from the cart 
    const removeItem = (productId) => {
      //dispatch called the action in the store object
      store.dispatch('removeItemFromCart', productId);
    };

    
    //ref is to create reactive variables
    // In this case, we need to update the page title given the value cart to the property define in the page-title.js
    const pageTitle = ref('');
    
    //getCurrentInstance() is used in Vue 3 to access the component's instance 
    const instance = getCurrentInstance();

    //using onMounted() to set the page-title after the component has been mounted to DOM
    onMounted(() => {
      
      //instance.appContext.config.globalProperties.$setPageTitle('cart') a way of calling the global function in Vue 3
      // appContext => An object represents the Vue application's context like properties, components etc. in the application
      // config => A property that holds the application configuration where inside it, it has the globalProperties 
      pageTitle.value = instance.appContext.config.globalProperties.$setPageTitle('cart');

    });

    const checkout = () => {
      //check if the user has log in
      //if not, display the message, you've not log in
      //else, your order has been placed
      if (store.state.isLoggedIn) {
        //User has logged in, show a message
        message.value = "Your order has been placed. Thank you!";
        //empty the cart
        store.commit('RESET_CART');
      }else {
        message.value = "You have not logged in yet. Please log in before making a purchase";
      }
      toggleMessageTiming(message);
    };

    return {
      cartItems,
      checkout,
      totalPrice,
      removeItem,
      pageTitle,
      message
    };
  },
});
</script>

<style scoped>
.container {
    background-color: #EBDEBA;
    margin: 2rem auto;
    width: 40rem;
  }
  img {
    width: 7rem;
    height: auto;
  }
  .productCart-image {
    padding: 2rem;
  }
  .productCart-info {
    padding: 3rem;
  }
  .product-quantity, .product-size {
    margin: 0;
  }
  .total-price {
    text-align: center;
  }
  .no-product {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .remove-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .icon-remove {
    position: absolute;
  }
  .actions-button-cart {
    margin: 0 8rem 1rem 8rem;
  }
  .checkout-button {
    padding: 5px 20px; 
    width: 20rem;  /*width of the buttons */
    margin: 5px;  /*adjust the space between the buttons */
    font-weight: bold;
    background-color: #F8F0E5;
    border: 2px solid #000;
  }
  .actions-button-cart button:hover{
    background-color: #000;
    color: #fff;
  }
  .showMessage {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }
  @media (max-width: 576px), (max-width: 1000px) and (orientation: landscape) { 
    .container {
      width: 20rem;
    }
    .actions-button-cart {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    .checkout-button {
      width: 15rem;
    }
  }
  /*special case for Galaxy Fold */
  @media (max-width: 320px) { 
    .container {
      width: 15rem;
    }
    .checkout-button {
      width: 10rem;
    }
  }
</style>


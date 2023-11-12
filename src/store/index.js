//Stores the product chosen from the user via wishlist and cart
import { createStore } from 'vuex'
import ProductData from '../components/product-details/product-data.vue'

const store = createStore({
    //stores the product chosen from the user 
    state: {
        cart: [],
        wishlist: [],
        isLoggedIn: false,
    },
    //add and remove the products from the Vuex store
    mutations: {
        //adding a product to the cart
        //state => represents current state 
        ADD_ITEM(state, { targetArray, productId, quantity, size, salesPrice, price }) {
            const product = ProductData.find(item => item.productId === productId);
      
            if (product) {
              const productExist = targetArray.find(item => item.productId === productId);
      
              if (productExist) {
                if (!productExist.sizes.includes(size)) {
                  productExist.sizes.push(size);
                }
                productExist.quantity += quantity;
                productExist.salesPrice = salesPrice;
                productExist.price = price;
              } else {
                targetArray.push({
                  ...product,
                  quantity: 1,
                  sizes: [size],
                  salesPrice: salesPrice,
                  price: price,
                });
              }
            }
        },          
        REMOVE_ITEM(state, { targetArray, productId }) {
            //find the productId matches the productId in the cart 
            //findIndex() returns the index of the product in the cart
            //findIndex() returns -1 if it doesnt found any match
            const index = targetArray.findIndex(item => item.productId === productId);

            if(index !== -1) {
                //if product is found, remove it from the cart 
                // splice removes the product from the cart 
                // 1 represents the number of elements to remove from the index
                targetArray.splice(index, 1);
            }
        },

          //when definiing mutations in vuex, they have access to the commit function as
          //the first argument by default.
          //need to use this keyword to call other mutations 
          //different mutation use the same commit method provided by the store instance 
          //this keyword refers to the store instance that provides access to the
          //store's properties and methods including 'commit'
        ADD_TO_CART(state, { productId, quantity, size, salesPrice, price }) {
            this.commit('ADD_ITEM', {
              targetArray: state.cart,
              productId,
              quantity,
              size,
              salesPrice,
              price,
            });
        },
        REMOVE_FROM_CART(state, productId) {
            this.commit('REMOVE_ITEM', {
                targetArray: state.cart,
                productId,
            });

        },
        ADD_TO_WISHLIST(state, { productId, salesPrice, price }) {
            this.commit('ADD_ITEM', {
                targetArray: state.wishlist,
                productId,
                salesPrice,
                price,
            });

        },
        REMOVE_FROM_WISHLIST(state, productId) {
            this.commit('REMOVE_ITEM', {
                targetArray: state.wishlist,
                productId,

            });
        },
        SET_LOGIN_STATUS(state, status) {
            state.isLoggedIn = status;
        },
        //set the cart to empty once the user has click the checkout button
        // in cart.vue
        RESET_CART(state) {
            state.cart = [];
        }
    },
    actions: {
        //action to remove an item from the cart
        //commit is use to trigger mutations
        //call commit when you want to modify the state 
        removeItemFromCart({ commit, state }, productId) {

            commit('REMOVE_FROM_CART', productId);
        },
        removeItemFromWishlist({ commit, state }, productId) {
            
            commit('REMOVE_FROM_WISHLIST', productId);
        },
    },
    getters: {
        //totalPrice is the name of the getters 
        totalPrice: (state) => {
            //reduce() iterate through the array and accumulate the total value
            //reduce() takes 2 arguments; callback function and 0 as initial accumulator(total)
            //callback function use to calculate the total price of items in the cart
            //reduce() often return a single value
           return state.cart.reduce((total, product) => {
                const productPrice = product.salesPrice ? product.salesPrice : product.price;
                return total + productPrice * product.quantity;
           }, 0);
        },
    },
      
});
export default store;
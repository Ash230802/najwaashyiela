import App from './App.vue'
import AboutUs from './components/author/aboutUs.vue'
import AuthLayout from './components/auth/auth-layout.vue'
import 'bootstrap/dist/css/bootstrap.css'
import Cart from './components/cartView/cart.vue'
import Clothing from './components/details/ClothingPage.vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas, faCloud } from '@fortawesome/free-solid-svg-icons'
import { formattedCurrencyAUD } from './utils/currency.js'
import Homepage from './components/homepage.vue'
import Latest from './components/details/LatestPage.vue'
import Login from './components/auth/login.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import ProductPage from './components/product-details/product-page.vue'
import Sales from './components/details/SalesPage.vue'
import { setPageTitle } from './utils/page-title.vue'
import SignUp from './components/auth/signup.vue'
import store from './store'
import scrollToTopDirective from './utils/scrollToTopDirective'
import Wishlist from './components/wishlistView/wishlist.vue'
import Weather from './utils/weather.vue'

//Create the router instance
const router = createRouter({
    //mode determines the type of routing mode to be used
    //cleaner URLs
    history: createWebHistory(),
    routes: [
      { 
        path: "/", 
        component: Homepage 
      },
      { 
        path: "/sales", 
        component: Sales
      },
      {
        path: "/latest",
        component: Latest
      },
      {
        path: "/clothing",
        component: Clothing
      },
      {
        //dynamic routes 
        //props in this case use to passed the dynamic productId 
        //to the product-page.vue
        path: '/product/:productId',
        name: 'product',
        component: ProductPage,
        props: true,
      },
      {
        path: '/aboutUs',
        component: AboutUs
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/wishlist',
        component: Wishlist
      },
      {
        path: '/authLayout',
        component: AuthLayout, 
        children: [
          {
            path: '',
            component: Login, // Default child route
          },
          {
            path: 'signup',
            component: SignUp,
          },
        ]
      },
    ]
  
  });

  export { router };

const app = createApp(App);

//adds the set of solid icons fas to the font awesome library
//makes the icons available to use in the components.
library.add(fas, faCloud);
//Make the formattedCurrencyAUD computed property available globally
app.config.globalProperties.$formattedCurrencyAUD = formattedCurrencyAUD;

app.config.globalProperties.$setPageTitle = setPageTitle;

app.component('Weather', Weather);

// Register the scroll-to-top directive globally
app.directive('scroll-to-top', scrollToTopDirective);

//declaring font-awesome-icon globally to be use within components 
app.component('font-awesome-icon', FontAwesomeIcon);

//createApp() is the same as new Vue() to create new vue instance
app.use(store).use(router).mount('#app');


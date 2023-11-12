<template>
  <div>
    <NavBar />
    <router-view></router-view>
    <Footer />
    <button v-scroll-to-top class="scroll-to-top-button">
      <font-awesome-icon icon="arrow-up" />
    </button>
  </div>
</template>

<script>
// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import NavBar from './components/header/NavBar.vue'
import Footer from './components/footer/Footer.vue'
import './components/style/scroll-to-top-button.css'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
* {
    /*border: 1px solid red;*/
    margin: 0;
    padding: 0;
    font-family: 'Cormorant Garamond', serif; 
    box-sizing: border-box; /* Include border in width calculations */
}
</style>

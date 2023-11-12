<template>
  <div>
    <div v-html="pageTitle"></div>
    <div class="container">
      <div class="row">
        <Layout
          class="col-4"
          v-for="(item, index) in saleItems"
          :key="index"
          :product = "item"
        >
        </Layout>
      </div>
    </div>
  </div>
</template>

<script>
import carouselItems from '../product-details/product-data.vue';
import Layout from './Layout.vue';

export default {
  name: "SalesPage",
  components: {
    Layout,
  },
  data() {
    return {
      saleItems: carouselItems.slice(7, 9),
      pageTitle: '',
    };
  },
  mounted() {
        this.pageTitle = this.$setPageTitle('sales');
  },
};
</script>


<template>
    <div>
        <div v-html="pageTitle"></div>
        <div class="container">
            <div class="row">
                <Layout
                    class="col-4"
                    v-for="(item, index) in latestItems"
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

export default{
    name: "LatestPage",
    components: {
        Layout,
    },
    data() {
        return {
            latestItems: carouselItems.slice(4, 7),
            pageTitle: '',
        }
    },
    mounted() {
        this.pageTitle = this.$setPageTitle('latest');
    },
}
</script>

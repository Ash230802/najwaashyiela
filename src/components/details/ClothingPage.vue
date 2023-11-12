<template>
    <div>
        <div v-html="pageTitle"></div>
        <div class="container">
            <div class="row">
                <Layout
                    class="col-4"
                    v-for="(item, index) in Items"
                    :key="index"
                    :product = "item"
                >
                </Layout>
            </div> 
        </div>
    </div>
</template>

<script>
import Items from '../product-details/product-data.vue'
import Layout from './Layout.vue'

export default{
    name: "ClothingPage",
    components: {
        Layout,
    },
    data() {
        return {
            Items,
            pageTitle: '',
        }
    },
    mounted() {
        this.pageTitle = this.$setPageTitle('clothing');
    },
}
</script>

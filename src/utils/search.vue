<template>
    <div class="container">
        <div class="row">
            <Layout
                class="col-4 products"
                v-for="(item, index) in filteredItems"
                :key="index"
                :product = "item"
                :wishlistInSearch = "true"
            >  
            </Layout>
        </div>
        <div class="no-product" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
import Items from '../components/product-details/product-data.vue';
import Layout from '../components/details/Layout.vue';

export default{
    data() {
        return {
            Items,
            errorMessage: '',
        }
    },
    props: {
        query: String,
    },
    components: {
        Layout,
    },
    computed: {
        filteredItems() {
            const query = this.query.toLowerCase();
            //.includes(query) checks if the query passed by the user is found in the name property of each item in Items.
            const filtered = this.Items.filter(item => item.name.toLowerCase().includes(query));

            //if the product is not found, display errorMessage
            if (filtered.length === 0) {
                this.errorMessage = 'No Product Found'; // Set error message
                return []; // Return an empty array when no products match the query
            } else {
                this.errorMessage = ''; // Reset error message when products are found
                return filtered; // Return the products that match the query
            }
        },
    },
}
</script>

<style scoped>

.container {
    background-color: #fff;
    position: absolute;
    width: 35rem;
    margin: 0 2rem;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);
}
.products {
    margin-bottom: 1rem;
}
.no-product {
    text-align: center;
}
@media (max-width: 576px),(max-width: 1000px) and (orientation: landscape) { 
    .container {
        width: 100vw;
        left: 0;
        top: 10rem;
        margin-top: 0.5rem;
        margin-left: 0;
    }
}
</style>

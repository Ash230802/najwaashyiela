<template>
    <div class="sales-product">
        <p 
            :style="{ color: salesPrice ? 'red' : 'black', 
            fontFamily: applyFontFamily ? 'Roboto, sans-serif' : 'inherit', 
            fontSize: applyFontFamily ? '1rem' : 'inherit' }"
            class="normal-price"
        ><!--use inherit to inherit the parent's default font-family-->
            {{ price }}
        </p>
        <p 
            class="sales-price" 
            :style="{ fontFamily: applyFontFamily ? 'Roboto, sans-serif' : 'inherit', fontSize: adjustFontSize ? '1rem' : 'inherit'}"
        >
            {{ salesPrice }}
        </p>
    </div>
</template>

<script>

export default {
    props: {
        price: String,
        salesPrice: String,
        applyFontFamily: Boolean,
        adjustFontSize: Boolean,
    },
}
</script>

<style scoped>
    p {
        margin: 0.5px 0;
    }
    .normal-price {
        text-decoration: line-through;
        text-decoration-thickness: 0.8px;
    }
    .sales-price {
        font-size: 1.7rem; /*same font-size with the product-page.vue for normal price */
    }
</style>

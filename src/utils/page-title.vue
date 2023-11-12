
<script>
export function setPageTitle(pageName) {
    let pageTitle = {
        cart: 'Cart Page',
        profile: 'Profile page',
        wishlist: 'Wishlist page',
        sales: 'Sales page',
        latest: 'Latest page',
        clothing: 'Clothing page',
        aboutUs: 'About Us Page'
    };
    //Use [] for pageName to access the properties of the object pageTitle
    const title = pageTitle[pageName] || '';
    document.title = title;

    return `<h5 class="class-title">${title}<h5>`;
}
</script>

<style>
.class-title {
    margin: 1rem;
}
</style>
<template>
    <div v-html="pageTitle"></div>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
               <p class="author-intro">  Hi, welcome!
                    I’m Najwa Ashyiela and I have designed 
                    this website for my studies based on Bootstrap and Vue.js.
                    I’m from Malaysia and I’m 21 years old, a 2nd year student from
                    Swinburne University of Technology, Melbourne, Australia
                </p>
            </div>
            <div class="col-12 col-md-6 order-xs-first">
                 <img src="../../assets/profilepic.jpg" alt="profile picture" class="profile-img"/>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'aboutUs',
    data() {
        return {
            pageTitle: '',
        }
    },
    mounted() {
        this.pageTitle = this.$setPageTitle('aboutUs');
    },
}
</script>

<style scoped>
    * {
        /*border: 1px solid green;*/
    }
    .container{
        background-color: #EBDEBA;
        margin: 2rem auto;
        max-width: 50rem;
    }
    .author-intro {
        margin: 4rem 2rem;
    }
    .profile-img {
        width: 12rem;
        height: auto;
        display: block;
        margin: 4rem auto;
    }
    @media (max-width: 576px),(max-width: 1000px) and (orientation: landscape) {
        .container {
            margin: 4rem auto 2rem auto;
        }
        .profile-img {
            width: 10rem;
            height: auto;
            margin: 5rem auto;
        }
        .author-intro {
            font-size: 1rem;
        }
    }
</style>

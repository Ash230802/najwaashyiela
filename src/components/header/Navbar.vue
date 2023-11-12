<template>
    <header class="sticky header">
        <div class="header-nav">
            <nav class="navbar navbar-expand-lg sticky-top">
                <div class="d-flex align-items-center"> <!--align-items center the items vertically-->
                    <!--Brand title-->
                    <div class="text-container">
                        <router-link class="navbar-brand mb-0" to="/">Najwa Ashyiela</router-link>
                        <p class="navbar-active-wear ml-2 mb-0">Active Wear</p>
                    </div>
                    <!--Brand logo-->
                    <a class="navbar-brand logo" href="#">
                        <img src="../../assets/flowerlogo.png" alt="Logo">
                    </a>
                    <Weather/>
                    <!--Search bar-->
                    <!--using v-if  to control the visibility of the form, 
                        prevent it from overlapping with the menu-list
                    -->
                    <div class="custom-input-wrapper">
                        <form class="d-flex align-items-center custom-input" role="search" v-if="showFormControl"> 
                            <input 
                                class="form-control rounded-0" 
                                type="search"
                                v-model="searchQuery"
                                placeholder="I'm searching for..." 
                                aria-label="Search"
                            >
                            <img class="search-icon" src="../../assets/searchicon.png" width="30" height="30">
                        </form>
                        <div class="custom-input-search-query">
                            <SearchQuery :query="searchQuery" v-if="searchQuery.length > 0" />
                        </div>
                    </div>
                    <!--Icons-->
                    <ul class="navbar-nav">
                      <!--d-lg-flex helps to display the list in flex-container, by default it's in row direction-->
                        <li class="nav-item d-none d-lg-flex">
                          <love-profile-icons/>
                        </li>
                        <li class="nav-item cart-icon">
                            <router-link to="/cart">
                                <a class="nav-link">
                                    <img src="../../assets/carticon.png" alt="Cart Icon">
                                </a>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!--easier to align the button toggler with the logo and the texts-->
                <button
                    class="navbar-toggler"
                    type="button"
                    @click="toggleMenu"
                    aria-controls="navbarNav"
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
            </nav>
            <!--Nav bar menu list -->
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="collapse navbar-collapse" :class="{ 'show' : isMenuOpen }">
                    <ul class="navbar-nav menu-list">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/sales">SALES</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/latest">LATEST</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/clothing">CLOTHING</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/aboutUs">ABOUT US</router-link>
                        </li>
                        <hr>
                    </ul>
                    <ul class="navbar-nav love-profile-icons">
                      <li class="nav-item">
                        <love-profile-icons v-if="isMenuOpen" />
                      </li>
                    </ul>
                </div>
            </nav>
            <!--create adequate space in menu-list, let it be in the same line with the love-profile-icons-->
            <div v-if="isMenuOpen" class="love-profile-icons-lables">
                <router-link to="/wishlist" class="custom-link">
                    <div class="icon-label wishlist-label">WISHLIST</div>
                </router-link>
                <router-link to="/authLayout" class="custom-link">
                    <div class="icon-label">PROFILE</div>
                </router-link>
            </div>
        </div>
    </header>
</template>
<script>
import LoveProfileIcons from './LoveProfileIcons.vue';
import SearchQuery from '../../utils/search.vue';

export default {
  name: "NavBar",
  components: {
    LoveProfileIcons,
    SearchQuery
  },
  data() {
    return {
        isMenuOpen: false,
        showFormControl: true,
        searchQuery: '',
    };
  },
  methods: {
    toggleMenu() {
        /*!this.isMenuOpen = !false which is equivalent to true */
        this.isMenuOpen = !this.isMenuOpen;
        this.showFormControl = !this.isMenuOpen;
    }
  },
};
</script>

<style scoped>
* {
    /*border: 1px solid red;*/
    margin: 0;
    padding: 0;
    font-family: 'Cormorant Garamond', serif; 
    box-sizing: border-box; /* Include border in width calculations */
}
.navbar {
  background-color: #FFF6DC;
}
.navbar-brand {
    color: black;
    font-size: 2.5rem;
}
.navbar-active-wear {
    padding-left: 3rem;
    font-size: 1.6rem;
}
.logo {
    padding: 0;
}
.logo img {
    padding: 1rem 0;
    width: 3.2rem;
    height: auto;
}
.text-container {
    display: flex;
    flex-direction: column;
    padding: 2rem 0 2rem 2rem;
}
.form-control {
    width: 35rem;
    padding: 0.5rem;
    background-color: #EBDEBA;
}
.custom-input {
    position: relative;
    margin: 0 2rem; /*The parent control the space between the text, logo and icons */
}
.custom-input img {
    position: absolute;
    right: 0.5rem;
    bottom: 0.4rem;
}
.navbar-nav .cart-icon img {
    width: 2rem;
    height: auto;
    margin: 0 0.2rem;
    position: relative;
    top: 0.1rem; /*Adjust the top to be in the same length with love and profile icons */
}
.menu-list {
    margin: 0 auto; /*center the nav-bar menu */
}
.menu-list li {
    padding: 0 5rem; /*create space between the menu-list*/
    padding-bottom: 1rem; /*create some space between the nav-bar border and the menu-list */
    font-size: 1.2rem;
    position: relative;
}
.menu-list li::after {
  content: "";
  position: absolute;
  bottom: 1px; /* Offset to position the line below the text */
  left: 0; /*position the line at the left side to start with*/
  width: 0; /*initially the line in invisible */
  height: 2px; /*the line's thickness */
  background-color: #0F2C59; 
  transition: width 0.5s ease; /* Add transition for smooth effect */
}
.menu-list li:hover::after {
  width: 100%; /*full width after hover */
}

/* Media query for mobile phone screen size and landscape */
@media (max-width: 576px),(max-width: 1000px) and (orientation: landscape) { 

    .d-flex.align-items-center {
        margin: 0 auto;
    }
    .navbar-brand {
        font-size: 1.2rem;
    }
    .navbar-active-wear {
        font-size: 0.7rem;
    }
    .logo img {
        width: 2rem;
        height: auto;
    }
    .cart-icon {
        position: absolute;
        right: 1rem;
        bottom: 2.9rem;
    } 
    /*align the text wishlist and profile center */
    .icon-label {
      text-align: center;
    }
    .navbar-nav.love-profile-icons li {
      /*create space between the icons and the left side border*/
      padding-left: 6rem;
    }
    .love-profile-icons-lables {
      position: relative;
      /*create space between the border of the menu-list */
      bottom: 6rem;
      font-size: 1.2rem;
    }
    /*create space between the wishlist-label and profile label*/
    .wishlist-label{
        margin-bottom: 1.5rem;
    }
    .navbar-toggler {
        /*using absolute instead of relative cuz the initial position 
        is set to be at the most right side and it takes a whole lot 
        of values to predict the right element to move from right: ??rem */
        position: absolute;
        top: 2.8rem;
        left: 1rem;
    }
    .menu-list a {
        text-align: center;
    }
    .custom-input {
        position: absolute;
        top: 6.5rem;
        left: 0;
    }
    .form-control {
        background-color: transparent;
        border: 1px solid white;
        width: 100vw;
    }
    .custom-link {
        text-decoration: none;
        color: inherit;
    }
}
/*Galaxy Fold mobile size */
@media (max-width: 320px) {
    .navbar-nav.love-profile-icons li {
      /*create space between the icons and the left side border*/
      padding-left: 3rem;
    }
    .logo {
        margin-left: 0;
        padding-right: 0.7rem;
        margin-top: 1rem;
        
    }
    .text-container {
        padding-left: 3rem;
        padding-top: 3rem;
    }
    .navbar-toggler {
        top: 4rem;
        left: 0.5rem;
    }
    .custom-input {
        top: 7.5rem;
    }
}
</style>

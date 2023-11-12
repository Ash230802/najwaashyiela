<template>
  <div class="container">
    <ul class="nav nav-tabs flex-container" role="tablist">
      <li class="nav-item log-in">
        <router-link
          to="/authLayout/"
          class="nav-link"
          role="tab"
          @click="selectedTab('Log In')"
          :class="{'selected' : selectedPage === 'Log In' }"
        >
          Log In
        </router-link>
      </li>
      <li class="nav-item sign-up">
        <router-link
          to="/authLayout/signup"
          class="nav-link"
          role="tab"
          @click="selectedTab('Sign Up')"
          :class="{'selected' : selectedPage  === 'Sign Up'}"
        >
          Sign Up
        </router-link>
      </li>
    </ul>
    <!--the log in and sign up will be render inside the auth-layout, so it needs to insert router-view-->
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { ref } from 'vue';

export default defineComponent({
    setup() {
        const selectedPage = ref("Log In");

        const selectedTab = (tab) => {
            selectedPage.value = tab;
        };

        return {
            selectedPage,
            selectedTab
        }
    },
});
</script>


<style scoped>
.container {
    background-color: #EBDEBA;
    width: 33rem;
    margin: 2rem auto;
}
.nav-link {
    font-size: 1.5rem;
    color: inherit;
}
.nav-item  {
    margin-bottom: 1rem;
}
.flex-container {
    display: flex;
    justify-content: space-between; /*the items inside it will move to the left and right at the other ends */
}
.log-in, .sign-up{
    flex: 1; /* give equal space  */
    text-align: center;
}
.selected {
    color: #ffff;
}
@media (max-width: 576px), (max-width: 1000px) and (orientation: landscape) {
    .container {
      width: 20rem;
    }
    .nav-link {
        font-size: 0.8rem;
    }
}
/*special case for Galaxy fold */
@media (max-width: 320px) { 
    .container {
      width: 15rem;
    }
}
</style>

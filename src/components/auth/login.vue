<template>
    <div v-if="message" class="message" :style="{ backgroundColor: message === 'You\'ve successfully logged in' ? '#1A5D1A' : '#BB2525'}">{{ message }}</div>
    <!--Prevent the page from reload or refresh and to call the login function-->
    <form @submit.prevent="login">
        <div class="email-login">
            <label for="email" class="form-label">Email *</label>
            <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="password-login">
            <label for="password" class="form-label">Password *</label>
            <input type="password" id="password" v-model="password" class="form-control" maxlength="8" minlength="5" required />
        </div>
        <div class="login-action">
            <button class="login-btn" aria-label="Log In">LOG IN</button>
        </div>
    </form>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
//Vue 3
import { ref } from 'vue'
//import { router } from '../../main'
import { useStore } from 'vuex'
import { toggleMessageTiming } from '../../utils/message-timing'
import validUser from './validUser'
import './authLayout.css'

export default defineComponent({
  setup() {
    const message = ref('');
    const email = ref('');
    const password = ref('');

    const store = useStore();

    const login = () => {

        if (email.value === validUser.email && password.value === validUser.password) {
            // Successful login
            message.value = 'You\'ve successfully logged in';

            //dispatch the mutation to set isLoggedIn to true
            //using store.commit gives direct access to the store instance and its commit method
            store.commit('SET_LOGIN_STATUS', true);

            //router.push('/');
        } else {
            // Incorrect email or password
            message.value = 'The email or password is incorrect';
        }
        toggleMessageTiming(message);
    };

    return {
        email,
        password,
        message,
        login,
    };
  },
});
</script>
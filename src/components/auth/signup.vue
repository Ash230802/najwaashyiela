<template>
    <div v-if="message" class="message">{{ message }}</div>

    <form @submit.prevent="signup">
        <div class="user-name">
            <label for="firstName"  class="form-label">First name *</label>
            <input type="text" id="firstName" class="form-control" required />

            <label for="lastName"  class="form-label">Last name *</label>
            <input type="text" id="lastName" class="form-control" required />
        </div>
        <div class="user-number">
            <label for="number"  class="form-label">Phone number *</label>
            <input type="tel" id="number" placeholder="Example: +1234567890" maxlength="15" class="form-control" required />
        </div>
        <div class="user-details">
            <div class="user-birthdate">
                <label for="birthdate"  class="form-label">Date of Birth *</label>
                <input type="date" id="birthdate" class="form-control" required />
            </div>
            <div class="user-postcode">
                <label for="postcode"  class="form-label">Postcode (Optional)</label>
                <input type="text" id="postcode" class="form-control"/>
            </div>
        </div>
        <div class="user-email">
            <label for="email"  class="form-label">Email *</label>
            <input type="email" id="email" v-model="email" class="form-control" required />

            <label for="confirmEmail"  class="form-label">Confirm Email *</label>
            <input type="email" id="confirmEmail" v-model="confirmEmail" class="form-control" required />

            <!--give a notice if the email is mismatch-->
            <div v-if="!isEmailMatching" class="error-message">Email doesn't match</div>
        </div>
        <div class="user-password">
            <label for="password"  class="form-label">Password *</label>
            <input type="password" id="password" v-model="password" class="form-control" required />

            <label for="confirmPassword"  class="form-label">Confirm Password *</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />

            <!--give a notice if the password is mismatch-->
            <div v-if="!isPasswordMatching" class="error-message">Pasword doesn't match</div>
        </div>
        <div class="signup-action">
            <button class="signup-btn" aria-label="Sign Up" :disabled="!isFormValid">
                SIGN UP
            </button>
        </div>
    </form>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { ref, computed } from 'vue'
import './authLayout.css'

export default defineComponent({
 setup() {
   const confirmEmail = ref('');
   const confirmPassword = ref('');
   const email = ref('');
   const message = ref('');
   const password = ref('');

   const isEmailMatching = computed(() => email.value === confirmEmail.value);
   const isPasswordMatching = computed(() => password.value === confirmPassword.value);
   const isFormValid = computed(() => isEmailMatching.value && isPasswordMatching.value)

   const signup = () => {
        if (isFormValid.value) {
            message.value = "You\'ve successfully signed up";
        } else {
            message.value = "Please make sure your email and password match";
        }
        $toggleMessageTiming(message);
   };
   return {
    confirmEmail,
    confirmPassword,
    email,
    isEmailMatching,
    isPasswordMatching,
    isFormValid,
    message,
    password,
    signup
   };
 }
});
</script>

<style scoped>
.error-message {
    background-color: #BB2525;
    color: #fff;
    text-align: center;
}
.message {
    color: #000;
}
</style>
../../utils/message-auth
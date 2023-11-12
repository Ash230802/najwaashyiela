<template>
  <footer class="static-footer py-2">
    <div class="contact-details text-left">
      <h3>Contact Us</h3>
      <ul class="list-inline">
        <li class="list-inline-item">
          <a href="https://www.instagram.com/">
            <img class="social-media" src="../../assets/instagram.png" alt="Instagram">
          </a>
        </li>
        <li class="list-inline-item">
          <a href="https://www.facebook.com/login.php">
            <img class="social-media" src="../../assets/facebook.png" alt="Facebook">
          </a>
        </li>
        <li class="list-inline-item">
          <a href="mailto:najwaashyiela.email@gmail.com">
            <img class="social-media" src="../../assets/gmail.png" alt="Gmail">
          </a>
        </li>
      </ul>
    </div>
    <p class="text-center">&copy; 2023 NAJWA ASHYIELA. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
footer {
  background-color: #FFF6DC;
}
.contact-details {
    padding-left: 2rem;
}
.social-media {
    width: 1.5rem;
    height: auto;
}
</style>

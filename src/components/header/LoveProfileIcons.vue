<template>
    <li class="nav-item">
      <a class="nav-link">
        <router-link to="/wishlist">
          <img src="../../assets/loveicon.png" alt="Wishlist Icon">
        </router-link>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">
        <router-link to="/authLayout">
          <img src="../../assets/profileicon.png" alt="Profile Icon">
        </router-link>
      </a>
    </li>
</template>

<script>
export default {
  name: 'LoveProfileIcons',
};
</script>

<style>
.nav-item .nav-link img{
    width: 2rem;
    height: auto;
}
.navbar-nav .nav-item img:hover{ 
  transform: scale(1.2); /* Increase the size upon hover */
}
</style>

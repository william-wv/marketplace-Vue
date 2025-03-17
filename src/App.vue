<script setup>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';


</script>

<template>
<header>
  <HeaderComponent/>

  <main>
    <RouterView/>
  </main>

  <footer>
    <FooterComponent/>
  </footer>
</header>


</template>

<style scoped>

</style>
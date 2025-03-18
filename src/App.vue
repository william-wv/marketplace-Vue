<script setup>
import FooterBottom from './components/layout/FooterBottom.vue';
import FooterTop from './components/layout/FooterTop.vue';
import HeaderBottom from './components/layout/HeaderBottom.vue';
import HeaderTop from './components/layout/HeaderTop.vue';


</script>

<template>
  <header>
    <HeaderTop />
    <HeaderBottom/>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <FooterTop />
    <FooterBottom/>
  </footer>



</template>

<style scoped></style>
<script setup>
import { useRoute } from 'vue-router';
import FooterBottom from './components/layout/FooterBottom.vue';
import FooterTop from './components/layout/FooterTop.vue';
import HeaderBottom from './components/layout/HeaderBottom.vue';
import HeaderTop from './components/layout/HeaderTop.vue';
import HeaderHome from './components/layout/HeaderHome.vue';
// import ListPages from './components/layout/ListPages.vue';


const route = useRoute()



</script>

<template>
  <header v-if="!route.meta.hideHeader">
    <HeaderTop />
    <HeaderBottom />
    <HeaderHome />
  </header>

  

  <main>
    <RouterView />
  </main>

  <footer v-if="!route.meta.hideFooter">
    <FooterTop />
    <FooterBottom />
  </footer>



</template>

<style scoped>
/* .header {
  position: fixed;
  margin-bottom: 30px !important;
} */
</style>
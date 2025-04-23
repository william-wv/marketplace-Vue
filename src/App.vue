<script setup>
import { useRoute } from 'vue-router';
import FooterBottom from './components/layout/FooterBottom.vue';
import FooterTop from './components/layout/FooterTop.vue';
import HeaderBottom from './components/layout/HeaderBottom.vue';
import HeaderTop from './components/layout/HeaderTop.vue';
import HeaderHome from './components/layout/HeaderHome.vue';

import { Notivue, Notification } from 'notivue'

const route = useRoute()

</script>

<template>
  <header v-if="!route.meta.hideHeader">
    <HeaderTop />
    <HeaderBottom />
    <HeaderHome />
  </header>

  <Notivue v-slot="item">
    <Notification :item="item" class="minha-notificacao" />
  </Notivue>

  <main>
    <RouterView />
  </main>

  <footer v-if="!route.meta.hideFooter">
    <FooterTop />
    <FooterBottom />
  </footer>

</template>

<style >

/* Estilos para o spinner de loading */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--Blue-700);
  z-index: 1;
}

.bi-arrow-left-short {
  font-size: 50px;
  padding: 10px;
}
.minha-notificacao {
  background-color: #fff;
  border-left: 4px solid #4caf50;
  padding: 0.5rem;
  border-radius: 20px !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  color: #333;
}
</style>

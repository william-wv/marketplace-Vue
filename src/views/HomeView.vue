<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import CardsHome from '@/components/layout/CardsHome.vue';
import useAuthStore from '@/stores/auth';

const isMobile = ref(window.innerWidth <= 700);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const auth = useAuthStore();

</script>

<template>
  <section v-if="isMobile">
    <div>
      <h1> Bem vindo! <br>
        <span class="name-color">{{ auth.user.name }}</span>
      </h1>
      <h2 style="color: var(--text-h2);">Welcome back to Marquetplace</h2>
    </div>
    <div class="d-flex justify-content-center">
      
      <CardsHome :icon="'bi bi-bag'" :title="'My Cart'" :num="1" :text="'My Cart'"
          :btn_txt="'View Cart'"  :route="'/'"/>
      <CardsHome :icon="'bi bi-heart'" :title="'Wishlist'" :num="6" :text="'My saved item'"
          :btn_txt="'View Cart'" :route="'/'" />
    </div>
  </section>
</template>

<style scoped>
  .name-color {
    color: var(--Orange-500);
  }
</style>
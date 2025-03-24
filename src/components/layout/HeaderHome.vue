<script setup>
import { ref, onMounted, onUnmounted } from "vue";


import iconsData from "@/data/iconsHeaderBottom.json"
const icons = ref(iconsData)


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


</script>

<template>

  <section v-if="!isMobile" class="icons w-100">
    <div class="col-6"></div>
    <div class="div-icons col-6 d-flex justify-content-end " style="background-color: var(--Blue-700);">
      <div v-for="icon in icons" :key="icon.id" class="cardhover">
        <RouterLink :to="icon.route" class="d-flex cards">
          <h3 style="font-size: 1rem; color: var(--White-000);">{{ icon.name }}</h3>
          <i style="color: var(--White-000);" :class="icon.class"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icons {
  display: flex;
  gap: 20px;
  align-items: center;

}

.div-icons{
  padding: 10px;
  gap: 20px; 
  border-radius: 0 0 0 100px;
  margin-left: -20px !important;
  padding-right: 10px !important;
}

.cards {
  gap: 5px;
}
.cardhover:hover{
  border-bottom: 1px solid var(--Orange-500);
  transition: color 0.3s ease;
}

@media (min-width:1050px) {
  .cards {
  gap: 10px;
}

@media (min-width:1440px) {
  .div-icons{
  padding-right: 100px !important;
}
}
}
</style>
<script setup>
import { ref , onMounted, onUnmounted} from 'vue';
import iconsData from '@/data/iconsHeaderTop.json'

const icons = ref(iconsData)


const isMobile = ref(window.innerWidth <= 768);

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
  <div v-if="!isMobile" class="container-top d-flex">
    <div class="phrase">
      <p>Welcome to Compre+ online eCommerce store.</p>
    </div>
    <div class="d-flex align-items-center"> <!-- Alinha os itens verticalmente -->
      <p class="follow m-0">Follow us:</p>
      <div v-for="icon in icons" :key="icon.id" class="icons d-flex align-items-center">
        <a :href="icon.link" target="_blank">
          <img :src="icon.image" :alt="icon.desc" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
p, a, li, h1 {
  color: var(--White-050);
}

.container-top {
  background-color: var(--Blue-700); 
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
}

.phrase{
  align-items: center;
}

.follow {
  align-items: center;
}

.icons {
  padding: 0 10px;
  align-items: center; 
}

img {
  max-height: 24px;
  width: auto;
}

@media (max-width: 668px) {
  .container-top{
    display: none !important;
  }
}
</style>

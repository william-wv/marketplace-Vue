<script setup>
import { ref } from 'vue';
import ButtonComponent from '../common/ButtonComponent.vue';
import iconsData from '@/data/iconsFooterTop.json'

const icons = ref(iconsData)

</script>

<template>

  <div class="container__footer">
    <div class="container">
      <div class="texts">
        <h1 class="h1-footer-600">Subscribe to our newslatter</h1>
        <h2 class="h2-footer-400">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna.
          Quisque
          vitae porta ipsum.
        </h2>
      </div>
      <div class="container d-flex">
        <input type="text" class="form-control" placeholder="Digite para buscar..." />

        <ButtonComponent 
          class="position-btn" 
          :text="'Subscribe'" 
          :style="'orange'" 
        />
      </div>
      <div class="icons-footer-top">
        <a v-for="icon in icons" :key="icon.id" :href=icon.link target="_blankw">
          <img class="icons" :src=icon.image :alt=icon.desc>
        </a>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container__footer {
  display: flex;
  background-color: var(--Blue-700);
  justify-content: center;
  padding: 100px 0;
}

.texts {
  color: var(--White-000);
  text-align: center;
}

h1 {
  margin-bottom: 15px !important;
}

h2 {
  padding: 0 250px;
  opacity: 60%;
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 0.5px !important;
  margin-bottom: 50px !important;
}

.form-control {
  padding: 15px !important;
}

.container {
  gap: 10px !important;
}

.position-btn {
  display: flex;
  align-items: center;
}

.icons-footer-top {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 150px !important;
  margin: 10px 0 0 0 !important;
  align-items: center;
}



@media (max-width: 450px) {
  .texts {
    width: 90%;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1rem;
  }
}
</style>
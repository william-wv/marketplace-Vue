<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/common/ButtonArrow.vue';
import iconsData from '@/data/iconsFooterTop.json'

const icons = ref(iconsData)

</script>

<template>

  <div class="container__footer">
    <div class="contain">
      <div class="texts">
        <h1 class="h1-footer-600">Subscribe to our newslatter</h1>
        <h2 class="h2-footer-400">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus. Donec non quam urna.
          Quisque
          vitae porta ipsum.
        </h2>
      </div>
      <div>
        <div class="container-form d-flex">
          <input type="text" class="form-control" placeholder="Digite para buscar..." />
          <ButtonComponent class="position-btn" :text="'Subscribe'" :style="'orange'" />
        </div>
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
  background-color: var(--Blue-700) !important;
  color: var(--White-050);
  padding: 50px 0 !important;
}

.contain{
  padding: 0 40px ;
}

.h1-footer-600 {
  text-align: center;
  font-size: 2rem;
  margin: 0 0 15px 0 !important;
}

.h2-footer-400 {
  text-align: center;
  font-size: 1.2rem;
  margin: 0 0 15px 0 !important;
}

.container-form {
  justify-content: center;
}

.form-control {
  max-width: 200px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: var(--White-050);
}

.icons-footer-top{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.icons{
  width: 60px;
}

@media (min-width:1024px) {
  .contain{
    padding: 0 200px;
  }
  
  .form-control{
    max-width: 300px;
  }

  .icons-footer-top{
    gap: 40px;
  }
}

@media (min-width:1044px){
  .contain{
    padding: 0 350px;
  
    & h1 {
      font-size: 2.6rem;
    }

    & h2 {
      font-size: 1.3rem;
      line-height: 1.3;
    }
  }
}


</style>
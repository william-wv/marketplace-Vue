<script setup>
import ButtonComponent from '../common/ButtonComponent.vue';


const props = defineProps({
  icon: String,
  title: String,
  num: Number,
  text: String,
  btn_txt: String,
})

const number = props.num.toString()

</script>

<template>
  <section>
    <div class="card">
      <div class="div-icon">
        <i class="icon" :class=icon></i>
      </div>
      <h2 class="mt-2">{{ title }}</h2>
      <h2 style="color: var(--Blue-900);">{{ number }}</h2>
      <p class="mb-2">{{ text }}</p>

      <ButtonComponent :title=btn_txt :style="'blue'" />
    </div>
</section>
</template>

<style scoped>

section{
  padding: 20px 20px;
}
.card {
  display: flex;
  background-color: transparent;
  border: 1px solid var(--Blue-500);
  color: var(--White-250);
  border-radius: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px;
}



.div-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--Blue-900);
  color: var(--White-000);
}

i{
  font-size: 1.4rem;
  position: relative;
  top: 1px;
}

@media (min-width: 1024px) {
  main{
    height: 1px;
  }
}
</style>